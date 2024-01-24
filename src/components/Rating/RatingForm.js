import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";

const RatingForm = ({ owner, recipe_id }) => {
  const [stars, setStars] = useState(1);
  const [existingRating, setExistingRating] = useState(null);

  useEffect(() => {
    // Fetch existing rating when the component mounts
    const fetchExistingRating = async () => {
      try {
        const response = await axiosReq.get(`/ratings/?recipe_id=${recipe_id}&owner=${owner}`);

        // Assuming there is only one rating per user per recipe
        const existingRating = response.data[0];

        setExistingRating(existingRating);
        if (existingRating) {
          setStars(existingRating.stars);
        }
      } catch (error) {
        // If there's an error, set existingRating to null
        setExistingRating(null);
        console.error('Error fetching existing rating:', error.response?.data);
      }
    };

    fetchExistingRating();
  }, [recipe_id, owner]);

  const handleRatingChange = (e) => {
    setStars(e.target.value);
  };

  const handleRatingSubmit = async () => {
    try {
      if (existingRating) {
        // If there's an existing rating, update it with a PUT request
        const response = await axiosReq.put(`/ratings/${existingRating.id}/`, {
          stars: stars,
        });

        console.log('Rating updated successfully:', response.data);
      } else {
      console.log('Sending data:', {
        owner: owner,
        recipe_id: recipe_id,
        stars: stars,
      });

        // If there's no existing rating, create a new one with a POST request
        const response = await axiosReq.post('/ratings/', {
            owner: owner,
            recipe: recipe_id,
            stars: stars,
        },
        );

        console.log('Rating submitted successfully:', response.data);
      }
    } catch (error) {
      console.error('Error submitting/updating rating:', error.response?.data);
    }
  };


  return (
    <div>
      <label>
        Rating:
        <input
          type="number"
          value={stars}
          onChange={handleRatingChange}
          min="1"
          max="5"
        />
      </label>
      <button onClick={handleRatingSubmit}>Submit Rating</button>
    </div>
  );
};

export default RatingForm;
