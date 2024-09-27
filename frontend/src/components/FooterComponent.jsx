import React from 'react'
import { Footer } from "flowbite-react";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <>
     <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <p>My Gym</p>
          <Footer.LinkGroup>
            <Footer.Link href="/about-me">About</Footer.Link>
            <Footer.Link href="https://github.com/leonileo/my_gym">Git repository</Footer.Link>
            <Footer.Link href="#contact-us">Contact</Footer.Link>
          </Footer.LinkGroup>
          <div className="socials flex items-center gap-3 text-teal-800">
            <Link target='_blank' to={'https://www.instagram.com/kalebleo4/'}><FaInstagram className='hover:text-pink-500 transition-all'/></Link>
            <Link target='_blank' to={'https://www.linkedin.com/in/kaleb-wendwessen/'}><FaLinkedin className='hover:text-teal-400 transition-all'/></Link>
            <Link target='_blank' to={'https://x.com/kalebleonileo'}><FaTwitter className='hover:text-blue-500 transition-all'/></Link>
          </div>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="/" by="MyGym™" year={2024} />
      </div>
    </Footer> 
    </>
  )
}

export default FooterComponent