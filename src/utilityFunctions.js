import { axiosReq } from '../src/api/axiosDefaults';
import jwtDecode from "jwt-decode";

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

  // set a token timestamp in the browser storage.
  export const setTokenTimestamp = (accessToken) => {
    // Decode the access token to get the expiration timestamp
    const { exp } = jwtDecode(accessToken);
    
    // Store the expiration timestamp in localStorage
    localStorage.setItem("accessTokenExpiry", exp);
  };
  
  //  token will be refreshed only for a logged in user
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  // remove the refreshTokenTimestamp from the localStorage
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };