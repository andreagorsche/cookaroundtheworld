import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams, useHistory } from 'react-router-dom';

const RatingContext = createContext();
const SetRatingContext = createContext();

export const useRating = () => useContext(RatingContext);
export const useSetRating = () => useContext(SetRatingContext);

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(0);
  const { id } = useParams();


  const fetchRating = async () => {
    try {
      const response = await axiosReq.get(`/ratings/${id}`);
      console.log(response.data);
      setRating(response.data); 
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchRating();
  }, [id, setRating]);
  


  return (
    <RatingContext.Provider value={rating}>
      <SetRatingContext.Provider value={setRating}>
        {children}
      </SetRatingContext.Provider>
    </RatingContext.Provider>
  );
};
