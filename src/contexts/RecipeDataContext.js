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
    pageRecipe: { results: [null] },
  });

  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);


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
        const [{ data: pageRecipe }] = await Promise.all([
          axiosReq.get(`/recipes/${id}/`),
        ]);
        console.log('pageRecipe:', pageRecipe);
        setRecipeData((prevState) => ({
          ...prevState,
          pageRecipe: { results: [pageRecipe] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [id, setRecipeData, setHasLoaded])

  if (!hasLoaded) {
    return <p>Loading...</p>;
  }

 
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