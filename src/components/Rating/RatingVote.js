import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Alert } from 'react-bootstrap';
import RatingSelect from './RatingSelect';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRating, useSetRating } from "../../contexts/RatingDataContext";

const RatingVote = ({ recipeId, owner }) => {
  const rating = useRating();
  const setRating = useSetRating();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { stars: newRating, recipe: recipeId });
      const data = response.data;
      setRating((prevRating) => [data, ...prevRating]);
      setShowThankYouMessage(true);
      console.log("Rating Added Successfully:", data);
    } catch (error) {
      console.error('Error adding rating:', error);
      console.log('Error Response:', error.response.data);
    }
  };

  const handleSubmit = async (newRating) => {
    // Ensure that a valid rating is submitted
    if (newRating >= 1 && newRating <= 5) {
      await addRating(newRating);
    } else {
      // Handle invalid rating (optional)
      console.error('Invalid rating:', newRating);
    }
  };

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(rating);
          // Reset the form after submission (optional)
          setRating(0);
        }}
      >
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
