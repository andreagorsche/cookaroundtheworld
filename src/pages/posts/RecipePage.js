import React from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData } from '../contexts/RecipeDataContext';
import { useSelector } from 'react-redux';

const RecipePage = () => {
  const { pageRecipe } = useRecipeData();

  // Conditionally render RecipeDisplay or RecipeEdit based on Redux state
  const isEditing = useSelector((state) => state.editing);

  return (
    <div>
      <h2>Recipe Page</h2>
      {isEditing ? <RecipeEdit /> : <RecipeDisplay />}
    </div>
  );
};

export default Recipe
