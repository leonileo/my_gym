import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import gymImg from '../assets/images/gymImg.jpg'
import { FaDumbbell } from 'react-icons/fa';

const cards = [
  {title: "Manage clients and their progress", img: gymImg},
  {title: "Create personalized workout plans", img: gymImg},
  {title: "Streamline your administrative tasks", img: gymImg},
  {title: "Manage clients and their progress", img: gymImg},
  {title: "Create personalized workout plans", img: gymImg},
  {title: "Streamline your administrative tasks", img: gymImg},
  {title: "Create personalized workout plans", img: gymImg},
  {title: "Streamline your administrative tasks", img: gymImg},
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
      <div className='bg-gradient-to-br mb-5 from-teal-800 to-neutral-700 h-[50vh] p-2'>
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
                    <p className='font-semibold mb-4'>{card.title} availablity</p>
                    <p className='md:text-3xl text-2xl md:my-2 my-0 font-semibold line-clamp-2 capitalize'>{card.title}</p>
                    <p className='md:w-[80%] text-pretty capitalize'>{card.title} {card.title} {card.title}</p>
                  </div>

                  <div className='md:mr-10 grid md:grid-cols-2 grid-row-2 gap-3 rounded-md md:w-[70%] md:h-full h-[80%]'>
                    <div className='grid md:grid-rows-2 grid-cols-2 md:grid-cols-1 gap-3'>
                      <motion.div 
                        variants={FadeUp(0.4)}
                        initial="initial"
                        whileInView={"animate"}
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                      <motion.div 
                        variants={FadeUp(0.4)}
                        initial="initial"
                        whileInView={"animate"}
                        style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                    </div>
                    <div>
                      <motion.div
                      variants={SlideRight(0.4)}
                      initial="initial"
                      whileInView="animate"
                       style={{
                          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className='mb-10 cursor-grab rounded opacity-90 w-full h-full overflow-hidden relative bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                      </motion.div>
                    </div>

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