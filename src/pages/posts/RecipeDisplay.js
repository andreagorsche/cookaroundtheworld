import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import { useFetchRecipeById, useCurrentRecipe, useSetCurrentRecipe } from '../../contexts/RecipeDataContext';
import { useRating, useSetRating } from '../../contexts/RatingDataContext';
import CommentForm from '../../components/Rating/CommentForm';
import RatingDisplay from '../../components/Rating/RatingDisplay';
import CommentDisplay from '../../components/Rating/CommentDisplay';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import RatingForm from '../../components/Rating/RatingForm';
import AverageRatingDisplay from '../../components/Rating/AverageRatingDisplay';

function RecipeDisplay({handleEditClick}) {
  const { id } = useParams();
  const currentRecipe = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const currentUser = useCurrentUser();
  const fetchRecipeById = useFetchRecipeById();


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
              <>
              <button onClick={handleEditClick}>Edit Recipe</button>
              <AverageRatingDisplay />
              <CommentDisplay />
              </>
            ) : (
              <>
              <RatingForm owner={currentRecipe?.owner} recipe_id={parseInt(id, 10)} />
              <CommentForm />
            </>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default RecipeDisplay;
