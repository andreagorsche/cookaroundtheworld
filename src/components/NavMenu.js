import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"
import {NavLink} from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavMenu = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  console.log(currentUser)

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const createRecipeIcon = (
    <NavLink 
    className = {styles.NavLink} 
    activeClassName = {styles.Active} 
    to = "/recipes/create">
    <i className="fa-solid fa-feather"></i> Create Recipe
  </NavLink> 
  );
  
  const loggedInIcons = (<>
  
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/feeding">
      <i className="fa-solid fa-scroll"></i> Feed-ing 
    </NavLink>
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/favorites">
      <i className="fa-solid fa-thumbs-up"></i> Favorites 
    </NavLink>
    <NavLink 
      className = {styles.NavLink}  
      to = "/" 
      onClick={handleSignOut}
      >
      <i className="fa-solid fa-user"></i> Log Out 
    </NavLink>
    <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser && currentUser.username} height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/login">
        <i className="fa-regular fa-user"></i> Login 
      </NavLink>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/register">
        <i className="fa-solid fa-user-plus"></i> Register
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
        <Navbar.Toggle 
          ref = {ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="responsive-navbar-nav" 
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink 
              exact
              className = {styles.NavLink} 
              activeClassName = {styles.Active} 
              to = "/"
            >
              <i className="fa-solid fa-utensils"></i> Recipes
          </NavLink>
          
          {currentUser ? loggedInIcons : loggedOutIcons}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavMenu;