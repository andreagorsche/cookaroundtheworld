import React from 'react'
import Slider from '../components/Slider'
import Slider1 from '../assets/images/Slider1.jpg';
import Slider2 from '../assets/images/Slider2.jpg';
import Slider3 from '../assets/images/Slider3.jpg';
import RecipeCard from '../components/RecipeCard';

const WelcomePage = () => {
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
  <RecipeCard />
  </>
  )
}

export default WelcomePage