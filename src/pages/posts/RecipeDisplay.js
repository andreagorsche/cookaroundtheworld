import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import RatingVote from '../../components/Rating/RatingVote';
import { useRecipeData, useSetRecipeData, useEditRecipe } from '../../contexts/RecipeDataContext'; 
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 
import { fetchRecipeById } from '../../utilityFunctions'; 


function RecipeDisplay({ isEditing, setIsEditing }) {
    const { id } = useParams();
    const { pageRecipe } = useRecipeData();
    const setRecipeData = useSetRecipeData();
    const currentUser = useCurrentUser();
    const history = useHistory();

    const handleEditClick = async () => {
      history.push(`/recipes/${id}`);
      setIsEditing(true);
    };
  
  
    useEffect(() => {
      fetchRecipeById(id, setRecipeData);
    }, [id, setRecipeData]);

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
            <>
            <RatingVote recipeId={id} />
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