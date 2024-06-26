import React from 'react';
import { axiosReq } from '../api/axiosDefaults';

const MarkAsInappropriateButton = ({ commentId, onMarkedAsInappropriate }) => {
  const handleMarkAsInappropriate = async () => {
    try {
      await axiosReq.put(`/inappropriate/${commentId}/`, {
        is_inappropriate: true,
      });
      
      // Update the local state to reflect the change
      onMarkedAsInappropriate(commentId);
    } catch (error) {
      console.error('Error marking comment as inappropriate:', error);
    }
  };

  return (
    <button onClick={handleMarkAsInappropriate}>
      Mark as Inappropriate
    </button>
  );
};

export default MarkAsInappropriateButton;
