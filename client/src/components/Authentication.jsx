import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

import CopyIcon from "../../public/images/copy.svg";
import TickIcon from "../../public/images/tick.svg";
import LockIcon from "../../public/images/lock.svg";

const Authentication = () => {
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
    <div className="mt-10 p-5 border-1 border-gray-200 rounded-xl">
      <Toaster />
      <h1 className="text-2xl tracking-tight font-bold">Authentication</h1>
      <p className="para">
        All API requests require authentication using API keys
      </p>
      <h1 className="mt-5 mb-3 font-bold text-lg">API Keys</h1>
      <p className="para mb-3">
        Your API requests are authenticated using API keys. Authentication to
        the API is performed via Bearer Auth.
      </p>
      <div className="w-full bg-gray-100 p-2 px-5 rounded-xl">
        <p className="tracking-tight font-semibold max-sm:text-md text-lg mb-3">
          Example: Adding the Authorization header
        </p>

        <div className="flex justify-between flex-start">
          <pre className="text-gray-500 max-sm:overflow-x-scroll">
            Authorization: Bearer YOUR_API_KEY
          </pre>
          <div className="hover:bg-white cursor-pointer rounded-lg flex items-center">
            <img
              onClick={() => handleCopy("Authorization: Bearer YOUR_API_KEY")}
              className="w-5 h-full m-2 "
              src={`${copied ? TickIcon : CopyIcon}`}
              alt="CopyIcon"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-5 mb-3 font-bold text-lg">Getting Your API Key</h1>
      <div className="border-1 border-gray-300 px-5 py-5 rounded-xl">
        <div className="flex gap-2 items-center mb-3">
          <img className="img para inline" src={LockIcon} alt="LockIcon" />
          <p className="tracking-tight font-semibold text-lg">
            API Key Generation (Coming Soon)
          </p>
        </div>
        <p className="para">
          We're currently developing our API key management portal. Soon, you'll
          be able to generate and manage your API keys directly from your
          dashboard.
        </p>
      </div>

      <h1 className="mt-5 mb-2 font-bold text-lg">Keep Your API Keys Secure</h1>
      <p className="para">
        Your API keys grant access to your account and should be kept secure.
        Don't share your API keys in publicly accessible areas such as GitHub,
        client-side code, or forum posts.
      </p>
    </div>
  );
};

export default Authentication;
