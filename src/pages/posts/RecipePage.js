import React, { useState } from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData } from '../../contexts/RecipeDataContext';
import { useParams } from 'react-router-dom';
import Rating from '../../components/Rating/RecipeRating';

const RecipePage = () => {
  const { pageRecipe } = useRecipeData();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);



  if (!pageRecipe.results) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recipe Page</h2>
      {isEditing ? <RecipeEdit setIsEditing={setIsEditing} /> : <RecipeDisplay setIsEditing={setIsEditing} />}
    </div>
  );
};

export default RecipePage
