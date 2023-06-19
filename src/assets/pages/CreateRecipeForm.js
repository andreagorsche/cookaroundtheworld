import React, { useState } from "react";

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

function CreateRecipeForm() {

  const [errors, setErrors] = useState({});
  
  const [postData, setPostData] = useState({
    title: "",
    cuisine: "",
    timeeffort: "",
    ingredients: "",
    description: "",
    image: "",
    });
  const { title, cuisine, timeeffort, ingredients, description, image } = postData;
  
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onchange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cuisine</Form.Label>
        <Form.Control
          type="text"
          name="cuisine"
          value={cuisine}
          onchange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Time Effort</Form.Label>
        <Form.Control
          type="text"
          name="timeeffort"
          value={timeeffort}
          onchange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          type="text"
          name="ingredients"
          value={ingredients}
          onchange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onchange={handleChange}
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
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                   <Asset
                    src={upload}
                    message="Click/Tap to upload your recipe image"
                  />
                </Form.Label>

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