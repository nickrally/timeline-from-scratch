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

/* const Dropdown = ({ onOptionChange, options }) => {
    return (
      <select onChange={onOptionChange} defaultValue="">
        <option value="" disabled>
          Choose...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default Dropdown; */
