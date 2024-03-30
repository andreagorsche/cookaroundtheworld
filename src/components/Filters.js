import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select';
import { useFetchRecipes } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';

const Filters = ({ cuisineChoices, popularIngredients }) => {
  const fetchRecipes = useFetchRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const fetchRecipesWithFilters = async () => {
    try {
      const endpoint = `/recipes/?cuisine=${selectedCuisine}&ingredients=${selectedIngredients.join(',')}&search=${searchTerm}`;
      const { data } = await axiosReq.get(endpoint);
      fetchRecipes(endpoint); // Trigger data fetching with filters
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    fetchRecipesWithFilters();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCuisine('');
    setSelectedIngredients([]);
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
    fetchRecipesWithFilters();
  };

  const handleIngredientsChange = (selectedIngredients) => {
    setSelectedIngredients(selectedIngredients.map(ingredient => ingredient.value));
    fetchRecipesWithFilters();
  };

  const resetCuisineFilter = () => {
    setSelectedCuisine('');
    fetchRecipesWithFilters();
  };

  return (
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
          options={popularIngredients}
          onChange={handleIngredientsChange}
          placeholder="Select Ingredients"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>          
    </div>
  );
};

export default Filters;
