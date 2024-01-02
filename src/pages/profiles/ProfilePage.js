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

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [data] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);



  return (
    <>
  <HeaderImageCircle HeaderTitle={profile?.owner} imageUrl={profile?.image} />
  <Intro
          firstWord="Chef"
          secondWord={profile?.owner}
          secondPhrase=""
          firstParagraph={profile?.bio}
          />

    </>
  );
}

export default ProfilePage;
