import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from './Avatar';

const ProfileCard = () => {
  const { pageProfile } = useProfileData();
  const { results: profiles } = pageProfile;

  return (
    <div>
        <Card key={profile.id} className="mb-3">
          <Card.Body>
            <Media className="align-items-center justify-content-between">
              <Link to={`/profiles/${profile.id}`}>
                <Avatar src={profile.profile_image} height={40} />
                {profile.owner}
                {profile.bio}
              </Link>
            </Media>
          </Card.Body>
        </Card>
      ))
    </div>
  );
};

export default ProfileCard;