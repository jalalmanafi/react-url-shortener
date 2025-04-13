import axios from "axios";
import { useEffect, useState } from "react";

import { validURLChecker } from "./helper/validURLChecker";

import Copy from "./assets/icons/copy.svg";
import Check from "./assets/icons/check.svg";
import Title from "./components/Title";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");

  const apiKey = import.meta.env.VITE_URL_SHORTENER_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const createShortLink = () => {
    if (validURLChecker(link)) {
      setLoading(true);
      axios
        .post(`${BASE_URL}/create?api_token=${apiKey}`, {
          url: link,
          domain: "tinyurl.com",
          alias: "",
          tags: "",
          expires_at: "",
          description: "PLEASEEEE WORK",
        })
        .then((result) => {
          const {
            data: {
              data: { tiny_url },
            },
          } = result || {};
          if (tiny_url) {
            setShortenedLink(tiny_url);
          }
        })
        .catch((err) => setError(err?.message))
        .finally(() => {
          setLink("");
          setLoading(false);
        });
    } else {
      setError("Please enter valid URL");
    }
  };

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

  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-transparent">
      <Title />
      <div className="w-96 flex justify-between items-center gap-2">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200
           rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
         hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Paste a link to shorten it"
        />
        <button
          onClick={createShortLink}
          className="w-1/3 rounded-md bg-slate-800 p-2 cursor-pointer border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Short link
        </button>
      </div>
      <div>
        {shortenedLink && window.navigator.clipboard && (
          <div className="mt-3 flex justify-center items-center gap-2">
            <p className="text-base border border-slate-800 p-2 rounded-md">
              {shortenedLink}
            </p>
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
          </div>
        )}
        <ErrorMessage errorMessage={error} />
      </div>
    </div>
  );
}

export default App;
