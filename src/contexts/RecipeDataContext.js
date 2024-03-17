// RecipeDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useParams } from 'react-router';

const RecipeDataContext = createContext();

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState({ results: [] });
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();

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

  const fetchRecipeById = async (id) => {
    try {
      if (id) {
        const response = await axiosReq.get(`/recipes/${id}/`);
        console.log('Response:', response.data); // Log the data property of the response
        setCurrentRecipe(response.data);
        setHasLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    if (id) {
      setHasLoaded(false);
      fetchRecipeById(id);
    }
  }, [id]);


  return (
    <RecipeDataContext.Provider
      value={{
        recipeData,
        currentRecipe,
        hasLoaded,
        setHasLoaded,
        fetchRecipes,
        fetchRecipeById,
        setRecipeData,
        setCurrentRecipe,
      }}
    >
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

export const useSetRecipeData = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useSetRecipeData must be used within a RecipeDataProvider');
  }
  return context.setRecipeData;
};

export const useHasLoaded = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useHasLoaded must be used within a RecipeDataProvider');
  }
  return context.hasLoaded;
};

export const useSetHasLoaded = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useSetHasLoaded must be used within a RecipeDataProvider');
  }
  return context.setHasLoaded;
};

export const useFetchRecipes = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useFetchRecipes must be used within a RecipeDataProvider');
  }
  return context.fetchRecipes;
};

export const useFetchRecipeById = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useFetchRecipeById must be used within a RecipeDataProvider');
  }
  return context.fetchRecipeById;
};

export const useCurrentRecipe = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useCurrentRecipeData must be used within a RecipeDataProvider');
  }
  return context.currentRecipe;
};

export const useSetCurrentRecipe = () => {
  const context = useContext(RecipeDataContext);
  if (!context) {
    throw new Error('useSetCurrentRecipeData must be used within a RecipeDataProvider');
  }
  return context.setCurrentRecipe;
};