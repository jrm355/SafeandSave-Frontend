import React, { useState } from "react";

const FoodSafety = () => {
  const [query, setQuery] = useState(""); // Food input
  const [foodInfo, setFoodInfo] = useState(null); // API response
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(false); // Loading state

  const API_KEY = "fvTQ2bcUJqOhiPdKxShxB0gWYtbYcaysLocfRYTC";
  const SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
  const DETAIL_URL = "https://api.nal.usda.gov/fdc/v1/food";

  const fetchFoodInfo = async (food) => {
    setLoading(true);
    setError(null);

    try {
      // Search for food to get FDC ID
      const searchResponse = await fetch(`${SEARCH_URL}?query=${food}&api_key=${API_KEY}`);
      if (!searchResponse.ok) {
        throw new Error("Failed to fetch data from the USDA API");
      }

      const searchData = await searchResponse.json();

      if (searchData.foods && searchData.foods.length > 0) {
        const fdcId = searchData.foods[0].fdcId;

        // Fetch detailed food information using FDC ID
        const detailsResponse = await fetch(`${DETAIL_URL}/${fdcId}?api_key=${API_KEY}`);
        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch detailed data from the USDA API");
        }

        const foodDetails = await detailsResponse.json();

        const nutrients = foodDetails.foodNutrients || [];
        const allergenInfo = foodDetails.allergens || "No allergen information available";

        // Safely find nutrient values
        const findNutrient = (key) =>
          nutrients.find((n) => n.nutrientName && n.nutrientName.toLowerCase().includes(key))?.value || "N/A";

        const calories = findNutrient("energy");
        const sugar = findNutrient("sugars");
        const protein = findNutrient("protein");
        const fat = findNutrient("fat");

        setFoodInfo({
          name: foodDetails.description,
          allergens: allergenInfo,
          calories: `${calories} kcal`,
          sugar: `${sugar} g`,
          protein: `${protein} g`,
          fat: `${fat} g`,
        });
      } else {
        setFoodInfo(null);
        setError("No information found for this food.");
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
      setError("An error occurred while fetching food information.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchFoodInfo(query);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Food Safety Guide</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <label htmlFor="food-input">Enter Food: </label>
        <input
          id="food-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Apple, Milk, Bread"
          style={{ margin: "0 10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {foodInfo && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
          <h2>{foodInfo.name}</h2>
          <p><strong>Allergens:</strong> {foodInfo.allergens}</p>
          <p><strong>Calories:</strong> {foodInfo.calories}</p>
          <p><strong>Sugar:</strong> {foodInfo.sugar}</p>
          <p><strong>Protein:</strong> {foodInfo.protein}</p>
          <p><strong>Fat:</strong> {foodInfo.fat}</p>
        </div>
      )}
    </div>
  );
};

export default FoodSafety;