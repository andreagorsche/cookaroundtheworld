// RecipeCard.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../styles/components/RecipeCard.module.css"; 
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";

function RecipeCard({ id, title, cuisine, imageUrl, owner }) {
  const currentUser = useCurrentUser();
  
  return (
    <Card className={styles.recipeCard}>
    <Avatar src={owner?.owner.image.url} text={owner && owner.username} height={40} />
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{cuisine}</Card.Text>
      <Link to={`/recipes/${id}`}>
        <button className={styles.recipeButton}>View Recipe</button>
      </Link>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
