import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import EyeIcon from "../../public/images/eye.svg";
import AddIcon from "../../public/images/add.svg";
import ChartIcon from "../../public/images/chart.svg";
import LocationIcon from "../../public/images/location.svg";
import WorkIcon from "../../public/images/work.svg";
import ExpIcon from "../../public/images/exp.svg";
import DegreeIcon from "../../public/images/degree.svg";
import SearchIcon from "../../public/images/search-svgrepo-com.svg";

const Compare = () => {
  const [values, setValues] = useState([
    {
      name: "Alex Johnson",
      experience: 5,
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL"],
      aiScore: 93,
      details: "5 years of professional experience in related fields.",
      id: 69,
    },
    {
      name: "John Lennon",
      experience: 5,
      skills: ["JavaScript", "Node.js", "TypeScript", "GraphQL"],
      aiScore: 62,
      details: "5 years of professional experience in related fields.",
      id: 60,
    },
    {
      name: "George Harrison",
      experience: 5,
      skills: ["JavaScript", "Node.js"],
      aiScore: 50,
      details: "5 years of professional experience in related fields.",
      id: 10,
    },
  ]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [curr, setCurr] = useState("Cards");
  const colCount = Math.min(selectedCandidates.length, 4);
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[colCount];

  useEffect(() => {
    console.log(selectedIndices);
  }, [selectedIndices]);
  useEffect(() => {
    console.log(selectedCandidates);
  }, [selectedCandidates]);
  useEffect(() => {
    console.log(selectedIndices);
  }, [selectedIndices]);
  useEffect(() => {
    values.sort((a, b) => b.aiScore - a.aiScore);
    console.log(values);
  }, [values]);

  useEffect(() => {
    const fncn = async () => {
      const response = await axios.get("http://localhost:5000/fetch");
      let arr = response.data.data;
      arr = arr.slice(0, arr.length); // by default, extra array was being added at the end .. so removed it
      console.log(arr);
      // Add only those whose 'id' is not already in 'values'
      setValues((v) => {
        const existingIds = new Set(v.map((item) => item.id));
        const newCandidates = arr.filter((item) => !existingIds.has(item.id));
        return [...v, ...newCandidates];
      });
    };
    fncn();
  }, []);

  return (
    <div className="m-5 overflow-x-hidden overflow-y-hidden ">
      <Navbar />
      <div className="flex mt-10 justify-between">
        <div className="flex-2 max-md:flex-1">
          <h1 className="max-sm:text-3xl max-md:text-4xl md:text-5xl tracking-tighter mb-2">
            Resume Comparison
          </h1>
          <p className="para max-w-3/4 mb-5">
            Compare resumes side by side, uncover key strengths, and find areas
            to improve—so you can stand out.
          </p>
        </div>
        <div className="flex flex-1 gap-2 justify-end">
          <div
            className={`${
              curr == "Cards"
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "hover:bg-gray-100"
            } flex rounded-lg gap-2 max-md:px-1 cursor-pointer border-b-1 border-gray-200 max-h-12 items-center px-3 text-sm`}
            onClick={() => setCurr("Cards")}
          >
            <img
              src={EyeIcon}
              alt="eyeIcon"
              className={`h-5 w-5 ${curr == "Cards" && " filter invert"}`}
            />
            <span>Cards</span>
          </div>
          <div
            className={`${
              curr == "Table"
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "hover:bg-gray-100"
            } flex rounded-lg gap-2 max-md:px-1 cursor-pointer border-1 border-gray-200 max-h-12 items-center px-3 text-sm`}
            onClick={() => setCurr("Table")}
          >
            <img
              src={AddIcon}
              alt="AddIcon"
              className={`h-5 w-5 ${curr == "Table" && " filter invert"}`}
            />
            {/* table */}
            <span>Table</span>
          </div>
        </div>
      </div>

      <div className="flex gap-5 max-md:flex-col">
        <div className="md:max-w-64 max-h-[500px] overflow-x-auto bg-white rounded-lg border-1 border-gray-200 p-5 max-md:w-full">
          <h1 className="text-xl mb-5 font-semibold">Select Candidates</h1>
          <div className="flex mb-5 gap-2 p-3 max-h-9 border-1 border-gray-300 items-center rounded-xl focus-within:border-gray-500 line-clamp-1">
            <img src={SearchIcon} alt="SearchIcon" className="w-5 h-5" />
            <input
              type="text"
              id="candidate"
              placeholder="Search Candidates"
              className="outline-none"
            />
          </div>
          <div className="">
            {values.map((value, idx) => {
              return (
                <div
                  className={`rounded-xl p-4 border border-gray-200 mb-2 ${
                    selectedIndices.includes(idx) &&
                    "bg-blue-50 border-b border-gray-300 border-1lue-200"
                  }`}
                >
                  {/* Top row with name and score */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-lg">{value.name}</p>
                    <p
                      className={`rounded-full px-2 py-1 text-sm ${
                        (value.aiScore > 80 && "bg-green-100 text-green-500") ||
                        (value.aiScore > 60 && "bg-amber-100 text-amber-500") ||
                        "bg-red-50 text-red-400"
                      }`}
                    >
                      {value.aiScore}%
                    </p>
                  </div>

                  {/* Skills section */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {value?.skills?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 rounded-full bg-blue-100 border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {value.skills?.length > 3 && (
                        <span className="text-sm px-3 py-1 rounded-full bg-blue-100 border border-gray-200">
                          +{value.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Button section - right aligned */}
                  <div className="flex justify-end">
                    <button
                      className={`bg-gray-50 px-4 py-1 rounded-xl border border-gray-200 ${
                        selectedIndices.includes(idx) &&
                        "border-none text-gray-300"
                      }`}
                      onClick={() => {
                        if (!selectedIndices.includes(idx)) {
                          setSelectedIndices([...selectedIndices, idx]);
                          setSelectedCandidates([...selectedCandidates, value]);
                        }
                      }}
                    >
                      {selectedIndices.includes(idx) ? (
                        <>Selected</>
                      ) : (
                        <>Select</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!selectedIndices.length > 0 && (
          <div className="rounded-lg w-full bg-white border-1 flex flex-col border-gray-200 items-center justify-center p-5">
            <div className="w-16 h-16 rounded-full bg-blue-300 flex items-center justify-center">
              <img
                src={AddIcon}
                alt=""
                className="h-10 w-10 invert hue-rotate-180"
              />
            </div>
            <h1 className="font-semibold text-xl mb-3">
              No Candidates Selected
            </h1>
            <p className="para text-center">
              Select up to 4 candidates from the list to compare their resumes
              side by side.
            </p>
          </div>
        )}

        {selectedCandidates.length > 0 && curr == "Cards" && (
          <div
            className={`rounded-lg w-full bg-white border border-gray-200 p-5 grid gap-4 ${colClass}`}
          >
            {selectedCandidates.map((candidate, index) => (
              <div
                key={index}
                className="gap-3 border border-gray-200 w-full p-3 rounded"
              >
                <div className="flex justify-between">
                  <p className="font-bold">{candidate.name}</p>
                  <p
                    className={`rounded-full px-2 py-1 text-sm ${
                      (candidate.aiScore > 80 &&
                        "bg-green-100 text-green-500") ||
                      (candidate.aiScore > 60 &&
                        "bg-amber-100 text-amber-500") ||
                      "bg-red-50 text-red-400"
                    }`}
                  >
                    {candidate.aiScore}%
                  </p>
                </div>

                <p className="mt-2 font-bold">Profile</p>
                <ul>
                  <li className="flex gap-1">
                    <img
                      src={LocationIcon}
                      alt="LocationIcon"
                      className="h-5 w-5"
                    />
                    <p>{candidate?.location}</p>
                  </li>
                  <li className="flex gap-1">
                    <img
                      src={DegreeIcon}
                      alt="DegreeIcon"
                      className="h-5 w-5"
                    />
                    <p>{candidate?.degree}</p>
                  </li>
                  <li className="flex gap-1">
                    <img src={WorkIcon} alt="WorkIcon" className="h-5 w-5" />
                    <p>{candidate?.position}</p>
                  </li>
                  <li className="flex gap-1">
                    <img src={ExpIcon} alt="ExpIcon" className="h-5 w-5" />
                    <p>{candidate?.experience}</p>
                  </li>
                </ul>

                <p className="mt-2 font-bold">Skills</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {candidate?.skills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 rounded-full bg-blue-100 border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="mt-2 font-bold">Strengths</p>
                <ul>
                  <li className="flex gap-1 items-center">
                    <p className="bg-gray-100 rounded-sm h-2 w-full">
                      <span
                        className="bg-green-500 rounded-sm h-2 block"
                        style={{ width: candidate?.technical + "%" }}
                      ></span>
                    </p>
                    <p>Technical</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    <p className="bg-gray-100 rounded-sm h-2 w-full">
                      <span
                        className="bg-blue-500 rounded-sm h-2 block"
                        style={{ width: candidate?.leadership + "%" }}
                      ></span>
                    </p>
                    <p>Leadership</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    <p className="bg-gray-100 rounded-sm h-2 w-full">
                      <span
                        className="bg-purple-500 rounded-sm h-2 block"
                        style={{ width: candidate?.teamwork + "%" }}
                      ></span>
                    </p>
                    <p>Teamwork</p>
                  </li>
                  <li className="flex gap-1 items-center">
                    <p className="bg-gray-100 rounded-sm h-2 w-full">
                      <span
                        className="bg-yellow-500 rounded-sm h-2 block"
                        style={{ width: candidate?.communication + "%" }}
                      ></span>
                    </p>
                    <p>Communication</p>
                  </li>
                </ul>

                <p className="mt-2 font-bold">Job Match Analysis</p>
                <div className="mt-2 px-1 border-gray-200 border-1 rounded-lg">
                  <p className="text-gray-400">{candidate.details}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCandidates.length > 0 && curr === "Table" && (
          <div className="w-full border-1 rounded-xl border-gray-100 overflow-x-auto">
            <table className="w-full table-fixed border-collapse bg-white rounded-lg shadow-sm text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-2 sm:p-4 font-medium text-gray-500 break-words w-[120px]">
                    Attribute
                  </th>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <th
                      key={i}
                      className="text-left p-2 sm:p-4 font-medium text-gray-500 break-words w-[120px]"
                    >
                      {candidate.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-300 border-b-1">
                  <td className="p-2 sm:p-4 text-gray-700">Experience</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td
                      key={i}
                      className="p-2 sm:p-4 text-gray-700 break-words"
                    >
                      {candidate.experience} years
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-300 border-b-1">
                  <td className="p-2 sm:p-4 text-gray-700">Education</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td
                      key={i}
                      className="p-2 sm:p-4 text-gray-700 break-words"
                    >
                      {candidate.degree}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-300 border-b-1">
                  <td className="p-2 sm:p-4 text-gray-700">Location</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td
                      key={i}
                      className="p-2 sm:p-4 text-gray-700 break-words"
                    >
                      {candidate.location}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-300 border-b-1">
                  <td className="p-2 sm:p-4 text-gray-700">Last Position</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td
                      key={i}
                      className="p-2 sm:p-4 text-gray-700 break-words"
                    >
                      {candidate.position}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-300 border-b-1">
                  <td className="p-2 sm:p-4 text-gray-700">AI Score</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td key={i} className="p-2 sm:p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-center min-w-16 text-xs sm:text-sm ${
                          candidate.aiScore > 80
                            ? "bg-green-100 text-green-600"
                            : candidate.aiScore > 70
                            ? "bg-amber-100 text-amber-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {candidate.aiScore}%
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-2 sm:p-4 align-top text-gray-700">Skills</td>
                  {selectedCandidates.slice(0, 4).map((candidate, i) => (
                    <td key={i} className="p-2 sm:p-4">
                      <div className="flex flex-col gap-1 break-words">
                        {candidate?.skills.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs sm:text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-600 w-fit"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
