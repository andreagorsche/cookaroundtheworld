// AverageRatingDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router-dom';


function AverageRatingDisplay({ recipeId }) {
  const ratingData = useRating();
  const [averageRating, setAverageRating] = useState(0);
  const { id } = useParams();

  const calculateAverageRating = () => {
    if (!ratingData || ratingData.length === 0) {
      return 0;
    }

    const recipeRatings = ratingData.filter((rating) => rating.recipe === id);

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
    </div>
  );
}

export default AverageRatingDisplay;
