import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import RecipeCard from "./RecipeCard";
import { axiosReq } from "../../api/axiosDefaults";

function BulletinBoard({ message }) {
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get("/recipes/", {
          params: {
            ordering: "-created_at",
            limit: 3,
          },
        });
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchRecipes();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        {hasLoaded ? (
          recipes.results.map((recipe) => (
            <Col key={recipe.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
              />
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
}

export default BulletinBoard;
