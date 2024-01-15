import React, { useState } from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData } from '../../contexts/RecipeDataContext';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { recipeData } = useRecipeData();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  if (!recipeData) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }


  return (
    <div>
      {isEditing ? (
        <RecipeEdit setIsEditing={setIsEditing} recipeData={recipeData} />
      ) : (
        <RecipeDisplay setIsEditing={setIsEditing} recipeData={recipeData} />
      )}
    </div>
  );
};

export default RecipePage;
