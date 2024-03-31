import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProfileData } from '../contexts/ProfileDataContext';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const TopProfiles = () => {
  const { topProfiles } = useProfileData();

  return (
    <Container>
      <h1>Our Newest Profiles</h1>
      {topProfiles?.results?.length ? (
        <Row className="justify-content-between">
          {topProfiles.results[0]?.results.slice(0,6).map((profile) => (
            <Col key={profile.id} xs={12} sm={6} md={4} lg={4} xl={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile.id}`}>
                      <Avatar src={profile.image} height={40} />
                      <div>
                        <p>{profile.owner}</p>
                        <p>{profile.bio}</p>
                      </div>
                    </Link>
                  </Media>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No top profiles available.</p>
      )}
    </Container>
  );
};

export default TopProfiles;
