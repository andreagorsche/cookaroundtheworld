import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams, useHistory } from 'react-router-dom';

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();
const EditRecipeContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);
export const useEditRecipe = () => useContext(EditRecipeContext);

export const useHasLoaded = () => {
  const { hasLoaded } = useContext(RecipeDataContext);
  return hasLoaded;
};

export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState({
    pageRecipe: { results: [null] },
  });

  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRecipes = async () => {
      
      try {
        const [{ data: pageRecipe }] = await Promise.all([
          axiosReq.get(`/recipes/`),
        ]);
        console.log('pageRecipe:', pageRecipe);
        setRecipeData((prevState) => ({
          ...prevState,
          pageRecipe: { results: [pageRecipe] },
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [id, setRecipeData])

 

  return (
    <RecipeDataContext.Provider value={recipeData}>
      <SetRecipeDataContext.Provider value={setRecipeData}>
        <EditRecipeContext.Provider value={{ isEditing, handleEditClick, handleCancelEdit }}>
        {children}
        </EditRecipeContext.Provider >
      </SetRecipeDataContext.Provider>
    </RecipeDataContext.Provider>
  );
};