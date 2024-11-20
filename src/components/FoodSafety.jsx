import React, { useState } from 'react';
import axios from 'axios';

const FoodSafety = () => {
  const [query, setQuery] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFoodInfo = async (food) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/safety/fetch', { query: food });
      setFoodInfo(response.data);
    } catch (err) {
      console.error('Error fetching food data:', err);
      setError('An error occurred while fetching food information.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) fetchFoodInfo(query);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Food Safety Guide</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <label htmlFor="food-input">Enter Food: </label>
        <input
          id="food-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Apple, Milk, Bread"
          style={{ margin: '0 10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {foodInfo && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h2>{foodInfo.query}</h2>
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