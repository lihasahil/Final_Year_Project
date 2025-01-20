import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h1> FindMe</h1>
          <p>
            Our technology is designed to assist law enforcement and families in
            their search for missing persons. All data shared is protected under
            our strict Privacy Policy.
          </p>
          <div className="footer-social-icons">
            <img src="facebook_icon.png" alt="" />
            <img src="twitter_icon.png" alt="" />
            <img src="linkedin_icon.png" alt="" />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+977-9841252525</li>
            <li>contact@findMe.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © FindMe.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
