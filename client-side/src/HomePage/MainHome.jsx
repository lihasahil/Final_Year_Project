import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MainHome.css";
import NavBar from "../components/Navbar/NavBar";

const MainHome = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <NavBar
        menuItems={[
          { id: "report", label: "Report Lost Person", path: "/report" },
          { id: "find", label: "Find Missing Person", path: "#find" },
          {
            label: "Log Out",
            id: "logout",
            onClick: () => {
              handleLogout();
            },
          },
        ]}
        defaultActive="home"
      />
      <div className="main-body">
        <Typography variant="h6">
          Welcome , {localStorage.getItem("firstName")}
        </Typography>
      </div>
    </>
  );
};

export default MainHome;
