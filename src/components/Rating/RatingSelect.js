import React from 'react';
import { Rating } from '@mui/material';

const RatingSelect = ({ select, selected }) => {
  const handleRatingChange = (event, newValue) => {
    select(newValue);
  };

  return (
    <Rating
      name="recipe-rating"
      value={selected}
      precision={0.5}
      onChange={handleRatingChange}
    />
  );
};

export default RatingSelect;
