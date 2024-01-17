import React, { useState } from 'react';
import RecipeDisplay from './RecipeDisplay';
import RecipeEdit from './RecipeEdit';

const RecipePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? <RecipeEdit setIsEditing={setIsEditing} /> : <RecipeDisplay setIsEditing={setIsEditing} />}
    </div>
  );
};

export default RecipePage