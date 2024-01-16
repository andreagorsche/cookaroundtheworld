// RecipeDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';

const RecipeDataContext = createContext();

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchRecipes = async (endpoint, params = {}) => {
    try {
      const { data } = await axiosReq.get(endpoint, { params });
      setRecipeData(data);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    fetchRecipes('/recipes/');
  }, []);

  return (
    <RecipeDataContext.Provider value={{ recipeData, hasLoaded, fetchRecipes }}>
      {children}
    </RecipeDataContext.Provider>
  );
};

export const useRecipeData = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useRecipeData must be used within a RecipeDataProvider');
  }
  return context.recipeData;
};

export const useHasLoaded = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useHasLoaded must be used within a RecipeDataProvider');
  }
  return context.hasLoaded;
};

export const useFetchRecipes = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useFetchRecipes must be used within a RecipeDataProvider');
  }
  return context.fetchRecipes;
};
