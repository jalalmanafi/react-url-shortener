import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`
      );
      setShortenLink(res.data.result.full_short_link);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!!inputValue?.length) {
      fetchData();
    }
  }, [inputValue]);

  if(loading) return <div className="noData">Loading...</div>
  if(error) return <div className="noData">Something went wrong...</div>

  return (
    <div className="result">
      {!!shortenLink && <p>{shortenLink}</p>}
      <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
        <button className={copied ? "copied" : ""}>Copy to clipboard</button>
      </CopyToClipboard>
    </div>
  );
};

export default LinkResult;
