// 1) File Existence Check: Ensure the PDF file exists.
// 2) File Reading: Read the PDF file into memory.
// 3) PDF Parsing: Use PdfReader to parse the PDF's content asynchronously.
// 4) Text Extraction: Collect text content while handling line breaks based on Y-coordinates.
// 5) Return Text: Return the extracted text as a string once parsing is complete.
// import fs from "fs";
import fs from "fs/promises";
import { PdfReader } from "pdfreader";
import mammoth from "mammoth";
import { parsePdf, extractPlainText } from "easy-pdf-parser";

//  doesn't work
export async function extractTextFromPDF(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const dataBuffer = fs.readFileSync(filePath);

  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    let textContent = "";
    let lastY = null;

    reader.parseFileItems(dataBuffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        // End of file, resolve with the collected text
        console.log("Text content is: " + textContent);
        resolve(textContent);
      } else if (item.text) {
        // Add a newline when Y position changes (new line in PDF)
        if (lastY !== null && lastY !== item.y) {
          textContent += "\n";
        }

        textContent += item.text;
        lastY = item.y;
      }
    });
  });
}

export async function extractTextFromTXT(filePath) {
  // Read the file with 'utf8' encoding to get the text directly as a string.
  // This is a simple, built-in Node.js feature. No external libraries needed.
  const textContent = await fs.readFile(filePath, "utf8");
  return textContent;
}

export async function extractTextFromDOCX(filePath) {
  // won't work with fs/promises module
  // if (!fs.existsSync(filePath)) {
  //   throw new Error(`File not found: ${filePath}`);
  // }

  const dataBuffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });

  return result.value;
}

// export async function testWithPdfParse() {
//   try {
//     // 2. Build a reliable, absolute path from the current file's directory
//     //    '..' means "go up one directory level"
//     const filePath = path.join(
//       __dirname,
//       "..",
//       "test",
//       "data",
//       "05-versions-space.pdf"
//     );

//     // Make sure to adjust the path relative to where THIS script file is located.
//     // For example, if your script is in an 'src' folder, you might need '..' to go up to the project root first.

//     console.log(`Attempting to read file from: ${filePath}`); // Debugging line

//     if (!fs.existsSync(filePath)) {
//       console.error("File does not exist at the constructed path!");
//       return;
//     }

//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdf(dataBuffer);
//     console.log(
//       "Success! Content from pdf-parse:",
//       data.text.substring(0, 500)
//     );
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }
