import React from "react";
import NavBar from "../components/Navbar/NavBar";
import About from "../components/About/About";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AppDownload from "../components/AppDownload/AppDownload";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Header />
      <About />
      <AppDownload />
      <Footer />
    </>
  );
};

export default Home;
