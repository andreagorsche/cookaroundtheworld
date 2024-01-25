import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';
import { useCurrentRecipe } from '../../contexts/RecipeDataContext';


const RecipePage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const currentRecipe = useCurrentRecipe();



  // Function to handle the "Edit Recipe" button click
  const handleEditClick = () => {
    history.push(`/recipes/${id}`);
    setIsEditing(true);
  };

  // Function to handle the cancel action in RecipeEdit component
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <RecipeEdit currentRecipe={currentRecipe} setIsEditing={setIsEditing} handleCancelEdit={handleCancelEdit} />
      ) : (
        <RecipeDisplay handleEditClick={handleEditClick} />
      )}
    </div>
  );
};

export default RecipePage;
