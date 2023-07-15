import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const InputField = ({ urlHandler }) => {
  const [inputValue, setInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    urlHandler(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your long url.."
      />
      <button type="submit" className="enter-button">
        <BiRightArrowAlt />
      </button>
    </form>
  );
};

export default InputField;
