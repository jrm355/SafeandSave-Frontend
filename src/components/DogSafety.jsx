import React, { useState } from "react";

const DogSafety = () => {
  const [food, setFood] = useState(""); // For food input
  const [result, setResult] = useState(null); // To store result from backend
  const [error, setError] = useState(null); // For error messages

  const checkFoodSafety = async () => {
    try {
      // Replace with your backend URL (running on localhost:3001 in this example)
      const response = await fetch(`/Dog?food=${food.trim()}`);
      
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      // If no food found, show an error
      if (data.length === 0) {
        setError("Food not found in the database.");
        setResult(null);
      } else {
        // Assuming that the result will be an array with one item
        const foodItem = data[0];
        setResult({
          food: foodItem.name,
          safetyRating: foodItem.SafetyRating,
          safetyDescription: foodItem.safetyDescription
        });
        setError(null);
      }
    } catch (err) {
      setError("Could not determine food safety. Please try again.");
      setResult(null);
    }
  };

  const handleInputChange = (e) => {
    setFood(e.target.value);
  };

  const handleCheckClick = () => {
    if (food.trim()) {
      checkFoodSafety();
    } else {
      setError("Please enter a food to check.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dog Safety Checker</h1>
      <input
        type="text"
        placeholder="Enter food item"
        value={food}
        onChange={handleInputChange}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button
        onClick={handleCheckClick}
        style={{ marginLeft: "1rem", padding: "0.5rem" }}
      >
        Check Safety
      </button>
      
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      
      {result && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: result.safetyRating <= 2 ? "#d4edda" : "#f8d7da",
          }}
        >
          <p>
            <strong>Food:</strong> {result.food}
          </p>
          <p>
            <strong>Safety Rating:</strong> {result.safetyRating}
          </p>
          <p>
            <strong>Safety Description:</strong> {result.safetyDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default DogSafety;
