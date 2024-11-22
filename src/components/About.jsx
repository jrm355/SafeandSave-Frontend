import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About This Site</h1>
      </header>

      {/* Content Section */}
      <div className="about-content">
        {/* How to Use Section */}
        <section className="about-section">
          <h2>How to Use</h2>
          <ul>
            <li>
              <strong>On the Pantry Page:</strong> Simply input any foods whose expiration and sell-by dates you'd like to keep track of.
            </li>
            <li>
              <strong>On the Dog Safety Page:</strong> Input a food, and you'll receive a recommendation on whether it is safe for your dog to eat.
            </li>
            <li>
              <strong>On the Food Safety Page:</strong> Check the chart for foods commonly good past their expiration date. 
            </li>
          </ul>
        </section>

        {/* Disclaimer Section */}
        <section className="about-section">
          <h2>Disclaimer</h2>
          <p>
            Before eating anything expired, check for signs of mold, odd coloring, and smells. This app is a guideline but cannot replace personal judgment or expert advice.
          </p>
          <p>
            Use this app to track foods in storage. Food can often be consumed past its sell-by and expiration dates as long as it doesn’t show signs of spoilage.
          </p>
        </section>

        {/* Food Waste Information Section */}
        <section className="about-section food-waste-info">
          <h2>Food Waste Awareness</h2>
          <p>
            The average American throws away between 250-400 pounds of food a year. Plenty of that can still be consumed either by yourself or your dogs, but is tossed due to strictly adhering to expiration dates or overbuying. The purpose of this website is to give you tools to waste less, either by giving it to your dog, understanding how long to keep something, or tracking foods that spoil.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;