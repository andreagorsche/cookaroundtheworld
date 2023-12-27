import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";

import chef_group from "../../assets/chef_group.png"; 

import styles from "../../styles/LoginRegister.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

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
		  const { data } = await axios.post("/dj-rest-auth/login/", loginData);
      console.log("Login successful. Token:", data.key);
      setCurrentUser(data.user);
		  history.push("/");
		} catch (err) {
        console.error("Login error:", err);
        setErrors(err.response?.data);
		}
	  };

  return (
    <Row className="justify-content-md-center align-items-center">
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Welcome back!</h1>
          <Form onSubmit={handleSubmit}>
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
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Register now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default LoginForm;
