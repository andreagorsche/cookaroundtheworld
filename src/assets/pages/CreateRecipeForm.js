import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import upload from "../../assets/upload.png";

import styles from "../../styles/CreateRecipeEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import Asset from "../../components/Asset";

import { Image } from "react-bootstrap";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function CreateRecipeForm() {

  const [errors, setErrors] = useState({});
  
  const [postRecipe, setRecipeData] = useState({
    title: "",
    cuisine: "",
    timeeffort: "",
    ingredients: "",
    description: "",
    image: "",
    });
  const { title, cuisine, timeeffort, ingredients, description, image } = postRecipe;

  const imageInput = useRef(null);
  const history = useHistory();
  
  const handleChange = (event) => {
    setRecipeData({
      ...postRecipe,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setRecipeData({
        ...postRecipe,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("cuisine", cuisine);
    formData.append("timeeffort", timeeffort);
    formData.append("ingredients", ingredients);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
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
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cuisine</Form.Label>
        <Form.Control
          type="text"
          name="cuisine"
          value={cuisine}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Time Effort</Form.Label>
        <Form.Control
          type="text"
          name="timeeffort"
          value={timeeffort}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          type="text"
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
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

              />

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateRecipeForm;