import React, { useState } from 'react';
import { useRating, useSetRating } from './RatingContext'; // Adjust the path based on your file structure
import Rating from './Rating'; // Adjust the path based on your file structure

const RecipeDetails = () => {
  const ratings = useRating();
  const setRating = useSetRating();
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    // Update the user's rating locally
    setUserRating(newRating);
    
    // Send a request to update the rating on the server (adjust this according to your API)
    // Assuming you have an API endpoint like /ratings/:recipeId to update the rating
    // You may need to adjust the API endpoint based on your backend implementation
    // axios.put(`/ratings/${recipeId}/`, { stars: newRating });
  };

  return (
    <div>
      <h1>Recipe Details</h1>
      {/* Display existing average rating */}
      <p>Average Rating: {calculateAverageRating(ratings)}</p>
      
      {/* Display and allow the user to set their rating */}
      <Rating value={userRating} onRatingChange={handleRatingChange} />
    </div>
  );
};

// Helper function to calculate average rating
const calculateAverageRating = (ratings) => {
  if (ratings && ratings.length > 0) {
    const totalStars = ratings.reduce((acc, rating) => acc + rating.stars, 0);
    return (totalStars / ratings.length).toFixed(1);
  }
  return 0;
};

export default RecipeDetails;
