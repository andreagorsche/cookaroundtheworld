import React, { useState } from 'react';
import RatingDisplay from './RatingDisplay';
import { useRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router-dom';
import RatingVote from './RatingVote';

const RecipeRating = () => {
  const rating = useRating();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);


  if (!rating) {
    // Data is still being fetched or is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Rating</h2>
      {isEditing ? <RatingVote setIsEditing={setIsEditing} /> : <RatingDisplay setIsEditing={setIsEditing} />}
    </div>
  );
};

export default RecipeRating
