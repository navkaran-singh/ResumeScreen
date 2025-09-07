import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

import Navbar from "../components/Navbar";
import UploadImage from "../../public/images/upload-minimalistic-svgrepo-com.svg";
import TickImage from "../../public/images/check.png";
import RightArrowImage from "../../public/images/right-arrow-svgrepo-com.svg";
import ResumeInfo from "../components/ResumeInfo";
import { Link } from "react-router-dom";

const Upload = () => {
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [dataFromAxios, setDataFromAxios] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(false);
  const [extractedText, setExtractedText] = useState(null);

  const [optimal, setOptimal] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => console.log(extractedText), [extractedText]);

  const handleFileChange = async (e) => {
    setExtractedData(null);
    setError(null);
    setOptimal(null);

    const selectedFile = e.target.files[0];
    if (
      !selectedFile ||
      ![
        "application/pdf",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selectedFile.type)
    ) {
      setError("Invalid file format. Please upload a TXT, or DOCX file.");
      return;
    }

    setFileName(selectedFile.name);

    setUploading(true);
    setProgress(0);
    setResults(false);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    // In your handleFileChange function:
    try {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setMessage("Resume Uploaded Successfully");
        }
        setProgress(currentProgress);
      }, 200);

      const response = await axios.post(
        "http://localhost:5000/extract",
        formData
      );
      console.log(response.data); // EXTRACTED TEXT FROM
      setExtractedText(response.data.extractedText);
      setProcessing(true);
    } catch (error) {
      setError("Error uploading file. Try again.");
    }
  };

  const processResume = async (e) => {
    try {
      setUploading(true);
      const response = await axios.post("http://localhost:5000/process", {
        extractedText,
      });
      if (response.data.error) {
        setUploading(false);
        throw new Error(response.data.error);
      }

      console.log(response.data);
      setExtractedData(response.data.processedData);
      setFeedback(response.data.processedData.feedback);
      setOptimal(response.data.processedData.optimal);

      setUploading(false);
      setResults(true);
      setProcessing(false);
      setMessage("Processing Successful");
    } catch (error) {
      const errMsg = error?.message || "Error processing resume. Try again.";
      setError(errMsg);
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return (
    <div className="m-3 overflow-x-hidden overflow-y-hidden text-center">
      <Toaster richColors />
      <Navbar />
      <h1 className="gradient-heading mt-10 max-sm:text-xl max-md:text-2xl md:text-3xl tracking-tighter mb-5">
        Upload Your Resume
      </h1>
      <p className="para">
        Upload a resume in DOCX, or TXT format. Our AI will extract key
        information and analyze it.
      </p>

      <div className="flex gap-6 justify-center max-md:flex-col max-sm:items-center max-md:items-center">
        <div>
          <div className="mt-10 flex flex-col items-center bg-white border-2 border-dashed border-gray-300 rounded-lg max-w-96 p-10 px-20 shadow-md">
            <input
              type="file"
              accept=".txt,.docx"
              onChange={handleFileChange}
              id="file-upload"
              className="hidden"
            />

            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col justify-center items-center"
            >
              {progress == 0 && (
                <img src={UploadImage} alt="upload-icon" className="img" />
              )}

              {fileName ? (
                <p className="text-lg font-semibold tracking-tight">
                  {fileName}{" "}
                </p>
              ) : (
                <>
                  <p className="text-lg tracking-tight">
                    Drag & drop your resume
                  </p>
                  <span className="para">
                    or click to browse (TXT, DOC, DOCX)
                  </span>
                </>
              )}
              {progress > 0 && progress < 100 && (
                <div className="mt-2 w-full">
                  <div
                    className={`bg-green-500 p-1 rounded border-green-900 border-1`}
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="para text-sm">Uploading... {progress}%</span>
                </div>
              )}
              {progress >= 100 && (
                <div className="flex flex-row items-center gap-1">
                  <img src={TickImage} className="h-5 w-5" alt="tick" />

                  <div className="text-green-500 text-sm">Ready to process</div>
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-center max-w-96">
            <button
              onClick={processResume}
              className="mt-4 w-full bg-blue-400 text-white font-medium py-2 rounded-lg hover:bg-blue-500 transition disabled:bg-blue-200"
              disabled={!fileName || uploading || !processing}
            >
              {uploading ? "Processing..." : "Process Resume"}
            </button>
          </div>
          {optimal && (
            <div className="mt-10 max-w-96">
              <p>
                Your resume is{" "}
                <span className="gradient-heading">{optimal}%</span> optimized!
              </p>
              <h1 className="inline-flex text-3xl mt-5 mb-5 text-blue-700">
                Smart Suggestions -{" "}
              </h1>
              <p className="max-w-96 flex justify-center text-blue-400">
                {feedback}
              </p>
            </div>
          )}
          <div className="flex justify-center">
            <Link
              to={"/results"}
              className={`mt-5 flex flex-row gap-2 border-1 border-gray-200 p-2 py-3 text-md rounded-xl items-center hover:bg-gray-100 ${
                results ? "block" : "hidden"
              }`}
            >
              View Results
              <img
                className="img"
                src={RightArrowImage}
                alt="RightArrowImage"
              />
            </Link>
          </div>
        </div>
        <div className="mt-10 max-w-96 bg-white rounded-xl ring-1 ring-slate-900/5 border-1 border-gray-200">
          {extractedData ? (
            <ResumeInfo data={extractedData} />
          ) : (
            <>
              <p className="gradient-heading sm:mb-5 mt-2">
                Information will appear here
              </p>
              <p className="para">
                {" "}
                Upload and process a resume to see extracted information
              </p>
            </>
          )}
        </div>
      </div>
      {error && <div className="mt-10 text-red-400">{error}</div>}
    </div>
  );
};

export default Upload;
