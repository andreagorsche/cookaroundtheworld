import React, { useState } from 'react';
import { axiosReq } from "../../api/axiosDefaults";

const CommentForm = () => {
  const [content, setContent] = useState('');

  const onChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosReq.post('/comments/', content);
      console.log('Comment submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <input type="textarea" value={content} onChange={onChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default CommentForm;
