// RecipeCard.jsx
import React from "react";
import { Card, Media } from "react-bootstrap";
import styles from "../styles/components/RecipeCard.module.css"; 
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import AverageRatingDisplay from '../components/Rating/AverageRatingDisplay';

function RecipeCard({ recipe }) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    cuisine, 
    image,
    updated_at,
    recipePage,
} = recipe || {};

const currentUser = useCurrentUser();
const isOwner = currentUser?.username === owner; 

  return (
    <Card className={styles.recipeCard}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
              {owner}
          </Link>
          <div>
            <span>{updated_at}</span>
            <button>Bookmark</button>
          </div>
      </Media>
      </Card.Body>
      <Card.Body>
        <Link to={`/recipes/${id}`}>
          <Card.Img variant="top" src={image} className={styles.recipeImage} />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{cuisine}</Card.Text>
          <button>View Recipe</button>
        </Link>
      </Card.Body>
      <Card.Body>
      <AverageRatingDisplay recipeId={id} />
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
