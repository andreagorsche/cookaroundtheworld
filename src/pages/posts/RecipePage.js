// RecipePage.js
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import RatingVote from '../../components/RatingVote';
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  recipeData: { results: [] },
  editing: false,
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
  SET_EDITING: 'SET_EDITING',
  SET_EDITING_TITLE: 'SET_EDITING_TITLE',
  SET_NEW_TITLE: 'SET_NEW_TITLE',
  SET_EDITING_DESCRIPTION: 'SET_EDITING_DESCRIPTION',
  SET_NEW_DESCRIPTION: 'SET_NEW_DESCRIPTION',
  SET_EDITING_IMAGE: 'SET_EDITING_IMAGE',
  SET_NEW_IMAGE: 'SET_NEW_IMAGE',
  SET_EDITING_INGREDIENTS: 'SET_EDITING_INGREDIENTS',
  SET_NEW_INGREDIENTS: 'SET_NEW_INGREDIENTS',
  SUBMIT_EDITED_DATA_START: 'SUBMIT_EDITED_DATA_START',
  SUBMIT_EDITED_DATA_SUCCESS: 'SUBMIT_EDITED_DATA_SUCCESS',
  SUBMIT_EDITED_DATA_FAILURE: 'SUBMIT_EDITED_DATA_FAILURE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_RECIPE_DATA:
      return { ...state, recipeData: action.payload };
    case actionTypes.SET_EDITING:
      return { ...state, editing: action.payload };
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
    case actionTypes.SUBMIT_EDITED_DATA_START:
      return { ...state, loading: true };
    case actionTypes.SUBMIT_EDITED_DATA_SUCCESS:
      return initialState;
    case actionTypes.SUBMIT_EDITED_DATA_FAILURE:
      console.error('Error submitting edited data:', action.payload);
      return { ...state, loading: false };
    case actionTypes.SUBMIT_EDITED_DATA:
      try {
        const id = state.recipeId;
        // Create a FormData object with the edited data
        const formData = new FormData();
        formData.append('title', state.newTitle);
        formData.append('description', state.newDescription);
        formData.append('ingredients', state.newIngredients);
        formData.append('image', state.Image);

// Make the axios request to update the data
axiosReq.put(`/recipes/${id}/`, formData)
.then(() => {
  dispatch({ type: actionTypes.SUBMIT_EDITED_DATA_SUCCESS });
  // Reset the form state after successful submission
  dispatch({ type: actionTypes.SET_EDITING, payload: false });
})
.catch(error => dispatch({ type: actionTypes.SUBMIT_EDITED_DATA_FAILURE, payload: error }));
} catch (error) {
// Handle error if the submission fails
console.error('Error submitting edited data:', error);
dispatch({ type: actionTypes.SUBMIT_EDITED_DATA_FAILURE, payload: error });
}
break;
default:
return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

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

  const isEditingTitle = useSelector(state => state.editingTitle);
  const newTitle = useSelector(state => state.newTitle);
  const isEditingDescription = useSelector(state => state.editingDescription);
  const newDescription = useSelector(state => state.newDescription);
  const isEditingIngredients = useSelector(state => state.editingIngredients);
  const newIngredients = useSelector(state => state.newIngredients);
  const isEditingImage = useSelector(state => state.editingImage);
  const newImage = useSelector(state => state.newImage);

  const handleEditClick = () => {
    dispatch({ type: actionTypes.SET_EDITING, payload: true });
    dispatch({ type: actionTypes.SET_EDITING_TITLE, payload: true });
    dispatch({ type: actionTypes.SET_EDITING_DESCRIPTION, payload: true });
    dispatch({ type: actionTypes.SET_EDITING_INGREDIENTS, payload: true });
    dispatch({ type: actionTypes.SET_EDITING_IMAGE, payload: true });
  };

 
   function handleTitleChange(event) {
    dispatch({ type: 'actionTypes.SET_NEW_TITLE', payload: event.target.value });
  }
 
  function handleDescriptionChange(event) {
    dispatch({ type: 'actionTypes.SET_NEW_DESCRIPTION', payload: event.target.value });
  }
 
  function handleIngredientsChange(event) {
    dispatch({ type: 'actionTypes.SET_NEW_INGREDIENTS', payload: event.target.value });

    const handleChangeImage = (event) => {
      if (event.target.files.length) {
        URL.revokeObjectURL(image);
        setPostData({
          ...postData,
          image: URL.createObjectURL(event.target.files[0]),
        });
      }
    };

    const handleSubmit = () => {
      dispatch({ type: actionTypes.SUBMIT_EDITED_DATA });
    };
  

  return (
    <>
      <Header imageUrl={headerImageUrl} />
      <Intro
        firstWord="Cooking"
        secondWord={isEditingTitle ? newTitle : title}
        secondPhrase="with us"
        firstParagraph={cuisine}
        secondParagraph={isEditingDescription ? newDescription : description}
        heading="Ingredients"
        timeEffort={time_effort}
        listItems={newIngredients.split(',').map(item => item.trim())}
        />
      <Row className="justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className="text-center">
          {is_owner ? (
            <>
              {state.editing ? (
                <button onClick={handleSubmit}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </>
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