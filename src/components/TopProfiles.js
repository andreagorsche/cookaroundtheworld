import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Media } from 'react-bootstrap';
import { useProfileData, useSetProfileData } from '../contexts/ProfileDataContext';
import { axiosReq } from "../api/axiosDefaults";
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const TopProfiles = () => {
  const {topProfiles}  = useProfileData();

  return (
    <Container>
      <h1>Our Top Profiles</h1>
      <Row className="justify-content-between">
        {topProfiles?.results?.slice(0,3).map((profile) => (
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
