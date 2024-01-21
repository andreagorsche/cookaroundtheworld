import React from 'react';

const Rating = ({ value, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          style={{ cursor: 'pointer', color: star <= value ? 'gold' : 'gray' }}
        >
          &#9733; {/* Unicode star character */}
        </span>
      ))}
    </div>
  );
};

export default Rating;
