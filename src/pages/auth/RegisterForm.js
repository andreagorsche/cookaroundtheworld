import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/pages/auth/LoginRegister.module.css";
import btnStyles from "../../styles/components/Button.module.css";
import appStyles from "../../App.module.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Header from "../../components/Header";
import JoinHeader from "../../assets/images/JoinHeader.jpg"

const RegisterForm = () => {
		const [registerData, setRegisterData] = useState({
			username: "",
			email: "",
			password1: "",
			password2: "",
		});

	const {username, email, password1, password2 } = registerData;

	const [errors, setErrors] = useState({});

	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	const handleChange = (event) => {
			setRegisterData({
				...registerData,
				[event.target.name]: event.target.value,
			});
		};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
		  await axios.post("/dj-rest-auth/registration/", registerData);
		  setRegistrationSuccess(true);
		} 
		catch (err) {
			console.error("Registration error:", err);
		  	setErrors(err.response?.data);
		}
	  };

	return (
		<>
    	<Header imageUrl={JoinHeader} title = "Join Our Cooking Community" />
		<Row className="justify-content-md-center align-items-center">
			<Col xs={12} sm={8} md={6}>
				<Container className={`${appStyles.Content} p-4 `}>
					{registrationSuccess ? (
        			<Alert variant="success">
          			Thank you for your registration! To complete your registration, please confirm your email address.{" "}
          			</Alert>
      				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="username">
							<Form.Label className="d-none">Username</Form.Label>
							<Form.Control
								className = {styles.Input}
								type="text" 
								placeholder="Enter username" 
								name="username"
								value={username}
								onChange={handleChange}
								/>
						</Form.Group>
						{errors.username?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}

						<Form.Group controlId="email">
							<Form.Label className="d-none">Email address</Form.Label>
							<Form.Control 
								className = {styles.Input} 
								type="email" 
								placeholder="Enter email"
								name="email"
								value={email} 
								onChange={handleChange}
							/>
						</Form.Group>
						{errors.email?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}

						<Form.Group controlId="password1">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control 
								className = {styles.Input}
								type="password" 
								placeholder="Enter password" 
								name="password1"
								value={password1} 
								onChange={handleChange}
							/>
						</Form.Group>
						{errors.password1?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}
						<Form.Group controlId="password2">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control 
								className = {styles.Input}
								type="password" 
								placeholder="Confirm password" 
								name="password2"
								value={password2} 
								onChange={handleChange}
						/>
						</Form.Group>
						{errors.password2?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}
						<Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} btn btn-dark`}
						type="submit">
						Register
						</Button>
						{errors.non_field_errors?.map((message, idx) => (
              				<Alert key={idx} variant="warning" className="mt-3">
                				{message}
              				</Alert>
            			))}
					</Form>
					)}
				</Container>
				<Container className={`mt-3 ${appStyles.Content}`}>
					<Link className={styles.Link} to="/login">
						Already have an account? <span>Log in</span>
					</Link>
				</Container>
			
			</Col>
		</Row>
		</>
	);
};

export default RegisterForm;
