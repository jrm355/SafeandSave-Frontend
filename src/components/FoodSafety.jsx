import React, { useState } from "react";
import './FoodSafety.css'; // Ensure this file includes the scrollable container styles

const FoodSafety = () => {
  // Extended food data
  const foodData = [
    { food: "Canned Goods", safety: "1-2 years", notes: "As long as the can is not damaged, bulging, or rusted." },
    { food: "Dry Goods (Pasta, Rice, etc.)", safety: "6 months to 1 year", notes: "Typically, dry pasta and rice last well beyond the date." },
    { food: "Frozen Foods", safety: "3-6 months", notes: "Freezer burn may occur but it's still safe to eat." },
    { food: "Milk (in plastic bottles)", safety: "1 week after sell-by date", notes: "If milk smells or tastes sour, discard it." },
    { food: "Eggs", safety: "3-5 weeks", notes: "Eggs can often be safe after the sell-by date. Perform the 'water test'." },
    { food: "Cheese (Soft)", safety: "1 week after sell-by date", notes: "Soft cheeses spoil faster, discard if mold appears." },
    { food: "Cheese (Hard)", safety: "2-3 weeks after sell-by date", notes: "Hard cheeses last longer, mold can be cut off." },
    { food: "Bread", safety: "3-7 days", notes: "Bread can last a week past the date if stored properly." },
    { food: "Fruits (Citrus, Apples)", safety: "1-2 weeks", notes: "Apples, citrus, and other fruits can last a week or two." },
    { food: "Vegetables (Leafy Greens)", safety: "1-3 days", notes: "Fresh greens should be used soon after the sell-by date." },
    { food: "Meat (Fresh, Ground)", safety: "1-2 days", notes: "Ground meat should be cooked or frozen immediately." },
    { food: "Meat (Steaks, Roasts)", safety: "3-5 days", notes: "Steak and roasts last up to 5 days if stored properly." },
    { food: "Chicken (Fresh)", safety: "1-2 days", notes: "Raw chicken should be cooked within 1-2 days." },
    { food: "Yogurt", safety: "1-3 weeks", notes: "If unopened, yogurt can last 1-3 weeks past the date." },
    { food: "Deli Meats", safety: "3-5 days", notes: "Sliced deli meats can be safe 3-5 days past the sell-by date." },
    { food: "Condiments (Ketchup, Mustard)", safety: "6 months to 1 year", notes: "Condiments last much longer than their printed date." },
    { food: "Butter", safety: "2-3 weeks (in the fridge)", notes: "Butter can last several weeks after the date if stored properly." },
    { food: "Processed Meats (Bacon, Sausages)", safety: "1 week", notes: "Bacon and sausages should be consumed within a week." },
    { food: "Fish (Fresh)", safety: "1-2 days", notes: "Fresh fish should be cooked within a day or two." },
    { food: "Seafood (Frozen)", safety: "6 months", notes: "Frozen seafood can last 6 months or longer." },
    { food: "Nut Butter", safety: "1 year", notes: "Unopened jars last about a year; check for oil separation." },
    { food: "Cereal", safety: "6 months to 1 year", notes: "Dry cereal lasts well beyond the printed date if sealed." },
    { food: "Pickles", safety: "1 year", notes: "Pickles last a year or more if unopened and refrigerated." },
    { food: "Soda", safety: "6-9 months", notes: "Soda may lose fizz but is safe to drink for months." },
    { food: "Chips", safety: "1-2 months", notes: "Sealed chips can last a couple of months." },
    { food: "Pies (Fruit)", safety: "3-5 days", notes: "Refrigerate fruit pies for longer shelf life." },
    { food: "Pies (Cream)", safety: "2-3 days", notes: "Cream pies spoil quickly; consume within 3 days." },
    { food: "Ice Cream", safety: "2-4 months", notes: "Avoid freezer burn for better taste and texture." },
    { food: "Granola Bars", safety: "6-9 months", notes: "Sealed granola bars last up to a year." },
    { food: "Spices", safety: "1-2 years", notes: "Flavor may diminish over time but remains safe." },
    { food: "Honey", safety: "Indefinite", notes: "Honey never spoils if sealed properly." },
    { food: "Chocolate", safety: "6 months to 1 year", notes: "May develop a white bloom but is still safe to eat." },
    { food: "Coffee (Ground)", safety: "3-6 months", notes: "Ground coffee loses freshness but remains safe to brew." }
  ];

  const [sortedData, setSortedData] = useState(foodData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sorted = [...sortedData].sort((a, b) => {
      if (a.food < b.food) return newSortOrder === "asc" ? -1 : 1;
      if (a.food > b.food) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = sortedData.filter(item =>
    item.food.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="food-safety-container">
      <h1>Food Safety</h1>
      <h2>How Long Can Foods Last After Sell-by Date?</h2>

      <input
        type="text"
        placeholder="Search for a food..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <button onClick={handleSort} className="sort-button">
        Sort Alphabetically ({sortOrder === "asc" ? "A-Z" : "Z-A"})
      </button>

      <div className="table-scroll">
        <table className="food-safety-table">
          <thead>
            <tr>
              <th>Food Type</th>
              <th>Can Be Consumed After Sell-by/Use-by Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{item.safety}</td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodSafety;