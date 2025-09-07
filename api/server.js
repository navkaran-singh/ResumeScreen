import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";

import { Nodes } from "./models/Nodes.js";
import {
  extractTextFromDOCX,
  extractTextFromTXT,
  extractTextFromPDF,
  // testWithPdfParse,
} from "./extract.js";
import { parseResume, generateCover } from "./extractSkills.js";
import { Candidate } from "./models/ResumeSchema.js";
import { error } from "console";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // specify your frontend origin
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions)); // use CORS with the specified options -> to make requests bw different ports
app.use("./uploads", express.static("uploads"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + path.extname(file.originalname));
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "text/plain",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Invalid file type. Only PDF, DOCX, and TXT files are allowed."
//       ),
//       false
//     );
//   }
// };

const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB Limit
});

app.post("/extract", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No File Uploaded" });

  console.log("Uploaded file:", req.file.path); // ✅ Debugging

  const filePath = req.file.path;
  let extractedText = "";

  try {
    if (filePath.endsWith(".pdf")) {
      extractedText = await extractTextFromPDF(filePath);
      // extractedText = await testWithPdfParse(filePath);
    } else if (filePath.endsWith(".docx")) {
      extractedText = await extractTextFromDOCX(filePath);
    } else if (filePath.endsWith(".txt")) {
      extractedText = await extractTextFromTXT(filePath);
    } else {
      return res.status(200).json({ error: "Invalid file format" });
    }
  } catch (err) {
    console.log("Extraction error:", err);
    res.status(500).json({
      error: "Failed to extract text from the file.",
      details: err.message,
    });
  }

  res.json({ message: "Text extracted.", extractedText });
});

app.post("/process", async (req, res) => {
  try {
    const text = req.body.extractedText;
    if (!text) return res.status(400).json({ error: "No text in file" });

    let extractedData = await parseResume(text);
    if (!extractedData)
      return res.status(400).json({ error: "No extracted data" });

    extractedData = extractedData.replace(/```json|```/g, "").trim();

    try {
      extractedData = JSON.parse(extractedData);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON from AI" });
    }

    try {
      const {
        name,
        skills,
        certifications,
        expYears,
        aiScore,
        top_skills,
        email,
        experience,
        details,
        feedback,
        optimal,
        location,
        position,
        technical,
        leadership,
        teamwork,
        communication,
        degree,
      } = extractedData;
      if (
        !name ||
        expYears === undefined ||
        aiScore === undefined ||
        !Array.isArray(top_skills) ||
        !Array.isArray(experience) ||
        !email ||
        !details
      ) {
        return res
          .status(200)
          .json({ error: "Not enough information in resume to rank it" });
      }

      let currData = await Nodes.findOne();
      if (!currData) currData = new Nodes({ resumes: [] });

      const existingUserIndex = currData.resumes.findIndex(
        (r) => r.email === email
      );

      const processedData = {
        // We'll set the ID based on whether the user is new or existing
        id: null,
        name,
        experience: expYears,
        aiScore,
        skills: top_skills,
        email,
        details,
      };

      if (existingUserIndex === -1) {
        // === USER DOES NOT EXIST: Add a new entry ===
        console.log("User not found, creating new entry.");
        processedData.id = currData.resumes.length + 1; // Assign a new ID
        currData.resumes.push(processedData);
      } else {
        // === USER EXISTS: Update the existing entry ===
        console.log("User found, updating existing entry.");
        // Preserve the original ID of the user
        processedData.id = currData.resumes[existingUserIndex].id;
        // Replace the old object with the new one at the same index
        currData.resumes[existingUserIndex] = processedData;
      }

      // Save the changes for both new and updated users
      await currData.save();

      let candidate = null;

      try {
        candidate = new Candidate({
          name,
          skills,
          location,
          position,
          degree,
          experience: expYears,
          technical,
          leadership,
          teamwork,
          communication,
          aiScore,
          details,
          certifications,
        });

        await candidate.save();
      } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ error: "Failed to save candidate", details: error.message });
      }

      res.json({
        message:
          "Resume processed successfully, data uploaded to candidates schema",
        resumes: currData.resumes,
        processedData: { ...processedData, experience, feedback, optimal },
        candidate,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.post("/cover", async (req, res) => {
  let coverText = "";
  let name = "";
  try {
    const { resume, jobDescription } = req.body;
    let text = await parseResume(resume);
    text = text.replace(/```json|```/g, "").trim();
    name = JSON.parse(text).name;

    coverText = await generateCover(text, jobDescription);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
  res.json({
    message: "Success",
    coverText: coverText + "",
    candidate: name,
  });
});

app.get("/resumes", async (req, res) => {
  let currData = await Nodes.findOne();
  console.log("/resumes called");

  const resultData = currData?.resumes.map(
    ({ name, experience, skills, aiScore, details, email }) => ({
      name,
      experience,
      skills,
      aiScore,
      details,
      email,
    })
  );
  res.json({ message: "All resumes data sent", resultData });
});

// fetch candidate data
app.get("/fetch", async (req, res) => {
  try {
    const data = await Candidate.find();
    res.json({ data, message: "Candidate data successfully fetched" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// app.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     // resume = new resumeData
//     let extractedData = await parseResume(extractedText);
//     // GEMINI AI IS GIVING A RESPONSE STARTING WITH ```json ENDING WITH ``` which isn't valid JSON
//     extractedData = extractedData.replace(/```json|```/g, "").trim(); // /g ensures globally removed
//     console.log(JSON.parse(extractedData));

//     res.json({
//       message: "Text extracted",
//       text: extractedText,
//       extractedData: JSON.parse(extractedData),
//     });
//   } catch (err) {
//     console.error("Extraction error:", err); // ✅ Debugging
//     res
//       .status(500)
//       .json({ error: "Error extracting text", details: err.message });
//   }
// });

app.listen(5000, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Server running on http://localhost:5000");
  } catch (error) {
    console.log("Can't connect to database");
  }
});
