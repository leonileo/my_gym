import React from 'react'
import { Footer } from "flowbite-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <>
     <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <p>My Gym</p>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
          <div className="socials flex items-center gap-3 text-teal-800">
            <FaInstagram />
            <FaYoutube />
            <FaFacebook />
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