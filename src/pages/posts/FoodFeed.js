import React, {useState, useEffect} from "react";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import Header from "../../components/Header";
import FoodFeedHeader  from "../../assets/images/FoodFeedHeader.jpeg"

import RecipeCard from "../../components/RecipeCard";
import Asset from "../../components/Asset";
import NoCooking from "../../assets/images/no_cooking.png"

import { useRecipeData, useSetRecipeData } from '../../contexts/RecipeDataContext';
import { useParams } from "react-router";

function FoodFeed({message}) {
const recipes = useRecipeData();
const setRecipeData = useSetRecipeData();
const { id } = useParams();
const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const { data } = await axiosReq.get(`/recipes/?${id}`);
      
      setRecipeData((prevData) => ({
        ...prevData,
        results: data.results,
      }));

      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  setHasLoaded(false);
  fetchRecipes();
}, [id, pathname, setRecipeData]);


  return (
    <>
    <Header imageUrl={FoodFeedHeader} />
    <Row className='d-flex justify-content-center h-100'>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {recipes.results.length ? (
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