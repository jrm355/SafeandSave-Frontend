import React, { useState, useEffect } from "react";
import './DogSafety.css';

const DogSafety = () => {
  const [food, setFood] = useState(""); // For food input
  const [result, setResult] = useState(null); // To store result from backend
  const [error, setError] = useState(null); // For error messages
  const [suggestions, setSuggestions] = useState([]); // For storing autocomplete suggestions
  const [isFetching, setIsFetching] = useState(false); // For loading state

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

  // Search for food safety based on the selected food
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

  // Debounced handler to filter suggestions based on the input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFood(value);

    if (value) {
      setIsFetching(true);
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);  // Update suggestions based on input
      setIsFetching(false);
    } else {
      setSuggestions([]);  // Clear suggestions if input is empty
    }
  };

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

      {/* Warning Disclaimer */}
      <div className="warning-disclaimer">
        <h3 className="warning-header">Warning:</h3>
        <p className="warning-message">
          Before feeding your dog something new, check with a veterinarian. 
          When introducing new foods, always start with a small amount and 
          monitor for allergic reactions. Most packaged foods have multiple 
          ingredients, so be careful to check every ingredient before introducing 
          them to your animal. Never give your dog anything that can shard, 
          like cooked bones.
        </p>
      </div>

      {/* Input field with datalist for autofill */}
      <input
        type="text"
        placeholder="Enter food item"
        value={food}
        onChange={handleInputChange}
        className="input-field"
        list="food-suggestions" // Link to datalist
      />

      {/* Datalist containing food suggestions */}
      <datalist id="food-suggestions">
        {suggestions.length === 0 ? (
          !isFetching && <option value="No matches found" disabled />
        ) : (
          suggestions.map((foodName, index) => (
            <option key={index} value={foodName} />
          ))
        )}
      </datalist>

      <button onClick={handleCheckClick} className="check-button">
        Check Safety
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className={`result-box safety-level-${result.safetyRating}`}>
          <p><strong>Food:</strong> {result.food}</p>
          <p><strong>Safety Rating:</strong> {result.safetyRating}</p>
          <p><strong>Safety Description:</strong> {result.safetyDescription}</p>
        </div>
      )}
    </div>
  );
};

export default DogSafety;
