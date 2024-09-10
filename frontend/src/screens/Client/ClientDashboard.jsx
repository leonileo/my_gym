import React, { useEffect, useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import { useDispatch, useSelector } from 'react-redux';
import logoSm from '../../assets/images/logo-sm.png'
// date picker
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../index.css";
import gymImg from '../../assets/images/gymImg.jpg'
import trainerPic from '../../assets/images/logo-sm.png'

// icons
import { ImFilesEmpty } from "react-icons/im";
import { FaWeight } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GoGoal, GoSignOut } from "react-icons/go";
import { GiWeightScale } from "react-icons/gi";
import { FaCheck, FaDumbbell, FaIdBadge, FaRegCalendarXmark, FaRegIdCard } from 'react-icons/fa6';
import { LiaDumbbellSolid } from "react-icons/lia";
import { IoBodyOutline } from "react-icons/io5";
import { RiMailSendFill, RiProfileFill } from "react-icons/ri";
import { PiImageBroken } from "react-icons/pi";
import { toast } from 'react-toastify';

import CountUp from 'react-countup'
import { Link, useNavigate } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { MdAddAlarm, MdEmail, MdPhone, MdTimer, MdVerified } from 'react-icons/md';
import { Spinner, Tooltip } from 'flowbite-react';
import { useSignoutMutation } from '../../slices/authApiSlice'
import { logout } from '../../slices/authSlice';


