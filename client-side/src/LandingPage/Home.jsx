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
      <NavBar
        menuItems={[
          { id: "home", label: "Home", path: "/" },
          { id: "about", label: "About", path: "#about" },
          { id: "mobile-app", label: "Mobile App", path: "#mobile-app" },
          { id: "contact", label: "Contact", path: "#contact" },
        ]}
        defaultActive="home"
      />
      <Header
        text='"Reuniting families with advanced face recognition and gait
          analysis technology, bringing missing loved ones home swiftly and
          accurately. Join us in our mission to reunite families. Together, we
          can harness the power of technology to bring missing loved ones
          home."'
        showButton={true}
        buttonText="Get Started"
        buttonPath="/login"
      />

      <About />
      <AppDownload />
      <Footer />
    </>
  );
};

export default Home;
