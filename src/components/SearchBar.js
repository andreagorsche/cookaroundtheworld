import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useRecipeData, useSetRecipeData } from '../contexts/RecipeDataContext';


const SearchBar = () => {
    const recipes = useRecipeData();
    const setRecipeData = useSetRecipeData();

  return (
    <>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Pick Cuisine
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}

export default SearchBar