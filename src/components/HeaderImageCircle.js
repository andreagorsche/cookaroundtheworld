import React from 'react';
import Avatar from './Avatar';
import { Col } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { useCurrentUser } from "../contexts/CurrentUserContext";

function HeaderImageCircle({ HeaderTitle, imageUrl }) {
  const currentUser = useCurrentUser();
  return (
    <>
    <Row style={{ minHeight: '400px' }}  id='background-header-img' className='d-flex align-items-center justify-content-center'>
        <Col md={6} className='d-flex align-items-center justify-content-center'>
        <div id='header-title'>{HeaderTitle}</div>
        </Col>
        <Col style={{ padding: 0 }} md={6} className='d-flex align-items-center justify-content-center'>
            <Avatar src={currentUser?.profile_image} text={currentUser && currentUser.username} height={40} />
        </Col>
    </Row>
    
    </>
  );
}

export default HeaderImageCircle;