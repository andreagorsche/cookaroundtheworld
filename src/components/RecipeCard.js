// RecipeCard.jsx
import React, {useState} from "react";
import { axiosReq } from "../api/axiosDefaults";
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
const isOwner = currentUser?.username === owner; 

// State to track whether the recipe is saved as a favorite
const [saved, setSaved] = useState(false);


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
