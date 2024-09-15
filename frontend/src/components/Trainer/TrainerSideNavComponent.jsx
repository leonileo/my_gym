import React from 'react'
import logoSm from '../../assets/images/logo-sm.png'
import { FaArrowLeft, FaArrowRight, FaPeopleGroup } from 'react-icons/fa6'
import { Tooltip } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { LuLayoutDashboard } from "react-icons/lu";
import { CgGym, CgWorkAlt } from "react-icons/cg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";

const TrainerSideNavComponent = ({ clpsd ,setClpsd, step }) => {
  return (
    <div className='text-nowrap grid grid-cols-1 grid-rows-2 h-[100vh] pb-5 relative'>
        <div className='z-50'>
            <div className="logo min-h-[10vh]">
                <div className={`${!clpsd && 'flex justify-center'} justify-center gap-3 w-full items-center`}>
                    <div className='flex justify-center overflow-hidden'>
                        <img className={`w-[50px] h-[50px] `} src={logoSm} alt="my gym logo" />
                    </div>
                    {!clpsd && <h2 className='md:block hidden transition-all text-2xl text-teal-500 font-semibold'>My Gym</h2>}
                </div>
                {!clpsd && <p className='px-8 md:block hidden transition-all text-gray-400'>Account type:  <span className='font-semibold'>trainer</span></p>}
                <p className={`transition-all text-teal-500 font-semibold text-wrap text-center ${!clpsd ? "md:hidden" : "block"}`}>My Gym</p>
            </div>
            <div className={`links h-[70%] mt-10 flex items-center ${clpsd && "justify-center"} `}>
                <div className='space-y-4 w-full'>
                    <Link to="/trainer/dashboard" className={`px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2 ${step === 1 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 transition-all`}>
                        <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                            <Tooltip content='Dashboard'>
                                <LuLayoutDashboard className='w-5 h-5 cursor-pointer' />
                            </Tooltip>
                            {!clpsd && <p className='font-semibold md:block hidden'>Dashboard</p>}
                        </div>
                    </Link>
                    <Link to="/trainer/my-clients" className={`px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2  ${step === 2 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 transition-all`}>
                        <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                            <Tooltip content='My clients'>
                                <FaPeopleGroup className='w-5 h-5 cursor-pointer' />
                            </Tooltip>
                            {!clpsd && <p className=' md:block hidden'>My clients</p>}
                        </div>
                    </Link>
                    <Link to="/trainer/service-list" className={`px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2  ${step === 3 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 transition-all`}>
                        <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                            <Tooltip content='My services'>
                                <CgWorkAlt className='w-5 h-5 cursor-pointer' />
                            </Tooltip>
                            {!clpsd && <p className=' md:block hidden'>My services</p>}
                        </div>
                    </Link>
                    <Link to="/trainer/workout" className={`px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2  ${step === 4 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 transition-all`}>
                        <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                            <Tooltip content='My workouts'>
                                <CgGym className='w-5 h-5 cursor-pointer' />
                            </Tooltip>
                            {!clpsd && <p className=' md:block hidden'>My workouts</p>}
                        </div>
                    </Link>
                    <Link to="/trainer/chat" className={`px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2  ${step === 5 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 transition-all`}>
                        <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                            <Tooltip content='Chat'>
                                <IoChatboxEllipsesOutline  className='w-5 h-5 cursor-pointer' />
                            </Tooltip>
                            {!clpsd && <p className=' md:block hidden'>Chat</p>}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
         
        <div className="account grid h-full z-0 relative items-end">
            <Link to="/trainer/profile" className={`md:px-5 flex gap-4 items-center p-2 hover:bg-gray-50 relative border border-transparent border-r-2  ${step === 6 ? "border-r-teal-500 bg-gray-200" : "border-r-transparent text-gray-400"} hover:border-r-teal-500 hover:text-teal-500 `}>
                <hr className='absolute top-0 left-0 bg-black w-full' />
                <div className={`link flex items-center ${clpsd && 'justify-center'} justify-center ${!clpsd && 'md:justify-start'} gap-3 w-full`}>
                    <Tooltip content='Profile'>
                        <MdOutlineManageAccounts className='w-5 h-5 cursor-pointer' />
                    </Tooltip>
                    {!clpsd && <p className=' md:block hidden'>Profile</p>}
                </div>
            </Link>
        </div>
        <div onClick={() => {setClpsd(!clpsd)}} className="clsopn absolute bottom-[70px] -right-5 z-50 sm:block hidden">
            <Tooltip content={`${clpsd === false ? "Collapse" : "Open"}`} >
                <div className='group bg-white p-4 rounded-full border-r-2 cursor-pointer hover:border-teal-500 transition-all'>
                    {clpsd === false && <FaArrowLeft className='group-hover:translate-x-1 translate-x-2 transition-all text-teal-500' />}
                    {clpsd && <FaArrowRight className='group-hover:translate-x-1 translate-x-2 transition-all text-teal-500' />}
                </div>
            </Tooltip>
        </div>
    </div>
  )
}

export default TrainerSideNavComponent