import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Alert } from 'react-bootstrap';
import RatingSelect from './RatingSelect';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import { useParams } from 'react-router';

const RatingVote = () => {
  const rating = useRating();
  const setRating = useSetRating();
  const { id } = useParams();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRating = {
      rating,
    };

    

    if (rating) {
      updateRating(newRating);
    } else {
      addRating(upRating);
    }

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
