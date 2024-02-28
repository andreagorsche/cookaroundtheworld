import React from 'react';
import JoinHeader from "../../assets/images/JoinHeader.jpg"
import Header from "../../components/Header";

const InactiveAccount = () => {
  return (
      <div>
      <Header imageUrl={JoinHeader} />
      <h1>Oh, oh! Your account has been set to inactive.</h1>
      <p>To protect our users, we included a functionality to mark comments as inappropriate if they are offensive in any way.</p>
      <p>In your case users marked comments of yours as inappropriate five times or more. Thus your account has been set to inactive.</p>
      <p>To clarify the matter please feel free to contact our service team at: andrea.gorsche@gmail.com</p>
            </div>
  );
};

export default InactiveAccount;
