import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Alert } from 'react-bootstrap';
import RatingSelect from './RatingSelect';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router';

const RatingVote = () => {
  const rating = useRating();
  const setRating = useSetRating();
  const { id: recipeId } = useParams();
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { stars: newRating, recipe: recipeId });

      if (response && response.data) {
        const data = response.data;
        setRating((prevRating) => [data, ...prevRating]);
        setShowThankYouMessage(true);
        console.log("Rating Added Successfully:", data);
      } else {
        console.error('Error adding rating: Response or data is undefined');
      }
    } catch (error) {
      console.error('Error adding rating:', error);
      console.log('Error Response:', error.response ? error.response.data : 'No response data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRating = {
      rating,
    };

    addRating(newRating);

    // Reset the form after submission
    setRating(0);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How did you like this recipe?</h2>
        <RatingSelect select={setRating} selected={rating} />
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
