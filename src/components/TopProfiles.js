
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import {  useProfileData, useSetProfileData } from '../contexts/ProfileDataContext';
import { axiosReq } from "../api/axiosDefaults";
import Avatar from './Avatar';


const TopProfiles = () => {

  const { pageProfile } = useProfileData ();
  const { results: profiles } = pageProfile;
  const setProfileData = useSetProfileData();
  const [hasLoaded, setHasLoaded] = useState(false);


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
          profiles.results.map((profile) => (
            <Col key={profile.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                <Link to = {`/profiles/${profile.id}`}>
                    <Avatar src={profile.image} height={40} />
                    {profile.owner}
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