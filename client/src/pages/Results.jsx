import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import SkillGraph from "../components/SkillGraph";
import SearchIcon from "../../public/images/search-svgrepo-com.svg";
import DownloadIcon from "../../public/images/download-minimalistic-svgrepo-com.svg";
import AddIcon from "../../public/images/plus-svgrepo-com.svg";
import TableIcon from "../../public/images/table-svgrepo-com.svg";
import NetworkIcon from "../../public/images/network-alt-svgrepo-com.svg";
import upIcon from "../../public/images/up-chevron-svgrepo-com.svg";
import downIcon from "../../public/images/down-arrow-5-svgrepo-com.svg";
import UserIcon from "../../public/images/user5.png";
import LoadingSpinner from "../components/LoadingSpinner";

const Results = () => {
  const filter = ["Javascript", "React", "Python", "Java"];
  const [view, setView] = useState("table");
  const [sort, setSort] = useState("ranking");
  const [order, setOrder] = useState(true); // true means ascending order

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
      name: "John Smilga",
      experience: 5,
      skills: ["JavaScript", "Node.js", "TypeScript", "GraphQL"],
      aiScore: 49,
      details: "5 years of professional experience in related fields.",
      id: 60,
    },
  ]);

  const [expandedRow, setExpandedRow] = useState(null);
  const [filterMessage, setFilterMessage] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState(values);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);

  useEffect(() => {
    setCandidates(values);
  }, [values]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/resumes");
        console.log(response.data.resultData);
        const fetchedData = response.data.resultData; // Extract resumes

        setValues((prevValues) => {
          const existingEmails = new Set(prevValues.map((p) => p.email)); // Store existing emails

          if (!fetchedData) return prevValues;

          // Filter out duplicates before merging
          const newData = fetchedData
            .filter((item) => !existingEmails.has(item.email))
            .map((item, index) => ({
              ...item,
              id: prevValues.length + index + 1, // Generate unique ID
              ranking: prevValues.length + index + 1,
            }));

          return [...prevValues, ...newData]; // Merge only new data
        });
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow == index ? null : index);
  };

  const handleSort = (column) => {
    setOrder(sort == column ? !order : order);
    setSort(column);
  };

  const sortedCandidates = candidates.sort((a, b) => {
    if (sort == "name") {
      return order
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sort == "experience") {
      return order
        ? parseInt(a.experience) - parseInt(b.experience)
        : parseInt(b.experience) - parseInt(a.experience);
    }
    return order ? a[sort] - b[sort] : b[sort] - a[sort];
  });

  useEffect(() => setCandidates(sortedCandidates), [sortedCandidates]);
  useEffect(() => console.log(filterMessage), [filterMessage]);
  useEffect(() => console.log(currentSkill), [currentSkill]);
  useEffect(() => {
    candidates.sort((a, b) => b.aiScore - a.aiScore);
    let ranking = 1;
    candidates[0].ranking = 1;

    for (let i = 1; i < candidates.length; i++) {
      candidates[i].ranking = ++ranking;
    }
  }, [values]);

  const handleFilter = (e, filter) => {
    if (!filter && e.target.value === "") {
      setCandidates(values);
      setFilterMessage(null);
      return;
    }

    if (filter) {
      let { skill } = filter;
      if (currentSkill !== skill) setCurrentSkill(skill);
      else {
        setCandidates(values);
        setFilterMessage(null);
        setCurrentSkill(null);
        return;
      }
      console.log(skill);
      const filteredCandidates = values.filter((val) => {
        skill = skill.toLowerCase();
        let skills = String(val.skills).toLowerCase();
        return skills.includes(skill);
      });
      if (filteredCandidates.length == 0) {
        setFilterMessage(`No candidates found matching ${skill}`);
        return;
      }
      setCandidates(filteredCandidates);
      setFilterMessage(null);
      return;
    }

    const filteredCandidates = values.filter((val) => {
      let name = String(val.name).toLowerCase();
      let skill = String(val.skills).toLowerCase();
      let input = e.target.value.toLowerCase();
      return name.includes(input) || skill.includes(input);
    });

    if (filteredCandidates.length == 0) {
      setFilterMessage(`No candidates found matching ${e.target.value}`);
      return;
    }

    setCandidates(filteredCandidates);
    setFilterMessage(null);
  };

  return (
    <div className="m-5 overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div className="flex justify-between mt-14 max-md:flex-col max-md:gap-5">
        <div className="">
          <h1 className="max-sm:text-3xl max-md:text-4xl md:text-5xl tracking-tighter gradient-heading">
            Candidate Results
          </h1>
          <p className="para mt-5">
            View and analyze candidate rankings based on AI-driven insights.
          </p>
        </div>
        <div className="flex gap-2 items-center max-md:ml-1">
          <div className="p-2 rounded-lg border-1 border-gray-300 cursor-pointer hover:ring-1 hover:ring-purple-100">
            <img src={DownloadIcon} alt="DownloadIcon" className="w-5 h-5" />
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-3 mt-10">
        {filter.map((skill) => (
          <li
            onClick={() => handleFilter(null, { skill })}
            className={`text-sm cursor-pointer text-white bg-blue-300 rounded-xl  px-2 font-semibold hover:bg-blue-500 ${
              currentSkill === skill && "bg-blue-500"
            }`}
          >
            {skill}
          </li>
        ))}
        <li className="flex items-center gap-1 text-sm cursor-pointer border-1 border-gray-200 rounded-xl px-2 tracking-tight font-semibold">
          <img src={AddIcon} alt="PlusIcon" className="w-2 h-2" />
          <span>Add Filter</span>
        </li>
      </ul>

      <div className="bg-gray-100 rounded-xl flex flex-row justify-between py-1 mt-5 px-1 max-w-[280px]">
        <button
          className={`flex gap-1 items-center rounded-md px-3 py-1 cursor-pointer font-semibold text-[15px] ${
            view === "table" ? "bg-white" : "para"
          }`}
          onClick={() => setView("table")}
        >
          <img className="w-4 h-4" src={TableIcon} alt="TableIcon" />
          <span>Table View</span>
        </button>
        <button
          className={`flex gap-1 items-center rounded-md px-3 py-1 cursor-pointer font-semibold text-[15px] ${
            view === "network" ? "bg-white" : "para"
          }`}
          onClick={() => {
            setView("network");
            setCurrentSkill(null);
            setCandidates(values);
          }}
        >
          <img className="w-4 h-4" src={NetworkIcon} alt="NetworkIcon" />
          <span>Network View</span>
        </button>
      </div>
      {loading && (
        <div className="w-full justify-center items-center mt-32 gap-2 flex flex-col">
          <LoadingSpinner text={"Loading Candidates ..."} />
        </div>
      )}
      {!loading && (
        <>
          {view === "table" && (
            <div className="mt-5">
              <div className="flex justify-between max-sm:flex-col max-sm:gap-3 items-center">
                <div className="flex gap-2 p-3 max-h-9 border-2 border-gray-300 items-center rounded-xl focus-within:border-blue-500 focus-within:border-2 max-sm:w-full">
                  <img src={SearchIcon} alt="SearchIcon" className="w-5 h-5" />
                  <input
                    type="text"
                    id="candidate"
                    placeholder="Search Candidate or skills..."
                    className="outline-none min-w-56 w-full"
                    onChange={handleFilter}
                  />
                </div>
                {/* <p className="para">
                  Showing {candidates.length} of {values.length} candidates
                </p> */}
                <p className="para">✨Smart Sorting By Top Skills</p>
              </div>
              <div className="overflow-x-auto mt-5 rounded-2xl border border-gray-200">
                <table className="w-full min-w-[600px] border-spacing-y-4 rounded-2xl">
                  <thead className="bg-gray-100 h-16">
                    <tr className="text-left text-sm md:text-base bg-gray-50">
                      <th className="w-6"></th>
                      <th onClick={() => handleSort("name")} className="p-3 th">
                        Name
                      </th>
                      <th
                        onClick={() => handleSort("experience")}
                        className="p-3 th  sm:table-cell"
                      >
                        Experience
                      </th>
                      <th
                        onClick={() => handleSort("skills")}
                        className="p-3 text-gray-500"
                      >
                        Skills
                      </th>
                      <th
                        onClick={() => handleSort("aiScore")}
                        className="p-3 th  md:table-cell"
                      >
                        AI Score
                      </th>
                      <th
                        onClick={() => handleSort("ranking")}
                        className="p-3 th"
                      >
                        Ranking
                      </th>
                    </tr>
                  </thead>
                  {filterMessage && (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center p-3">
                          {filterMessage}
                        </td>
                      </tr>
                    </tbody>
                  )}
                  {!filterMessage && (
                    <tbody className="divide-y divide-gray-200">
                      {candidates.map((val, idx) => (
                        <React.Fragment key={idx}>
                          {/* Main Row */}
                          <tr
                            className={`cursor-pointer h-16 text-sm md:text-base ${
                              expandedRow === idx ? "bg-gray-50" : ""
                            } hover:bg-gray-100`}
                            onClick={() => toggleRow(idx)}
                          >
                            <td className="w-6 pb-3 pt-3">
                              <img
                                src={upIcon}
                                className="w-4 h-4"
                                alt="Expand"
                              />
                            </td>
                            <td className="pl-3 flex pt-5 gap-2">
                              <img
                                src={UserIcon}
                                alt="UserIcon"
                                className="w-5 h-5"
                              />
                              {val.name}
                            </td>
                            <td className="p-3  sm:table-cell">
                              {val.experience} years
                            </td>
                            <td className="p-3">
                              <ul className="flex flex-wrap gap-1">
                                {val.skills
                                  .slice(0, 2)
                                  .map((skill, skillIdx) => (
                                    <li
                                      key={skillIdx}
                                      className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-lg"
                                    >
                                      {skill}
                                    </li>
                                  ))}
                                {val.skills.length > 2 && (
                                  <li className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-lg">
                                    +{val.skills.length - 2}
                                  </li>
                                )}
                              </ul>
                            </td>
                            <td className="p-3  md:table-cell">
                              <div className="flex items-center gap-2">
                                <div className="bg-slate-200 h-2 rounded-lg w-16">
                                  <div
                                    className="bg-[#0897b4] h-2 rounded-lg"
                                    style={{ width: `${val.aiScore}%` }}
                                  ></div>
                                </div>
                                {val.aiScore}
                              </div>
                            </td>
                            <td className="p-3 text-center pr-4">
                              #{val.ranking}
                            </td>
                          </tr>

                          {/* Expanded Row */}
                          {expandedRow === idx && (
                            <tr className="bg-gray-50">
                              <td colSpan="6" className="p-3">
                                <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
                                  <div>
                                    <h3 className="font-semibold">
                                      All Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {val.skills.map((skill, skillIdx) => (
                                        <span
                                          key={skillIdx}
                                          className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-md"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                                    <h3 className="font-semibold text-sm sm:text-base">
                                      Experience Details
                                      <p className="text-gray-600">
                                        {val.details}
                                      </p>
                                    </h3>
                                    <h3 className="font-semibold text-sm sm:text-base">
                                      AI Assessment
                                      <p className="text-gray-600">
                                        AI Score: {val.aiScore} - Ranked #
                                        {val.ranking} overall
                                      </p>
                                    </h3>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {view === "network" && (
        <div className="mt-5">
          <SkillGraph mockCandidates={candidates} />
        </div>
      )}
    </div>
  );
};

export default Results;
