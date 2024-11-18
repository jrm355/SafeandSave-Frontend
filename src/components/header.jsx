import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Optional: For styling consistency

const Header = () => {
  return (
    <header style={{ display: "flex", justifyContent: "space-around", padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <nav>
        <ul style={{ display: "flex", listStyleType: "none", margin: 0, padding: 0 }}>
          <li style={{ margin: "0 1rem" }}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ margin: "0 1rem" }}>
            <Link to="/about">About</Link>
          </li>
          <li style={{ margin: "0 1rem" }}>
            <Link to="/food-safety">Food Safety</Link>
          </li>
          <li style={{ margin: "0 1rem" }}>
            <Link to="/dog-safety">Dog Safety</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;