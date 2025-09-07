import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TickIcon from "../../public/images/tick.svg";
import DocIcon from "../../public/images/doc.svg";

const Cover = () => {
  const [done, setDone] = useState(0);
  const [array, setArray] = useState([]);
  const [curr, setCurr] = useState(1);
  const [file, setFile] = useState();

  const [extractedText, setExtractedText] = useState();
  const [inputValue, setInputValue] = useState("");
  const [msg, setMsg] = useState();
  const [state, setState] = useState("Edit");
  const [name, setName] = useState();
  const [coverText, setCoverText] = useState(`Dear Hiring Manager,

I am writing to express my interest in the [Job Title] position at [Company Name] as advertised. With my background in [relevant field from resume] and experience in [relevant skill from job description], I believe I am well-qualified for this role.

Throughout my career at [Previous Company from resume], I have developed strong skills in [skills matching job description]. In my previous role as [Role from resume], I successfully [achievement that relates to job requirements].

The opportunity to join [Company Name] excites me because [reason based on job description]. I am particularly drawn to your company's focus on [company value/mission from job description] as it aligns with my professional goals.

I am confident that my experience in [relevant experience from resume] makes me an ideal candidate for this position. I am eager to contribute my [relevant skills] to your team and help [achieve company objective from job description].

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills would benefit [Company Name].

Sincerely,
[Your Name]`);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);

    const fileData = new FormData();
    fileData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/extract",
        fileData
      );
      console.log(response.data);
      setExtractedText(response.data.extractedText);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([coverText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = name ? name + "_cover_letter.txt" : "cover_letter.txt"; // File name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Cleanup
    URL.revokeObjectURL(url);
    setArray((a) => [...a, 4]);
  };

  const handleGenerate = async () => {
    setMsg("Generating...");
    const response = await axios.post("http://localhost:5000/cover", {
      jobDescription: inputValue,
      resume: extractedText,
    });

    console.log(response.data);

    setCoverText(response.data.coverText);
    setName(response.data.candidate);
    setMsg();
    setCurr((c) => c + 1);
    setDone((d) => d + 50);
    setArray((a) => [...a, 3]);
  };

  const handleCoverText = (e) => {
    setCoverText(e.target.value);
  };

  return (
    <div className="m-3 overflow-x-hidden overflow-y-hidden mx-10 max-md:mx-3">
      <Navbar />
      <h1 className="text-center mt-10 mb-3 text-3xl font-bold">
        AI-Powered Cover Letter Generator
      </h1>
      <p className="para text-center ">
        Upload your resume, paste the job description, and get a tailored cover
        letter in seconds.
      </p>
      <div className="flex justify-between mt-10 text-gray-400">
        <div
          className={`flex flex-col justify-center items-center ${
            curr == 1 || array.includes(1) ? "text-black" : ""
          }`}
        >
          <span
            className={`border-2 rounded-full flex items-center justify-center w-8 h-8 ${
              array.includes(1) && "bg-black"
            }`}
          >
            {array.includes(1) ? (
              <img src={TickIcon} className="img invert"></img>
            ) : (
              1
            )}
          </span>
          <p>Upload Resume</p>
        </div>
        <div
          className={`flex flex-col justify-center items-center ${
            curr == 2 || array.includes(2) ? "text-black" : ""
          }`}
        >
          <span
            className={`border-2 rounded-full flex items-center justify-center w-8 h-8 ${
              array.includes(2) && "bg-black"
            }`}
          >
            {array.includes(2) ? (
              <img src={TickIcon} className="img invert"></img>
            ) : (
              2
            )}
          </span>
          <p>Job Description</p>
        </div>
        <div
          className={`flex flex-col justify-center items-center ${
            curr == 3 || array.includes(3) ? "text-black" : ""
          }`}
        >
          <span
            className={`border-2 rounded-full flex items-center justify-center w-8 h-8 ${
              array.includes(3) && "bg-black"
            }`}
          >
            {array.includes(3) ? (
              <img src={TickIcon} className="img invert"></img>
            ) : (
              3
            )}
          </span>
          <p>Generate</p>
        </div>
        <div
          className={`flex flex-col justify-center items-center ${
            curr == 4 || array.includes(4) ? "text-black" : ""
          }`}
        >
          <span
            className={`border-2 rounded-full flex items-center justify-center w-8 h-8 ${
              array.includes(4) && "bg-black"
            }`}
          >
            {array.includes(4) ? (
              <img src={TickIcon} className="img invert"></img>
            ) : (
              4
            )}
          </span>
          <p>Edit & Download</p>
        </div>
      </div>
      <div className="w-full h-3.5 rounded-xl bg-gray-100">
        <div
          className={`bg-black h-3.5 rounded-xl`}
          style={{ width: `${done <= 100 && done}%` }}
        ></div>
      </div>

      {curr == 1 && (
        <div className="mt-10 p-5 bg-white rounded-xl shadow-xl ring-1 ring-white">
          <h1 className="text-xl">Upload Your Resume</h1>
          <p className="para">
            We'll analyze your resume to create a personalized cover letter that
            highlights your relevant skills and experience.
          </p>
          {!file && (
            <label
              htmlFor="img"
              className="mt-5 flex flex-col border-dotted border-2 rounded-lg border-gray-400 w-full min-h-72 justify-center items-center cursor-pointer"
            >
              <span className="text-xl block">
                {"Drag & drop your resume (Limit: 10MB)"}{" "}
              </span>
              <span className="text-gray-600">
                or click to browse (PDF, DOC, DOCX)
              </span>
            </label>
          )}
          {file && (
            <label
              htmlFor="img"
              className="mt-5 flex flex-col border-dotted border-2 rounded-lg border-gray-400 w-full min-h-72 justify-center items-center cursor-pointer"
            >
              <span className="text-xl block">{file.name}</span>
            </label>
          )}
          <input
            onChange={handleFileChange}
            accept=".pdf,.docx"
            type="file"
            value=""
            id="img"
            className="hidden"
          />

          <div className="mt-5 flex justify-end">
            <button
              className={`rounded-lg flex gap-2 p-2 px-4 cursor-pointer bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              onClick={() => {
                setCurr((c) => c + 1);
                setDone((d) => d + 25);
                setArray((a) => [...a, 1]);
              }}
              disabled={!file}
            >
              <span className="text-white">Next</span>
              <span className="text-white"> {">"} </span>
            </button>
          </div>
        </div>
      )}

      {curr == 2 && (
        <div className="mt-10 p-5 bg-white rounded-xl shadow-xl ring-1 ring-white">
          <h1 className="text-xl">Job Description</h1>
          <p className="para">
            Paste the job description to help our AI tailor your cover letter to
            the specific role.
          </p>
          <textarea
            onChange={handleInputChange}
            id="job-description"
            placeholder="Paste the job description here..."
            className="border-1 rounded-lg border-gray-300 w-full mt-5 p-2"
            rows={10}
            cols={50}
          />

          <div className="flex justify-between">
            <span className="para">Min 50 characters</span>
            <span className="para">{inputValue.length} characters</span>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              className={`rounded-lg flex gap-2 p-2 px-4 cursor-pointer bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              onClick={() => {
                setCurr((c) => c + 1);
                setDone((d) => d + 25);
                setArray((a) => [...a, 2]);
              }}
              disabled={!(inputValue.length > 50)}
            >
              <span className="text-white">Next</span>
              <span className="text-white"> {">"} </span>
            </button>
          </div>
        </div>
      )}

      {curr == 3 && (
        <div className="mt-10 p-5 bg-white rounded-xl shadow-xl ring-1 ring-white">
          <h1 className="text-xl">Generate Your Cover Letter</h1>
          <p className="para">
            Our AI will analyze your resume and the job description to create a
            personalized cover letter.
          </p>

          <div className="mt-5 bg-slate-50 p-4 rounded-xl border-1 border-gray-100 ">
            <div className="flex gap-2 min-h-14 mb-2">
              <div className="rounded-full w-12 h-12 bg-gray-200 flex items-center justify-center">
                <img src={DocIcon} alt="Document" className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Resume</div>
                <div className="text-gray-500">{file.name}</div>
              </div>
            </div>
            <div className="h-[1px] bg-gray-200 mb-3"></div>
            <div className="flex gap-2 min-h-14">
              <div className="rounded-full w-12 h-12 bg-gray-200 flex items-center justify-center">
                <img src={DocIcon} alt="Document" className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Job Description</div>
                <div className="text-gray-500 line-clamp-1 max-w-[500px]">
                  {inputValue}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              className={`rounded-lg flex gap-2 p-2 px-4 cursor-pointer bg-black ${
                msg && "bg-gray-300"
              }`}
              onClick={handleGenerate}
            >
              {msg ? (
                <>
                  <span className="w-6 h-6 border-4 border-white border-t-gray-400 rounded-full animate-spin"></span>
                  <span className="text-white">{msg}</span>
                </>
              ) : (
                <span className="text-white">Generate Cover Letter</span>
              )}
            </button>
          </div>
        </div>
      )}

      {curr == 4 && (
        <div className="mt-10 p-5 bg-white rounded-xl shadow-xl ring-1 ring-white">
          <h1 className="text-xl">Edit & Download</h1>
          <p className="para">
            Review and edit your cover letter before downloading.
          </p>

          <div className="w-full bg-gray-200 rounded-lg flex">
            <div
              className={`w-1/2 text-center p-1 m-1 rounded-sm cursor-pointer ${
                state === "Edit" && "bg-white"
              }`}
              onClick={() => setState("Edit")}
            >
              Edit
            </div>
            <div
              className={`w-1/2 text-center p-1 m-1 rounded-sm cursor-pointer ${
                state === "Preview" && "bg-white"
              }`}
              onClick={() => setState("Preview")}
            >
              Preview
            </div>
          </div>

          {state === "Edit" && (
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="15"
                className="w-full border-1 border-gray-200 mt-5 rounded-lg p-2 font-mono text-md tracking-tight"
                onChange={handleCoverText}
              >
                {coverText}
              </textarea>
            </div>
          )}

          {state === "Preview" && (
            <div className="whitespace-pre-line leading-relaxed p-5 border-1 border-gray-300 rounded-xl mt-5 text-md">
              {coverText}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button
              className={`rounded-lg flex gap-2 p-2 px-4 cursor-pointer bg-black ${
                msg && "bg-gray-300"
              }`}
              onClick={handleDownload}
            >
              <span className="text-white">Download Cover Letter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cover;
