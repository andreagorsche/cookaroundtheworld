// SearchBar.js
import React, { useState } from "react";
import { useRecipeData } from "../contexts/RecipeDataContext";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const recipeData = useRecipeData();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  console.log("recipeData:", recipeData);

  if (!Array.isArray(recipeData.results)) {
    console.error("Recipe results is not an array:", recipeData.results);
    return null; 
  }

  return (
    <div>
      <h1>Search</h1>
      <div className="d-flex justify-content-center h-100 mb-3">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => handleSearch()}> Search </button>
        </div>
        <div className="dropdown">
          {recipeData.results
            .filter((recipe) => {
              const searchTerm = value.toLowerCase();
              const recipeTitle = recipe && recipe.title ? recipe.title.toLowerCase() : '';
              const recipeDescription = recipe && recipe.description ? recipe.description.toLowerCase() : '';

              return (
                searchTerm &&
                (recipeTitle.startsWith(searchTerm) ||
                recipeDescription.startsWith(searchTerm)) &&
                (recipeTitle !== searchTerm || recipeDescription !== searchTerm)
              );
            })
            .slice(0, 10)
            .map((recipe) => (
              <div
                onClick={() => onSearch(recipe.title)}
                className="dropdown-row"
                key={recipe.id}
              >
                {recipe.id}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
