import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'your-ui-library';
import RatingSelect from './RatingSelect';


const RatingVote = () => {
  const [rating, setRating] = useState(0);
  const [ratingEdit, setRatingEdit] = useState({ id: 0, edit: false });

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { rating: newRating.rating });
      const data = response.data;
      setRating((prevRating) => [data, ...prevRating]);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  const updateRating = async (id, upRating) => {
    try {
      const response = await axiosReq.get(`/ratings/${id}`);
      const data = response.data;
      setRating((prevRating) => prevRating.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const editRating = (selectedRating) => {
    setRatingEdit({
      id: selectedRating.id,
      edit: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRating = {
      rating,
    };

    if (ratingEdit.edit) {
      updateRating(ratingEdit.id, newRating);
    } else {
      addRating(newRating);
    }

    // Reset the form after submission
    setRating(0);
    setRatingEdit({ id: 0, edit: false });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How did you like this recipe?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
};

export default RatingVote;
