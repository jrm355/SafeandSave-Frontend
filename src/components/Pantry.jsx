import React, { useState } from "react";
import "./Pantry.css";

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([
    { id: 1, name: "", location: "", type: "", sellBy: "", expiration: "", tossBy: "" },
  ]);

  const handleInputChange = (id, field, value) => {
    setPantryItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="pantry-container">
      <h1>What's in My Pantry?</h1>
      <div className="table-container">
        <div className="header-row">
          <div>Food Item</div>
          <div>Location</div>
          <div>Food Type</div>
          <div>Sell By</div>
          <div>Expiration</div>
          <div>Toss By</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>
        {pantryItems.map((item) => (
          <div key={item.id} className="input-row">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleInputChange(item.id, "name", e.target.value)}
              placeholder="Enter food item"
            />
            <select
              value={item.location}
              onChange={(e) => handleInputChange(item.id, "location", e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="fridge">Fridge</option>
              <option value="countertop">Countertop</option>
              <option value="pantry">Pantry</option>
            </select>
            <input
              type="text"
              value={item.type}
              onChange={(e) => handleInputChange(item.id, "type", e.target.value)}
              placeholder="Enter food type"
            />
            <input
              type="date"
              value={item.sellBy}
              onChange={(e) => handleInputChange(item.id, "sellBy", e.target.value)}
            />
            <input
              type="date"
              value={item.expiration}
              onChange={(e) => handleInputChange(item.id, "expiration", e.target.value)}
            />
            <input
              type="date"
              value={item.tossBy}
              onChange={(e) => handleInputChange(item.id, "tossBy", e.target.value)}
            />
            <button onClick={() => console.log("Edit", item)}>Edit</button>
            <button
              onClick={() =>
                setPantryItems((prevItems) => prevItems.filter((i) => i.id !== item.id))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setPantryItems((prevItems) => [
            ...prevItems,
            {
              id: prevItems.length + 1,
              name: "",
              location: "",
              type: "",
              sellBy: "",
              expiration: "",
              tossBy: "",
            },
          ])
        }
      >
        Add New Item
      </button>
    </div>
  );
};

export default Pantry;