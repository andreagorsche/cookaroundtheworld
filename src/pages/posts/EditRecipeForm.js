import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import upload from "../../assets/upload.png"; 
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Header from "../../components/Header.js";
import CreateRecipes from "../../assets/images/CreateRecipes.jpg";
import Asset from "../../components/Asset.js";
import styles from "../../styles/pages/posts/CreateRecipeEditForm.module.css"; // Import styles
import btnStyles from "../../styles/components/Button.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useCurrentRecipe } from '../../contexts/RecipeDataContext';



function RecipeEditForm({ setIsEditing }) {
  const [errors, setErrors] = useState({});
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const currentRecipe = useCurrentRecipe();
  const currentUser = useCurrentUser();
  const owner = currentRecipe?.owner;
  const is_owner = currentUser?.username === owner;


  const [postRecipe, setRecipeData] = useState({
    title: "",
    cuisine: "",
    time_effort: "",
    ingredients: "",
    description: "",
    image: "",
  });
  const { title, cuisine, time_effort, ingredients, description, image } = postRecipe;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}/`);
        const { title, cuisine, time_effort, ingredients, description, image } = data;

        is_owner ? setRecipeData({ title, cuisine, time_effort, ingredients, description, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

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
    formData.append("time_effort", time_effort);
    formData.append("ingredients", ingredients);
    formData.append("description", description);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/recipes/${id}/`, formData);
      setShowThankYouMessage(true); // Show thank you message on successful submission
      setTimeout(() => {
        setShowThankYouMessage(false); // Hide thank you message after a certain time
        setIsEditing(false);
        history.push(`/recipes/${id}`);
      }, 3000); // Redirect after 3 seconds
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
        <Form.Control type="text" name="title" value={title} onChange={handleChange} />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Cuisine</Form.Label>
        <Form.Control as="select" name="cuisine" value={cuisine} onChange={handleChange}>
          <option value="american">American</option>
          <option value="austrian">Austrian</option>
          <option value="caribbean">Caribbean</option>
          <option value="chinese">Chinese</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="mediterranean">Mediterranean</option>
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
        <Form.Control type="text" name="time_effort" value={time_effort} onChange={handleChange} />
      </Form.Group>
      {errors?.time_effort?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control type="text" name="ingredients" value={ingredients} onChange={handleChange} />
      </Form.Group>
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={6} name="description" value={description} onChange={handleChange} />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button onClick={() => history.goBack()} style={{ backgroundColor: "indigo", margin: "10px", borderColor: "transparent" }}>
        Cancel
      </Button>
      <Button type="submit" style={{ backgroundColor: "indigo", margin: "10px", borderColor: "transparent" }}>
        Update
      </Button>
      {showThankYouMessage && <p>Recipe saved successfully!</p>}
    </div>
  );

  return (
    <>
      <Header imageUrl={CreateRecipes} title="Create your new Recipes" />
      <div className="form-container">
        <Form onSubmit={handleSubmit} style={{ padding: "5rem" }}>
          <Row className="d-flex justify-content-center">
            <Col className="py-2 p-0 p-md-2" md={5} lg={5}>
              <Container className={`${styles.Container} d-flex flex-column justify-content-center`}>
                <Form.Group className="text-center d-flex justify-content-center">
                  {image ? (
                    <>
                      <figure>
                        <Image className={appStyles.Image} src={image} rounded />
                      </figure>
                      <div>
                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                          Change the image
                        </Form.Label>
                      </div>
                    </>
                  ) : (
                    <Form.Label className="d-flex justify-content-center mr-2" htmlFor="image-upload">
                      <Asset src={upload} message="Click or tap to upload an image" />
                    </Form.Label>
                  )}
                  <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} style={{ display: "none" }} />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Container>
            </Col>
            <Col md={5} lg={4}>
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default RecipeEditForm;
