import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import Intro from "../../components/Intro";
import CircleRow from "../../components/CircleRow";
import MultiStepForm from "./MultiStepForm";
import { Col, Button } from "react-bootstrap";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/components/Button.module.css";

function ProfilePage() {
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile, setProfile] = useState(null);
  const [showMultiStepForm, setShowMultiStepForm] = useState(false);
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory(); 
  const is_owner = currentUser?.username === profile?.owner;
  const followed_id = pageProfile?.results?.[0]?.id;

  // Declare state variables for followers and isCurrentUserFollowing
  const [followers, setFollowers] = useState([]);
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));

        // Update profile state
        setProfile(pageProfile);

        // Set isLoading to false after data is fetched
        setIsLoading(false);
      } else {
        console.error("Invalid format for fetchedFollowers:", fetchedFollowers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, setProfileData]);

  const handleEditButtonClick = () => {
    setShowMultiStepForm(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {showMultiStepForm ? (
        <MultiStepForm profile={profile} />
      ) : (
        <>
          <Intro
            firstWord="Chef"
            secondWord={profile?.owner}
            secondPhrase=""
            firstParagraph={profile?.bio}
          />
        </>
      )}
      <p>{`Favorite Cuisine: ${profile?.favorite_cuisine}`}</p>
      <CircleRow
        data={[profile?.recipes_count, profile?.followers_count, profile?.following_count]}
        labels={['Recipes', 'Followers', 'Following']}
      />
      <Col lg={3} className="text-lg-right">
       {is_owner && (
        <Button
          className={`${btnStyles.Button} ${btnStyles.Black}`}
          onClick={handleEditButtonClick}
        >
          Edit Profile
        </Button>
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
    </>
  );
}

export default ProfilePage;
