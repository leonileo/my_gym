import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import gymImg from '../assets/images/gymImg.jpg'
import wc1 from '../assets/images/wc1.png'
import wc2 from '../assets/images/wc2.png'
import wc3 from '../assets/images/wc3.png'
import aw1 from '../assets/images/aw1.png'
import aw2 from '../assets/images/aw2.png'
import aw3 from '../assets/images/aw3.png'
import sr1 from '../assets/images/sr1.png'
import sr2 from '../assets/images/sr2.png'
import sr3 from '../assets/images/sr3.png'
import ap1 from '../assets/images/ap1.png'
import ap2 from '../assets/images/ap2.png'
import ap3 from '../assets/images/ap3.png'
import t1 from '../assets/images/t1.png'
import t2 from '../assets/images/t2.png'
import t3 from '../assets/images/t3.png'
import da1 from '../assets/images/da1.png'
import da2 from '../assets/images/da2.png'


import { FaDumbbell } from 'react-icons/fa';

const cards = [
  {header: "Performance Monitoring", title: "Weight Progress Tracker", description: "Track your weight progress and monitor your improvements over time.", img: [wc1, wc2, wc3]},
  {header: "Workout Convenience", title: "Workout Access Hub", description: "Access trainer-prescribed workouts", img: [aw1, aw2, aw3]},
  {header: "Personalized Guidance", title: "Coach Selection Portal", description: "Select your coach and access their training program.", img: [sr1, sr2, sr3]},
  {header: "User Personalization", title: "Profile Customization Center", description: "Update and personalize your profile to keep your information current.", img: [ap1, ap2, ap3]},
  {header: "Expert Knowledge", title: "Trainer Insights Dashboard", description: "Explore comprehensive information about the trainer, including their background, expertise, and credentials.", img: [t1, t2, t3]},
  {header: "Expert Knowledge", title: "Customized Dashboard Experience", description: "Access a fully customized dashboard tailored to your preferences and goals.", img: [da1, da2]},
]

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

const FeaturesComponent = () => {
  return (
    <div id='features'>
      <div className="txt my-5">
        <motion.p 
        variants={FadeUp(0.5)}
        initial="initial"
        whileInView={"animate"}        
        className='md:text-4xl text-2xl text-center capitalize font-semibold flex gap-2 justify-center items-center text-slate-700'> <FaDumbbell /> Our <span className='text-teal-500'>User's</span> Favorite Features </motion.p>
      </div>
      <div className='bg-gradient-to-br mb-5 from-teal-800 to-neutral-700 md:h-[50vh] h-[80vh] p-2'>
      <motion.div 
        variants={FadeUp(0.6)}
        initial="initial"
        whileInView={"animate"}      
        className="w-full md:flex justify-center items-center h-full">
          <Swiper
          direction={'vertical'}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          spaceBetween={4}
          autoplay={{
            delay: 4500,
            disableOnInteraction: true
          }}
          modules={[Autoplay, Pagination]}
          className={`mySwiper1 md:w-[80%] md:h-[40vh] h-[100%] text-white`}>
          {/* loop through workouts */}
          {cards.map(card => (
              <SwiperSlide>
                <div className='md:flex md:p-5 p-2 justify-between cursor-grab rounded overflow-hidden h-full relative w-full'>
                  <div className="txt my-2 md:my-0 md:w-[50%]">
                    <p className='font-semibold mb-4'>{card.header}</p>
                    <p className='md:text-3xl text-2xl md:my-2 my-0 font-semibold line-clamp-2 capitalize'>{card.title}</p>
                    <p className='md:w-[80%] text-pretty capitalize'>{card.description}</p>
                  </div>

                  <div className={`md:mr-10 my-5 md:m-0 grid ${card.img.length > 2 ? "md:grid-cols-2 grid-row-2" : "md:grid-cols-1 grid-row-1"} gap-3 rounded-md md:w-[70%] md:h-full h-[80%]`}>
                    <div className={`grid ${card.img.length > 2 ? "md:grid-rows-2 grid-cols-2 md:grid-cols-1" : "md:grid-rows-1 grid-cols-1 md:grid-cols-2"} gap-3`}>
                      <motion.div 
                        variants={FadeUp(0.4)}
                        initial="initial"
                        whileInView={"animate"}
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img[0]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                      <motion.div 
                        variants={FadeUp(0.4)}
                        initial="initial"
                        whileInView={"animate"}
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img[1]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                    </div>
                    {card.img.length > 2 && <div className='md:h-full'>
                      <motion.div
                      variants={SlideRight(0.4)}
                      initial="initial"
                      whileInView="animate"
                       style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img[2]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                    </div>}

                  </div>
                </div> 
              </SwiperSlide>
          ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  )
}

export default FeaturesComponent