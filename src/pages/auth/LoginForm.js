import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";

import JoinHeader from "../../assets/images/JoinHeader.jpg"

import styles from "../../styles/pages/auth/LoginRegister.module.css";
import btnStyles from "../../styles/components/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import Header from "../../components/Header";

import axios from "axios";

function LoginForm() {
    const setCurrentUser = useSetCurrentUser();

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const {username, password} = loginData;

    const [errors, setErrors] = useState({});

    const history = useHistory();
    
    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("/dj-rest-auth/login/", loginData);
    
        // Extract the access token from the response
        const accessToken = response.data.access_token;
    
        // Store the access token in localStorage (you can also use sessionStorage)
        localStorage.setItem('access_token', accessToken);
    
        console.log("Login successful. Access Token:", accessToken);
    
        // Optionally, you can store other user-related data
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
    
        // Use setCurrentUser or any other logic to manage the user state
        setCurrentUser(user);
    
        history.push("/");
      } catch (err) {
        console.error("Login error:", err);
        setErrors(err.response?.data);
      }
    };

  return (
    <>
    <Header imageUrl={JoinHeader} />
    <Row className="justify-content-md-center align-items-center">
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <Form onSubmit={handleSubmit}>
            <h1>Welcome back!</h1>
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
                {errors.username?.map((message, idx) => (
              		<Alert variant="warning" key={idx}>
                		{message}
              		</Alert>
            	))}
                
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
                {errors.password?.map((message, idx) => (
              		<Alert variant="warning" key={idx}>
                		{message}
              		</Alert>
            	))}

            <Button 
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit">
                Login
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              	<Alert key={idx} variant="warning" className="mt-3">
                	{message}
              	</Alert>
            ))}
            </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/register">
            Don't have an account? <span>Register now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
    </>
  );
}

export default LoginForm;
