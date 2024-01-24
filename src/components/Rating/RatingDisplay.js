// RatingDisplay.jsx
import React from 'react';
import { useRating } from '../../contexts/RatingDataContext';
import { useParams, useHistory } from 'react-router';

function RatingDisplay({ isEditing, setIsEditing }) {
  const id = useParams().id;
  const ratingData = useRating();
  const history = useHistory();

  const handleEditClick = async () => {
    history.push(`/ratings/${id}`);
    setIsEditing(true);
  };

  return (
    <div>
      <p>Your Rating: {ratingData && ratingData.length > 0 ? ratingData[0].stars : 'Not rated yet'}</p>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
}

export default RatingDisplay;
