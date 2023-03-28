import React from "react";
import "./Button.css"

function Button(props) {
  const handleClick = () => {
    props.onClick(props.label);
  };

  return (
    <button onClick={handleClick}>
      {props.label}
    </button>
  );
}

export default Button;
