import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import { useFetchRecipeById, useCurrentRecipe, useSetCurrentRecipe } from '../../contexts/RecipeDataContext';
import CommentForm from '../../components/Rating/CommentForm';
import CommentDisplay from '../../components/Rating/CommentDisplay';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import RatingForm from '../../components/Rating/RatingForm';
import AverageRatingDisplay from '../../components/Rating/AverageRatingDisplay';
import { axiosReq } from '../../api/axiosDefaults';

function RecipeDisplay({handleEditClick}) {
  const { id } = useParams();
  const currentRecipe = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const currentUser = useCurrentUser();
  const fetchRecipeById = useFetchRecipeById();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });


  useEffect(() => {
    fetchRecipeById(id, setCurrentRecipe);
  }, [id, setCurrentRecipe]);

  console.log("Current Recipe:", currentRecipe);

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
  const isOwner = currentUser?.username === owner;

  if (!currentRecipe || !currentRecipe.id) {
    // If the current recipe is not yet available, display a loading message or spinner
    return <div>Loading...</div>;
  }

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
      />
      <div>
        <Row>
          <Col className="d-flex justify-content-center">
            <p className="mr-2">Time Effort: </p>
            {time_effort}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <p className="mr-2">Ingredients: </p>
            {ingredientsArray.join(', ')}
          </Col>
        </Row>
      </div>
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <Container className="text-center">
            {isOwner ? (
              <>
                <button onClick={handleEditClick}>Edit Recipe</button>
              </>
            ) : (
              <>
                <RatingForm owner={currentRecipe?.owner} recipe_id={parseInt(id, 10)} />
                <CommentForm
                  profileId={currentUser.profile_id}
                  profileImage={profile_image}
                  recipeId={id}
                  setRecipe={setCurrentRecipe}
                  setComments={setComments}
                  />
              </>
            )}
            <AverageRatingDisplay currentRecipe={currentRecipe} />
            <CommentDisplay currentRecipe={currentRecipe} />
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default RecipeDisplay;
