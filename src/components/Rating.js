// Rating.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StarBorder, Star } from '@mui/icons-material';
import styles from '../styles/components/Rating.module.css';

function Rating({ recipe, onRate, isOwner }) {
  const [userRating, setUserRating] = useState(0);

  const handleRate = () => {
    if (!isOwner && userRating > 0) {
      onRate(recipe.id, userRating);
    }
  };

  const ratings = [];

  for (let i = 1; i <= 5; i++) {
    ratings.push(
      <button
        className={styles.ratingButton}
        data-value={i}
        key={i}
        onClick={() => setUserRating(i)}
      >
        {i <= userRating ? <Star /> : <StarBorder />}
      </button>
    );
  }

  return (
    <div>
      <div>{ratings}</div>
      {!isOwner && (
        <button className={styles.submitButton} onClick={handleRate}>
          Submit Rating
        </button>
      )}
    </div>
  );
}

Rating.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }),
  onRate: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default Rating;
