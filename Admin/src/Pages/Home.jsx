
import React from 'react'
import Overflow from '../Components/Overflow/Overflow'
import Products from './Layout/Products'

const Home = () => {


  return (
    <div className='home-section'>
      <Overflow />
      <Products />
      {/* <Orders /> */}
    </div>

  )
}

export default Home