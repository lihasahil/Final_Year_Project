import React, { useEffect } from "react";
import "./About.css";
const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="box">
        <h2>About Us</h2>
        <p>
          Welcome to FindMe, where technology meets compassion to reunite
          families with their missing loved ones. The website was created as a
          major project by developers Sahil Shrestha, Nanada Singh Kadayat,
          Asmita Kc, and Prajana Joshi, utilizes advanced face recognition and
          gait analysis technology to help reunite families with their missing
          loved ones. Designed with precision and care, our app leverages
          state-of-the-art algorithms to identify and locate missing persons
          swiftly and accurately. By combining innovative technology with a
          compassionate approach, we aim to provide a powerful tool in the
          search and recovery process. We specialize in advanced face
          recognition and gait pattern analysis, offering innovative solutions
          to locate missing persons quickly and accurately.
        </p>
      </div>
      <div className="box">
        <h2>Our Mission</h2>
        <p>
          Our mission is to leverage cutting-edge technology to assist in the
          search and recovery of missing individuals. We understand the urgency
          and emotional toll that comes with a missing person case, and we are
          dedicated to providing timely and effective assistance.
        </p>
      </div>
      <div className="box">
        <h2>Out Technology</h2>
        <p>
          Face Recognition: Our state-of-the-art face recognition system can
          analyze and compare facial features from various sources, including
          photos, videos, and live feeds. This technology helps identify
          individuals in diverse environments, increasing the chances of a
          successful recovery.
        </p>
        <p>
          Gait Pattern Analysis: In addition to facial recognition, we utilize
          gait pattern analysis to enhance our search capabilities. By studying
          an individuals unique walking pattern, our system can identify and
          track them, even in challenging conditions where facial features might
          not be clearly visible.
        </p>
      </div>
      <div className="box">
        <h2>How we work?</h2>
        <p>
          Data Collection: We gather data from multiple sources, including CCTV
          footage, social media, and public databases, to create a comprehensive
          profile of the missing person.
        </p>
        <p>
          Analysis: Our advanced algorithms process the collected data,
          comparing it against a vast database to identify potential matches.
        </p>
        <p>
          Collaboration: We work closely with law enforcement agencies,
          community organizations, and families to ensure a coordinated and
          effective search effort.
        </p>
        <p>
          Support: We provide continuous support and updates to families,
          keeping them informed throughout the search process.
        </p>
      </div>
      <div className="box">
        <h2>Why Choose Us</h2>
        <p>
          Accuracy: Our cutting-edge technology ensures high accuracy in
          identifying and locating missing persons.
        </p>
        <p>
          Speed: Time is of the essence in missing person cases. Our system is
          designed to deliver rapid results, increasing the chances of a
          successful outcome.
        </p>
        <p>
          Compassion: We approach each case with empathy and dedication,
          understanding the emotional impact on families and loved ones
        </p>
      </div>
    </div>
  );
};

export default About;
