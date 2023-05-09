import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "../assets/cookbook.png";
import styles from "../styles/NavMenu.module.css"

const NavMenu = () => {
  return <Navbar className={styles.NavMenu} collapseOnSelect expand="md" fixed="top"> <Container>
  <Navbar.Brand href="#home"><img src={cookbook} alt="logo" height="50"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto text-right">
      <Nav.Link>
      <i className="fa-solid fa-utensils"></i>
      Recipes</Nav.Link>
      <Nav.Link>
        <i className="fa-regular fa-user"></i>Login
      </Nav.Link>
      <Nav.Link >
        <i className="fa-solid fa-user-plus"></i>Register
      </Nav.Link>
    </Nav>
  </Navbar.Collapse></Container>
</Navbar>
};
export default NavMenu;