import React from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData, useEditRecipe } from '../../contexts/RecipeDataContext';

const RecipePage = () => {
  const { pageRecipe } = useRecipeData();
  const { isEditing } = useEditRecipe();

  return (
    <div>
      <h2>Recipe Page</h2>
      {isEditing ? <RecipeEdit /> : <RecipeDisplay />}
    </div>
  );
};

export default RecipePage