const ClientDashboard = () => {
  const [clpsd, setClpsd] = useState(false);
  const [selected, setSelected] = useState();
  const [profileNav, setProfileNav] = useState(false);

  const today = new Date().toDateString()
  const [time, setTime] = useState(new Date());

  const [active, setActive] = useState(1);
  const [clamp, setClamp] = useState(false);
  
  const [trainerAdd, setTrainerAdd] = useState(false);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signout, {isLoading: signoutLoad}, error] = useSignoutMutation();
  // user infotmation
  const { userInfo } = useSelector((state) => state.auth)
  const name = userInfo.name;


  // dummy data

  // weight info available
  // const weight = [{weightBeforeTraining: "90 killo"}, {currentWeight: "72 killo"}, {plannedWeight: "60 killo"}];
  // weight info not available
  const weight = null;

  const workouts = [ 
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: true,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: `1. warm up <br/> 2.do your push ups`,
      equipmentRequired: false,
      equipmentList: null,
    },
  ]

  // trainer info available
  // const trainer = {
  //   name: "Trainer 1",
  //   sex: "Male",
  //   picture: trainerPic,
  //   email: "trainer1@email.com",
  //   verifiedTrainer: true,
  //   description: "I am trainer 1, a great trainer!",
  //   serviceList: ["Yoga", "Weight loss", "Bulk", "Lifting"],
  //   phoneNo: "0900000000",
  // };
  // trainer info not available
  const trainer = null;
  // dummy data

  const logoutHandler = async () => {
    if (window.confirm('Are you sure you want to logout ?')) {
      try {
          await signout().unwrap();
          dispatch(logout());
          toast.success("Logout successfull!")
          window.location.reload();
          navigate('/signin')          
      } catch (error) {
          toast.error(error?.data?.message || error.error);
      }
    }
  }

  return (
    <>
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <ClientSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={1} />
      </div>

      {/* right side */}
      <div className="right overflow-auto overflow-x-hidden w-full md: h-[100vh] xl:flex-row flex-col-reverse flex">
        <div className="rmiddle p-5 xl:w-[75%] w-full">
          <div className="top md:my-5 w-full">
            {/* for desktops */}
            <div className="welcome-msg hidden md:block">
              <p>Welcome Back!</p>
              <p className='font-semibold capitalize md:text-2xl'>{name}</p>
            </div>
            {trainer ? (
              <div className="today-workouts-completed flex justify-center w-full">
                {/* for desktops */}
                <div className='hidden md:block w-full'>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    className={`w-full min-h-[20vh] h-auto my-5`}
                  >
                  {/* loop through completed workouts */}
                  {workouts.map(completed => (
                    <SwiperSlide className='h-full'>
                      <div 
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className='p-4 img rounded mb-3 h-[250px]'>
                        <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 rounded capitalize'>{completed.workoutName}</p>
                      </div>
                      <div className="details flex justify-start gap-5">
                        <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><MdTimer/> {completed.workoutDuration}</p>
                        <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><FaDumbbell/> {completed.workoutCategory}</p>
                        <p className={`p-2 px-3 text-nowrap text-sm text-gray-500  rounded ${completed.equipmentRequired ? "bg-teal-500 text-white": "bg-gray-400 text-white" }`}>{completed.equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                  </Swiper>
                </div>
                {/* for small screen */}
                <div className='md:hidden block w-full'>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    className={`w-full min-h-[20vh] h-auto my-5 md:hidden block`}
                    >
                  {/* loop through completed workouts */}
                  {workouts.map(completed => (
                    <SwiperSlide className='h-full'>
                    <div 
                    style={{
                      backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className='p-4 img rounded mb-3 h-[250px]'>
                      <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 rounded capitalize'>{completed.workoutName}</p>
                    </div>
                    <div className="details flex justify-start gap-5 overflow-hidden">
                      <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><MdTimer/> {completed.workoutDuration}</p>
                      <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><FaDumbbell/> {completed.workoutCategory}</p>
                      <p className={`p-2 px-3 text-nowrap text-sm text-gray-500  rounded ${completed.equipmentRequired ? "bg-teal-500 text-white": "bg-gray-400 text-white" }`}>{completed.equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</p>
                    </div>
                  </SwiperSlide>
                  ))}
                  </Swiper>
                </div>
              </div>
            ) 
            : (
              <div className='w-full h-[25vh] bg-gray-200 rounded text-center p-5 flex justify-center items-center md:mb-0 my-5'>
                <div>
                  <div className="flex justify-center">
                    <PiImageBroken className='w-28 h-28' />
                  </div>
                  <p>Workout data will be available here after your trainer assign you one.</p>
                </div>
              </div>
            ) }
          </div>

          <div className="bottom trainer-info">
            <h2 className='md:text-3xl text-xl text-gray-600'>Trainer information</h2>
            <div className={`info bg-gray-200 rounded ${trainer ? "w-full md:h-[55vh]" : "h-fit p-5"} overflow-auto my-4`}>
              {trainer ? (
                <div className='trainer p-1 h-full bg-white overflow-auto'>
                  <div className="top w-full h-[10vh] relative pl-8 md:mb-28 mb-16 rounded-t"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute md:top-[50%] top-[60%] flex gap-4 items-end">
                      <div
                      style={{
                        backgroundImage: `url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="img md:w-[150px] md:h-[150px] w-24 h-24 border-4 border-white rounded-full">
                      </div>
                      <div className="txt">
                        <p className='font-semibold md:text-2xl text-xl flex gap-2 items-center'>{trainer.name} {trainer.verifiedTrainer && (<Tooltip content='This trainer is verified.' style={`dark`}> <MdVerified className='text-blue-500'/></Tooltip>)}</p>
                        <p className='font-semibold text-gray-400 flex items-center gap-2'>{trainer.sex} <span className='relative top-[.8px] w-1 h-1 rounded-full bg-gray-500'></span> {trainer.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bottom pl-8 my-2">
                    <div className="opt h-full sticky py-3 pr-4 -top-2 bg-white">
                      <div className='border-b flex gap-4'>
                        <button onClick={() => setActive(1)} className={`border-b-[2px] transition-all ${active === 1 ? " border-teal-500": "border-transparent"} `}>Overview</button>
                        <button onClick={() => setActive(2)} className={`border-b-[2px] transition-all ${active === 2 ? " border-teal-500": "border-transparent"} `}>Status</button>
                      </div>
                    </div>

                    {active === 1 ? (
                    <div className='status transition-all'>
                      <p className='text-gray-500'>{trainer.description}</p>
                    </div>
                    ) : (
                      <div className='transition-all'>
                        <div className="service">
                          <h3 className='md:text-xl text-gray-700 capitalize'>My services ({trainer.serviceList.length})</h3>
                          <ul className={`px-5 mt-2 transition-all ${!clamp ? "line-clamp-2" : ""}`}>
                            {/* loop through the trainer's service */}
                            {trainer.serviceList.map((service) => (
                              <>
                              <li className='list-disc text-gray-500'>{service}<span>{service === trainer.serviceList.length - 1 ? "end": ""}</span> </li>
                              </>
                            ))}
                          </ul>
                          {!clamp && <button onClick={() => setClamp(!clamp)} className='text-sm px-5 text-gray-500 w-fit'>See all services</button>}
                          {clamp && <button onClick={() => setClamp(!clamp)} className='text-sm px-5 text-gray-500 w-fit'>See less</button>}
                        </div>
                        <div className="contact my-4">
                          <h3 className='md:text-xl text-gray-700 capitalize'>Contact me through</h3>
                          <p className='group text-gray-400 p-2 rounded w-fit hover:text-black transition-all flex gap-3 items-center md:font-semibold'><span className='bg-gray-100 p-2 rounded flex gap-2 items-center w-fit'><MdEmail /> Email</span>: <a href={`mailto:${trainer.email}`}> {trainer.email}</a></p>
                          <p className='group text-gray-400 p-2 rounded w-fit hover:text-black transition-all flex gap-3 items-center md:font-semibold'><span className='bg-gray-100 p-2 rounded flex gap-2 items-center w-fit'><MdPhone />  Phone Number</span>: <a href={`tel:${trainer.phoneNo}`}>{trainer.phoneNo}</a></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
              : (
                <div className='w-full h-full'>
                  <div className='w-full h-full cursor-pointer' onClick={() => setTrainerAdd(true)}>
                  {!trainerAdd ? (
                    <>
                    {/* icon */}
                    <div className='flex justify-center items-center h-full min-h-[25vh] w-full transition-all text-center'>
                      <div>
                        <div className='w-full flex justify-center p-5'>
                          <MdAddAlarm className='w-28 h-28' />
                        </div>
                        <p>Add a trainer to get workouts, schedules and more.</p>
                      </div>
                    </div>
                    </>): (<>
                      <div className='flex items-start w-full h-full p-5 transition-all'>
                        <form className='md:w-[50%] w-full md:max-h-[25vh] h-full bg-white rounded flex gap-5 p-5'>
                          <div className='w-full md:flex items-start gap-2'>
                            <label htmlFor="trainerId" className='w-full'>
                              Enter your trainer id
                              <div className='w-full flex md:justify-start justify-center'>
                                <FaRegIdCard className='w-[150px] h-[150px] text-teal-500'/>
                              </div>
                            </label>
                            
                            <div className='w-full p-1 space-y-5 text-teal-500'>
                              <div className='relative w-full flex items-center border rounded mt-5'>
                                <input type="text" id='trainerId' className='border-none focus:ring-0 rounded w-[90%]' placeholder='Enter your trainer id' />
                                <div className="icon right-3 top-[60%]">
                                  <FaIdBadge className='w-5 h-5' />
                                </div>
                              </div>
                              <button className='px-5 p-2 bg-gray-200 text-gray-500 rounded hover:bg-teal-500 hover:text-white flex items-center gap-1 transition-all group'>
                                <RiMailSendFill className='group-hover:-translate-x-2 transition-all' />
                                Send a request
                              </button>
                            </div>
                          </div>
                        </form>    
                      </div>
                    </>)
                    }
                  </div>
                </div>
              )
              }
            </div>
          </div>
        </div>

        <div className="rright xl:w-[25%] w-full md:border-l-4 p-5 ">
          <div className="top">
            <div className="clientinfo relative flex items-start justify-between">
              <div className="txt ">
                <h3 className='font-semibold capitalize truncate'>{time.toLocaleTimeString()}</h3>
                <h3 className='text-sm text-gray-400 truncate'>{today}</h3>
              </div>
              <div className="relative">
                <div onClick={() => setProfileNav(!profileNav)} className="img ml-2 w-[50px] h-[50px] border border-teal-500 rounded-full">
                  <img src={logoSm} alt="" className='h-full' />
                </div>
                {/* profile modal */}
                {profileNav && (
                  <div className="transition-all -bottom-26 right-0 profile modal border absolute bg-white rounded w-[150px] h-auto">
                  <Link 
                    to={'/client/profile'}
                    className='cursor-pointer hover:bg-gray-100 transition-all w-full p-2 text-start flex items-center gap-5' 
                    > 
                      <button>Profile</button>
                  </Link>
                    <div className='p-2'>
                      <hr className='w-full' />
                    </div>
                    <div onClick={logoutHandler} className='cursor-pointer hover:bg-gray-100 transition-all w-full p-2 text-start flex items-center gap-5'>
                      <button className='flex gap-2 items-center'>Signout {signoutLoad && <Spinner />}</button>
                      <GoSignOut />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* for small screens */}
            <div className="welcome-msg text-center md:hidden block my-2">
              <p className=''>Welcome Back!</p>
              <p className='font-semibold capitalize md:text-2xl'>{name}</p>
            </div>
            <div className="calendar py-5">
              <h2 className='md:text-2xl flex gap-2 items-center mb-5'>Calendar <FaRegCalendarXmark/></h2>
              <div className='flex justify-center '>
                <DayPicker
                className=' overflow-auto '
                mode='single' 
                selected={selected}
                onSelect={setSelected}/>
              </div>
            </div>
          </div>
          <div className="bottom space-y-5">
            <div className="weight checker">
              <h2 className='md:text-2xl flex gap-2 items-center mb-5'>Weight progress <FaWeight/></h2>
              {weight ? (
                <div className="weightBox">
                  <div className="t text-teal-500 flex gap-2 items-center justify-center">
                    <div>
                      <p className="cweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={weight[1].currentWeight.split(" ")[0]} duration={6} /> Killo</p>
                      <div className="txt flex items-center gap-2"> <p> Current weight </p> <GiWeightLiftingUp /></div>
                    </div>
                  </div>
                  <div className="b flex justify-around items-center p-5">
                    <div className='beforeW text-gray-400 hover:text-black transition-all'>
                      <p className="bweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={weight[0].weightBeforeTraining.split(" ")[0]} duration={6} /> Killo</p>
                      <div className="flex gap-2 items-center"><p> Before training </p><GiWeightScale className='w-5 h-5' /></div>
                    </div>
                    <div className='goalW text-gray-400 hover:text-black transition-all'>
                      <p className="gweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={weight[2].plannedWeight.split(" ")[0]} duration={6} /> Killo</p>
                      <div className="flex gap-2 items-center"><p>Goal</p><GoGoal className='w-5 h-5' /></div>
                    </div>
                  </div>
                </div>) 
                : (
                  <div>
                    <div className="flex justify-center py-3">
                      <ImFilesEmpty className='text-teal-500 w-[50px] h-[50px]' />
                    </div>
                    <p className='text-gray-500 text-center'>Weight information is empty! <br /> <Link to={'/client/profile'} className='hover:underline'> Update weight info</Link> </p> 
                  </div>
                )}
            </div>
            <div className="workouts">
              <h2 className='md:text-2xl flex gap-2 items-center mb-5'>Today's workout <LiaDumbbellSolid /></h2>
              {/* loop through today's workouts  */}
              {trainer ? (
                <div className="ws md:h-[40vh] h-[15vh] overflow-hidden overflow-y-auto">
                  {workouts.map(workout => (
                    <div className='w-full flex justify-between items-center bg-gray-200 rounded p-5 my-2 cursor-pointer hover:bg-gray-300 transition-all capitalize group'>
                      <p className='flex gap-2 items-center truncate w-[200px]'>{workout.workoutName} <IoBodyOutline /></p>
                      <span className='truncate text-gray-500 group-hover:bg-[rgba(6,148,162,0.5)] group-hover:text-white transition-all bg-gray-300 px-4 rounded-full text-sm'>{workout.workoutCategory}</span>
                    </div>
                  ))}
                </div>
              ) 
              : (
                <div className='w-full h-[25vh] bg-gray-200 rounded text-center p-5 flex justify-center items-center md:mb-0 mb-5'>
                  <div>
                    <div className="flex justify-center">
                      <PiImageBroken className='w-28 h-28' />
                    </div>
                    <p>Workout data will be available here after your trainer assign you one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default ClientDashboard