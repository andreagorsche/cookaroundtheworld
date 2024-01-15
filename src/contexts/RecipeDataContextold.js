// RecipeDataContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';

const AllRecipesContext = createContext();
const SetAllRecipesContext = createContext();
const SelectedRecipeContext = createContext();
const SetSelectedRecipeContext = createContext();

export const useAllRecipes = () => useContext(AllRecipesContext);
export const useSetAllRecipes = () => useContext(SetAllRecipesContext);
export const useSelectedRecipe = () => useContext(SelectedRecipeContext);
export const useSetSelectedRecipe = () => useContext(SetSelectedRecipeContext);

export const RecipeDataProvider = ({ children }) => {
  const [allRecipes, setAllRecipes] = useState({ results: [] });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axiosReq.get('/recipes');
        console.log('All recipes fetched successfully:', response.data.results);
        setAllRecipes({ results: response.data.results });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllRecipes();
  }, []);

  const fetchRecipeById = async (id) => {
    try {
      const response = await axiosReq.get(`/recipes/${id}`);
      console.log('Selected recipe fetched successfully:', response.data);
      setSelectedRecipe(response.data);
    } catch (err) {
      console.log(err);
    }
    fetchRecipeById();
  };

  return (
    <AllRecipesContext.Provider value={{ allRecipes }}>
      <SetAllRecipesContext.Provider value={setAllRecipes}>
        <SelectedRecipeContext.Provider value={{ selectedRecipe }}>
          <SetSelectedRecipeContext.Provider value={setSelectedRecipe}>
            {children}
          </SetSelectedRecipeContext.Provider >
        </SelectedRecipeContext.Provider>
      </SetAllRecipesContext.Provider>
    </AllRecipesContext.Provider>
  );
};
