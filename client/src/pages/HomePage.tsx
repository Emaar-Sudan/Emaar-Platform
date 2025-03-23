import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import MainServices from '../components/home/MainServices';
import ActivityStats from '../components/home/ActivityStats';
import SudanOverview from '../components/home/SudanOverview';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <main>
      <HeroSection />
      <MainServices />
      <ActivityStats />
      <ServicesSection />
      <SudanOverview />
    </main>
  );
};

export default HomePage;