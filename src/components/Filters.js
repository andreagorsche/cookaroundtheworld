// SearchBar.js
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSetRecipeData } from '../contexts/RecipeDataContext';
import { axiosReq } from '../api/axiosDefaults';
import Select from 'react-select';

const Filters = () => {
  const setRecipeData = useSetRecipeData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  const fetchRecipesWithFilters = async () => {
    try {
      const endpoint = `/recipes/?cuisine=${selectedCuisine}&ingredients=${selectedIngredients.join(',')}&search=${searchTerm}`;
      const { data } = await axiosReq.get(endpoint);
      setRecipeData((prevData) => ({
        ...prevData,
        results: data.results,
      }));
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
      e.preventDefault(); // Prevent the default form submission behavior
      handleSearch(); // Call handleSearch function when Enter key is pressed
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

  // Function to reset the cuisine filter
  const resetCuisineFilter = () => {
    setSelectedCuisine('');
    // Refetch recipes without cuisine filter
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
