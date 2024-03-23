import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from 'react-router-dom';

const RatingContext = createContext();  
const SetRatingContext = createContext();  

export const useRating = () => useContext(RatingContext);
export const useSetRating = () => useContext(SetRatingContext);

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState();
  const { id } = useParams();

  const fetchRating = async () => {
    try {
      const response = await axiosReq.get(`/ratings/`);
      console.log('Ratings data fetched successfully:', response.data.results);
      setRating(response.data.results); 
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchRating();
  }, [id]);

  return (
    <RatingContext.Provider value={rating}>  
      <SetRatingContext.Provider value={setRating}>
        {children}
      </SetRatingContext.Provider>
    </RatingContext.Provider>
  );
};
