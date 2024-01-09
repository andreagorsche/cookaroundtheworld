// RecipeDataContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get("/api/recipes");
        setRecipeData(data);
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