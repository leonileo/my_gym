import React from 'react'
import HeaderComponent from '../components/HeroComponent';
import HeroComponent from '../components/HeroComponent';
import TrainersComponent from '../components/TrainersComponent';
import FeaturesComponent from '../components/FeaturesComponent';
import CTAComponent from '../components/CTAComponent';
import FooterComponent from '../components/FooterComponent';


const HomeScreen = () => {

  return (
    <div>
      <HeaderComponent />
      <HeroComponent />
      <TrainersComponent />
      <FeaturesComponent />
      <CTAComponent />
      <FooterComponent />
    </div>
  )
}

export default HomeScreen