// SearchBar.js
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { RecipeDataProvider, useSetRecipeData } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';
import Select from 'react-select';

const SearchBar = () => {
  const setRecipeData = useSetRecipeData();
  const [filters, setFilters] = useState({ keyword: '', cuisine: '', ingredients: [] });

  const cuisineChoices = ['american', 'austrian', 'caribbean', 'chinese', 'french', 'german', 'greek', 'indian', 'italian', 'mediterranean', 'mexican', 'slovak', 'spanish']
  const popularIngredients = [
    { value: 'pasta', label: 'Pasta' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'rice', label: 'Rice' },
    { value: 'chicken', label: 'chicken' },
    { value: 'beef', label: 'Beef' },
    { value: 'pork', label: 'Pork' },
    { value: 'lamb', label: 'Lamb' },
    { value: 'duck', label: 'Duck' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'zucchini', label: 'Zucchini' },
    { value: 'aubergine', label: 'Aubergine' },
    { value: 'mushrooms', label: 'Mushrooms' },
    { value: 'salad', label: 'Salad' },
    { value: 'brokkoli', label: 'Brokkoli' },
    { value: 'cheese', label: 'Cheese' },
  ]

const fetchRecipesWithFilters = async (filterOptions) => {
  try {
    const { cuisine, ingredients, keyword } = filterOptions;

    // Construct the endpoint with all the filters
    const endpoint = `/recipes/?cuisine=${cuisine || ''}&ingredients=${ingredients || ''}&keyword=${keyword || ''}`;
    
    const { data } = await axiosReq.get(endpoint);

    setRecipeData((prevData) => ({
      ...prevData,
      results: data.results,
    }));
  } catch (err) {
    console.error(err);
  }
};

  const handleKeywordChange = (e) => {
    setFilters({ ...filters, keyword: e.target.value });
    fetchRecipesWithFilters({ ...filters, keyword: e.target.value });
  };

  const searchRecipes = () => {
    fetchRecipesWithFilters(filters);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRecipes();
    }
  };

  
    const handleCuisineChange = async (cuisine) => {
    try {
      // Fetch recipes with the selected cuisine filter
      const { data } = await axiosReq.get(`/recipes/?cuisine=${cuisine}`);
      
      setRecipeData((prevData) => ({
        ...prevData,
        results: data.results,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIngredientsChange = async (selectedIngredients) => {
    try {

      // Format the selected ingredients as a comma-separated list
      const ingredientsList = selectedIngredients.map(ingredient => ingredient.value).join(',');

      // Fetch recipes with the selected ingredients filter
      const { data } = await axiosReq.get(`/recipes/?ingredients=${ingredientsList}`);
      
      setRecipeData((prevData) => ({
        ...prevData,
        results: data.results,
      }));
    } catch (err) {
      console.log(err);
    }
  };


  
  return (
    <>
     <input
    type="text"
    placeholder="Search by keyword"
    onChange={handleKeywordChange}
    onKeyPress={handleKeyPress}
    />
    <button onClick={searchRecipes}>Search</button>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Pick Cuisine
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {cuisineChoices.map((cuisine, index) => (
            <Dropdown.Item key={index} onClick={() => handleCuisineChange(cuisine)}>
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Select
        isMulti
        options={popularIngredients}
        onChange={handleIngredientsChange}
        placeholder="Select Ingredients"
      />
    </>
  );
};

export default SearchBar;
