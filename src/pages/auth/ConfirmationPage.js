import React from 'react';
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "../../styles/pages/auth/LoginRegister.module.css";
import appStyles from "../../App.module.css";

const ConfirmationPage = () => {
  return (
    <div>
      <h1>Congratulations!</h1>
      <p>Your email is confirmed. You can now proceed to login.</p>
        <Container className={`mt-3 ${appStyles.Content}`}>
					<Link className={styles.Link} to="/login">
						Already have an account? <span>Log in</span>
					</Link>
				</Container>
    </div>
  );
};

export default ConfirmationPage;
