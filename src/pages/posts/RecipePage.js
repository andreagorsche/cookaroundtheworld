import React, { useState, useEffect } from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useRecipeData, useFetchRecipes } from '../../contexts/RecipeDataContext';
import { useParams, useLocation } from 'react-router-dom';

const RecipePage = () => {
  const { recipeData } = useRecipeData();
  const { id } = useParams();
  const fetchRecipes = useFetchRecipes();
  const [isEditing, setIsEditing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setHasLoaded(true);
    fetchRecipes(`/recipes/?${id}`);
  }, [id, pathname, fetchRecipes]);

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
