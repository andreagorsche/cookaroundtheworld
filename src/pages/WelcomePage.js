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

const WelcomePage = () => {
  console.log('WelcomePage is rendering...');
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
     <Intro
          firstWord="Cook"
          secondWord="Around"
          secondPhrase="the World"
          firstParagraph="Our cooks from all around the world inspire you to try new local recipes from all over the world."
          secondParagraph="Stop always cooking the same 5 dishes on repeat. Get creative, get involved, become an international cook." 
          image1={IntroPic1}
          image2={IntroPic2}
          />
    <BulletinBoard intro = 'Searching for the newest and hottest dishes? Here are our top 3 recipes at the moment:' backgroundImage={bulletinBoardImg} />
    <TopProfiles />
  </>
  )
}

export default WelcomePage