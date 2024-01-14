import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams, useHistory } from 'react-router-dom';

const RatingContext = createContext();
const SetRatingContext = createContext();

export const useRating = () => useContext(RatingContext);
export const useSetRating = () => useContext(SetRatingContext);

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(0);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false); // Add this state
  const { id } = useParams();
  const history = useHistory();

  const addRating = async (newRating) => {
    try {
      const response = await axiosReq.post('/ratings/', { stars: newRating.rating, recipe: id });

      if (response && response.data) {
        const data = response.data;
        setRating(data.rating);
        setShowThankYouMessage(true);
        console.log("Rating Added Successfully:", data);
      } else {
        console.error('Error adding rating: Response or data is undefined');
      }
    } catch (error) {
      console.error('Error adding rating:', error);
      console.log('Error Response:', error.response ? error.response.data : 'No response data');
    }
  };

  const displayRating = async () => {
    try {
      const response = await axiosReq.get(`/ratings/${id}`);
      console.log(response.data);
      setRating(response.data); 
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateRating = async (upRating) => {
    try {
      const response = await axiosReq.put(`/ratings/${id}`, { stars: upRating.stars });
  
      const data = response.data;
      setRating(data);
      setShowThankYouMessage(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };  
  

  useEffect(() => {
    displayRating();
  }, [id, setRating]);
  


  return (
    <RatingContext.Provider value={rating}>
      <SetRatingContext.Provider value={setRating}>
        {children}
      </SetRatingContext.Provider>
    </RatingContext.Provider>
  );
};
