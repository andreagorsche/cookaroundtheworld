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
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); 
 

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { stars: newRating.rating, recipe: id });

      if (response && response.data) {
        const data = response.data;
        setRating(data.rating);
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

  const updateRating = async (upRating) => {
    try {
      const response = await axiosReq.put(`/ratings/${id}`, { stars: upRating.stars });
  
      const data = response.data;
      setRating(data);
      setShowThankYouMessage(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRating = {
      rating,
    };
  
    try {
      if (rating) {
        await updateRating(newRating);
      } else {
        await addRating(newRating);
      }
  
      // Reset the form after submission
      setRating(0);
      setShowThankYouMessage(true);
    } catch (error) {
      console.error('Error handling rating:', error);
    }
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
