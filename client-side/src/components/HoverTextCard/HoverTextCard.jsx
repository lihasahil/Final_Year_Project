import React, { useState } from "react";
import { motion } from "framer-motion";

const HoverTextCard = ({
  visibleImage,
  hiddenText,
  cardWidth = "20rem",
  cardHeight = "12rem",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: cardWidth,
    height: cardHeight,
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    position: "relative",
    background: isHovered
      ? "linear-gradient(to right, #00093c, #2d0b00)" // Gradient background on hover
      : "transparent", // Transparent background for visible image
  };

  const contentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    textAlign: "center",
    color: isHovered ? "#fff" : "#1a202c", // White text on hover
  };

  const hiddenTextStyle = {
    background: "linear-gradient(to right, #00093c, #2d0b00)", // Gradient background for hidden text
    color: "#fff", // White text for hidden text
    fontSize: "1rem",
    lineHeight: "1.5",
    padding: "1rem",
    textAlign: "left",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      style={cardStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }} // Animates when scrolled into view
      viewport={{ once: true }} // Animation runs only once when entering the viewport
      onHoverStart={() => setIsHovered(true)} // Set hover state to true on hover
      onHoverEnd={() => setIsHovered(false)} // Reset hover state on hover end
    >
      {/* Visible Image */}
      <motion.div
        style={contentStyle}
        initial={{ opacity: 1 }}
        whileHover={{
          opacity: 0, // Fades the image on hover
          transition: { duration: 0.3 },
        }}
      >
        <img
          src={visibleImage}
          alt="Visible content"
          style={{
            padding: "5%",
            width: "100%",
            height: "100%",
            objectFit: "contain", // Ensures image covers the area without distortion
          }}
        />
      </motion.div>

      {/* Hidden Text */}
      <motion.div
        style={{ ...contentStyle, ...hiddenTextStyle }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }} // Fades in hidden text on hover
        transition={{ duration: 0.3 }}
      >
        <p>{hiddenText}</p>
      </motion.div>
    </motion.div>
  );
};

export default HoverTextCard;
