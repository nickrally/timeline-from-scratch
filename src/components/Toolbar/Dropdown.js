import React from "react";
import "./Dropdown.css";

const Dropdown = ({ onOptionChange, options }) => {
  return (
    <select onChange={onOptionChange} defaultValue={options[0].TypePath}>
      {options?.map((option) => (
        <option key={option.ElementName} value={option.TypePath}>
          {option.ElementName}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
