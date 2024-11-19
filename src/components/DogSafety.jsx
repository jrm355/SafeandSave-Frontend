import React, { useState } from "react";

const DogSafety = () => {
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkFoodSafety = async () => {
    // Replace with a real API URL if available
    const mockAPI = `https://api.example.com/dog-safety?food=${food}`; 

    try {
      // Simulate API call (replace with fetch for real API)
      const response = await fetch(mockAPI);
      if (!response.ok) throw new Error("Failed to fetch data");
      
      const data = await response.json();
      // Assuming API returns { food: "grapes", safe: false }
      setResult(data);
      setError(null);
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
      <button onClick={handleCheckClick} style={{ marginLeft: "1rem", padding: "0.5rem" }}>
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
            backgroundColor: result.safe ? "#d4edda" : "#f8d7da",
          }}
        >
          <p>
            <strong>Food:</strong> {result.food}
          </p>
          <p>
            <strong>Safe for Dogs:</strong>{" "}
            {result.safe ? "Yes, this food is safe." : "No, this food is not safe."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DogSafety;