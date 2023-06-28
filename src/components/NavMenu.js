import React from "react";
import {Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"
import {NavLink} from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
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
    <i class="fa-solid fa-feather"> Create Recipe </i>
  </NavLink> 
  );
  
  const loggedInIcons = (
  <>
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/feeding">
      <i class="fa-solid fa-scroll"> Feed-ing </i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink} 
      activeClassName = {styles.Active} 
      to = "/favorites">
      <i class="fa-solid fa-thumbs-up"> Favorites </i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink}  
      to = "/" 
      onClick={handleSignOut}
      >
      <i className="fa-solid fa-user"> Log Out </i>
    </NavLink>
    <NavLink 
      className = {styles.NavLink}  
      to={`/profiles/${currentUser?.profile_id}`}
      >
     <i class="fa-solid fa-spoon">{currentUser && currentUser.username}</i>
    </NavLink>
    
  </>
  );
  const loggedOutIcons = (
    <>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/login">
        <i className="fa-regular fa-user"> Login </i>
      </NavLink>
      <NavLink 
        className = {styles.NavLink} 
        activeClassName = {styles.Active} 
        to = "/register">
        <i className="fa-solid fa-user-plus"> Register </i>
      </NavLink>
    </>
  );

  return (
    <NavMenu className={styles.NavMenu} collapseOnSelect expand="md" fixed="top"> 
      <Container>
        <NavLink to = "/">
          <NavMenu.Brand>
            <img src={cookbook} alt="logo" height="50"/>
          </NavMenu.Brand>
        </NavLink>
        {currentUser && createRecipeIcon}
        <NavMenu.Toggle 
          ref = {ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="responsive-navbar-nav" 
        />
        <NavMenu.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink 
              exact
              className = {styles.NavLink} 
              activeClassName = {styles.Active} 
              to = "/"
            >
              <i className="fa-solid fa-utensils"> Recipes </i>
          </NavLink>
          
          {currentUser ? loggedInIcons : loggedOutIcons}

        </Nav>
      </NavMenu.Collapse>
    </Container>
  </NavMenu>
  );
};

export default NavMenu;
