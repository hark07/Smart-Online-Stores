import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import ServiceFeatures from '../components/ServiceFeatures'
import FeatureProducts from '../components/FeatureProducts'
import Banner from '../components/Banner'
import TrustedBanner from '../components/TrustedBanner'

const Home = () => {
  return (
    <>
        <MainBanner />
        <Categories />
        <BestSeller />
        <FeatureProducts />
        <Banner />
        <BottomBanner />
        <NewsLetter />
        <ServiceFeatures />
        <TrustedBanner />
    </>
  )
}

export default Home