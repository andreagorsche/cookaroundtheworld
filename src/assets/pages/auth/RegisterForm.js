import React from "react";
import { Link } from "react-router-dom";
import chef_group from "../../../assets/chef_group.png"; 
import styles from "../../../styles/LoginRegister.module.css";
import btnStyles from "../../../styles/button.module.css";
import appStyles from "../../../App.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Join our cooking community!</h1>

          <Form>
          <img src={chef_group} className={`${appStyles.CommunityImage}`} alt="community" height="100"/>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
            className = {styles.Input}
             type="text" placeholder="Enter username" name="username" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label className="d-none">Email address</Form.Label>
            <Form.Control 
            className = {styles.Input} 
            type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="define_password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control 
            className = {styles.Input}
            type="password" placeholder="Enter password" name="define_password" />
            </Form.Group>
            <Form.Group controlId="confirm_password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control 
            className = {styles.Input}
            type="password" placeholder="Confirm password" name="confirm_password" />
            </Form.Group>
            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            type="submit">
            Register
            </Button>
          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Log in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default RegisterForm;

//chef, image, bio