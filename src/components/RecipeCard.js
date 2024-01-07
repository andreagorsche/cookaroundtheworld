// RecipeCard.jsx
import React from "react";
import { Card, Media } from "react-bootstrap";
import styles from "../styles/components/RecipeCard.module.css"; 
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";


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
const is_owner = currentUser?.username === owner; 

  return (
    <Card className={styles.recipeCard}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={40} />
              {owner}
          </Link>
          <div>
            <span>{updated_at}</span>
            {is_owner && recipePage && "..."}
          </div>
      </Media>
      </Card.Body>
      <Card.Body>
        <Link to={`/recipes/${id}`}>
          <Card.Img variant="top" src={image} className={styles.recipeImage} />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{cuisine}</Card.Text>
          <button className={styles.recipeButton}>View Recipe</button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
