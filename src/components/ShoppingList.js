import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ setItems, items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  })
  
  const searchDisplayItems = itemsToDisplay.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  function onSearchChange (e) {
    setSearch(e.target.value)
  }

  function onItemFormSubmit (newItem) {
    setItems(prevItems => [...prevItems, newItem])
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} onSearchChange={onSearchChange} search={search}/>
      <ul className="Items">
        {searchDisplayItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
