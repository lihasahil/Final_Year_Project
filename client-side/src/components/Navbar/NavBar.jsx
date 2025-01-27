import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ menuItems, defaultActive }) => {
  const [menu, setMenu] = useState(defaultActive || menuItems[0]?.id);

  const handleItemClick = (item) => {
    // Call the onClick handler if it exists
    if (item.onClick) {
      item.onClick();
    }
    setMenu(item.id); // Update the active menu
  };

  return (
    <nav className="navbar">
      {/* Logo is the same for all instances */}
      <Link to="/" className="navbar-logo">
        FindMe
      </Link>
      <ul className="navbar-menu">
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
