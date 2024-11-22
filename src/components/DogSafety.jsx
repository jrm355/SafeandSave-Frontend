import React, { useState, useEffect } from "react";
import "./DogSafety.css";

const DogSafety = () => {
  const [food, setFood] = useState(""); // Input value
  const [result, setResult] = useState(null); // Backend result
  const [error, setError] = useState(null); // Error message
  const [suggestions, setSuggestions] = useState([]); // All food suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions for input

  // Fetch food suggestions once on mount
  useEffect(() => {
    const fetchFoodSuggestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/dogfoods");
        const data = await response.json();
        setSuggestions(data.map((item) => item.name)); // Store all food names
      } catch (err) {
        console.error("Error fetching food suggestions:", err);
        setError("Unable to fetch food suggestions. Please try again later.");
      }
    };

    fetchFoodSuggestions();
  }, []);

  // Update filtered suggestions on input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFood(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Check food safety
  const checkFoodSafety = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/dogfoods/search?food=${food.trim()}`
      );

      if (!response.ok) throw new Error("Failed to fetch data");

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

  // Handle button click
  const handleCheckClick = () => {
    if (food.trim()) {
      checkFoodSafety();
    } else {
      setError("Please enter a food to check.");
    }
  };

  return (
    <div className="dog-safety-container">
      <h1>Dog Safety Checker</h1>

      {/* Warning Section */}
      <div className="warning-disclaimer">
        <h3 className="warning-header">Warning:</h3>
        <p className="warning-message">
          Before feeding your dog something new, check with a veterinarian. Start with small portions and monitor for reactions.
        </p>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter food item"
        value={food}
        onChange={handleInputChange}
        className="input-field"
        list="food-suggestions" // Attach datalist
      />

      {/* Datalist */}
      <datalist id="food-suggestions">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((item, index) => (
            <option key={index} value={item} />
          ))
        ) : (
          <option value="No suggestions available" disabled />
        )}
      </datalist>

      <button onClick={handleCheckClick} className="check-button">
        Check Safety
      </button>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Result Display */}
      {result && (
        <div className={`result-box safety-level-${result.safetyRating}`}>
          <p>
            <strong>Food:</strong> {result.food}
          </p>
          <p>
            <strong>Safety Rating:</strong> {result.safetyRating}
          </p>
          <p>
            <strong>Description:</strong> {result.safetyDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default DogSafety;