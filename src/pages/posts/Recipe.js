import React from 'react'
import styles from "../../styles/Recipe.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Recipe = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        cuisine, 
        time_effort,
        ingredients,
        description,
        image,
        updated_at,
        recipePage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;  

  return (
    <Card className={styles.Recipe}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && recipePage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/recipes/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        Cuisine:{cuisine && <Card.Text>{cuisine}</Card.Text>}
        Ingredients:{ingredients && <Card.Title className="text-center">{ingredients}</Card.Title>}
        Time Effort:{time_effort && <Card.Title className="text-center">{time_effort}</Card.Title>}
        Description:{description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
     
    </Card>
  )
}

export default Recipe   