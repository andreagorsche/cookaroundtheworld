
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useProfileData, useSetProfileData } from '../contexts/ProfileDataContext';
import { axiosReq } from "../api/axiosDefaults";
import Avatar from './Avatar';
import ProfileCard from './ProfileCard';



const TopProfiles = () => {
  const { pageProfile } = useProfileData ();
  const { results: profiles } = pageProfile;
  const setProfileData = useSetProfileData();

    useEffect(() => {
      const fetchProfiles = async () => {
        try {
          const { data } = await axiosReq.get("/profiles/", {
            params: {
              ordering: "followers_count",
              limit: 3,
            },
          });
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: data },
          }));
        } catch (err) {
          console.log(err);
        }
      };
        fetchProfiles();
    }, [setProfileData]);
  
    return (
      <Container>
        <h1>Our Top Profiles</h1>
        <Row className="justify-content-between">
            profiles.results.map((profile) => (
              <Col key={profile.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <ProfileCard key={profile.id} profile={profile} />
              </Col>
            ))
          ) 
        </Row>
      </Container>
    );
  }

export default TopProfiles