// RecipeCard.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../styles/components/RecipeCard.module.css"; 

function RecipeCard({ title, description, imageUrl }) {
  return (
    <Card className={styles.recipeCard}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
