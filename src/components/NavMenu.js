import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import navStyles from "../styles/components/NavMenu.module.css"
import {NavLink} from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavMenu = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
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
    className = {navStyles.NavLink} 
    activeClassName = {navStyles.Active} 
    to = "/recipes/create">
    <i className="fa-solid fa-feather"></i> Create Recipe
  </NavLink> 
  );
  
  const loggedInIcons = (<>
  
    <NavLink 
      className = {navStyles.NavLink} 
      activeClassName = {navStyles.Active} 
      to = "/foodfeed">
      <i className="fa-solid fa-scroll"></i> Food-Feed 
    </NavLink>
    <NavLink 
      className = {navStyles.NavLink}  
      to = "/" 
      onClick={handleSignOut}
      >
      <i className="fa-solid fa-user"></i> Log Out 
    </NavLink>
    <NavLink
        className={navStyles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser && currentUser.username} height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        className = {navStyles.NavLink} 
        activeClassName = {navStyles.Active} 
        to = "/login">
        <i className="fa-regular fa-user"></i> Login 
      </NavLink>
      <NavLink 
        className = {navStyles.NavLink} 
        activeClassName = {navStyles.Active} 
        to = "/register">
        <i className="fa-solid fa-user-plus"></i> Register
      </NavLink>
    </>
  );

  return (
    <Navbar className={`${navStyles.NavMenu} ${navStyles.TransparentNav}`} collapseOnSelect expand="md">
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
              className = {navStyles.NavLink} 
              activeClassName = {navStyles.Active} 
              to = "/"
            >
              <i className="fa-solid fa-utensils"></i> Welcome
          </NavLink>
          
          {currentUser ? loggedInIcons : loggedOutIcons}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavMenu;