// RecipeDataContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get("/api/recipes");
        setRecipeData(data);

        // Extract unique cuisines from the recipes
        const uniqueCuisines = [...new Set(data.map((recipe) => recipe.cuisine))];
        setCuisineData(uniqueCuisines);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
     
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeDataContext.Provider value={recipeData}>
      <SetRecipeDataContext.Provider value={setRecipeData}>
        {children}
      </SetRecipeDataContext.Provider>
    </RecipeDataContext.Provider>
  );
};
