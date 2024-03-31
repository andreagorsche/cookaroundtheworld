import React from 'react'
import Slider from '../components/Slider'
import Slider1 from '../assets/images/Slider1.jpg';
import Slider2 from '../assets/images/Slider2.jpg';
import Slider3 from '../assets/images/Slider3.jpg';
import BulletinBoard from '../components/BulletinBoard'
import bulletinBoardImg from '../assets/images/bulletinboard.jpg';
import Intro from '../components/Intro';
import IntroPic1 from '../assets/images/IntroPic1.jpg';
import IntroPic2 from '../assets/images/IntroPic2.jpg';
import TopProfiles from '../components/TopProfiles';
import ImageBlock from '../components/ImageBlock'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useCurrentUser } from "../contexts/CurrentUserContext";

const WelcomePage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
    <Slider
    slides={[
      {
        image: Slider1,
        title: 'Welcome to Cook-around-the-World',
        message: '...where delicious recipes are our main priority.',
      },
      {
        image: Slider2,
        title: 'Tired of always cooking the same stuff?',
        message: 'Chefs all over the world share their unique recipes with us.',
      },
      {
        image: Slider3,
        title: 'Join an international cooking community',
        message: 'Sign up for free and share your typical local gems with us!',
      },
    ]}
  />
  {!currentUser && (
  <Row>
    <Col lg={6} className="d-flex justify-content-center align-items-center">
     <Intro
          firstWord="Cook"
          secondWord="Around"
          secondPhrase="the World"
          firstParagraph="Tired of the same old recipes? It's time to shake up your culinary routine and embark on a delicious journey around the world!"
          secondParagraph="Our diverse community of passionate cooks from across the globe is here to inspire you with authentic local recipes and flavors. Break free from the monotony of repetitive meals and embrace the excitement of trying new dishes."
          />
    </Col>
    <Col lg={6}>
      <ImageBlock  
          image1={IntroPic1}
          image2={IntroPic2} />
     </Col>
  </Row>)
  }
    {currentUser && (
      <>
        <BulletinBoard
          intro="Searching for the newest and hottest dishes? Here are our top 3 recipes at the moment:"
          backgroundImage={bulletinBoardImg}
        />
        <TopProfiles />
      </>
    )}
  </>
);
};


export default WelcomePage