import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[55px] text-center mt-10'>Discover New Place With AI:Personalize Your Trip</h1>
      <p className='text-xl text-gray-500 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione id sint odio recusandae tenetur fuga ipsam error </p>
      <Link to={'/create-trip'}><Button>Get Started</Button></Link>
    </div>
  )
}

export default Hero