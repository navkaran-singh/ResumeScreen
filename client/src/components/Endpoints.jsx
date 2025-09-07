import React from "react";

const Endpoints = () => {
  return (
    <>
      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl tracking-tight font-bold">Upload Resume</h1>
            <p className="para text-gray-500">/api/resume/upload</p>
          </div>
          <button className="bg-gray-50 h-[40px] p-2 rounded-xl text-md font-medium">
            POST
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="para">
            Upload a resume file for processing. Supports PDF, DOCX, and TXT
            formats.
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Request Body</h2>
          <div className="bg-gray-50 p-4 rounded-md mt-2 font-mono text-sm">
            <pre className="max-sm:overflow-x-scroll">
              {`{
  "file": <binary data>,
  "filename": "resume.pdf",
  "job_description": "Optional job description for matching"
}`}
            </pre>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Response</h2>
          <div className="bg-gray-50 p-4 rounded-md mt-2 font-mono text-sm">
            <pre className="max-sm:overflow-x-scroll">
              {`{
  "resume_id": "res_123456",
  "status": "processing"
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl tracking-tight font-bold">
              Get Resume Analysis
            </h1>
            <p className="para text-gray-500">{"api/resumes/{resume_id}"}</p>
          </div>
          <button className="bg-gray-50 h-[40px] p-2 rounded-xl text-md font-medium">
            GET
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="para">
            Retrieve the analysis results for a processed resume.
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Parameters</h2>
          <div className="bg-gray-50 rounded-xl p-2">
            <pre className="text-sm">
              resume_id: The ID of the resume to retrieve
            </pre>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Response</h2>
          <div className="bg-gray-50 p-4 rounded-md mt-2 font-mono text-sm">
            <pre className="max-sm:overflow-x-scroll max-h-[300px] overflow-y-scroll">
              {`{
  resume_id: "res_123456",
  status: "completed",
  candidate: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890"
  },
  skills: [
    { name: "JavaScript", level: "Expert", years: 5 },
    { name: "React", level: "Advanced", years: 3 },
    { name: "Node.js", level: "Intermediate", years: 2 }
  ],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      duration: "2020 - Present",
      description: "Developed and maintained React applications"
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations",
      duration: "2018 - 2020",
      description: "Built responsive web applications"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2018"
    }
  ],
  ai_score: 92,
  ranking: 1
};`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl tracking-tight font-bold">
              Compare Candidates
            </h1>
            <p className="para text-gray-500">api/candidates/compare</p>
          </div>
          <button className="bg-gray-50 h-[40px] p-2 rounded-xl text-md font-medium">
            POST
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="para">
            Compare multiple candidates based on their resume analysis and job
            requirements.
          </p>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Request Body</h2>
          <div className="bg-gray-50 p-4 rounded-md mt-2 font-mono text-sm">
            <pre className="max-sm:overflow-x-scroll">
              {`{
  "resume_ids": ["res_123456", "res_789012", "res_345678"],
  "job_description": "Required job description for matching",
  "required_skills": ["JavaScript", "React", "Node.js"]
}`}
            </pre>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold">Response</h2>
          <div className="bg-gray-50 p-4 rounded-md mt-2 font-mono text-sm">
            <pre className="max-sm:overflow-x-scroll">
              {`{
  "candidates": [
      {
          "resume_id": "res_123456",
          "name": "John Doe",
          "ai_score": 92,
          "ranking": 1,
          "skill_match": 0.95
      },
      // Additional candidates...
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Endpoints;
