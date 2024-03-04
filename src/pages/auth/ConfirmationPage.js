import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import styles from "../../styles/pages/auth/LoginRegister.module.css";
import appStyles from "../../App.module.css";
import JoinHeader from "../../assets/images/JoinHeader.jpg"
import Header from "../../components/Header";
import { axiosReq } from "../../api/axiosDefaults";


const ConfirmationPage = () => {
  const { key } = useParams(); 

  const confirmEmail = async (key) => {
    try {
      const response = await axiosReq.post(`/verify-email/${key}/`);
      console.log(response.data); 
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  };

  useEffect(() => {
    confirmEmail(key);
  }, [key]);

  return (
      <div>
      <Header imageUrl={JoinHeader} />
      <h1>Congratulations!</h1>
      <p>Your email is confirmed. You can now proceed to login.</p>
        <Container className={`mt-3 ${appStyles.Content}`}>
        <p>Key: {key}</p> {/* Display the key for debugging */}
					<Link className={styles.Link} to="/login">
						Already have an account? <span>Log in</span>
					</Link>
				</Container>
    </div>
  );
};

export default ConfirmationPage;
