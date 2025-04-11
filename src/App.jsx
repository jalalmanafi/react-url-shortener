import { useState } from "react";

import BackgroundAnimate from "./components/BackgroundAnimate";
import InputShortener from "./components/InputShortener";
import LinkResult from "./components/LinkResult";

import "./App.css";


function App() {

  const [inputValue,setInputValue] = useState()

  return (
    <div className="container">
      <InputShortener {...{setInputValue}}/>
      <BackgroundAnimate />
      <LinkResult {...{inputValue}}/>
    </div>
  );
}

export default App;
