import axios from "axios";
import { useState } from "react";

import { validURLChecker } from "../helper/validURLChecker";

const Form = ({ setError, setShortenedLink, setLoading, shortenedLink }) => {
  const [link, setLink] = useState("");

  const apiKey = import.meta.env.VITE_URL_SHORTENER_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const DOMAIN = "tinyurl.com";
  const DESCRIPTION = "Static description"

  const createShortLink = () => {
    const body = {
      url: link,
      domain: DOMAIN,
      alias: "",
      tags: "",
      expires_at: "",
      description: DESCRIPTION,
    };
    if (shortenedLink) {
      setShortenedLink("");
    }
    if (validURLChecker(link)) {
      setLoading(true);
      axios
        .post(`${BASE_URL}/create?api_token=${apiKey}`, body)
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

  return (
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
  );
};

export default Form;
