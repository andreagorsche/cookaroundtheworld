import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import { useFetchRecipes, useRecipeData } from '../contexts/RecipeDataContext';
import Button from "react-bootstrap/Button";

const Filters = ({ cuisineChoices, popularIngredients, hasLoaded, setHasLoaded }) => {
  const fetchRecipes = useFetchRecipes();
  const recipeData = useRecipeData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const fetchRecipesWithFilters = async () => {
    try {
      setHasLoaded(false); 
      const endpoint = `/recipes/?cuisine=${selectedCuisine}&ingredients=${selectedIngredients.join(',')}&search=${searchTerm}`;
      await fetchRecipes(endpoint); // Trigger data fetching with filters
      setHasLoaded(true); // Set loading to false after successful fetching
    } catch (err) {
      console.error(err);
      setHasLoaded(false); // Set loading to false in case of an error
    }
  };

  const handleSearch = () => {
    fetchRecipesWithFilters();
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleIngredientsChange = (selectedIngredients) => {
    setSelectedIngredients(selectedIngredients.map(ingredient => ingredient.value));
  };

  const resetCuisineFilter = () => {
    setSelectedCuisine('');
    fetchRecipesWithFilters();
  };

  return (
    <>
    <div>
      <p style={{ margin: '2rem' }}>Please enter your search criteria here:</p>
    </div>
    <div className='d-flex justify-content-center'>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterKeyPress}
        />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCuisine || 'Pick Cuisine'} 
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <>
              {cuisineChoices.map((cuisine, index) => (
                <Dropdown.Item key={index} onClick={() => handleCuisineChange(cuisine)}>
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={resetCuisineFilter}>All Cuisines</Dropdown.Item>
            </>
          </Dropdown.Menu>
        </Dropdown>
        <Select
          isMulti
          value={selectedIngredients.value}
          options={popularIngredients}
          onChange={handleIngredientsChange}
          placeholder="Select Ingredients"
        />
        <Button style={{ backgroundColor: 'indigo', margin: '10px', borderColor: 'transparent' }}  onClick={handleSearch}>Search</Button>
   
      </div>          
    </div>
    <div>
      <p style={{ margin: '2rem' }}>Click the search button or press enter to begin searching.</p>
    </div>
  </>
  );
};

export default Filters;
