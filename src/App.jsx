import axios from "axios";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("")

  const createShortLink = () => {
    setLoading(true)
    axios
      .post(
        `https://api.tinyurl.com/create?api_token=y1SRRICkItO5MKkzWEECOUe4HBc6otoIi4CH3NcomUK3AZCj9tOVKQn3T2Bd`,
        {
          url: link,
          domain: "tinyurl.com",
          alias: "",
          tags: "",
          expires_at: "",
          description: "PLEASEEEE WORK",
        }
      )
      .then((result) => {
        const { data: { data: { tiny_url } } } = result || {};
        if (tiny_url) {
          setShortenedLink(tiny_url)
        }
      })
      .catch((err) => setError(err?.message));
  };

  const copyToClipboard = () => {
    if (link) {
      window.navigator.clipboard.writeText(shortenedLink)
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-transparent">
      <h1 className="font-bold text-4xl mb-5">React URL Shortener</h1>
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
      <div>{shortenedLink && window.navigator.clipboard && <button className="bg-red-400" onClick={copyToClipboard}>Copy to clipboard</button>}</div>
    </div>
  );
}

export default App;
