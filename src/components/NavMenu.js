import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"
import {NavLink} from "react-router-dom";

const NavMenu = () => {
  return (
    <Navbar className={styles.NavMenu} collapseOnSelect expand="md" fixed="top"> 
      <Container>
        <NavLink to = "/">
          <Navbar.Brand>
            <img src={cookbook} alt="logo" height="50"/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink 
              exact
              className = {styles.NavLink} 
              activeClassName = {styles.Active} 
              to = "/"
            >
              <i className="fa-solid fa-utensils"></i>Recipes
          </NavLink>
          <NavLink 
            className = {styles.NavLink} 
            activeClassName = {styles.Active} 
            to = "/login">
            <i className="fa-regular fa-user"></i>Login
          </NavLink>
          <NavLink 
            className = {styles.NavLink} 
            activeClassName = {styles.Active} 
            to = "/register">
            <i className="fa-solid fa-user-plus"></i>Register
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavMenu;