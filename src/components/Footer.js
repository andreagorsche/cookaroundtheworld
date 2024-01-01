// Footer.js
import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import '../styles/components/Footer.module.css';


const Footer = () => {
  return (
    <footer className="footer">
      <Col title="Data and Impressum" className="footer-column">
        <Link to="/impressum" className='footer-text'>Impressum</Link>
        <Link to="/datenschutz" className='footer-text'>Datenschutz</Link>
      </Col>

      <Col title="Copyright" className="footer-column">
        <p className='footer-text'>&copy; 2023 dogmind. All Rights Reserved.</p>
      </Col>

      <Col title="Social Media" className="footer-column social-icons">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
      </Col>
    </footer>
  );
};

export default Footer;