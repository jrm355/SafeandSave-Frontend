import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodCategories = () => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will fetch the food categories when the component mounts
    const fetchFoodCategories = async () => {
      const options = {
        method: 'POST',
        url: 'https://foodfacts-foodfacts-v1.p.rapidapi.com/food_categories/format/json',
        headers: {
          'x-rapidapi-key': 'cfea391431msh8fc478804fd2815p16a88fjsne391161a7046',
          'x-rapidapi-host': 'foodfacts-foodfacts-v1.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {},
      };

      try {
        // Send the POST request using axios
        const response = await axios.request(options);
        setFoodCategories(response.data); // Store the data in the state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError(err.message); // If error occurs, update the error state
        setLoading(false);
      }
    };

    // Call the fetchFoodCategories function
    fetchFoodCategories();
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Food Categories</h1>
      <ul>
        {foodCategories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default FoodCategories;
