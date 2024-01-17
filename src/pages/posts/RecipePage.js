import React, { useState, useEffect } from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useCurrentRecipe, useSetCurrentRecipe, useFetchRecipeById } from '../../contexts/RecipeDataContext';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const { currentRecipe } = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const fetchRecipeById = useFetchRecipeById();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRecipeById(id, setCurrentRecipe);
  }, [id, setCurrentRecipe]);

  console.log('Current Recipe:', currentRecipe); 

  return (
    <div>
      <h2>Recipe Page</h2>
      {isEditing ? <RecipeEdit currentRecipe={currentRecipe} setCurrentRecipe={setCurrentRecipe} fetchRecipeById={fetchRecipeById} isEditing={isEditing} setIsEditing={setIsEditing} /> : <RecipeDisplay currentRecipe={currentRecipe} isEditing={isEditing} setIsEditing={setIsEditing} />}
    </div>
  );
};

export default RecipePage