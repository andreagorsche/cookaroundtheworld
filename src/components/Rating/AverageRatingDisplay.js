// AverageRatingDisplay.jsx
import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { useRating } from '../../contexts/RatingDataContext';

function AverageRatingDisplay({ recipeId }) {
  const ratingData = useRating();
  const [averageRating, setAverageRating] = useState(0);

  const calculateAverageRating = () => {
    if (!ratingData || ratingData.length === 0) {
      return 0;
    }

    const recipeRatings = ratingData.filter((rating) => rating.recipe === recipeId);

    if (recipeRatings.length === 0) {
      return 0;
    }

    const totalRatings = recipeRatings.length;
    const sumOfRatings = recipeRatings.reduce((sum, rating) => sum + rating.stars, 0);

    return totalRatings > 0 ? sumOfRatings / totalRatings : 0;
  };

  useEffect(() => {
    const avgRating = calculateAverageRating();
    setAverageRating(avgRating);
  }, [ratingData, recipeId]);

  return (
    <div>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
      <Rating name="recipe-rating" value={averageRating} precision={0.5} readOnly />
    </div>
  );
}

export default AverageRatingDisplay;
