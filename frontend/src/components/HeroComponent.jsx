import React from 'react'
import { motion } from 'framer-motion'
import gymImg from '../assets/images/gymImg.jpg'
import { Link } from 'react-router-dom'

export const FadeUp = (delay) => {
  return {
      initial: {
          opacity: 0,
          y: 50,
      },
      animate: {
          opacity: 1,
          y: 0,
          transition: {
              type: "spring",
              stiffness: 100,
              duration: 0.5,
              delay: delay,
              ease: "easeInOut"
          }
      }
  }
}

const SlideLeft = (delay) => {
  return {
      initial: {
          opacity: 0,
          x: 50,
      },
      animate: {
          opacity: 1,
          x: 0,
          transition: {
              duration: 0.3,
              delay: delay,
              ease: "easeInOut"
          }
      }
  }
}
const SlideRight = (delay) => {
  return {
      initial: {
          opacity: 0,
          x: -50,
      },
      animate: {
          opacity: 1,
          x: 0,
          transition: {
              duration: 0.3,
              delay: delay,
              ease: "easeInOut"
          }
      }
  }
}

const HeroComponent = () => {
  return (
    <div className='bg-gradient-to-t overflow-hidden from-teal-500 to-black md:h-[60vh] h-[40vh] rounded-b-[40px] mb-10 flex justify-center items-center'>
      <div className='relative'>
        <div className='z-50'>
          <motion.h1 
          variants={FadeUp(0.6)}
          initial="initial"
          whileInView="animate"
          className='z-50 sm:text-[40px] text-[20px] text-teal-50 font-bold text-center'>My Gym The Fitness Hub for Trainers and Clients</motion.h1>
          <motion.p 
          variants={FadeUp(0.7)}
          initial="initial"
          whileInView="animate"
          className='text-white text-center sm:text-[20px] text-[15px]'>Connect, train, and achieve your goals together.</motion.p>
        </div>
        <motion.div 
        variants={FadeUp(0.8)}
        initial="initial"
        whileInView="animate"
        className="cta z-50 w-full flex justify-center my-5">
          <Link to={'/signin'} className='sm:p-3 sm:px-10 p-1 px-5 sm:font-semibold bg-teal-600 text-white hover:bg-teal-500 hover:text-teal-50 transition-all hover:from rounded-full '>Start your free trial</Link>
        </motion.div>
        {/* side imgs */}
        <motion.div 
        variants={SlideLeft(0.8)}
        initial="initial"
        whileInView="animate"
        className="side-img absolute md:-left-80 -left-40 md:-bottom-40 -bottom-20 z-10">
          <img src={gymImg} alt="" className='md:w-[350px] w-[150px] rotate-12 translate-y-5 opacity-40 hover:opacity-100 transition-all rounded-lg' />
        </motion.div>
        <motion.div 
        variants={SlideRight(0.9)}
        initial="initial"
        whileInView="animate"
        className="side-img absolute md:-right-96 -right-40 md:-top-40 -top-20 z-10">
          <img src={gymImg} alt="" className='md:w-[350px] w-[150px] -rotate-[25deg] translate-y-5 opacity-40 hover:opacity-100 transition-all rounded-lg' />
        </motion.div>
      </div>
    </div>
  )
}

export default HeroComponent