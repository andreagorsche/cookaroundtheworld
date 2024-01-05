import React, { useState, useEffect } from 'react';
import { axiosReq } from "../api/axiosDefaults";
import { Card, Button, Alert } from 'react-bootstrap';
import RatingSelect from './RatingSelect';
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";

const RatingVote = ({ recipeId, owner }) => {
  const [rating, setRating] = useState(0);
  const [ratingEdit, setRatingEdit] = useState({ id: 0, edit: false });
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner; 

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { stars: newRating.rating, recipe: recipeId });
      const data = response.data;
      setRating((prevRating) => [data, ...prevRating]);
      setShowThankYouMessage(true);
      console.log("Rating Added Successfully:", data);
    } catch (error) {
      console.error('Error adding rating:', error);
      console.log('Error Response:', error.response.data);
    }
  };

  const updateRating = async (id, upRating) => {
    try {
      const response = await axiosReq.get(`/ratings/${id}`);
      const data = response.data;
      setRating((prevRating) => prevRating.map((item) => (item.id === id ? { ...item, ...data } :item)));
      setShowThankYouMessage(true);
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
