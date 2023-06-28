import React from 'react'
import styles from "../../styles/Recipe.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
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
      </Card.Body>
      <Card.Body>
        Cuisine:{cuisine && <Card.Text>{cuisine}</Card.Text>} 
      </Card.Body>
      <Card.Body>
        Ingredients:{ingredients && <Card.Title className="text-center">{ingredients}</Card.Title>}
      </Card.Body>
      <Card.Body>     
        Time Effort:{time_effort && <Card.Title className="text-center">{time_effort}</Card.Title>}
      </Card.Body>
      <Card.Body>
        Description:{description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
      <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>An excellent chef like you doesn't have to like their own recipes!</Tooltip>}
            >
             <i className="fa-light fa-thumbs-up" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={`fa-solid fa-thumbs-up ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/recipes/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
    </Card>
  )
}

export default Recipe   