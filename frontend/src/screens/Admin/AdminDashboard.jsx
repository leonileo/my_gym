import React, { useState } from 'react'
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent'
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdGroupWork } from 'react-icons/md';
import { CgGym, CgWorkAlt } from 'react-icons/cg';
import { DayPicker } from 'react-day-picker';
import gymImg from '../../assets/images/gymImg.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom';
import { BsClipboard2Data } from "react-icons/bs";
import { MdFiberNew } from "react-icons/md";
import CountUp from 'react-countup';
import { useAdashboardQuery } from '../../slices/adminApiSlice';
import { AgeFromDateString } from 'age-calculator';
import { format } from 'timeago.js'
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';
import { Spinner } from 'flowbite-react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const {data: adminData, isLoading, error} = useAdashboardQuery();

  const name = useSelector(state => state.auth).userInfo.name
  
  const cards = [
    {
      title: "All clients",
      number: isLoading ? "" : error ? "error" : adminData.clientsLength,
      icon: <FaPeopleGroup className='w-full h-full' />
    },
    {
      title: "All trainers",
      number: isLoading ? "" : error ? "error" : adminData.trainers,
      icon: <MdGroupWork className='w-full h-full' />
    },
    {
      title: "All services",
      number: isLoading ? "" : error ? "error" : adminData.services,
      icon: <CgWorkAlt className='w-full h-full' />
    },
    {
      title: "All workouts",
      number: isLoading ? "" : error ? "error" : adminData.workoutsLength,
      icon: <CgGym className='w-full h-full' />
    },
  ];

  const clients = isLoading ? [] : error ? []: adminData.clients
  const workouts = isLoading ? [] : error ? []: adminData.workouts
  
  // dummy data
  // available
  // const workouts = [ 
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: true,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: `1. warm up <br/> 2.do your push ups`,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  // ]
  // not available
  // const workouts = null;

  // available
  // const clients = [
  //   {
  //     clientId: 'C-Id-1',
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     trainerId: 'T-Id-4',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     trainerId: 'T-Id-4',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     trainerId: 'T-Id-1',
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     trainerId: 'T-Id-4',
  //   },
  // ]
  // not available
  // const clients = null;
  // dummy data

  return (
      <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
            {/* left side */}
            <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
              <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={1} />
            </div>

            {/* right */}
            <div className="right overflow-auto overflow-x-hidden w-full h-[100vh]">
              <div className="p-5 w-full">
                <div className="contents w-full">
                  <div className="welcome my-5">
                    <p>Hi <span className='font-semibold'>{name}</span></p>
                    <h2 className='md:text-3xl'>Welcome to My gym!</h2>
                  </div>
                  {/* status cards */}
                  <div className="status-card w-full grid xl:grid-cols-4 md:grid-cols-2 gap-2 my-5">
                    {/* loop through cards */}
                    {cards.map(card => (
                      <div className='w-full group p-5 py-6 rounded-lg bg-gradient-to-r from-teal-400 to-teal-500 flex gap-4 justify-between'>
                        <div className="txt">
                          <h2 className='text-white text-xl text-nowrap'>{card.title}</h2>
                          <p className={`text-white ${isLoading ||error ? "text-xl" : "xl:text-4xl"}`}> 
                            { isLoading ? <Spinner />
                            : error ? "An error occured"
                            : <CountUp start={0} end={card.number ? card.number : 0} duration={6} /> 
                            }
                          </p>
                          </div>
                        <div className="icon group-hover:rotate-[360deg] duration-500 transition-all p-3 bg-teal-50 border rounded-full">
                          {card.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full middle-content xl:px-5 grid xl:grid-cols-2 grid-cols-1 gap-2 items-start space-y-5 xl:space-y-0">
                    {/* left */}
                    <div className="left w-full h-full">
                      <div className="w-full h-full">
                        { isLoading ? 
                          <div className='flex bg-white rounded-md justify-center items-center w-full h-full transition-all'>
                            <div className='flex gap-2 items-center xl:text-[20px] transition-all'>
                              <p className='text-teal-500'>Loading...</p>
                              <Spinner className='xl:w-[30px] xl:h-[30px]' />
                            </div>
                          </div>
                          : error ? 
                          <div className='flex bg-white rounded-md justify-center items-center w-full h-full transition-all'>
                            <div className='flex gap-2 items-center xl:text-[20px] transition-all'>
                              <div>
                                <div className='flex items-center gap-4 text-center'>
                                  <p className='text-teal-500'>An error has occured. please refresh the page and try again.</p>
                                  <TbFileSad className='text-teal-500'/>
                                </div>
                                <div className='flex items-center justify-center gap-4 text-teal-400 animate-pulse'>
                                  <button onClick={() => window.location.reload()} className='text-center flex gap-2 items-center'>Refresh</button>
                                  <IoRefresh />
                                </div>
                              </div>
                            </div>
                          </div>
                        : ( 
                        workouts.length > 0 ? 
                          <Swiper
                          slidesPerView={1}
                          spaceBetween={30}
                          freeMode={true}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Pagination]}
                          className={`w-full md:hidden block`}
                          >
                        {/* loop through created workouts */}
                        {workouts.map(created => (
                          <SwiperSlide className='h-full w-full mb-7'>
                          <div 
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${created.workoutPicture ? created.workoutPicture : gymImg})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            className='p-4 img rounded w-full mb-3 xl:h-[26vh] h-[35vh] relative'>
                            <div className="trainer-box absolute top-0 right-0 xl:w-[40%] w-full xl:min-h-[50%] h-[70%] bg-gradient-to-r from-[rgba(255,255,255,0.2)] to-white flex justify-end py-5 p-2 rounded-l-full">
                              <div className='space-y-2 text-center text-gray-700'>
                                <p className='font-semibold'>Workout created <span className='text-gray-700'> {format(created.createdAt.substring(0,10))} </span></p>
                                <div className="flex justify-center">
                                  <div className='trainer-img flex justify-center items-center w-[70px] h-[70px] rounded-full'
                                  style={{
                                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${ created.workoutPicture ? created.workoutPicture : gymImg})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                  ></div>
                                </div>
                                <p>Trainer name</p>
                              </div>
                            </div>
                            <div className="flex items-end h-full">
                              <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 px-5 rounded-full capitalize'>{created.workoutName}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        ))}
                        </Swiper>
                        : (
                          <div className='rounded bg-white w-full h-full flex justify-center items-center my-5 xl:m-0'>
                            <div>
                              <div className="flex justify-center group">
                              <MdFiberNew className='text-5xl group-hover:text-teal-500 transition-all'/> 
                              </div>
                              <p className='my-2 text-center'>Newly created workouts will be displayed here.</p>
                            </div>
                          </div>
                          )
                        )
                        }
                      </div>
                    </div>
                    {/* right */}
                    <div className="right w-full ">
                      <div className="calendar p-5 rounded-md bg-white">
                        <div className='flex justify-center '>
                          <DayPicker
                          className=' overflow-auto '
                          mode='single' />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="clients px-2 my-5 bg-gray-200 border rounded h-[45vh] overflow-auto">
                    <div className="top flex justify-between bg-inherit py-2">
                      <p className='font-semibold text-xl p-2'>Clients</p>
                      <Link to={'/admin/clients'}>
                      <button className='p-2 rounded px-5 border bg-white gray-50 border-gray-300'>View all</button>
                      </Link>
                    </div>
                    {/* clients list */}
                    <div className={`table my-2 px-5  ${ clients ? "bg-gray-50" : 'bg-white'} rounded w-full h-[35vh]`}>
                      {/* loop through clients list */}
                      {isLoading ? 
                          <div className='flex justify-center items-center w-full h-full transition-all'>
                            <div className='flex gap-2 items-center xl:text-[20px] transition-all'>
                              <p className='text-teal-500'>Loading...</p>
                              <Spinner className='xl:w-[30px] xl:h-[30px]' />
                            </div>
                          </div>
                          : error ? 
                          <div className='flex justify-center items-center w-full h-full transition-all'>
                          <div className='flex gap-2 items-center xl:text-[20px] transition-all'>
                            <div>
                              <div className='flex items-center gap-4 text-center'>
                                <p className='text-teal-500'>An error has occured. please refresh the page and try again.</p>
                                <TbFileSad className='text-teal-500'/>
                              </div>
                              <div className='flex items-center justify-center gap-4 text-teal-400 animate-pulse'>
                                <button onClick={() => window.location.reload()} className='text-center flex gap-2 items-center'>Refresh</button>
                                <IoRefresh />
                              </div>
                            </div>
                          </div>
                        </div>
                      : clients.length > 0 ?
                      <>
                        <>
                          <table className='w-full'>
                            <thead>
                              <tr>
                                <td className='text-nowrap pr-2'>N <u>O</u></td>
                                <td className='text-nowrap pr-2'>Client id</td>
                                <td className='text-nowrap pr-2'>First name</td>
                                <td className='text-nowrap pr-2'>Father name</td>
                                <td className='text-nowrap pr-2'>Date of birth</td>
                                <td className='text-nowrap pr-2'>Sex</td>
                                <td className='text-nowrap pr-2'>Email</td>
                                <td className='text-nowrap pr-2'>Trainer's id</td>
                              </tr>
                            </thead>
                            <tbody>
                            {clients.map((client, no) => (
                              <tr>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{no + 1}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.clientId}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.firstName}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.fatherName}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.DOB ? `${client.DOB.substring(0, 10)} - ${new AgeFromDateString(new Date(client.DOB.substring(0, 10))).age} yrs old` : "Not available"}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.sex}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.email}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.trainerId ? client.trainerId : "Not available"}</td>
                              </tr>
                            )).slice(0, 8)}
                        </tbody>
                      </table>
                      </>
                      <div className="flex justify-center">
                          <Link to={'/admin/clients'} className='text-center p-2 text-gray-500 hover:underline'>Show more</Link>
                      </div>
                      </>
                      : (
                        <div className='rounded w-full h-full flex justify-center items-center my-3'>
                          <div>
                            <div className="flex justify-center group">
                            <BsClipboard2Data className='text-5xl group-hover:text-teal-500 transition-all'/> 
                            </div>
                            <p className='my-2 text-center'>Client list will be displayed here.</p>
                          </div>
                        </div>
        
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
  )
}

export default AdminDashboard