import React from 'react';
import { useRecipeData, useHasLoaded } from '../contexts/RecipeDataContext';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import RecipeCard from "./RecipeCard";
import styles from "../styles/components/BulletinBoard.module.css"; 
 

function BulletinBoard({ intro, backgroundImage }) {
  const recipes = useRecipeData();
  const hasLoaded = useHasLoaded();

  const bgStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <Container fluid style={bgStyle} className={styles.bulletinboard}>
      <h1>Bulletin Board</h1>
      {intro && <p>{intro}</p>}
      <Row className="align-content-center justify-content-center">
        {hasLoaded ? (
          recipes.results.slice(0,3).map((recipe) => (
            <Col key={recipe.id} xs={12} sm={6} md={4} lg={4} xl={4}>
            <RecipeCard key={recipe.id} recipe={recipe} />
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
