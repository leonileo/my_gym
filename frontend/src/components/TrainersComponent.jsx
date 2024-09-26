import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import gymImg from '../assets/images/gymImg.jpg'

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

const TrainersComponent = () => {
  return (
    <motion.div 
    variants={FadeUp(0.9)}
    initial="initial"
    whileInView={"animate"}
    className='ml-10'
    id='trainers'
    >
      <div className="txt md:pl-20">
        <p className='md:text-xl'>Trainers</p>
        <p className='md:text-2xl text-xl font-bold'>Empower Your Training Business</p>
      </div>

      <div className="swiperr w-full flex justify-end">

        <div className="md:w-[80%] w-full px-3 justify-end md:flex hidden ">
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, Pagination]}
            className={`w-full min-h-[45vh] h-auto my-5 md:block hidden`}
            >
            {/* loop through workouts */}
            {cards.map(card => (
              <SwiperSlide >
              <div 
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className='mb-10 cursor-grab rounded overflow-hidden h-[90%] relative w-full bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                  <div className="flex p-2 absolute bottom-0 justify-center w-full">
                    <p className='w-fit text-white text-xl text-center p-2 rounded capitalize'>{card.title}</p>
                  </div>
              </div> 
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:w-[80%] w-full px-3 mb-5 justify-end md:hidden flex ">
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, Pagination]}
            className={`w-full min-h-[45vh] h-auto my-5 md:block hidden`}
            >
            {/* loop through workouts */}
            {cards.map(card => (
              <SwiperSlide >
              <div 
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, .8)), url(${card.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className='mb-10 cursor-grab rounded overflow-hidden h-[90%] relative w-full bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                  <div className="flex p-2 absolute bottom-0 justify-center w-full">
                    <p className='w-fit text-white text-center p-2 rounded capitalize'>{card.title}</p>
                  </div>
              </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </motion.div>
  )
}

export default TrainersComponent