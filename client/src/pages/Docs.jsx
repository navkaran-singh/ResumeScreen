import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Overview from "../components/Overview";
import Authentication from "../components/Authentication";
import Examples from "../components/Examples";
import Endpoints from "../components/Endpoints";

const Docs = () => {
  const topics = ["Overview", "Authentication", "Endpoints", "Examples"];
  const [currentTopic, setCurrentTopic] = useState("Overview");

  return (
    <div className="m-5 mx-32 max-sm:mx-5 overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div className="mt-10 gap-5 flex flex-col justify-center items-center mb-10">
        <h1 className="text-4xl tracking-tight font-bold text-center">
          API Documentation
        </h1>
        <p className="para text-lg text-center">
          Integrate our AI resume analysis directly into your applications
        </p>
      </div>
      <div className="max-sm:overflow-x-scroll flex py-2 px-3 flex-start gap-3 w-full bg-gray-100 rounded-lg">
        {topics.map((topic) => (
          <p
            className={`para px-2 py-1 text-sm font-semibold cursor-pointer ${
              currentTopic === topic
                ? "bg-white text-gray rounded-lg text-black"
                : ""
            }`}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic}
          </p>
        ))}
      </div>
      {currentTopic === "Overview" && <Overview />}
      {currentTopic === "Authentication" && <Authentication />}
      {currentTopic === "Examples" && <Examples />}
      {currentTopic === "Endpoints" && <Endpoints />}
    </div>
  );
};

export default Docs;
