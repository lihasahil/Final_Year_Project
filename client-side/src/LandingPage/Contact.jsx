import React from "react";
import "./Contact.css";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocation,
  faMapLocationDot,
  faMapSigns,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "afbc2f66-7d39-4cba-86b3-fcf83ee3343a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <Box
      sx={{
        marginTop: "5%",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <Box
        sx={{
          border: "2px solid black",
          borderRadius: "10%",
          padding: "10%",
          marginBottom: "5%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "60px",
            color: "#243b55",
          }}
        >
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            displayDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="op1">
            <div className="box">
              <div className="icons">
                <FontAwesomeIcon icon={faMapLocationDot} />
              </div>
              <div className="text">
                <h3>Address:</h3>
                <p>
                  Himalaya College of Engineering, M8GM+R42, Chyasal-9, Lalitpur
                  44700
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icons">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="text">
                <h3>Email:</h3>
                <p>projectfindme031@gmail.com</p>
              </div>
            </div>
            <div className="box">
              <div className="icons">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="text">
                <h3>Phone:</h3>
                <p>+9779867******</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={onSubmit}>
              <h2>Send Message</h2>
              <div className="input-box">
                <label>Full Name</label>
                <input
                  type="text"
                  className="field"
                  name="name"
                  placeholder="Enter your Name"
                  required
                />
                <div className="input-box">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="field"
                    placeholder="Enter your Email"
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="field_mess"
                    placeholder="Enter your Message"
                    required
                  />
                </div>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
