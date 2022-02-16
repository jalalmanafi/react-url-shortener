import { createArray } from "../../helper/array";

const BackgroundAnimate = () => {
  return (
    <ul className="background">
      {createArray(100).map((i) => (
        <li key={i} />
      ))}
    </ul>
  );
};

export default BackgroundAnimate;
