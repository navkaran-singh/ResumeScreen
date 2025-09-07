import React from "react";

import TickImage from "../../public/images/check.png";

const ResumeInfo = ({ data }) => {
  const { name, experience, education, skills } = data;
  console.log(data);
  return (
    <div className="w-full py-2 px-10">
      <div className="flex flex-row items-center gap-1 mb-3">
        <img src={TickImage} className="h-6 w-6" alt="tick" />
        <div className="text-green-500 text-lg tracking-tight font-semibold">
          Extracted Information
        </div>
      </div>
      {<p className="gradient-heading text-lg">{name}</p>}
      {skills && <p className="text-start font-semibold">Top Skills</p>}
      <div className="grid max-md:grid-rows-1 grid-cols-3 gap-2 mb-4">
        {skills &&
          skills.map((skill) => (
            <span className="bg-blue-50 rounded-xl py-1 px-3 font-semibold text-gray-500 text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {skill}
            </span>
          ))}
      </div>
      {experience && <p className="text-start font-semibold">Experience</p>}
      <div className="mb-3">
        {experience &&
          experience.map((exp) => (
            <li className="text-gray-600 text-start">{exp}</li>
          ))}
      </div>
      {education && <p className="text-start font-semibold">Education</p>}
      <div>
        {education &&
          education.map((edu) => (
            <p className="text-gray-600 text-start">{edu}</p>
          ))}
      </div>
    </div>
  );
};

export default ResumeInfo;
