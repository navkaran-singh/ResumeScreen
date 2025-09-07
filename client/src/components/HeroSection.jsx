import React from "react";
import { Link } from "react-router-dom";

import RightArrowImg from "../../public/images/right-arrow-svgrepo-com.svg";

const HeroSection = () => {
  return (
    <div className="mt-10 max-w-screen">
      <div className="text-center">
        <span className="text-blue-400 max-sm:inline-flex max-sm:rounded-full bg-blue-50 rounded-2xl p-2">
          ✨ AI-Powered Resume Analysis
        </span>
      </div>
      <div className="mt-6">
        <span className="block text-center max-sm:text-5xl max-md:text-6xl md:text-7xl tracking-tighter">
          AI-Powered Resume
        </span>
        <span className="block text-center max-sm:text-5xl max-md:text-6xl md:text-7xl tracking-tighter text-blue-600">
          Screening & Ranking
        </span>
      </div>
      <p className="text-xl mt-8 max-w-2xl mx-auto text-center para">
        Find the best candidates instantly with AI-driven insights. Save time
        and make better hiring decisions.
      </p>
      <div className="md:flex md:flex-row justify-center gap-2.5">
        <p className="text-center mt-6">
          <button className="text-white bg-blue-500 rounded-lg hover:scale-105 hover:bg-blue-400">
            <Link className="flex gap-2 px-5 py-2" to={"/upload"}>
              Upload Resume
              <img
                className="img invert"
                src={RightArrowImg}
                alt="RightArrowImage"
              />
            </Link>
          </button>
        </p>
        <p className="text-center mt-6">
          <button className="bg-white rounded-lg hover:bg-gray-100 border border-gray-400 hover:border-gray-400 shadow-sm">
            <Link
              className="flex gap-2 px-6 py-2 hover:scale-105 text-[#121F2B] font-medium"
              to={"/results"}
            >
              Try The Demo
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
