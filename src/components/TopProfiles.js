
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import {  useProfileData, useSetProfileData } from '../contexts/ProfileDataContext';
import { axiosReq } from "../api/axiosDefaults";
import Avatar from './Avatar';


const TopProfiles = () => {
  const { profile_id, profile_image, owner } = useContext(useProfileData);
  const { profiles, setProfiles, hasLoaded, setHasLoaded } = useContext(useSetProfileData);

    useEffect(() => {
      const fetchProfiles = async () => {
        try {
          const { data } = await axiosReq.get("/profiles/", {
            params: {
              ordering: "followers_count",
              limit: 3,
            },
          });
          setProfiles(data);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
  
      setHasLoaded(false);
      fetchProfiles();
    }, []);
  
  return (
    <div>
        <Row className="justify-content-between">
        {hasLoaded ? (
          profiles.map((profile) => (
            <Col key={profile.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                <Link to = {`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={40} />
                    {owner}
                </Link>            
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
       
    
        
    </div>
  )
}

export default TopProfiles