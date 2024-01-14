import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Rating } from '@mui/material';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function RatingDisplay({ isEditing, setIsEditing }) {
  const id = useParams().id;
  const ratingData = useRating();
  const setRating = useSetRating();
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [averageRating, setAverageRating] = useState(null);

  const handleEditClick = async () => {
    history.push(`/ratings/${id}`);
    setIsEditing(true);
  };

  const calculateAverageRating = () => {
    const totalRatings = ratingData.length;
    const sumOfRatings = ratingData.reduce((sum, rating) => sum + rating.stars, 0);

    return totalRatings > 0 ? sumOfRatings / totalRatings : 0;
  };

  useEffect(() => {
    const avgRating = calculateAverageRating();
    setAverageRating(avgRating);
  }, [ratingData]);


  return (
    <>
          <div>
            <p>Average Rating: {averageRating}</p>
            <Rating name="recipe-rating" value={averageRating} precision={0.5} readOnly />
          </div>
          <div>
            <p>Your Rating: {ratingData.length > 0 ? ratingData[0].stars : 'Not rated yet'}</p>
          </div>
          <button onClick={handleEditClick}>Edit</button>
      ) : (
        <>
          <div>
            <p>Average Rating: {averageRating}</p>
            <Rating name="recipe-rating" value={averageRating} precision={0.5} readOnly />
          </div>
        </>
      )}
    </>
  );
}

export default RatingDisplay;
