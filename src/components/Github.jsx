import React from "react";

import GithubLogo from "../assets/images/github.png";

const Github = () => {
  return (
    <div className="mb-4">
      <a
        href="https://github.com/jalalmanafi/react-url-shortener"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={GithubLogo} alt="Github logo" className="w-10 h-10" />
      </a>
    </div>
  );
};

export default Github;
