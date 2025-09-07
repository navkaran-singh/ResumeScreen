import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HomeLogo from "../../public/images/home.svg";
import UploadLogo from "../../public/images/upload.png";
import ResultLogo from "../../public/images/result.svg";
import APILogo from "../../public/images/code.png";
import MenuLogo from "../../public/images/menu.png";
import CrossLogo from "../../public/images/cross.png";

const Navbar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="max-w-screen-xl">
      <nav className="flex justify-between">
        <h1
          className="tracking-tight font-bold text-xl hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-blue-500">AI</span>ResumeRank
        </h1>
        <ul className="hidden md:flex gap-4">
          <li className="list-item-nav">
            <img className="w-[20px]" src={HomeLogo} alt="HomeLogo" />
            <Link to={"/"}>Home</Link>
          </li>
          <li className="list-item-nav">
            <img className="h-4 w-4" src={UploadLogo} alt="UploadLogo" />
            <Link to={"/upload"}>Upload</Link>
          </li>
          <li className="list-item-nav">
            <img className="h-4 w-4" src={ResultLogo} alt="ResultLogo" />
            <Link to={"/results"}>Results</Link>
          </li>
          <li className="list-item-nav">
            <img className="h-4 w-4" src={APILogo} alt="APILogo" />
            <Link to={"/docs"}>API</Link>
          </li>
        </ul>
        <button
          className="md:hidden"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <img
            className="hidden img max-md:block relative z-10 hover:cursor-pointer"
            src={toggleSidebar ? CrossLogo : MenuLogo}
            alt="MenuLogo"
          />
        </button>
      </nav>
      {toggleSidebar ? (
        <ul
          className={`md:hidden flex flex-col gap-2 max-w-full ml-6 mr-6 px-4 py-2 mx-auto bg-white/70 
            backdrop-blur-sm fixed z-50 left-0 right-0 rounded-lg shadow-xl ring-1 
          ring-slate-900/5 ${
            toggleSidebar
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <li className="list-item-sidebar w-full rounded-lg">
            <img className="img " src={HomeLogo} alt="HomeLogo" />
            <Link className="" to={"/"}>
              Home
            </Link>
          </li>
          <li className="list-item-sidebar w-full">
            <img className="img" src={UploadLogo} alt="UploadLogo" />
            <Link to={"/upload"}>Upload</Link>
          </li>
          <li className="list-item-sidebar w-full">
            <img className="img" src={ResultLogo} alt="ResultLogo" />
            <Link to={"/results"}>Results</Link>
          </li>
          <li className="list-item-sidebar w-full">
            <img className="img" src={APILogo} alt="APILogo" />
            <Link to={"/docs"}>API</Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Navbar;
