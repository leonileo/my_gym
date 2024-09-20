import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CountUp from 'react-countup'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import gymImg from '../../assets/images/gymImg.jpg'
import { TbPlugConnected, TbProgressBolt, TbReportAnalytics, TbWeight } from "react-icons/tb";
import { FaPeopleArrows, FaPeopleGroup } from 'react-icons/fa6';
import { CgGym, CgWorkAlt } from 'react-icons/cg';
import { GiWeightLiftingUp, GiWeightScale } from 'react-icons/gi';
import { GoGoal } from 'react-icons/go';
import { BsClipboard2Data } from "react-icons/bs";
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { useDashboardQuery } from '../../slices/trainerApiSlice';
import { Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';


const TrainerDashboard = () => {
  const [clpsd, setClpsd] = useState(false);


  // dummy data
  // requests
  // available
  // const requests = [
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     approved: false,
  //     date: '2024-09-10',
  //   },
  // ];
  // not available
  // const requests = null;

  // client list
  // available
  // const clients = [
  //   {
  //     picture: gymImg,
  //     name: "Client one",
  //     phoneNo: '090000000000',
  //     sex: 'Male',
  //     clientId: 'C-Id-1'
  //   },
  //   {
  //     picture: gymImg,
  //     name: "Client two",
  //     email: "clienttwo@mail.com",
  //     sex: 'Female',
  //     clientId: 'C-Id-2'
  //   },
  //   {
  //     picture: gymImg,
  //     name: "Client one",
  //     email: "clientone@mail.com",
  //     sex: 'Male',
  //     clientId: 'C-Id-1'
  //   },
  //   {
  //     picture: gymImg,
  //     name: "Client two",
  //     phoneNo: '090000000000',
  //     sex: 'Female',
  //     clientId: 'C-Id-2'
  //   },
  //   {
  //     picture: gymImg,
  //     name: "Client two",
  //     email: "clienttwo@mail.com",
  //     sex: 'Female',
  //     clientId: 'C-Id-2'
  //   }
  // ]
  // not available
  // const clients = null;

  // client progress
  // available
  // const progress = [
  //   {
  //     clientId: 'C-Id-2',
  //     progressId: 'P-Id-2',
  //     progress: [
  //       {
  //       workout: 'Pushup',
  //       clientPicture: gymImg,
  //       weightInPicture: gymImg,
  //       weightInNumber: '76 killo',
  //       isWorkoutDone: true,
  //       progressDate: '2024-09-15',
  //       notes: "Today's workouts is a really great workout"
  //     },
  //       {
  //       workout: 'Pushup',
  //       clientPicture: gymImg,
  //       weightInPicture: gymImg,
  //       weightInNumber: '77 killo',
  //       isWorkoutDone: true,
  //       progressDate: '2024-09-11',
  //       notes: null
  //     },
  //   ]
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     progressId: 'P-Id-3',
  //     progress: [{
  //       workout: 'Pushup 2',
  //       clientPicture: gymImg,
  //       weightInPicture: gymImg,
  //       weightInNumber: '56 killo',
  //       isWorkoutDone: true,
  //       progressDate: '2024-09-08',
  //       notes: null
  //     }]
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     progressId: 'P-Id-2',
  //     progress: [{
  //       workout: 'Pushup',
  //       clientPicture: gymImg,
  //       weightInPicture: gymImg,
  //       weightInNumber: '76 killo',
  //       isWorkoutDone: true,
  //       progressDate: '2024-09-10',
  //       notes: "Today's workouts is a really great workout "
  //     }]
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     progressId: 'P-Id-3',
  //     progress: [{
  //       workout: 'Pushup 2',
  //       clientPicture: gymImg,
  //       weightInPicture: gymImg,
  //       weightInNumber: '56 killo',
  //       isWorkoutDone: true,
  //       progressDate: '2024-09-08',
  //       notes: null
  //     }]
  //   }
  // ]
  // const weight = [{weightBeforeTraining: "90 killo"}, {currentWeight: "72 killo"}, {plannedWeight: "60 killo"}];
  // not available
  // const weight = null;
  
  // dummy data
  
  // production environment
  const { data: stat, isLoading, error } = useDashboardQuery();
  const progress = isLoading ? [] : error ? []: stat.progresses;
  const clients = isLoading ? [] : error ? []: stat.clients.clients;
  const requests = isLoading ? [] : error ? []: stat.request.requests;

  console.log(isLoading ? "Loading" : error ? error : stat)

  const cards = [
    {
      title: "My clients",
      number: isLoading ? 'Loading': error ? "Error" : stat.status.clientStatus,
      icon: <FaPeopleGroup className='w-full h-full' />
    },
    {
      title: "Client requests",
      number: isLoading ? 'Loading': error ? "Error" : stat.status.requestStatus,
      icon: <TbPlugConnected className='w-full h-full' />
    },
    {
      title: "My services",
      number: isLoading ? 'Loading': error ? "Error" : stat.status.serviceStatus,
      icon: <CgWorkAlt className='w-full h-full' />
    },
    {
      title: "My workouts",
      number: isLoading ? 'Loading': error ? "Error" : stat.status.workoutStatus,
      icon: <CgGym className='w-full h-full' />
    },
  ];

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={1} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] flex-col xl:flex-row-reverse flex">
        {/* right contents - client progress info */}
        <div className="rright md:mb-0 mb-10 xl:w-[25%] w-full h-full min-h-[80vh] md:border-l-4">
          <div className="client-info h-full overflow-auto">
            <h2 className='pt-2 px-5 text-2xl xl:my-5 text-gray-600 border-red-500 rounded'>Client's progress info</h2>
            <div className="top xl:h-[90%] h-full px-5">

            { isLoading ?
              <div className='bg-white h-full w-full flex justify-center items-center'>
                <Spinner className='w-[55px] h-[55px]' /> 
              </div>
            :
            progress.length > 0 ? 
              <>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 4500, 
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={`w-full h-full rounded my-5 md:hidden block `}
                    >

                  {/* loop through requests */}
                  {progress.length > 0 && progress.map(progress => (
                      <SwiperSlide className='h-full bg-white px-5 p-2 rounded'>
                        <div className='pl-3 h-full'>
                          <p className='text-center text-gray-500 font-semibold text-xl'>Progress data of {progress.progressData.clientId}</p>
                          {/* weight pictures */}
                          <div className="weight-client-pic">
                          <Swiper
                              slidesPerView={1}
                              spaceBetween={20}
                              navigation={true}
                              modules={[ Navigation]}
                              className={`w-full rounded my-5 md:hidden block `}
                            >
                              {/* loop through client and weight pictures */}
                              { progress.progressData.progress.length > 0 ? progress.progressData.progress.map((pic) => (
                                <div>
                                  <SwiperSlide className='p-10'>
                                    <div className="pic w-full h-[25vh] rounded"
                                    style={{
                                      backgroundImage: `url(${pic.clientPicture})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                    >
                                    </div>
                                    <p className='text-center my-2'>Client's picture</p>
                                  </SwiperSlide>
                                  <SwiperSlide  className='p-10'>
                                    <div className="pic w-full h-[25vh] rounded"
                                    style={{
                                      backgroundImage: `url(${pic.weightInPicture})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                    >
                                    </div>
                                    <p className='text-center my-2'>Weight picture</p>
                                  </SwiperSlide>
                                </div>
                              )) : 
                              <div>
                                  <SwiperSlide className='p-10'>
                                    <div className="pic w-full h-[25vh] rounded"
                                    style={{
                                      backgroundImage: `url(${gymImg})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                    >
                                    </div>
                                    <p className='text-center my-2'>Client's picture will be here</p>
                                  </SwiperSlide>
                                  <SwiperSlide  className='p-10'>
                                    <div className="pic w-full h-[25vh] rounded"
                                    style={{
                                      backgroundImage: `url(${gymImg})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                    >
                                    </div>
                                    <p className='text-center my-2'>Weight picture will be here</p>
                                  </SwiperSlide>
                                </div>
                              }
                            </Swiper>
                          </div>
                          {/* weight info */}
                          <div className="weight-info mb-5">
                            <p className='text-gray-500 font-semibold text-xl flex gap-3 items-center'>Weight info <TbWeight /></p>
                            <div className="weightBox border border-teal-100 bg-gray-50 my-2 rounded mx-3">
                              <div className="w-full h-full text-teal-500 flex gap-2 items-center justify-center">
                                <div>
                                  <p className="cweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={progress.clientData.currentWeight.split(" ")[0]} duration={6} /> Killo</p>
                                  <div className="txt flex items-center gap-2"> <p> Current weight </p> <GiWeightLiftingUp /></div>
                                </div>
                              </div>
                              <div className="b flex justify-around items-center p-5">
                                <div className='beforeW text-gray-400 hover:text-black transition-all'>
                                  <p className="bweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={progress.clientData.weightBeforeTraining.split(" ")[0]} duration={6} /> Killo</p>
                                  <div className="flex gap-2 items-center"><p> Before training </p><GiWeightScale className='w-5 h-5' /></div>
                                </div>
                                <div className='goalW text-gray-400 hover:text-black transition-all'>
                                  <p className="gweight font-bold text-2xl block w-full text-center"><CountUp start={0}  end={progress.clientData.plannedWeight.split(" ")[0]} duration={6} /> Killo</p>
                                  <div className="flex gap-2 items-center"><p>Goal</p><GoGoal className='w-5 h-5' /></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional note */}
                          <div className="notes my-5">
                            <p className='text-gray-500 font-semibold text-xl flex gap-3 items-center'>Additional notes <TbProgressBolt /></p>
                            <div className="note border rounded bg-gray-50 p-2 my-5 max-h-[10vh] overflow-auto">
                              <p className=''>{progress.progressData.progress[0].notes ? progress.progressData.progress[0].notes : 'None enjoy the silence.' }</p>
                            </div>
                          </div>

{/* under development */}
                          {/* progress report */}
                          {/* <div className="progress-report my-5">
                            <p className='text-gray-500 font-semibold text-xl flex gap-3 items-center'>Today's progress report <TbReportAnalytics/> </p>
                            <div className='my-5'>
                              {progress.progressData.progress.length > 0  && progress.progressData.progress.map((r) => 
                              (
                                <div>
                                {new Date(r.progressDate).toLocaleDateString() === new Date().toLocaleDateString() && 
                                    (<div className="note border rounded bg-gray-50 p-2 my-5 max-h-[10vh] overflow-auto">
                                      <p>Today {
                                        (((Number(r.weightInNumber.split(' ')[0]) - 60) / 55) * 100).toFixed(2)
                                      }% </p>
                                    </div>
                                    )}
                                  </div>
                              ))}
                              </div>
                          </div> */}
{/* under development */}
                        </div>
                      </SwiperSlide>
                    ))}

                </Swiper>
                </>
                : (
                  <div className='bg-white h-full w-full flex justify-center items-center'>
                    <div>
                      <div className="flex justify-center group">
                      <BsClipboard2Data className='text-5xl group-hover:text-teal-500 transition-all'/> 
                      </div>
                      <p className='my-2text-center'>Your client's progress data will be displayed here.</p>
                    </div>
                  </div>
                )
              }
            </div>

          </div>
        </div>

        {/* middle contents - status, requests, client list */}
        <div className="rmiddle p-5 xl:w-[75%] w-full">
          <h2 className='md:text-3xl text-xl text-gray-600'>Dashboard</h2>
          {/* status cards */}
          <div className="status-card grid lg:grid-cols-4 md:grid-cols-2 gap-2 my-5">
            {/* loop through cards */}
            {cards.map(card => (
              <div className='w-full p-5 rounded bg-gradient-to-r from-teal-400 to-teal-500 flex gap-4 justify-between'>
                <div className="txt">
                  <h2 className='text-white text-xl text-nowrap'>{card.title}</h2>
                  <p className='text-white xl:text-4xl'> { isLoading ? <Spinner className='fill-white' /> : <CountUp start={0} end={card.number} duration={6} />} </p>
                </div>
                <div className="icon text-teal-100">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>
          
          {/* client requests */}
          <div className="client-request">
            <h2 className='md:text-3xl text-xl text-gray-600'>Client requests</h2>
            <div className={`bg-white w-full rounded min my-5 p-2`}>
              {isLoading ? 
              <div className='bg-white h-[15vh] w-full flex justify-center items-center'>
                <Spinner className='w-[55px] h-[55px]' /> 
              </div>
              : <>
              {requests.length > 0 && requests ? (<>
                {/* for desktop */}
                <div className='hidden lg:block w-full'>
                  <Swiper
                      slidesPerView={3}
                      spaceBetween={20}
                      pagination={{
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      modules={[Autoplay, Pagination]}
                      className={`w-full rounded my-5 md:hidden block p-2`}
                      >
                    {/* loop through requests */}
                    {requests.map(request => (
                    <SwiperSlide className=' bg-white px-5 p-2 rounded'>
                    <div className='h-full rounded-b overflow-hidden'>
                      <div className="top flex justify-end gap-2 text-gray-500">
                        <p>Request sent at</p>
                        <span className='font-semibold'>{request.date}</span>
                      </div>
                      <div className="bottom flex flex-wrap justify-start items-start gap-5">
                        <div className="w-[100px] h-[100px] rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className="name md:text-2xl text-gray-600">
                          <p>New client</p>
                        </div>
                      </div>
                      <div className="approve-btns flex gap-3 my-5">
                        <button className='w-full px-5 p-2 rounded border border-teal-600 text-teal-600 hover:bg-teal-500 hover:text-white transition-all '>Approve</button>
                        <button className='w-full px-5 p-2 rounded border border-red-600 text-red-600 hover:bg-red-500 hover:text-white transition-all '>Deny</button>
                      </div>
                    </div> 
                    </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* for small screens */}
                <div className='lg:hidden block w-full'>
                  <Swiper
                      slidesPerView={1}
                      spaceBetween={20}
                      pagination={{
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      modules={[Autoplay, Pagination]}
                      className={`w-full h-full rounded my-5 md:hidden block p-2`}
                      >
                    {/* loop through requests */}
                    {requests.map(request => (
                    <SwiperSlide className=' bg-white px-5 p-2 rounded'>
                    <div className='h-full rounded-b overflow-hidden'>
                      <div className="top flex justify-end gap-2 text-gray-500">
                        <p>Request sent at</p>
                        <span className='font-semibold'>{request.date}</span>
                      </div>
                      <div className="bottom flex justify-start items-start gap-5">
                        <div className="w-[100px] h-[100px] rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className="name md:text-2xl text-gray-600">
                          <p>New client</p>
                        </div>
                      </div>
                      <div className="approve-btns flex gap-3 my-5">
                        <button className='w-full px-5 p-2 rounded border border-teal-600 text-teal-600 hover:bg-teal-500 hover:text-white transition-all '>Approve</button>
                        <button className='w-full px-5 p-2 rounded border border-red-600 text-red-600 hover:bg-red-500 hover:text-white transition-all '>Deny</button>
                      </div>
                    </div> 
                    </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
              ) : (
                <div className='rounded w-full h-[15vh] flex justify-center items-center my-3'>
                  <div>
                      <div className="flex justify-center group">
                      <FaPeopleArrows className='text-5xl group-hover:text-teal-500 transition-all'/> 
                      </div>
                      <p className='my-2 text-center'>Client requests will be displayed here.</p>
                    </div>
                </div>
              )
            }</>}
            </div>
          </div>
          
          {/* clients list */}
          <div className="my-clients">
            <div className="flex justify-between">
              <h2 className='md:text-3xl text-xl text-gray-600'>My clients</h2>
              {clients && <Link to={'/trainer/my-clients'} className='hover:underline cursor-pointer'>See all</Link>}
            </div>
            {clients && clients.length > 0 ?
            <div className='w-full p-5 bg-white my-2 rounded h-[50vh] overflow-auto'>
              <table className='w-full text-nowrap'>
                <thead className='bg-gray-100'>
                  <tr>
                    <td className='p-5 md:text-start text-center'>N <u>o</u></td>
                    <td className='p-5 md:text-start text-center md:block hidden'>Picture</td>
                    <td className='p-5 md:text-start text-center'>Name</td>
                    <td className='p-5 md:text-start text-center'>Contact</td>
                    <td className='p-5 md:text-start text-center'>Sex</td>
                    <td className='p-5 md:text-start text-center'>Client id</td>
                  </tr>
                </thead>
                  {/* <hr className='my -1 w-full opacity-0' /> */}
                <tbody>
                  {/* loop through the trainer's clients */}
                  {clients.map((client, x) => (
                    <tr className='w-full' key={client._id}>
                        <td className='p-5 md:text-start text-center'>{x + 1}</td>
                        <td className='p-5 md:block hidden'>
                          <div
                          style={{
                            backgroundImage: `url(${client.picture ? client.picture : gymImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          className='w-[80px] h-[80px] rounded-full'></div>
                        </td>
                        <td className='md:text-start text-center'>{client.firstName} {client.fatherName}</td>
                        <td className='p-5 md:text-start text-center'>{client.email ? client.email : client.phoneNo}</td>
                        <td className='md:text-start text-center'>{client.sex}</td>
                        <td className='md:text-start text-center'>{client.clientId}</td>
                      </tr>
                    ))}
                </tbody>
                
              </table>
            </div>
            : (
              <div className='bg-white rounded w-full h-[50vh] flex justify-center items-center my-3'>
                <div>
                    <div className="flex justify-center group">
                    <MdOutlineFormatListNumbered className='text-5xl group-hover:text-teal-500 transition-all'/> 
                    </div>
                    <p className='my-2 text-center'>Client list will be displayed here.</p>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard