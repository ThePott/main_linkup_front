import { useState } from "react";

const CustomInput = (props) => {
  const {
    placeholder = "",
    onChange,
    onEnter,
    defaultValue = "",
    style = {},
    ...rest
  } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(value);
    }
  };

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={{ border: "1px solid #ccc", padding: "0.5rem", ...style }}
      {...rest}
    />
  );
};

export default CustomInput;
