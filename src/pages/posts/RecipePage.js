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

   // Find the specific recipe in the recipeData array based on the id
   const currentRecipe = recipeData.results.find(recipe => recipe.id === parseInt(id, 10));

   if (!currentRecipe) {
     // Recipe not found, handle accordingly
     return <div>Recipe not found</div>;
   }

  return (
    <div>
      {isEditing ? (
        <RecipeEdit setIsEditing={setIsEditing} recipeData={currentRecipe} />
      ) : (
        <RecipeDisplay setIsEditing={setIsEditing} recipeData={currentRecipe} />
      )}
    </div>
  );
};

export default RecipePage;
