import { useState } from "react";

import Form from "./components/Form";
import Title from "./components/Title";
import Github from "./components/Github";
import Result from "./components/Result";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");

  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-transparent">
      <Github />
      <Title />
      <Form {...{ setError, setLoading, setShortenedLink, shortenedLink }} />
      <Result shortenedLink={shortenedLink} />
      <ErrorMessage errorMessage={error} />
    </div>
  );
}

export default App;
