import React from "react";
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import styles from "../styles/components/RecipeCard.module.css"; 
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const {
    id,
    owner,
    profile_id,
    title,
    cuisine, 
    image,
    updated_at,
} = recipe || {};


  return (
    <Card className={styles.recipeCard}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
              {owner}
          </Link>
          <div>
            <span>{updated_at}</span>       
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
    </Card>
  );
}

export default RecipeCard;
