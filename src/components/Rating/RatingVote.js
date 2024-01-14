import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Alert } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router';

const RatingVote = () => {
  const ratingData = useRating();
  const setRating = useSetRating();
  const { id } = useParams();
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosReq.post(`/ratings/`, { stars: ratingData, recipe: id });

      if (response && response.data) {
        const data = response.data;
        setRating([...ratingData, data]);
        setShowThankYouMessage(true);
        console.log("Rating Added/Updated Successfully:", data);
      } else {
        console.error('Error adding/updating rating: Response or data is undefined');
      }

      // Reset the form after submission
      setRating(0);
    } catch (error) {
      console.error('Error handling rating:', error);
      console.log('Error Response:', error.response ? error.response.data : 'No response data');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How did you like this recipe?</h2>
        <Rating
          name="recipe-rating"
          value={ratingData}
          precision={0.5}
          onChange={handleRatingChange}
        />
        <Button type="submit">Send</Button>
        {showThankYouMessage && (
          <Alert variant="success" className="mt-3">
            Thank you for your rating!
          </Alert>
        )}
      </form>
    </Card>
  );
};

export default RatingVote;
