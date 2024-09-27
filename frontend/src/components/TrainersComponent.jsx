import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import ma_pr from '../assets/images/ma_pr.png'
import ma_req from '../assets/images/ma_req.png'
import chk_da from '../assets/images/chk_da.png'
import cr_wrkt from '../assets/images/cr_wrkt.png'
import asgn_wrkt from '../assets/images/asgn_wrkt.png'
import profile from '../assets/images/profile.png'
import ad_service from '../assets/images/ad_service.png'
import dashboard from '../assets/images/dashboard.png'

const cards = [
  {title: "Manage clients and their progress", img: ma_pr},
  {title: "Get a personalized dashboard", img: dashboard},
  {title: "Manage requests from clients", img: ma_req},
  {title: "Check client data", img: chk_da},
  {title: "Create personalized workout plans", img: cr_wrkt},
  {title: "Assign workouts for client", img: asgn_wrkt},
  {title: "Advertise services you provide", img: ad_service},
  {title: "Update your profile", img: profile},
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
        {/* for descktop */}
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
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                className='transition-all hover:bg-transparent!important mb-10 cursor-grab rounded-md overflow-hidden h-[90%] relative w-full bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                  <div className="flex p-2 absolute bottom-0 justify-center w-full">
                    <p className='w-fit text-white text-xl text-center p-2 rounded capitalize'>{card.title}</p>
                  </div>
              </div> 
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* for small screens */}
        <div className="md:w-[80%] w-full px-3 justify-end md:hidden flex ">
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
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
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                className='transition-all hover:bg-transparent!important mb-10 cursor-grab rounded-md overflow-hidden h-[90%] relative w-full bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-white'>
                  <div className="flex p-2 absolute bottom-0 justify-center w-full">
                    <p className='w-fit line-clamp-1 hover:line-clamp-none transition-all text-pretty text-white md:text-xl text-center p-2 rounded capitalize'>{card.title}</p>
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