import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
  const userInfo = useSelector((state) => state.auth).userInfo

  return (
    <>
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-teal-500">My GYM</span>
      </Navbar.Brand>
      <div className="flex items-center md:order-2">
        {!userInfo ?
        <div className="regLinks flex gap-3">
          <Link to={"/signin"} ><button className='border w-[100px] text-teal-500 font-semibold hover:text-white hover:bg-teal-500  rounded-full border-teal-500 transition-all'>Sign in</button></Link>
          <Link to={"/signup"} ><button className='border w-[100px] text-teal-500 font-semibold hover:text-white hover:bg-teal-500  rounded-full border-teal-500 transition-all'>Sign up</button></Link>
        </div>
        : 
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={`${userInfo.picture}`} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userInfo.name}</span>
              <span className="block truncate text-sm font-medium">{userInfo.email}</span>
            </Dropdown.Header>
            <Dropdown.Item><a href={`${userInfo.isAdmin ? "/admin/dashboard" : userInfo.isTrainer ? "/trainer/dashboard" : userInfo.isClient && "/client/dashboard"}`} >My dashboard</a></Dropdown.Item>
          </Dropdown>
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/#trainers">Trainers</Navbar.Link>
        <Navbar.Link href="/#features">Features</Navbar.Link>
        <Navbar.Link href="/#contact-us">Contact us</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default HeaderComponent