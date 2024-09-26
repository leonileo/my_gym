import React, { useState } from 'react'
import CountUp from 'react-countup';
import gymImg from '../assets/images/gymImg.jpg'
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Spinner } from 'flowbite-react';

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

const CTAComponent = ({ isLoading, data, error }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // email js
  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    setLoading(true);

    emailjs.send('service_yajlavm', 'template_fhty3ih', templateParams, { publicKey: 'vic91IwPCNLi_Fgme'}).then(
      (response) => {
        setLoading(false);
        toast.success("Message sent successfuly sent!", {position: "bottom-center"})
        console.log('SUCCESS!', response.status, response.text);
        setName('')
        setEmail('')
        setMessage('')
      },
      (error) => {
        setLoading(false);
        toast.error(`An error occured!`, {position: "bottom-center"})
        console.log('FAILED...', error);
      },)
  };

  const status = [
  {
    title: isLoading ? "" : error ? error : data.client,
    description: `Over ${isLoading ? "" : error ? error : data.client} + active users.`
  },
  {
    title: isLoading ? "" : error ? error : data.trainer,
    description: `Over ${isLoading ? "" : error ? error : data.trainer} + trainers using our service.`
  },
  {
    title: isLoading ? "" : error ? error : data.workout,
    description: `Workouts available through our app.`
  },
  {
    title: isLoading ? "" : error ? error : data.service,
    description: `Serviceses tailored to your needs.`
  },
  ]

  return (
    <div id='status' className='md:h-[50vh] h-auto w-full p-5'>
      <div className="md:flex justify-center gap-5 md:specy0 h-full w-full">
        <div 
          style={{
            backgroundImage: `linear-gradient(rgba(6, 148, 162, 0.5), rgba(2, 50, 55, 1)), url(${gymImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="contact rounded-md w-full overflow-hidden text-white grid h-full p-2">
            <div className="top my-5 mt-20 p-5">
              <h3 className='font-semibold md:text-3xl'>Contact us</h3>
              <p className='xl:text-xl'>For any inquiries contact us</p>
              <form onSubmit={sendEmail} className='my-5'>
                <motion.input 
                  variants={FadeUp(0.4)}
                  initial="initial"
                  whileInView={"animate"}
                  type="text" onChange={(e) => setName(e.target.value)} name="text" id="text" placeholder='Type your name' className='bg-white border-0 rounded p-2 px-3 w-[250px] block my-2' />
                <motion.input 
                  variants={FadeUp(0.4)}
                  initial="initial"
                  whileInView={"animate"}
                  type="email" required onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Your email' className='bg-white border-0 rounded p-2 px-3 w-[250px] block my-2' />
                <motion.textarea 
                  variants={FadeUp(0.2)}
                  initial="initial"
                  whileInView={"animate"}
                  name="message" required onChange={(e) => setMessage(e.target.value)} id="" className='bg-white resize-none block my-2 w-[50%] rounded text-black' placeholder='Type your message here'></motion.textarea>
                <motion.button 
                  variants={SlideRight(0.5)}
                  initial="initial"
                  whileInView={"animate"}
                  className='p-2 px-3 rounded bg-teal-500 text-white hover:bg-white hover:text-teal-500 transition-all font-semibold'>
                    {
                    loading ? (
                      <div className="flex gap-2 items-center">
                        <p>Submitting... </p>
                        <Spinner /> 
                      </div>
                    )
                    : "Submit"
                  }
                  </motion.button>
              </form>
            </div>      
            <div className="bottom flex justify-center items-end text-center py-5">
              <div>
                <p className='sm:text-2xl my-2'>our socials</p>
                <div className="socials flex gap-5 items-center sm:text-3xl">
                  <motion.p
                     variants={FadeUp(0.2)}
                    initial="initial"
                    whileInView={"animate"}               
                  ><Link target='_blank' to={'https://www.instagram.com/kalebleo4/'}><FaInstagram className='hover:text-pink-500 transition-all'/></Link></motion.p>
                  <motion.p
                     variants={FadeUp(0.3)}
                    initial="initial"
                    whileInView={"animate"}               
                  ><Link target='_blank' to={'https://www.linkedin.com/in/kaleb-wendwessen/'}><FaLinkedin className='hover:text-teal-400 transition-all'/></Link></motion.p>
                  <motion.p
                     variants={FadeUp(0.4)}
                    initial="initial"
                    whileInView={"animate"}               
                  ><Link target='_blank' to={'https://x.com/kalebleonileo'}><FaTwitter className='hover:text-blue-500 transition-all'/></Link></motion.p>
                </div>
              </div>
            </div>    
        </div>

        <div className='w-[50%] flex justify-center items-center'>
          <div className='h-[80%]'>
            <div className="status grid grid-cols-2 grid-rows-2 justify-center gap-3 w-full h-full">
              {status.map((stat) => 
                <motion.div
                variants={FadeUp(0.4)}
                initial="initial"
                whileInView={"animate"}
                className='w-full bg-teal-500 text-white rounded-md p-2 flex items-center justify-center'>
                  <div>
                    <p className='xl:text-2xl text-center flex items-center justify-center gap-2'>{isLoading ? <Spinner /> : <CountUp start={0} end={stat.title}/>} +</p>
                    <p className='xl:text-xl text-center'>{stat.description}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CTAComponent