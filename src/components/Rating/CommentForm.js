import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const onChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosReq.post('/comments/', { comment });
      console.log('Comment submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <input type="textarea" value={comment} onChange={onChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default CommentForm;
