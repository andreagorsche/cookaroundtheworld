import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import chef_group from "../../../assets/chef_group.png"; 

import styles from "../../../styles/LoginRegister.module.css";
import btnStyles from "../../../styles/button.module.css";
import appStyles from "../../../App.module.css";

import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
		const [registerData, setRegisterData] = useState({
			username: "",
			email: "",
			define_password: "",
			confirm_password: "",
		});

	const {username, email, define_password, confirm_password } = registerData;

	const [errors, setErrors] = useState({});

	const history = useHistory();

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
		  history.push("/login");
		} catch (err) {
		  setErrors(err.response?.data);
		}
	  };

	return (
		<Row className="justify-content-md-center align-items-center">
			<Col xs={12} sm={8} md={6}>
				<Container className={`${appStyles.Content} p-4 `}>
					<h1 className={styles.Header}>Join our cooking community!</h1>

					<Form onSubmit={handleSubmit}>
						<img src={chef_group} className={`${appStyles.CommunityImage}`} alt="community" height="100"/>
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

						<Form.Group controlId="define_password">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control 
								className = {styles.Input}
								type="password" 
								placeholder="Enter password" 
								name="define_password"
								value={define_password} 
								onChange={handleChange}
							/>
						</Form.Group>
						{errors.define_password?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}
						<Form.Group controlId="confirm_password">
							<Form.Label className="d-none">Password</Form.Label>
							<Form.Control 
								className = {styles.Input}
								type="password" 
								placeholder="Confirm password" 
								name="confirm_password"
								value={confirm_password} 
								onChange={handleChange}
						/>
						</Form.Group>
						{errors.confirm_password?.map((message, idx) => (
              				<Alert variant="warning" key={idx}>
                				{message}
              				</Alert>
            			))}
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
