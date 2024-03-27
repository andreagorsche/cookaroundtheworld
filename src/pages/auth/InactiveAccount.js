import React from 'react';
import JoinHeader from "../../assets/images/JoinHeader.jpg"
import Header from "../../components/Header";

const InactiveAccount = () => {
  return (
      <div>
        <Header imageUrl={JoinHeader} />
        <h1>Oh, oh! Your account is inactive.</h1>
        <p>Please check your email address for further instructions.</p>

        <p>You are here the first time around? Make sure you verified your email address.</p>

        <p>You have been able to login before? Please check your email, if there could be any reason why your account could have been set to inactive.</p>
        
        <h4 style={{ textAlign: "center" }}>General Information</h4>
        <p>To protect our users, we included a functionality to mark comments as inappropriate if they are offensive in any way.</p>
        <p>If this happened to you, you will find an information email with further details in your mail inbox.</p>

        <h4 style={{ textAlign: "center" }}>You have any questions or need assistance?</h4>
        <p>Please contact: andrea.gorsche@gmail.com </p>
      </div>
  );
};

export default InactiveAccount;
