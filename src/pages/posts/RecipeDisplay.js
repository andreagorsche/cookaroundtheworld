import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 
import RecipeRating from '../../components/Rating/RecipeRating';

function RecipeDisplay({ currentRecipe, isEditing, setIsEditing }) {
    const currentUser = useCurrentUser();
    const history = useHistory();
    const { id } = useParams();

   
  const {
    title,
    cuisine,
    description,
    time_effort,
    ingredients,
  } = currentRecipe?.results[0] || {};
  const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
  const headerImageUrl = currentRecipe.results[0]?.image;
  
  const owner = currentRecipe.results[0]?.owner;
  const is_owner = currentUser?.username === owner;

  const handleEditClick = async () => {
    history.push(`/recipes/${id}`);
    setIsEditing(true);
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
            <RecipeRating />
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