import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="max-w-screen-xl text-center py-20 bg-blue-50 rounded-md">
      <p className="text-xl max-sm:text-3xl sm:text-4xl max-sm:tracking-normal md:text-5xl tracking-tighter mb-5 gradient-heading">
        Ready to Transform Your Hiring Process?
      </p>

      <p className="mb-5 text-gray-500 tracking-tight sm:text-lg">
        Start screening resumes with AI today and find the perfect candidates
        faster.
      </p>
      <div className="flex justify-center items-center gap-2 max-sm:flex ">
        <button className="bg-blue-400 font-bold button text-white hover:bg-blue-300 cursor-pointer ">
          <Link to={"/upload"}>Get Started</Link>
        </button>
        <button className="button py-2 text-blue-300 bg-white border-2 border-blue-100 hover:bg-blue-50 hover:text-whiter cursor-pointer font-semibold ">
          <Link to={"/docs"}>View API Docs</Link>
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
