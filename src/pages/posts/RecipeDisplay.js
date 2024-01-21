import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import { useFetchRecipeById, useCurrentRecipe, useSetCurrentRecipe } from '../../contexts/RecipeDataContext';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import RatingSelect from '../../components/Rating/RatingSelect';
import { axiosReq } from "../../api/axiosDefaults";


import { useCurrentUser } from '../../contexts/CurrentUserContext';

function RecipeDisplay({ isEditing, setIsEditing }) {
  const { id } = useParams();
  const currentRecipe = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const currentUser = useCurrentUser();
  const history = useHistory();
  const fetchRecipeById = useFetchRecipeById();
  const stars = useRating();
  const setStars = useSetRating();
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); // Add this line


  useEffect(() => {
    fetchRecipeById(id, setCurrentRecipe);
  }, [id, setCurrentRecipe]);

  console.log("Current Recipe:", currentRecipe);

  const handleEditClick = () => {
    history.push(`/recipes/${id}`);
    setIsEditing(true);
  };

  const {
    title,
    cuisine,
    description,
    time_effort,
    ingredients,
  } = currentRecipe || {};
  const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
  const headerImageUrl = currentRecipe?.image;

  const owner = currentRecipe?.owner;
  const is_owner = currentUser?.username === owner;

  const handleRatingChange = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', {
        stars: newRating,
        recipe: id,
        owner: owner,
      });
  
      const data = response.data;
      setStars(newRating);
      setShowThankYouMessage(true);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <>
      <Header imageUrl={headerImageUrl} />
      <Intro
        firstWord="Cooking"
        secondWord={title}
        secondPhrase="with us"
        firstParagraph={cuisine}
        secondParagraph={description}
        heading="Ingredients"
        timeEffort={time_effort}
        listItems={ingredientsArray}
      />
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <Container className="text-center">
            {is_owner ? (
              <button onClick={handleEditClick}>Edit</button>
            ) : (
              <>
              <RatingSelect value={stars} onRatingChange={handleRatingChange} />
              {showThankYouMessage && <div>Thank you for rating!</div>}
              <div>Comments</div>
            </>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default RecipeDisplay;
