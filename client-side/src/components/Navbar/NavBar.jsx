import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { CiMenuBurger } from "react-icons/ci"; // Import menu icons
import "./Navbar.css";

const Navbar = ({ menuItems, defaultActive }) => {
  const [menu, setMenu] = useState(defaultActive || menuItems[0]?.id);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setMenu(item.id);
    setIsOpen(false); // Close menu on mobile after selection
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        FindMe
      </Link>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <CiMenuBurger />}
      </div>

      {/* Navigation Links */}
      <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <li key={item.id} className="navbar-item">
            <Link
              to={item.path}
              onClick={() => handleItemClick(item)}
              className={menu === item.id ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
