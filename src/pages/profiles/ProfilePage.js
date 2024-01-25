import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import HeaderImageCircle from "../../components/HeaderImageCircle";
import Intro from "../../components/Intro";
import CircleRow from "../../components/CircleRow"
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

  const is_owner = currentUser?.username === profile?.owner;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosReq.get(`/profiles/${id}/`);
        const pageProfile = response.data;

        console.log('pageProfile:', pageProfile);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));

        // Set showMultiStepForm to true if the user's bio is empty
        setShowMultiStepForm(!pageProfile.bio);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    setHasLoaded(true);
  }, [id, setProfileData, setHasLoaded]);

  return (
    <>
      <div>
        <HeaderImageCircle HeaderTitle={profile?.owner} imageUrl={profile?.image} style={{ height: '100vh' }} />
      </div>
      {showMultiStepForm ? (
        <MultiStepForm
          needsEditing={!profile?.bio}
          setNeedsEditing={(value) => setShowMultiStepForm(value)}
          profile={profile}
        />
      ) : (
        <>
          {hasLoaded ? (
            <>
              <Intro
                firstWord="Chef"
                secondWord={profile?.owner}
                secondPhrase=""
                firstParagraph={profile?.bio}
              />
            </>
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
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
      <TopProfiles />
    </>
  );
}

export default ProfilePage;