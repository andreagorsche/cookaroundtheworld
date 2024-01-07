import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/pages/profiles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/components/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import HeaderImageCircle from "../../components/HeaderImageCircle";
import Intro from "../../components/Intro";
import CircleRow from "../../components/CircleRow"
import RecipeCard from "../../components/RecipeCard";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile?.results || [];
  const is_owner = currentUser?.username === profile?.owner;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        console.log('pageProfile:', pageProfile);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setHasLoaded(true);
  }, [id, setProfileData]);

  return (
    <>
      {hasLoaded ? (
        <>
          <HeaderImageCircle HeaderTitle={profile?.owner} imageUrl={profile?.image} />
          <Intro
            firstWord="Chef"
            secondWord={profile?.owner}
            secondPhrase=""
            firstParagraph={profile?.bio}
          />
          <CircleRow
            data={[profile?.recipes_count, profile?.followers_count, profile?.following_count]}
            labels={['Recipes', 'Followers', 'Following']}
          />
          <RecipeCard />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ProfilePage;
