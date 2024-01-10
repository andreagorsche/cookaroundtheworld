// SearchBar.js
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSetRecipeData } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';
import Select from 'react-select';

const SearchBar = () => {
  const setRecipeData = useSetRecipeData();
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

  const handleIngredientChange = async (ingredients) => {
   
    try {
      
      // Fetch recipes with the selected ingredient filter
      const { data } = await axiosReq.get(`/recipes/?ingredients=${ingredients}`);
      
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
        onChange={handleIngredientChange}
        placeholder="Select Ingredients"
      />
    </>
  );
};

export default SearchBar;
