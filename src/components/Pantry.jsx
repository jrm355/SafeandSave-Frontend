import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for HTTP requests
import "./Pantry.css"; // Import the styles

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]); // Stores pantry items
  const [newItem, setNewItem] = useState({
    name: "",
    location: "fridge",
    type: "",
    sellBy: "",
    expiration: "",
    tossBy: "",
  });

  const API_URL = "http://localhost:3001/api/pantry"; // Your backend endpoint

  // Fetch pantry items on page load
  useEffect(() => {
    fetchPantryItems();
  }, []);

  // Fetch all pantry items
  const fetchPantryItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setPantryItems(response.data);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
    }
  };

  // Add a new pantry item
  const addPantryItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newItem);
      fetchPantryItems(); // Refresh the list after adding
      setNewItem({ name: "", location: "fridge", type: "", sellBy: "", expiration: "", tossBy: "" }); // Reset input fields
    } catch (error) {
      console.error("Error adding pantry item:", error);
    }
  };

  // Delete a pantry item
  const deletePantryItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPantryItems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting pantry item:", error);
    }
  };

  // Update a pantry item (Optional for later if you want edit functionality)
  const updatePantryItem = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      fetchPantryItems(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating pantry item:", error);
    }
  };

  return (
    <div className="pantry-container">
      <h1>What's in My Fridge?</h1>
      
      {/* Form to Add New Pantry Item */}
      <form onSubmit={addPantryItem} className="pantry-form">
        <input
          type="text"
          placeholder="Food Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <select
          value={newItem.location}
          onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
        >
          <option value="fridge">Fridge</option>
          <option value="pantry">Pantry</option>
          <option value="countertop">Countertop</option>
        </select>
        <input
          type="text"
          placeholder="Food Type"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        />
        <input
          type="date"
          placeholder="Sell By"
          value={newItem.sellBy}
          onChange={(e) => setNewItem({ ...newItem, sellBy: e.target.value })}
        />
        <input
          type="date"
          placeholder="Expiration"
          value={newItem.expiration}
          onChange={(e) => setNewItem({ ...newItem, expiration: e.target.value })}
        />
        <input
          type="date"
          placeholder="Toss By"
          value={newItem.tossBy}
          onChange={(e) => setNewItem({ ...newItem, tossBy: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      {/* Display Pantry Items */}
      <div className="pantry-items">
        {pantryItems.map((item) => (
          <div key={item._id} className="pantry-item">
            <h3>{item.name}</h3>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Sell By:</strong> {item.sellBy}</p>
            <p><strong>Expiration:</strong> {item.expiration}</p>
            <p><strong>Toss By:</strong> {item.tossBy}</p>
            <button onClick={() => deletePantryItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;