import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { useProfileData, useSetProfileData } from "../contexts/ProfileDataContext";
import Avatar from './Avatar';

const ProfileCard = () => {
  const { pageProfile } = useProfileData();
  const { pageProfile: { results } } = useProfileData();

  return (
    <>
      {results.map((profile) => (
        <Card key={profile.id} className="mb-3">
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
      ))}
      </>
     )
};


export default ProfileCard;