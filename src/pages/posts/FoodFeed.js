import React, {useEffect, useState} from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import RecipeCard from "../../components/RecipeCard";
import Asset from "../../components/Asset";
import NoCooking from "../../assets/images/no_cooking.png"



function FoodFeed({message, id}) {
  const [recipes, setRecipes] = useState({results:[]});
  const [hasLoaded, setHasLoaded] = useState(false);
  const {pathname} = useLocation ();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/?${id}`);
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchRecipes();
  }, [id, pathname]);

  return (
    <Row className="h-100">
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
  );
  
}
export default FoodFeed;