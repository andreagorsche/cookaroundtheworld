import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'indigo', color: 'white', marginTop: 'auto', padding: '20px' }}>
      <Row>
        <Col xs={12} sm={6} md={4} lg={4} style={{ display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
          <Link to="/impressum" style={{ color: 'white' }}>Impressum</Link>
          <Link to="/datenschutz" style={{ color: 'white' }}>Datenschutz</Link>
        </Col>

        <Col xs={12} sm={6} md={4} lg={4} style={{ display: 'flex', justifyContent: 'center', alignItems:'center', margin: 0 }} >
          <p style={{ color: 'white', margin: 0 }}>&copy; 2023 Cook Around The World. All Rights Reserved.</p>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} className="footer-column social-icons" style={{ display: 'flex', justifyContent: 'space-around', alignItems:'center' }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            Instragram
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
