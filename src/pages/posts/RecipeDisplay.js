import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import RatingVote from '../../components/RatingVote';
import { useRecipeData, useSetRecipeData, useEditRecipe } from '../../contexts/RecipeDataContext'; 
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 

function RecipeDisplay() {
    const { id } = useParams();
    const { pageRecipe } = useRecipeData();
    const { handleEditClick } = useEditRecipe(); 
    const currentUser = useCurrentUser();


  const {
    title,
    cuisine,
    description,
    time_effort,
    ingredients,
  } = pageRecipe.results[0] || {};
  const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
  const headerImageUrl = pageRecipe.results[0]?.image;
  
  const owner = pageRecipe.results[0]?.owner;
  const is_owner = currentUser?.username === owner;


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
            <RatingVote recipeId={id} />
          )}          
          </Container>
          <Container className="text-center">
            Comments
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default RecipeDisplay;