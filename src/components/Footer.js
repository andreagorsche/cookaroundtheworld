import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'indigo', color: 'white', marginTop: 'auto', padding: '20px' }}>
      <Row style={{ display: 'flex', justifyContent: 'center', alignItems:'center', margin: 0 }}>
        <Col xs={12} sm={6} md={4} lg={4} >
          <p style={{ color: 'white', margin: 0, textAlign: 'center' }}>&copy; 2023 Cook Around The World. All Rights Reserved.</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
