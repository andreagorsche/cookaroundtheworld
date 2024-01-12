import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory, useParams } from 'react-router-dom';

const RecipeDataContext = createContext();
const SetRecipeDataContext = createContext();
const EditRecipeContext = createContext();

export const useRecipeData = () => useContext(RecipeDataContext);
export const useSetRecipeData = () => useContext(SetRecipeDataContext);
export const useEditRecipe = () => useContext(EditRecipeContext);



export const RecipeDataProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState({
    pageRecipe: { results: [] },
  });

  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const handleEditClick = () => {
    history.push(`/recipes/${id}/edit`);
    setIsEditing(true);
    
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes`);
        console.log("Fetched data:", data); 
        setRecipeData({pageRecipe:{results: data}});
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipes();
  }, [setRecipeData]);

 
  return (
    <RecipeDataContext.Provider value={recipeData}>
      <SetRecipeDataContext.Provider value={setRecipeData}>
        <EditRecipeContext.Provider value={{ isEditing, handleEditClick, handleCancelEdit }}>
        {children}
        </EditRecipeContext.Provider>
      </SetRecipeDataContext.Provider>
    </RecipeDataContext.Provider>
  );
};