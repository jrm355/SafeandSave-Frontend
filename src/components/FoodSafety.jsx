import React from "react";
import './FoodSafety.css'; // You can style the table in the CSS file if needed

const FoodSafety = () => {
  return (
    <div className="food-safety-container">
      <h1>Food Safety</h1>
      <h2>How Long Can Foods Last After Sell-by Date?</h2>
      
      {/* Chart of major foods and their safety after sell-by date */}
      <table className="food-safety-table">
        <thead>
          <tr>
            <th>Food Type</th>
            <th>Can Be Consumed After Sell-by/Use-by Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Canned Goods</td>
            <td>1-2 years</td>
            <td>As long as the can is not damaged, bulging, or rusted. Foods like canned vegetables and soups are often good for months after the sell-by date.</td>
          </tr>
          <tr>
            <td>Dry Goods (Pasta, Rice, etc.)</td>
            <td>6 months to 1 year</td>
            <td>Typically, dry pasta and rice last well beyond the date, but the texture may degrade over time. Keep in a cool, dry place.</td>
          </tr>
          <tr>
            <td>Frozen Foods</td>
            <td>3-6 months</td>
            <td>Freezer burn may occur but it's still safe to eat. Meats and frozen vegetables can often last much longer if kept at a consistent freezing temperature.</td>
          </tr>
          <tr>
            <td>Milk (in plastic bottles)</td>
            <td>1 week after sell-by date</td>
            <td>If milk smells or tastes sour, discard it. Always refrigerate after opening and check the smell before use.</td>
          </tr>
          <tr>
            <td>Eggs</td>
            <td>3-5 weeks</td>
            <td>Eggs can often be safe after the sell-by date. Perform the "water test" (float test) to check for freshness: fresh eggs sink, bad eggs float.</td>
          </tr>
          <tr>
            <td>Cheese (Soft)</td>
            <td>1 week after sell-by date</td>
            <td>Soft cheeses (like cream cheese, ricotta, or cottage cheese) spoil faster, and any signs of mold should be considered a sign to discard.</td>
          </tr>
          <tr>
            <td>Cheese (Hard)</td>
            <td>2-3 weeks after sell-by date</td>
            <td>Hard cheeses (like cheddar or parmesan) last longer but can dry out. Mold can be cut off safely on hard cheeses, but use your judgment.</td>
          </tr>
          <tr>
            <td>Bread</td>
            <td>3-7 days</td>
            <td>Bread can usually last a week past the date if stored properly. If mold or unusual smells appear, discard it.</td>
          </tr>
          <tr>
            <td>Fruits (Citrus, Apples)</td>
            <td>1-2 weeks</td>
            <td>Apples, citrus, and other fruits can last a week or two past their sell-by date, but their texture and flavor may degrade over time.</td>
          </tr>
          <tr>
            <td>Vegetables (Leafy Greens)</td>
            <td>1-3 days</td>
            <td>Fresh greens like spinach or lettuce should be used soon after the sell-by date, but they can be safe if stored properly in the fridge.</td>
          </tr>
          <tr>
            <td>Meat (Fresh, Ground)</td>
            <td>1-2 days</td>
            <td>Ground meat, poultry, and fish should be cooked or frozen immediately after purchase, but they can last up to 1-2 days in the fridge if stored properly.</td>
          </tr>
          <tr>
            <td>Meat (Steaks, Roasts)</td>
            <td>3-5 days</td>
            <td>Steak and roasts may last up to 5 days after sell-by if kept properly in the fridge. Always check for unusual smells or discoloration.</td>
          </tr>
          <tr>
            <td>Chicken (Fresh)</td>
            <td>1-2 days</td>
            <td>Raw chicken should be cooked within 1-2 days of the sell-by date for safety.</td>
          </tr>
          <tr>
            <td>Yogurt</td>
            <td>1-3 weeks</td>
            <td>If unopened, yogurt can last 1-3 weeks past the date. If opened, consume within 5-7 days.</td>
          </tr>
          <tr>
            <td>Deli Meats</td>
            <td>3-5 days</td>
            <td>Sliced deli meats can be safe to eat 3-5 days past the sell-by date, but discard if any signs of spoilage like an off smell or slimy texture appear.</td>
          </tr>
          <tr>
            <td>Condiments (Ketchup, Mustard)</td>
            <td>6 months to 1 year</td>
            <td>Condiments, if stored correctly, often last much longer than their printed date. Use your judgment when checking for spoilage.</td>
          </tr>
          <tr>
            <td>Butter</td>
            <td>2-3 weeks (in the fridge)</td>
            <td>Butter can last several weeks after the date if stored properly in the fridge. It can be frozen for longer-term storage.</td>
          </tr>
          <tr>
            <td>Processed Meats (Bacon, Sausages)</td>
            <td>1 week</td>
            <td>Bacon and sausages should be consumed within a week of the sell-by date. They can be frozen to extend shelf life.</td>
          </tr>
          <tr>
            <td>Fish (Fresh)</td>
            <td>1-2 days</td>
            <td>Fresh fish should be cooked within a day or two, as it spoils quickly.</td>
          </tr>
          <tr>
            <td>Seafood (Frozen)</td>
            <td>6 months</td>
            <td>Frozen seafood can last 6 months or longer but should be used soon after thawing to ensure quality.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodSafety;
