import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/components/Intro.module.css';

function Intro({
  firstWord,
  secondWord,
  secondPhrase,
  firstParagraph,
  secondParagraph,
}) {
  const paragraphStyle = {
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    textAlign: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  };

  const spanStyle = {
    color: '#F6BE00',
    marginRight: '1rem', 
    marginLeft: '1rem',
  };


  return (
    <Container fluid id="Intro2">
      <Row style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col className='intro-text'>
          <h1 style={{ marginBottom: '3rem' }}>
            {firstWord} <span style={spanStyle}>{secondWord}</span>{' '}
            {secondPhrase}
          </h1>
          <p style={paragraphStyle}>{firstParagraph}</p>
          <p style={paragraphStyle}>{secondParagraph}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Intro;
