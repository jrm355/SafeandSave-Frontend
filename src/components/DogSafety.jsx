import React, { useState, useEffect } from "react";
import './DogSafety.css'; 

const DogSafety = () => {
  const [food, setFood] = useState(""); // For food input
  const [result, setResult] = useState(null); // To store result from backend
  const [error, setError] = useState(null); // For error messages
  const [suggestions, setSuggestions] = useState([]); // For storing autocomplete suggestions

  useEffect(() => {
    // Fetch all foods once when the component mounts for autofill suggestions
    const fetchFoodSuggestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/dogfoods");
        const data = await response.json();
        setSuggestions(data.map(food => food.name)); // Extract food names for the suggestions
      } catch (err) {
        console.error("Error fetching food suggestions:", err);
      }
    };

    fetchFoodSuggestions();
  }, []);

  const checkFoodSafety = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/dogfoods/search?food=${food.trim()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON, but received something else.");
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        setError("Food not found in the database.");
        setResult(null);
      } else {
        const foodItem = data[0];
        setResult({
          food: foodItem.name,
          safetyRating: foodItem.SafetyRating,
          safetyDescription: foodItem.safetyDescription,
        });
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching food safety:", err);
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

  // Map safety rating to a class name for styling
  const getSafetyClass = (rating) => {
    switch (rating) {
      case 1:
        return "safety-level-1";
      case 2:
        return "safety-level-2";
      case 3:
        return "safety-level-3";
      case 4:
        return "safety-level-4";
      case 5:
        return "safety-level-5";
      default:
        return "";
    }
  };

  return (
    <div className="dog-safety-container">
      <h1>Dog Safety Checker</h1>

      <input
        type="text"
        placeholder="Enter food item"
        value={food}
        onChange={handleInputChange}
        className="input-field"
        list="food-suggestions" // Link to datalist
      />
      
      <datalist id="food-suggestions">
        {suggestions.map((foodName, index) => (
          <option key={index} value={foodName} />
        ))}
      </datalist>

      <button onClick={handleCheckClick} className="check-button">
        Check Safety
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className={`result-box ${getSafetyClass(result.safetyRating)}`}>
          <p><strong>Food:</strong> {result.food}</p>
          <p><strong>Safety Rating:</strong> {result.safetyRating}</p>
          <p><strong>Safety Description:</strong> {result.safetyDescription}</p>
        </div>
      )}
    </div>
  );
};

export default DogSafety;
