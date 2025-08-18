import React, { useEffect, useState } from 'react'
import NavBar from '../sections/NavBar'
import { Outlet } from 'react-router'
import Footer from '../sections/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Layout = () => {
  // const [x, setX] = useState(0)
  // const [y, setY] = useState(0)

  // const handleMouseMove = (e) => {
  //   setX(e.clientX)
  //   setY(e.clientY)
  // }

  // useGSAP(() => {
  //   // Use a GSAP timeline to make it smoother
  //   gsap.to('.cursor-dot', {
  //     x:x-20,
  //     y:y-20,
  //     duration: 0.2,
  //     ease: 'none',
  //   })
  // }, [x, y])

  return (
    // <div onMouseMove={handleMouseMove} className='relative '>
    //   <div className='cursor-dot fixed w-10 h-10 rounded-full bg-transparent border-3 border-amber-600 pointer-events-none z-9999'></div>
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
