import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pantry.css";

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [formData, setFormData] = useState({
    foodItem: "",
    location: "",
    foodType: "",
    sellBy: "",
    expiration: "",
    tossBy: "",
  });

  // Fetch pantry items
  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pantry");
        setPantryItems(response.data);
      } catch (error) {
        console.error("Error fetching pantry items:", error);
      }
    };
    fetchPantryItems();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new pantry item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/pantry", formData);
      setPantryItems([...pantryItems, response.data]); // Update state with new item
      setFormData({
        foodItem: "",
        location: "",
        foodType: "",
        sellBy: "",
        expiration: "",
        tossBy: "",
      }); // Reset form
    } catch (error) {
      console.error("Error adding pantry item:", error);
    }
  };

  return (
    <div className="pantry-container">
      <h1>Pantry Tracker</h1>

      <form onSubmit={handleSubmit} className="pantry-form">
        <div className="form-group">
          <label htmlFor="foodItem">Food Item:</label>
          <input
            id="foodItem"
            type="text"
            name="foodItem"
            value={formData.foodItem}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="foodType">Food Type:</label>
          <input
            id="foodType"
            type="text"
            name="foodType"
            value={formData.foodType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sellBy">Sell By Date:</label>
          <input
            id="sellBy"
            type="date"
            name="sellBy"
            value={formData.sellBy}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiration">Expiration Date:</label>
          <input
            id="expiration"
            type="date"
            name="expiration"
            value={formData.expiration}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tossBy">Toss By Date:</label>
          <input
            id="tossBy"
            type="date"
            name="tossBy"
            value={formData.tossBy}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>

      <table className="pantry-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Location</th>
            <th>Food Type</th>
            <th>Sell By</th>
            <th>Expiration</th>
            <th>Toss By</th>
          </tr>
        </thead>
        <tbody>
          {pantryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.foodItem}</td>
              <td>{item.location}</td>
              <td>{item.foodType}</td>
              <td>{item.sellBy}</td>
              <td>{item.expiration}</td>
              <td>{item.tossBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pantry;