// ConfirmationPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

const ConfirmationPage = () => {
  const { confirmationKey } = useParams(); // Get the confirmation key from the URL

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        if (confirmationKey) {
          // Construct the confirmation URL using the environment variable
          const confirmationUrl = `${process.env.REACT_APP_CONFIRMATION_URL}${confirmationKey}/`;

          // Call the backend endpoint to confirm the email using axiosReq instance
          const response = await axiosReq.get(confirmationUrl);

          // Handle successful confirmation
          console.log(response.data);
        }
      } catch (error) {
        // Handle error
        console.error("Confirmation error", error);
      }
    };

    confirmEmail();
  }, [confirmationKey]);

  return (
    <div>
      <h1>Email Confirmation Page</h1>
      <p>Your email has been confirmed successfully!</p>
    </div>
  );
}

export default ConfirmationPage;
