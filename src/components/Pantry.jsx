import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pantry.css";

//Defining Pantry Commponent
const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [formData, setFormData] = useState({
    foodItem: "",
    location: "Fridge", //  dropdown option
    foodType: "Fruits", //  dropdown option
    sellBy: "",
    expiration: "",
    tossBy: "",
  });
  const [editingId, setEditingId] = useState(null);
  // State to track if an item is being edited (store its ID)
    // Effect to fetch pantry items from the server when the component mounts

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        //get request
        const response = await axios.get("http://localhost:3001/api/pantry");
        setPantryItems(response.data);
      } catch (error) {
        console.error("Error fetching pantry items:", error);
      }
    };
    fetchPantryItems();
  }, []);
//handler to update form when values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
//handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        //update item if editing
        const response = await axios.put(`http://localhost:3001/api/pantry/${editingId}`, formData);
        setPantryItems(
          pantryItems.map((item) =>
            item._id === editingId ? { ...item, ...response.data } : item
          )
        );
      } else {
        const response = await axios.post("http://localhost:3001/api/pantry", formData);
        setPantryItems([...pantryItems, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error adding or updating pantry item:", error);
    }
  };
//handle to delete by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/pantry/${id}`);
      setPantryItems(pantryItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting pantry item:", error);
    }
  };
//handle to populate form for editing
  const handleEdit = (item) => {
    setFormData({
      foodItem: item.foodItem,
      location: item.location,
      foodType: item.foodType,
      sellBy: item.sellBy.split("T")[0], //only date portion
      expiration: item.expiration.split("T")[0],
      tossBy: item.tossBy.split("T")[0],
    });
    setEditingId(item._id);
  };
//reset form
  const resetForm = () => {
    setFormData({
      foodItem: "",
      location: "Fridge",
      foodType: "Fruits",
      sellBy: "",
      expiration: "",
      tossBy: "",
    });
    setEditingId(null);
  };
//function to format a date to a string
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");
// pantry component
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
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          >
            <option value="Fridge">Fridge</option>
            <option value="Countertop">Countertop</option>
            <option value="Pantry">Pantry</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="foodType">Food Type:</label>
          <select
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleInputChange}
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Grains">Grains</option>
            <option value="Proteins">Proteins</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Oil and Sugar">Oil and Sugar</option>
            <option value="Spices">Spices</option>
            <option value="Other">Other</option>
          </select>
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
        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
        {editingId && <button onClick={resetForm}>Cancel Edit</button>}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pantryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.foodItem}</td>
              <td>{item.location}</td>
              <td>{item.foodType}</td>
              <td>{formatDate(item.sellBy)}</td>
              <td>{formatDate(item.expiration)}</td>
              <td>{formatDate(item.tossBy)}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pantry;