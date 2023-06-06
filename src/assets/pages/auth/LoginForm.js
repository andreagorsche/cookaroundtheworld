import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import chef_group from "../../../assets/chef_group.png"; 


import { Link } from "react-router-dom";

import styles from "../../../styles/LoginRegister.module.css";
import btnStyles from "../../../styles/button.module.css";
import appStyles from "../../../App.module.css";

function LoginForm() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const {username, password} = loginData;
    
    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

  return (
    <Row className="justify-content-md-center align-items-center">
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Welcome back!</h1>
          <Form>
            <img src={chef_group} className={`${appStyles.CommunityImage}`} alt="community" height="100"/>
            <h1>Login</h1>
            <Form.Group controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username" 
                    placeholder="Enter username"
                    className = {styles.Input}
                    value={username}
					onChange={handleChange}
                />
            </Form.Group>
                
            <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Enter password"
                    className = {styles.Input}
                    value={password}
					onChange={handleChange}
                />
            </Form.Group>

            <Button 
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit">
                Login
            </Button>

            </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Register now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default LoginForm;