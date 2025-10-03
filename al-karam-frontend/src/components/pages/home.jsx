import React from 'react'
import Advertise from '../../components/advertise'
import Login from '../login'
import ProductList from './ProductList'
import BackToTop from './top'
import FAQ from './FAQs'




const Home = () => {
  return (
    <div> 
        <Advertise/>
        <ProductList />
        <BackToTop />
        <FAQ />
    </div>
  )
}

export default Home