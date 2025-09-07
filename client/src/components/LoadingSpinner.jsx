import React from "react";

const LoadingSpinner = ({ text }) => {
  return (
    <>
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 text-lg">{text}</p>
    </>
  );
};

export default LoadingSpinner;
