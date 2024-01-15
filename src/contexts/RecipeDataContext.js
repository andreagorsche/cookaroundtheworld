import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from 'react-router-dom';

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState({ data: [] });
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeById = async (id, setRecipeData) => {
      try {
        const [{ data: recipeData }] = await Promise.all([
          axiosReq.get(`/recipes/${id}/`),
        ]);
        console.log('recipeData:', recipeData);
        setRecipeData((prevState) => ({
          ...prevState,
          recipeData: { results: [recipeData] },
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipeById(id, setRecipeData);
  }, []); 

  return (
    <RecipeDataContext.Provider value={{ recipeData }}>
      <SetRecipeDataContext.Provider value={setRecipeData}>
        {children}
      </SetRecipeDataContext.Provider>
    </RecipeDataContext.Provider>
  );
};
