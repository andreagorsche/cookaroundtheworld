import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from "../../api/axiosDefaults";


const VerifyEmail = () => {
  const { key } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const history = useHistory();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axiosReq.get(`/verify-email/${key}`);
        // Log the response received from the server
        console.log(response);
        const message = response.data.message;
        console.log(message);
        if (response.status === 200 && message === "Email verified successfully") {
          // Email address verified successfully
          setVerificationStatus('verified');
          // Redirect to confirmation page after a delay
          setTimeout(() => {
            history.push('/success');
          }, 2000);
        } else {
          // Display error message if verification failed
          setVerificationStatus('error');
          console.error(message);
        }
      } catch (error) {
        // Display error message if request fails
        setVerificationStatus('error');
        console.error('Error:', error);
      }
    };

    fetchVerificationStatus();
  }, [key, history]);

  return (
    <div>
      {/* Conditional rendering based on verification status */}
      {verificationStatus === 'verifying' && <p>Verifying email address...</p>}
      {verificationStatus === 'verified' && <p>Email address verified successfully. Redirecting...</p>}
      {verificationStatus === 'error' && <p>Error verifying email address. Please try again later.</p>}
    </div>
  );
};

export default VerifyEmail;
