import { axiosReq } from '../src/api/axiosDefaults';

export const fetchRecipeById = async (id, setRecipeData) => {
    try {
      const [{ data: pageRecipe }] = await Promise.all([
        axiosReq.get(`/recipes/${id}/`),
      ]);
      setRecipeData((prevState) => ({
        ...prevState,
        pageRecipe: { results: [pageRecipe] },
      }));
    } catch (err) {
      console.log(err);
    }
  };