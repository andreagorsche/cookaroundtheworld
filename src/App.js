import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import cookbook from "./assets/cookbook.png";

const NavMenu = () => {
  return <Navbar collapseOnSelect expand="md" fixed="top" bg="dark" variant="dark"> <Container>
  <Navbar.Brand href="#home"><img src={cookbook} alt="logo" height="50"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#Recipes">Recipes</Nav.Link>
      <Nav.Link href="#Login">Login</Nav.Link>
      <Nav.Link href="#Register">Register</Nav.Link>
    </Nav>
  </Navbar.Collapse></Container>
</Navbar>
};
export default NavMenu;