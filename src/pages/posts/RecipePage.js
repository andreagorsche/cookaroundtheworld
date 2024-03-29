import React, { useState } from 'react';
import RecipeDisplay from './RecipeDisplay';
import EditRecipeForm from './EditRecipeForm';


const RecipePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle the "Edit Recipe" button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle the cancel action in RecipeEdit component
  const handleCancelEdit = () => {
    setIsEditing(false);
  };


  return (
    <div>
      {isEditing ? (
        <EditRecipeForm setIsEditing={setIsEditing} handleCancelEdit={handleCancelEdit} />
      ) : (
        <RecipeDisplay handleEditClick={handleEditClick} />
      )}
    </div>
  );
};

export default RecipePage;
