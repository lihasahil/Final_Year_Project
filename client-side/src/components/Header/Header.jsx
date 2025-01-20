import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-contents">
        <h2 className="title-design">FindMe</h2>
        <p>
          &quot;Reuniting families with advanced face recognition and gait
          analysis technology, bringing missing loved ones home swiftly and
          accurately. Join us in our mission to reunite families. Together, we
          can harness the power of technology to bring missing loved ones
          home.&quot;
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
