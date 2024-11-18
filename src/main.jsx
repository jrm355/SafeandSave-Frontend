import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Import BrowserRouter explicitly
import App from "./App"; 
import About from "./components/About"; 
import Pantry from "./components/Pantry";
import DogSafety from "./components/DogSafety";
import FoodSafety from "./components/FoodSafety";
import "./index.css"; 

const Main = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <div>
        {/* Sticky Navigation */}
        <nav className="sticky-nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/pantry">Pantry</a>
            </li>
            <li>
              <a href="/dog-safety">Dog Safety</a>
            </li>
            <li>
              <a href="/food-safety">Food Safety</a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/food-safety" element={<FoodSafety />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/dog-safety" element={<DogSafety />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
