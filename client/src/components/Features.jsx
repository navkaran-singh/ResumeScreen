import React from "react";

import Card from "./Card";

const Features = () => {
  const data = [
    {
      img: "../../public/images/code.png",
      id: 1,
      heading: "AI Skill Extraction",
      para: "Automatically extracts key skills, experience, and qualifications from resumes with advanced NLP.",
    },
    {
      img: "../../public/images/code.png",
      id: 2,
      heading: "Smart Ranking",
      para: "Ranks candidates using a graph-based algorithm that understands skill relationships and context.",
    },
    {
      img: "../../public/images/code.png",
      id: 3,
      heading: "Advanced Search & Filters",
      para: "Powerful search capabilities to find the right candidates based on specific criteria and requirements.",
    },
    {
      img: "../../public/images/code.png",
      id: 4,
      heading: "Public API Access",
      para: "Integrate our AI resume screening capabilities directly into your existing recruitment workflow.",
    },
  ];
  return (
    <div className="text-center mt-10 mb-20 max-sm:mb-10">
      <h1 className="max-sm:text-3xl max-md:text-5xl md:text-6xl tracking-tighter">
        Key Features
      </h1>
      <p className="py-5 px-2 leading-6 h-auto mb-10 text-xl mt-8 max-w-2xl mx-auto text-center para">
        Our platform uses advanced AI to make the resume screening process
        faster and more accurate.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {data.map((ele) => (
          <Card {...ele} />
        ))}
      </div>
    </div>
  );
};

export default Features;
