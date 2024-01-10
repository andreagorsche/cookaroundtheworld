// SearchBar.js
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSetRecipeData } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';

const SearchBar = () => {
  const setRecipeData = useSetRecipeData();

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
          <Dropdown.Item onClick={() => handleCuisineChange('american')}>
            American
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('austrian')}>
            Austrian
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('caribbean')}>
            Caribbean
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('chinese')}>
            Chinese
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('french')}>
            French
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('german')}>
            German
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('greek')}>
            Greek
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('indian')}>
            Indian
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('italian')}>
            Italian
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('mediteranean')}>
            Mediteranean
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('mexican')}>
            Mexican
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('slovak')}>
            Slovak
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleCuisineChange('spanish')}>
            Spanish          
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SearchBar;
