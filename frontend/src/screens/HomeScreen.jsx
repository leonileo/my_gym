import React, { useEffect } from 'react'
import HeaderComponent from '../components/HeaderComponent';
import HeroComponent from '../components/HeroComponent';
import TrainersComponent from '../components/TrainersComponent';
import FeaturesComponent from '../components/FeaturesComponent';
import CTAComponent from '../components/CTAComponent';
import FooterComponent from '../components/FooterComponent';
import { useStatusQuery } from '../slices/statusApiSlice';

const HomeScreen = () => {
  const { data, isLoading, error } = useStatusQuery()

  return (
    <div>
      <HeaderComponent />
      <HeroComponent />
      <TrainersComponent />
      <FeaturesComponent />
      <CTAComponent isLoading={isLoading} data={data} error={error} />
      <FooterComponent />
    </div>
  )
}

export default HomeScreen