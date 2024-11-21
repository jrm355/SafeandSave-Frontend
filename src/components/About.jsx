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
              <strong>On the Pantry Page:</strong> Simply input any foods whose expiration and sell by dates you'd like to keep track of
            </li>
            <li>
              <strong>On the Dog Safety Page:</strong> Simply input a food and
              you will be given a recommendation whether it is safe for your dog
              to eat.
            </li>
            <li>
              <strong>On the Food Safety Page:</strong> Check the chart for foods that are commonly good past their expiration date. 
            </li>
          </ul>
        </section>

        {/* Disclaimer Section */}
        <section className="about-section">
          <h2>Disclaimer</h2>
          <p>
            Before eating anything expired, check for signs of mold, odd
            coloring, and smells. This app is used as a guideline, but there is
            always the risk of faulty food packaging and poor preparation.
          </p>
          <p>
            This app is used to track foods in storage. Food can be consumed
            post-sell-by and expiration date as long as it doesn’t show signs of
            going bad.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;