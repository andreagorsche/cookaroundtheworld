import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import HeaderImageCircle from "../../components/HeaderImageCircle";
import Intro from "../../components/Intro";
import CircleRow from "../../components/CircleRow";
import TopProfiles from "../../components/TopProfiles";
import MultiStepForm from "./MultiStepForm";
import { Col, Button } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/components/Button.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile?.results || [];
  const [showMultiStepForm, setShowMultiStepForm] = useState(false);
  const currentUser = useCurrentUser();
  const history = useHistory(); 

  const is_owner = currentUser?.username === profile?.owner;
  const followed_id = pageProfile?.results?.[0]?.id;

// Declare state variables for followers and isCurrentUserFollowing
const [followers, setFollowers] = useState([]);
const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false);

const handleFollowButtonClick = async () => {
  // Perform follow or unfollow action based on isCurrentUserFollowing
  if (isCurrentUserFollowing) {
    // Unfollow
    await handleUnfollow(followed_id);
  } else {
    // Follow
    await handleFollow(profile);
  }

  // After following or unfollowing, fetch data again to update the state
  fetchData();
};

const fetchData = async () => {
  try {
    // Extracting the list of followers and followed users
    const followersResponse = await axiosReq.get(`/followers/`);
    const fetchedFollowers = followersResponse.data.results; // Access the 'results' property

    // Check if fetchedFollowers is an array
    if (Array.isArray(fetchedFollowers)) {
      // Check if the current user is following the profile owner
      const fetchedIsCurrentUserFollowing = fetchedFollowers.some(follower => follower.owner === currentUser?.username);

      // Set state variables
      setFollowers(fetchedFollowers);
      setIsCurrentUserFollowing(fetchedIsCurrentUserFollowing);

      // Fetch profile data
      const response = await axiosReq.get(`/profiles/${id}/`);
      const pageProfile = response.data;

      console.log('pageProfile:', pageProfile);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [pageProfile] },
      }));

      // Log values for debugging
      console.log('Is Owner:', is_owner);
      console.log('Followed ID:', followed_id);
      console.log('Followers:', fetchedFollowers);
      console.log('Is Current User Following:', fetchedIsCurrentUserFollowing);
    } else {
      console.error("Invalid format for fetchedFollowers:", fetchedFollowers);
    }

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchData();
  setHasLoaded(true);
}, [id, setProfileData, setHasLoaded]);

  const handleEditButtonClick = () => {
    setShowMultiStepForm(true);
  };


  const handleDeleteClick = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this profile? Your login data will be deleted as well.')) {
        await axiosReq.delete(`/profiles/${id}/`);
        await axiosReq.post('/dj-rest-auth/logout/'); // Logout the user
        history.push('/'); // Redirect to the home page
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <>
      <div>
        <HeaderImageCircle HeaderTitle={profile?.owner} imageUrl={profile?.image} style={{ height: '100vh' }} />
      </div>
      {showMultiStepForm ? (
        <MultiStepForm profile={profile} />
      ) : (
        <>
          {hasLoaded ? (
            <Intro
              firstWord="Chef"
              secondWord={profile?.owner}
              secondPhrase=""
              firstParagraph={profile?.bio}
            />
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
      <p>{`Favorite Cuisine: ${profile?.favorite_cuisine}`}</p>
      <CircleRow
        data={[profile?.recipes_count, profile?.followers_count, profile?.following_count]}
        labels={['Recipes', 'Followers', 'Following']}
      />
      <Col lg={3} className="text-lg-right">
       {is_owner && (
        <>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Black}`}
          onClick={handleEditButtonClick}
        >
          Edit Profile
        </Button>
         <Button
         className={`${btnStyles.Button} ${btnStyles.Black}`}
         onClick={handleDeleteClick}
       >
         Delete Profile
       </Button>
       </>
      )}
      {currentUser && !is_owner && (
        <Button
          className={`${btnStyles.Button} ${
            isCurrentUserFollowing
              ? btnStyles.BlackOutline
              : btnStyles.Black
          }`}
          onClick={handleFollowButtonClick}
        >
          {isCurrentUserFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
      </Col>
      <TopProfiles />
    </>
  );
}

export default ProfilePage;
