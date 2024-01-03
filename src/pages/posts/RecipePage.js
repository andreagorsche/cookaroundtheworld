import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import RecipeCard from "../../components/RecipeCard";
import HeaderImageCircle from "../../components/HeaderImageCircle";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}`);
        setRecipe({ results: [data] });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const { title, image, cuisine, ingredients, time_effort, description, updated_at, is_owner, recipePage, comments_count, likes_count, like_id } = recipe.results[0] || {};
  const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
  const headerImageUrl = recipe.results[0]?.image;


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
            Rating
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
