// SearchBar.js
import React, { useState } from "react";
import { useRecipeData, useSetRecipeData } from "../contexts/RecipeDataContext";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const setRecipeData = useSetRecipeData();
  const recipeData = useRecipeData();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  console.log("recipeData.pageRecipe.results:", recipeData.pageRecipe.results);

  if (!Array.isArray(recipeData.pageRecipe.results)) {
    console.error("Recipe results is not an array:", recipeData.pageRecipe.results);
    return null; // or handle the error accordingly
  }

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => handleSearch()}> Search </button>
        </div>
        <div className="dropdown">
          {recipeData.pageRecipe.results
            .filter((recipe) => {
              const searchTerm = value.toLowerCase();
              const recipeTitle = recipe.title ? recipe.title.toLowerCase() : '';
              const recipeDescription = recipe.description ? recipe.description.toLowerCase() : '';

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
