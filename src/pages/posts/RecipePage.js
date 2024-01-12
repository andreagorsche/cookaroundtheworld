// RecipePage.js
import React, { useEffect, useState } from 'react';
import { useParams, useHIstory } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import RatingVote from '../../components/RatingVote';
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 
import { createStore, useReducer, useSelector, useDispatch } from 'react-redux';

const initialState = {
  recipeData: { results: [] },
  editingTitle: false,
  newTitle: '',
  editingDescription: false,
  newDescription: '',
  editingImage: false,
  newImage: '',
  editingIngredients: false,
  newIngredients: '',
};

const actionTypes = {
  SET_RECIPE_DATA: 'SET_RECIPE_DATA',
  SET_EDITING_TITLE: 'SET_EDITING_TITLE',
  SET_NEW_TITLE: 'SET_NEW_TITLE',
  SET_EDITING_DESCRIPTION: 'SET_EDITING_DESCRIPTION',
  SET_NEW_DESCRIPTION: 'SET_NEW_DESCRIPTION',
  SET_EDITING_IMAGE: 'SET_EDITING_IMAGE',
  SET_NEW_IMAGE: 'SET_NEW_IMAGE',
  SET_EDITING_INGREDIENTS: 'SET_EDITING_INGREDIENTS',
  SET_NEW_INGREDIENTS: 'SET_NEW_INGREDIENTS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_RECIPE_DATA:
      return { ...state, recipeData: action.payload };
    case actionTypes.SET_EDITING_TITLE:
      return { ...state, editingTitle: action.payload };
    case actionTypes.SET_NEW_TITLE:
      return { ...state, newTitle: action.payload };
    case actionTypes.SET_EDITING_DESCRIPTION:
      return { ...state, editingDescription: action.payload };
    case actionTypes.SET_NEW_DESCRIPTION:
      return { ...state, newDescription: action.payload };
    case actionTypes.SET_EDITING_IMAGE:
      return { ...state, editingImage: action.payload };
    case actionTypes.SET_NEW_IMAGE:
      return { ...state, newImage: action.payload };
    case actionTypes.SET_EDITING_INGREDIENTS:
      return { ...state, editingIngredients: action.payload };
    case actionTypes.SET_NEW_INGREDIENTS:
      return { ...state, newIngredients: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

function RecipePage() {
  
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const owner = recipeData.results[0]?.owner;
  const is_owner = currentUser?.username === owner;

  const {
    title,
    cuisine,
    description,
    time_effort,
    ingredients,
    } = recipeData.results[0] || {};
  
    const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
  
    const headerImageUrl = recipeData.results[0]?.image;
  


  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}`);
        setRecipeData({ results: [data] });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleEditClick = () => {
    // Redirect to the recipe edit page
    history.push(`/recipes/${id}/edit`);
  };

 
   function handleTitleChange(event) {
    dispatch({ type: 'actionTypes.SET_EDITING_TITLE', payload: event.target.value });
  }
 
  function handleDescriptionChange(event) {
    dispatch({ type: 'actionTypes.SET_EDITING_DESCRIPTION', payload: event.target.value });
  }
 
  function handleIngredientsChange(event) {
    dispatch({ type: 'actionTypes.SET_EDITING_INGREDIENTS', payload: event.target.value });

  function handleImageChange(event) {
    dispatch({ type: 'actionTypes.SET_EDITING_IMAGE', });

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
            <button>Edit</button>
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

export default RecipePage;
