import React, { useState, useEffect } from "react";

const Examples = () => {
  const lang = ["JavaScript", "Python", "cURL"];
  const [currentLang, setCurrentLang] = useState("JavaScript");
  return (
    <>
      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <h1 className="text-2xl tracking-tight font-bold">
          <span className="font-normal">{">_"} </span>Example Request
        </h1>
        <p className="para mb-3">Example of uploading and analyzing a resume</p>

        <div className="p-3 px-5 bg-gray-100 rounded-xl">
          <pre className="text-sm overflow-x-scroll max-md:text-sm max-sm:text-xs">
            {`curl -X POST https://api.airesumerank.com/v1/analyze \\`} <br />
            &nbsp;&nbsp;{`-H "Authorization: Bearer YOUR_API_KEY" \\`} <br />
            &nbsp;&nbsp;{`-F "resume=@resume.pdf" \\`} <br />
            &nbsp;&nbsp;
            {`-F "options={\\"skills\\":true,\\"experience\\":true,\\"ranking\\":true}"`}
          </pre>
        </div>
      </div>

      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <h1 className="text-2xl tracking-tight font-semibold">
          Example Response
        </h1>
        <p className="para mb-3">JSON response from analyzing a resume</p>

        <div className="p-3 px-5 bg-gray-100 rounded-xl max-h-[400px] overflow-y-scroll">
          <pre className="text-sm max-md:text-sm max-sm:text-xs">
            {JSON.stringify(
              {
                id: "res_abc123",
                analysis: {
                  skills: [
                    { name: "JavaScript", confidence: 0.98 },
                    { name: "React", confidence: 0.95 },
                    { name: "Node.js", confidence: 0.92 },
                  ],
                  experience: [
                    {
                      role: "Senior Frontend Developer",
                      company: "Tech Co",
                      duration: "3 years",
                      skills: ["JavaScript", "React", "TypeScript"],
                    },
                  ],
                  ai_score: 87,
                  ranking_position: 3,
                },
              },
              null,
              2 // Ensures proper indentation
            )}
          </pre>
        </div>
      </div>

      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <h1 className="text-2xl tracking-tight font-semibold">Code Samples</h1>
        <p className="para mb-3">
          Implementation examples in popular languages
        </p>

        <div className="rounded-lg mb-5 p-2 inline-flex gap-2 bg-gray-100">
          {lang.map((l) => (
            <p
              onClick={() => setCurrentLang(l)}
              className={`para px-2 py-1 text-sm font-semibold cursor-pointer ${
                currentLang === l
                  ? "bg-white text-gray rounded-md text-black"
                  : ""
              }`}
            >
              {l}
            </p>
          ))}
        </div>
        <div className="p-3 px-5 bg-gray-100 rounded-xl">
          {currentLang === "JavaScript" && (
            <pre className="text-sm max-md:text-sm max-sm:text-xs max-md:overflow-x-scroll">
              {`const form = new FormData();
form.append('resume', resumeFile);
form.append('options', JSON.stringify({ skills: true, experience: true }));

fetch('https://api.airesumerank.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: form
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
            </pre>
          )}
          {currentLang === "Python" && (
            <pre className="text-sm max-md:text-sm max-sm:text-xs max-md:overflow-x-scroll">
              {`import requests
import json

url = "https://api.airesumerank.com/v1/analyze"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

files = {
    'resume': open('resume.pdf', 'rb')
}

data = {
    'options': json.dumps({
        'skills': True,
        'experience': True
    })
}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())`}
            </pre>
          )}
          {currentLang === "cURL" && (
            <pre className="text-sm max-md:text-sm max-sm:text-xs overflow-x-scroll">
              {`const form = new FormData();
form.append('resume', resumeFile);
form.append('options', JSON.stringify({ skills: true, experience: true }));

fetch('https://api.airesumerank.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: form
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
            </pre>
          )}
        </div>
      </div>
    </>
  );
};

export default Examples;
