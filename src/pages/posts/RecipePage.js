import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import RecipeCard from "../../components/RecipeCard";
import Header from "../../components/Header";
import JoinHeader from "../../assets/images/JoinHeader.jpg"


function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
        ]);
        setRecipe({ results: [recipe] });
        console.log(recipe);
      } catch (err) {
        console.log(err);
            }
    };

    handleMount();
  }, [id]);

  return (
    <>
    <Header imageUrl={JoinHeader} />
    <Row className="justify-content-center" >
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <RecipeCard {...recipe.results[0]} setRecipes={setRecipe} recipePage />
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
    </Row>

    </>
  );
}

export default RecipePage;
