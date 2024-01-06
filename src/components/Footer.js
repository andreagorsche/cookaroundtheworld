// Footer.js
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import '../styles/components/Footer.module.css';


const Footer = () => {
  return (
    <footer className="footer">
      <Row>
      <Col sm={12} md={6} lg={4} style={{ display: 'flex', justifyContent: 'space-around' }} title="Data and Impressum" className="footer-column">
        <Link to="/impressum" className='footer-text'>Impressum</Link>
        <Link to="/datenschutz" className='footer-text'>Datenschutz</Link>
      </Col>

      <Col sm={12} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center' }} title="Copyright" className="footer-column">
        <p className='footer-text'>&copy; 2023 Cook Around The World. All Rights Reserved.</p>
      </Col>

      <Col sm={12} md={6} lg={4} title="Social Media" style={{ display: 'flex', justifyContent: 'center' }} className="footer-column social-icons">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
      </Col>
      </Row>
    </footer>
  );
};

export default Footer;