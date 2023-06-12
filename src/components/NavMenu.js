import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"
import {NavLink} from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavMenu = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/login">
        <i className="fa-regular fa-user">Login</i>
      </NavLink>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/register">
        <i className="fa-solid fa-user-plus">Register</i>
      </NavLink>
    </>
  );

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
              <i className="fa-solid fa-utensils">Recipes</i>
          </NavLink>
          
          {currentUser ? loggedInIcons : loggedOutIcons}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavMenu;