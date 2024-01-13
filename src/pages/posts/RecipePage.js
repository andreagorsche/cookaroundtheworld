import React from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData, useEditRecipe } from '../../contexts/RecipeDataContext';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { pageRecipe } = useRecipeData();
  const { isEditing } = useEditRecipe();
  const { id } = useParams();


  if (!pageRecipe.results) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recipe Page</h2>
      {isEditing ? <RecipeEdit /> : <RecipeDisplay />}
    </div>
  );
};

export default RecipePage
