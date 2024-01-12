import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import RatingVote from '../../components/RatingVote';

function RecipeForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle the image change (you might want to upload it to your server or handle it differently)
    console.log('New image selected:', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Header imageUrl={formData.image} />
      <Form onSubmit={handleSubmit}>
        <Intro
          firstWord="Cooking"
          secondWord={
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          }
          secondPhrase="with us"
          firstParagraph={
            <Form.Control
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
            />
          }
          secondParagraph={
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          }
          heading="Ingredients"
          timeEffort={
            <Form.Control
              type="text"
              name="time_effort"
              value={formData.time_effort}
              onChange={handleChange}
            />
          }
          listItems={
            <Form.Control
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
            />
          }
        />
        <Row className="justify-content-center">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <Container className="text-center">
              <RatingVote recipeId={formData.id} />
            </Container>
            <Container className="text-center">
              {/* Additional form fields can be added here */}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Additional Field</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="additionalField"
                  value={formData.additionalField || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Image input */}
              <Form.Group>
                <Form.File
                  id="custom-file"
                  label="Choose a new image"
                  custom
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Container>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}