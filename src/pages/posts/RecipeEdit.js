import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentRecipe, useSetCurrentRecipe, useFetchRecipeById } from '../../contexts/RecipeDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import upload from "../../assets/upload.png";
import Asset from "../../components/Asset.js";
import { useParams } from 'react-router';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RecipeEdit = ({ isEditing, setIsEditing }) => {
  const currentRecipe = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const imageInput = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const fetchRecipeById = useFetchRecipeById();

  const [errors, setErrors] = useState({});

  const [newTitle, setNewTitle] = useState(currentRecipe?.title || '');
  const [newDescription, setNewDescription] = useState(currentRecipe?.description || '');
  const [newIngredients, setNewIngredients] = useState(currentRecipe?.ingredients || '');
  const [newImage, setNewImage] = useState(currentRecipe?.image || '');
  const [newTimeEffort, setNewTimeEffort] = useState(currentRecipe?.time_effort || '');

  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipeById(id, setCurrentRecipe);

      if (isEditing && currentRecipe.results && currentRecipe.results.length > 0) {
        const { title, description, ingredients, image, time_effort } = currentRecipe.results[0];
        setNewTitle(title || '');
        setNewDescription(description || '');
        setNewIngredients(ingredients || '');
        setNewImage(image || '');
        setNewTimeEffort(time_effort || '');
      }
    };

    fetchData();
  }, [id, isEditing, setCurrentRecipe, currentRecipe.results]);

  const handleCancelEdit = () => {
    history.push(`/recipes/${id}`);
    setIsEditing(false);
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(newImage);
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageClick = () => {
    imageInput.current.click();
  };

  const handleSubmit = async () => {
    try {
      // Update the recipe data context after successful submission
      await updateRecipe();
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting edited data:', error);
      setErrors({ image: ['Error uploading the image.'] });
    }
  };

  const updateRecipe = async () => {
    // Fetch the recipe data again to ensure it's up-to-date
    await fetchRecipeById(id, setCurrentRecipe);

    // Check if the fetched recipe data is available
    if (currentRecipe.results && currentRecipe.results.length > 0) {
      const updatedRecipe = currentRecipe.results[0];
      const recipeId = updatedRecipe.id;

      const formData = createFormData();
      await axiosReq.put(`/recipes/${recipeId}/`, formData);

      // Update the recipe data context after successful submission
      const { data } = await axiosReq.get(`/recipes/${recipeId}`);
      setCurrentRecipe({ currentRecipe: { results: [data] } });
    } else {
      console.error('Error: No recipe data available.');
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('ingredients', newIngredients.join(','));
    formData.append('time_effort', newTimeEffort);

    // Append the image only if a new file has been selected
    if (newImage instanceof File) {
      formData.append('image', newImage);
    } else {
      // Resend the currently used image
      formData.append('image', currentRecipe.results[0]?.image || '');
    }

    return formData;
  };

  return (
    <>
      <Header imageUrl={newImage} />
      {newImage ? (
        <>
          <div>
            <Form.Label
              htmlFor="image-upload"
            >
              Change the image
            </Form.Label>
          </div>
        </>
      ) : (
        <Form.Label
          className="d-flex justify-content-center"
          htmlFor="image-upload"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        >
          <Asset
            src={upload}
            message="Click or tap to upload an image"
          />
        </Form.Label>
      )}
      <Form.File
        id="image-upload"
        accept="image/*"
        onChange={handleChangeImage}
        ref={imageInput}
        style={{ display: 'none' }}
      />
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Intro
        firstWord="Cooking"
        secondWord={<input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />}
        secondPhrase="with us"
        firstParagraph={newDescription}
        secondParagraph={<textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />}
      /> 
      <Row>
        <Col className="d-flex justify-content-center">
          <label htmlFor="time-effort">Time Effort</label>
          <input type="text" id="time-effort" value={newTimeEffort} onChange={(e) => setNewTimeEffort(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea id="ingredients" value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </Col>
      </Row>
    </>
  );
};

export default RecipeEdit;
