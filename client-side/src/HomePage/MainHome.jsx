import React, { useEffect, useState } from "react";
import { Typography, Button, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./MainHome.css";
import NavBar from "../components/Navbar/NavBar";
import axiosInstance from "../lib/axios.instance";
import LostPersonCard from "../components/LostPersonCard/LostPersonCard";
import Header from "../components/Header/Header";

const MainHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lostPersonList, setLostPersonList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getLostPersonList = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/lostPerson/list");
        setIsLoading(false);
        const lostPersons = res?.data?.lostPersonList;
        setLostPersonList(lostPersons);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getLostPersonList();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <NavBar
        menuItems={[
          { id: "report", label: "Report Lost Person", path: "/report" },
          { id: "find", label: "Find Missing Person", path: "/find" },
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
      <Header
        title={`Welcome, ${localStorage.getItem("firstName") || "Guest"}`}
        text=" At FindMe, we believe that no family should ever have to live with unanswered questions. By harnessing the power of AI-driven face recognition and gait analysis, we are working tirelessly to reunite loved ones and bring them home where they belong. Together, we can turn technology into hope."
        showButton={true}
        buttonText="Logout"
        onButtonClick={() => handleLogout()}
      />
      <div
        style={{ marginLeft: "10%", marginTop: "40px", marginBottom: "40px" }}
      >
        <h2>Missing Persons:</h2>
      </div>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "4rem",
        }}
      >
        {lostPersonList.map((item, index, self) => {
          return (
            <LostPersonCard
              key={item._id}
              _id={item._id}
              imageUrl={item?.image}
              name={item.name}
              description={item.description}
            />
          );
        })}
      </Box>
    </>
  );
};

export default MainHome;
