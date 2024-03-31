import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import JoinHeader from "../../assets/images/JoinHeader.jpg"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function ConfirmationPage() {
  return (
    <div>
      <Header imageUrl={JoinHeader} />
      <h1>Email Confirmation Successful</h1>
      <p>Your email has been successfully verified. You can now access all features of our website.</p>
      <p>You can now proceed to login:</p>
      <Col className="d-flex justify-content-center">
      <Link to="/login">
        <Button style={{ backgroundColor: 'indigo', margin: '10px', borderColor: 'transparent' }}>        Login
        </Button>
      </Link>
      </Col>
    
    </div>
  );
}

export default ConfirmationPage;