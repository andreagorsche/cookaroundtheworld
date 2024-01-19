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
import { Row, Col } from 'react-bootstrap';
import { useCurrentUser } from "../contexts/CurrentUserContext";
import MultiStepForm from './profiles/MultiStepForm';


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
    <Col lg={6}>
     <Intro
          firstWord="Cook"
          secondWord="Around"
          secondPhrase="the World"
          firstParagraph="Our cooks from all around the world inspire you to try new local recipes from all over the world."
          secondParagraph="Stop always cooking the same 5 dishes on repeat. Get creative, get involved, become an international cook."
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