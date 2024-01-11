import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useRecipeData, useSetRecipeData } from "../../contexts/RecipeDataContext"; 
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";



// Components
import Asset from "../../components/Asset.js";
import Alert from "react-bootstrap/Alert";
import Header from "../../components/Header.js"
import CreateRecipes from '../../assets/images/CreateRecipes.jpg'

//Images 
import upload from "../../assets/upload.png";
import { Image } from "react-bootstrap";

// styles
import styles from "../../styles/pages/posts/CreateRecipeEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/components/Button.module.css";

function CreateRecipeForm() {

  const [errors, setErrors] = useState({});
  
  const recipeData = useRecipeData();
  const setRecipeData = useSetRecipeData(); 
  
  const imageInput = useRef(null);
  const history = useHistory();
  
  const handleChange = (event) => {
    setRecipeData({
      ...recipeData,
      pageRecipe: {
        results: [
          ...recipeData.pageRecipe.results,
          {
            ...recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1],
            [event.target.name]: event.target.value,
          },
        ],
      },
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].image);
      setRecipeData({
        ...recipeData,
        pageRecipe: {
          results: [
            ...recipeData.pageRecipe.results,
            {
              ...recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1],
              image: URL.createObjectURL(event.target.files[0]),
            },
          ],
        },
      });
    }
  };

  // Access the latest recipe data
  const latestRecipe =
  recipeData.pageRecipe.results.length > 0
    ? recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1]
    : null;
    const image = latestRecipe ? latestRecipe.image : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", latestRecipe.title);
    formData.append("cuisine", latestRecipe.cuisine);
    formData.append("timeeffort", latestRecipe.timeeffort);
    formData.append("ingredients", latestRecipe.ingredients);
    formData.append("description", latestRecipe.description);
    formData.append("image", recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].image);

    try {
      const { data } = await axiosReq.post("/recipes/", formData);
      setRecipeData({
        pageRecipe: { results: [...recipeData.pageRecipe.results, data] },
      }); 
      history.push(`/recipes/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].title}          
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Cuisine</Form.Label>
        <Form.Control as="select" name="cuisine" onChange={handleChange}>
          <option value="american">American</option>
          <option value="austrian">Austrian</option>
          <option value="caribean">Caribean</option>
          <option value="chinese">Chinese</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="mediteranian">Mediteranian</option>
          <option value="mexican">Mexican</option>
          <option value="slovak">Slovak</option>
          <option value="spanish">Spanish</option>
        </Form.Control>
      </Form.Group>
      {errors?.cuisine?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Time Effort</Form.Label>
        <Form.Control
          type="text"
          name="timeeffort"
          value={recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].timeeffort}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.timeeffort?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          type="text"
          name="ingredients"
          value={recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={recipeData.pageRecipe.results[recipeData.pageRecipe.results.length - 1].description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <>
    <Header imageUrl={CreateRecipes} title = "Create your new Recipes" />
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
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

            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
    </>
  );
}

export default CreateRecipeForm;
