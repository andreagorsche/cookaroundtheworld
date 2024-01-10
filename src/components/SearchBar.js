// SearchBar.js
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSetRecipeData } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';

const SearchBar = () => {
  const setRecipeData = useSetRecipeData();
  const cuisineChoices = ['american', 'austrian', 'caribbean', 'chinese', 'french', 'german', 'greek', 'indian', 'italian', 'mediterranean', 'mexican', 'slovak', 'spanish']

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
    </>
  );
};

export default SearchBar;
