import React, { useEffect, useState } from 'react';
import { useRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router-dom';

function AverageRatingDisplay() {
  const ratingData = useRating();
  const [averageRating, setAverageRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    console.log('Rating Data:', ratingData);
    const calculateAverageRating = () => {
      if (!ratingData || ratingData.length === 0) {
        return 0;
      }

      const recipeRatings = ratingData.filter((rating) => rating.recipe === parseInt(id));

      if (recipeRatings.length === 0) {
        return 0;
      }

      const totalRatings = recipeRatings.length;
      const sumOfRatings = recipeRatings.reduce((sum, rating) => sum + rating.stars, 0);

      const calculatedAverage = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

      console.log('Total Ratings:', totalRatings);
      console.log('Sum of Ratings:', sumOfRatings);
      console.log('Calculated Average:', calculatedAverage);

      return calculatedAverage;
    };

    const avgRating = calculateAverageRating();
    setAverageRating(avgRating);
  }, [ratingData, id]);

  return (
    <div>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
    </div>
  );
}

export default AverageRatingDisplay;
