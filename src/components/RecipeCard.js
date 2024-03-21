// RecipeCard.jsx
import React, {useState} from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Card, Media } from "react-bootstrap";
import styles from "../styles/components/RecipeCard.module.css"; 
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import AverageRatingDisplay from '../components/Rating/AverageRatingDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';


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

// Function to handle bookmarking/unbookmarking
const handleBookmarkToggle = async () => {
  try {
    // Toggle the saved state locally
    setSaved(prevSaved => !prevSaved);
    
    // Send the updated saved status to the backend
    const response = await axiosReq.put(`/saved/${id}/`, { saved: !saved });
    
    if (response.status === 200) {
      console.log("Recipe save status toggled successfully");
    }
  } catch (error) {
    console.error("Error toggling save status:", error);
    // If an error occurs, revert the local saved state
    setSaved(prevSaved => !prevSaved);
  }
};

  return (
    <Card className={styles.recipeCard}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
              {owner}
          </Link>
          <div>
            <span>{updated_at}</span>
            <button onClick={handleBookmarkToggle}>
            {saved ? <FontAwesomeIcon icon={solidBookmark} /> : <FontAwesomeIcon icon={regularBookmark} />}
            </button>         
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
