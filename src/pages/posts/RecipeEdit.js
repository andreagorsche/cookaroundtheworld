import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentRecipe, useSetCurrentRecipe, useFetchRecipeById } from '../../contexts/RecipeDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import upload from "../../assets/upload.png";
import Asset from "../../components/Asset.js";
import { useParams } from 'react-router';

const RecipeEdit = ({ isEditing, setIsEditing }) => {
  debugger;
  const currentRecipe  = useCurrentRecipe();
  const setCurrentRecipe = useSetCurrentRecipe();
  const imageInput = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const fetchRecipeById = useFetchRecipeById();


  const [newTitle, setNewTitle] = useState(currentRecipe?.title || '');
  const [newDescription, setNewDescription] = useState(currentRecipe?.description || '');
  const [newIngredients, setNewIngredients] = useState(currentRecipe?.ingredients || '');
  const [newImage, setNewImage] = useState(currentRecipe?.image || '');
  const [newTimeEffort, setNewTimeEffort] = useState(currentRecipe?.time_effort || '');
  const [errors, setErrors] = useState({ image: [] });


  useEffect(() => {
    const fetchData = async () => {
      await fetchRecipeById(id, setCurrentRecipe);
      console.log("Fetched Recipe:", currentRecipe);
      
      if (isEditing && currentRecipe.results && currentRecipe) {
        const { title, description, ingredients, image, time_effort } = currentRecipe;
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

  const handleSave = async () => {
    try {
      const id = currentRecipe.results[0]?.id;

      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('description', newDescription);
      formData.append('ingredients', newIngredients);
      formData.append('time_effort', newTimeEffort);

      // Append the image only if it's changed
    if (newImage instanceof File) {
      formData.append('image', newImage);
    }
      // Make the axios request to update the data
      await axiosReq.put(`/recipes/${id}/`, formData);

      // Update the recipe data context after successful submission
      const { data } = await axiosReq.get(`/recipes/${id}`);
      setCurrentRecipe({ currentRecipe: { results: [data] } });
      setIsEditing(false);
      } catch (error) {
      console.error('Error submitting edited data:', error);
      // Handle error and set appropriate error messages
      setErrors({ image: ['Error uploading the image.'] });
    }
  };

  return (
    <>
      <Header imageUrl={newImage} />
      {newImage ? (
        <>
          <figure>
            <Image src={newImage} rounded />
          </figure>
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
        <div>
        <label htmlFor="time-effort">Time Effort</label>
        <input type="text" id="time-effort" value={newTimeEffort} onChange={(e) => setNewTimeEffort(e.target.value)} />
        </div>
      <div>
        <label htmlFor="ingredients">Ingredients</label>
        <textarea id="ingredients" value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </>
  );
};

export default RecipeEdit;