// FollowButton.js
import React, { useState, useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom';

const FollowButton = () => {
    const [followed, setFollowed] = useState(false);
    const currentUser = useCurrentUser();
    const { profileId } = useParams();
  
    useEffect(() => {
      const checkFollowStatus = async () => {
        try {
          const response = await axiosReq.get(`/followers/?owner=${currentUser.id}&followed=${profileId}`);
          setFollowed(response.data.length > 0);
        } catch (error) {
          console.error('Error checking follow status:', error);
          setFollowed(false);
        }
      };
  
      checkFollowStatus();
    }, [profileId, currentUser]);
  
    const handleFollow = async () => {
      try {
        // Assuming that you have an endpoint to follow a user
        await axiosReq.post('/followers/', { followed: followed });
        setFollowed(true);
      } catch (error) {
        console.error('Error following user:', error);
      }
    };
  
    const handleUnfollow = async () => {
      try {
        // Assuming that you have an endpoint to unfollow a user
        await axiosReq.delete(`/unfollow/${profileId}/`);
        setFollowed(false);
      } catch (error) {
        console.error('Error unfollowing user:', error);
      }
    };
  
    return (
      <button onClick={followed ? handleUnfollow : handleFollow} disabled={followed}>
        {followed ? 'Unfollow' : 'Follow'}
      </button>
    );
  };
  
  export default FollowButton;  