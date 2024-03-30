import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import Header from "../../components/Header";
import FoodFeedHeader from "../../assets/images/FoodFeedHeader.jpeg";
import Filters from "../../components/Filters"; // Import the Filters component

import RecipeCard from "../../components/RecipeCard";
import Asset from "../../components/Asset";
import NoCooking from "../../assets/images/no_cooking.png";

import { useRecipeData, useFetchRecipes } from "../../contexts/RecipeDataContext";
import { useParams, useLocation } from "react-router";

function FoodFeed({ message }) {
  const recipes = useRecipeData();
  const fetchRecipes = useFetchRecipes();
  const { id } = useParams();
  const { pathname } = useLocation();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState(""); // State to manage filter values

  useEffect(() => {
    fetchRecipes(`/recipes/?${filter}`)
      .then(() => {
        setHasLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [filter]);

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Define cuisineChoices and popularIngredients arrays
  const cuisineChoices = ['american', 'austrian', 'caribbean', 'chinese', 'french', 'german', 'greek', 'indian', 'italian', 'mediterranean', 'mexican', 'slovak', 'spanish'];
  const popularIngredients = [
    { value: 'pasta', label: 'Pasta' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'rice', label: 'Rice' },
    { value: 'chicken', label: 'chicken' },
    { value: 'beef', label: 'Beef' },
    { value: 'pork', label: 'Pork' },
    { value: 'lamb', label: 'Lamb' },
    { value: 'duck', label: 'Duck' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'zucchini', label: 'Zucchini' },
    { value: 'aubergine', label: 'Aubergine' },
    { value: 'mushrooms', label: 'Mushrooms' },
    { value: 'salad', label: 'Salad' },
    { value: 'brokkoli', label: 'Brokkoli' },
    { value: 'cheese', label: 'Cheese' },
  ];

  return (
    <>
      <Header imageUrl={FoodFeedHeader} />
      <Row className="d-flex justify-content-center h-100">
        <Col className="p-0" lg={4}>
          {/* Passing filter, handleFilterChange, cuisineChoices, and popularIngredients as props */}
          <Filters style={{ width: "300px" }} filter={filter} onFilterChange={handleFilterChange} cuisineChoices={cuisineChoices} popularIngredients={popularIngredients} />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          {hasLoaded ? (
            <>
              {recipes.results?.length ? (
                recipes.results.map((recipe) => (
                  <Col key={recipe.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  </Col>
                ))
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoCooking} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </>
  );
}
export default FoodFeed;
