import React, { useState } from 'react'
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent'
import { FaEye, FaPeopleGroup } from 'react-icons/fa6';
import { MdGroupWork, MdNoAccounts } from 'react-icons/md';
import { CgGym, CgWorkAlt } from 'react-icons/cg';
import { DayPicker } from 'react-day-picker';
import gymImg from '../../assets/images/gymImg.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom';
import { BsClipboard2Data } from "react-icons/bs";
import { MdFiberNew } from "react-icons/md";
import CountUp from 'react-countup';

const AdminDashboard = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [preview, setPreview] = useState();
  const [deleteClient, setDeleteClient] = useState();

  const cards = [
    {
      title: "All clients",
      number: 120,
      icon: <FaPeopleGroup className='w-full h-full' />
    },
    {
      title: "All clients",
      number: 56,
      icon: <MdGroupWork className='w-full h-full' />
    },
    {
      title: "My services",
      number: 7,
      icon: <CgWorkAlt className='w-full h-full' />
    },
    {
      title: "My workouts",
      number: 35,
      icon: <CgGym className='w-full h-full' />
    },
  ];

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
  const workouts = null;

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
  const clients = null;

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
                    <p>Hi {'name'}</p>
                    <h2 className='md:text-3xl'>Welcome to My gym!</h2>
                  </div>
                  {/* status cards */}
                  <div className="status-card w-full grid xl:grid-cols-4 md:grid-cols-2 gap-2 my-5">
                    {/* loop through cards */}
                    {cards.map(card => (
                      <div className='w-full group p-5 py-6 rounded-lg bg-gradient-to-r from-teal-400 to-teal-500 flex gap-4 justify-between'>
                        <div className="txt">
                          <h2 className='text-white text-xl text-nowrap'>{card.title}</h2>
                          <p className='text-white xl:text-4xl'> <CountUp start={0} end={card.number ? card.number : 0} duration={6} /> </p>
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
                        {workouts ? 
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
                            backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className='p-4 img rounded w-full mb-3 xl:h-[26vh] h-[35vh] relative'>
                          <div className="trainer-box absolute top-0 right-0 xl:w-[40%] w-full xl:min-h-[50%] h-[70%] bg-gradient-to-r from-[rgba(255,255,255,0.2)] to-white flex justify-end py-5 p-2 rounded-l-full">
                            <div className='space-y-2 text-center text-gray-700'>
                              <p className='font-semibold'>Workout created <span className='text-gray-700'> 1 hour ago </span></p>
                              <div className="flex justify-center">
                                <div className='trainer-img flex justify-center items-center w-[70px] h-[70px] rounded-full'
                                style={{
                                  backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
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
                    <div className={`table my-2 px-5  ${ clients ? "bg-gray-50" : 'bg-white'} rounded w-full h-[35vh]`}>
                      {/* loop through clients list */}
                      {clients !== null ?
                        clients.map(client => (
                          <>
                          <table className='w-full'>
                            <thead>
                              <tr>
                                <td className='text-nowrap pr-2'>Client id</td>
                                <td className='text-nowrap pr-2'>First name</td>
                                <td className='text-nowrap pr-2'>Father name</td>
                                <td className='text-nowrap pr-2'>Date of birth</td>
                                <td className='text-nowrap pr-2'>Sex</td>
                                <td className='text-nowrap pr-2'>Email</td>
                                <td className='text-nowrap pr-2'>Trainer's id</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.clientId}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.firstName}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.fatherName}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.DOB}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.sex}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.email}</td>
                                <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.trainerId}</td>
                                <td className='py-5 text-nowrap text-gray-500'>
                                  <div className='flex gap-2 items-center'>
                                    <button onClick={() => setPreview} className='px-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex gap-2 items-center'><FaEye/> Preview</button>
                                    <button onClick={() => setDeleteClient} className='px-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Suspend</button>
                                  </div>
                                </td>
                              </tr>
                        </tbody>
                      </table>
                      <div className="flex justify-center">
                          <Link to={'/admin/clients'} className='text-center p-2 text-gray-500 hover:underline'>Show more</Link>
                      </div>
                      </>
                      )
                      ).slice(0, 8)
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