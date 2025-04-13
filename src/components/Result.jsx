import { useState, useEffect } from "react";

import Copy from "../assets/icons/copy.svg";
import Check from "../assets/icons/check.svg";

const Result = ({ shortenedLink }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (shortenedLink) {
      window.navigator.clipboard.writeText(shortenedLink).then(() => {
        setCopied(true);
      });
    }
  };

  useEffect(() => {
    const expireCopyTime = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => clearTimeout(expireCopyTime);
  }, [copied]);

  if (!shortenedLink) return null;

  return (
    <div className="mt-3 flex justify-center items-center gap-2">
      <a
        href={shortenedLink}
        target="_blank"
        className="text-base border border-slate-800 p-2 rounded-md"
      >
        {shortenedLink}
      </a>
      {typeof window.navigator.clipboard === "object" && (
        <button
          className="rounded-md bg-transparent p-2 cursor-pointer border border-slate-800 text-center text-sm text-slate-800 transition-all shadow-md hover:shadow-lg focus:bg-transparent focus:shadow-none active:bg-transparent hover:bg-transparent active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={copyToClipboard}
        >
          {copied ? (
            <img src={Check} alt="Check icon" />
          ) : (
            <img src={Copy} alt="Copy icon" />
          )}
        </button>
      )}
    </div>
  );
};

export default Result;
