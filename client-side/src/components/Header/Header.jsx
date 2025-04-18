import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({
  title = "FindMe",
  text,
  showButton = true,
  buttonText = "Sign Up",
  buttonPath = "/login",
  onButtonClick, // Custom onClick function
}) => {
  const navigate = useNavigate();

  // Default button action if no custom function is provided
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(); // Call the custom function
    } else {
      navigate(buttonPath); // Default navigation
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2 className="title-design">{title}</h2>
        {text && <p>{text}</p>}
        {showButton && (
          <button onClick={handleClick} aria-label={buttonText}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
