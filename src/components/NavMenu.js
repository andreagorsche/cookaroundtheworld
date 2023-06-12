import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"
import {NavLink} from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavMenu = () => {
  const currentUser = useCurrentUser();

  const createRecipeIcon = (
    <NavLink 
    className = {styles.NavLink} 
    activeClassName = {styles.Active} 
    to = "/recipes/create">
    <i class="fa-solid fa-feather">Create Recipe</i>
  </NavLink> 
  )
  const loggedInIcons = <>
  (
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/feeding">
      <i class="fa-solid fa-scroll">Feed-ing</i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/favorites">
      <i class="fa-solid fa-thumbs-up">Favorites</i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink}  
      to = "/" 
      >
      <i className="fa-solid fa-user">Log Out</i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink}  
      to={`/profiles/${currentUser?.profile_id}`}
      >
       <Avatar src={currentUser?.profile_image} text="Profile" height={35} />
    </NavLink>
  )
  </>;
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
        {currentUser && createRecipeIcon}
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