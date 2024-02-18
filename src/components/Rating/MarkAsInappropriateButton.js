// MarkAsInappropriateButton.js
import React from 'react';
import { axiosReq } from '../../api/axiosDefaults';

const MarkAsInappropriateButton = ({ commentId, onMarkedAsInappropriate }) => {
  const handleMarkAsInappropriate = async () => {
    try {
      await axiosReq.patch(`/comments/${commentId}/mark_inappropriate/`, {
        comment_id: commentId,
        is_inappropriate: true,
      });
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
