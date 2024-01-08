import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Media } from 'react-bootstrap';
import { useProfileData, useSetProfileData } from '../contexts/ProfileDataContext';
import { axiosReq } from "../api/axiosDefaults";
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const TopProfiles = () => {
  const {topProfiles}  = useProfileData();
  const setProfileData = useSetProfileData();
  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/", {
          params: {
            ordering: ["-followers_count", "-recipes_count", "-created_at"],
            limit: 3,
          },
        });
        setProfileData((prevState) => ({
          ...prevState,
          topProfiles:  data ,
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
        {topProfiles?.results?.map((profile) => (
          <Col key={profile.id} xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card className="mb-3">
              <Card.Body>
                <Media className="align-items-center justify-content-between">
                  <Link to={`/profiles/${profile.id}`}>
                    <Avatar src={profile.image} height={40} />
                    {profile.owner}
                    {profile.bio}
                  </Link>
                </Media>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TopProfiles;
