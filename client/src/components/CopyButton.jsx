import React from "react";

const CopyButton = ({ text }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };
  return <button onClick={() => handleCopy(text)}></button>;
};

export default CopyButton;
