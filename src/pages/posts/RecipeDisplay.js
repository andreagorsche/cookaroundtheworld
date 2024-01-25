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
        <h3>Time Effort</h3>
        {time_effort}
        <h3>Ingredients</h3>
        {ingredientsArray}
      </div>
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <Container className="text-center">
            {isOwner ? (
              <>
                <button onClick={handleEditClick}>Edit Recipe</button>
                <AverageRatingDisplay />
                <CommentDisplay />
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
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default RecipeDisplay;
