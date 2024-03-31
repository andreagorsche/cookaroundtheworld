import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import JoinHeader from "../../assets/images/JoinHeader.jpg"

function ConfirmationPage() {
  return (
    <div>
      <Header imageUrl={JoinHeader} />
      <h1>Email Confirmation Successful</h1>
      <p>Your email has been successfully verified. You can now access all features of our website.</p>
      <p>You can now proceed to login:</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    
    </div>
  );
}

export default ConfirmationPage;