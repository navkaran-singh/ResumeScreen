import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import CopyIcon from "../../public/images/copy.svg";
import TickIcon from "../../public/images/tick.svg";

const Overview = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  useEffect(() => {
    if (copied) toast.success("Text copied to clipboard");
  }, [copied]);
  return (
    <div>
      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <Toaster />
        <div>
          <h1 className="text-2xl tracking-tight font-bold">Introduction</h1>
          <p className="para">
            AI Resume Rank API provides programmatic access to our AI-powered
            resume analysis and ranking system.
          </p>
          <p className="mt-5 mb-3 para text-[18px]">This API allows you to:</p>
          <li className="para">Upload and analyze resumes</li>
          <li className="para">Extract skills and experience</li>
          <li className="para">Get AI-powered insights and rankings</li>
          <li className="para">Search and filter candidates</li>
          <h1 className="mt-5 mb-5 font-bold text-lg">Base URL</h1>
          <div className="flex justify-between gap-2">
            <p className="bg-gray-100 w-full rounded-lg flex items-center p-2">
              https://api.airesumerank.com/v1
            </p>
            <div className="hover:bg-gray-100 rounded-lg flex items-center">
              <img
                onClick={() => handleCopy("https://api.airesumerank.com/v1")}
                className="w-5 h-full m-2 cursor-pointer "
                src={`${copied ? TickIcon : CopyIcon}`}
                alt="CopyIcon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
        <h1 className="text-2xl tracking-tight font-bold">Rate Limits</h1>
        <p className="para">
          Our API implements rate limiting to ensure fair usage.
        </p>
        <div className="mt-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Free Tier</p>
            <p className="para">
              <span className="text-gray-600 text-xl font-bold">50</span>{" "}
              requests/day
            </p>
            <p className="para">Perfect for testing and small projects</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Pro Tier</p>
            <p className="para">
              <span className="text-gray-600 text-xl font-bold">1,000</span>{" "}
              requests/day
            </p>
            <p className="para">Ideal for medium applications</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Enterprise</p>
            <p className="para">
              <span className="text-gray-600 text-xl font-bold">Unlimited</span>{" "}
              custom plan
            </p>
            <p className="para">Contact us for custom solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
