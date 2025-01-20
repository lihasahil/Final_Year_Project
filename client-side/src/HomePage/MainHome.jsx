import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MainHome.css";

const MainHome = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="main-body">
        <button
          onClick={() => {
            navigate("/report");
          }}
        >
          Report Lost Person
        </button>
        <button>Report Found Person</button>
      </div>
      <div>
        <Typography variant="h6">
          Welcome , {localStorage.getItem("firstName")}
        </Typography>
        <Button
          variant="text"
          sx={{ color: "#000" }}
          onClick={() => {
            handleLogout();
          }}
        >
          logout
        </Button>
      </div>
    </>
  );
};

export default MainHome;
