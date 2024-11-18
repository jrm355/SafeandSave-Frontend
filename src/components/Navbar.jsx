import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#dog-safety">Dog Safety Tool</a>
      <a href="#pantry">Pantry</a>
      <a href="#how-to">How To/Disclaimer</a>
      <a href="#food-safety">Food Safety Tool</a>
    </nav>
  );
};

export default Navbar;