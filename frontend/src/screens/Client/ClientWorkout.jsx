import React, { useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import ClientWorkoutComponent from '../../components/Client/ClientWorkoutComponent';

import gymImg from '../../assets/images/gymImg.jpg'
import { MdOutlineNoteAlt, MdTimer } from 'react-icons/md';
import { FaCheck, FaDumbbell, FaVideo } from 'react-icons/fa6';
import { RxCrossCircled } from "react-icons/rx";
import { ImFilePicture } from "react-icons/im";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import { PiImageBroken } from 'react-icons/pi';


const ClientWorkout = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [isDone, setIsDone] = useState();
  const [progressModal, setProgressModal] = useState(false);

  // specific workout states
  const [trainerId, setTrainerId] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutCategory, setWorkoutCategory] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [workoutPicture, setWorkoutPicture] = useState('');
  const [workoutVideoLink, setWorkoutVideoLink] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [workoutSteps, setWorkoutSteps] = useState('');
  const [equipmentRequired, setEquipmentRequired] = useState();
  const [equipmentList, setEquipmentList] = useState([]);

  const today = new Date().toDateString()


  // dummy data
  const workouts = [ 
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1 hr",
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
      equipmentRequired: true,
      equipmentList: ['dumbell', 'treadmill'],
    },
    {
      trainerId: "T-Id-0",
      workoutName: "push ups 2",
      workoutCategory: "Strength 2",
      workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
      workoutPicture: null,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: null,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
      equipmentRequired: false,
      equipmentList: null,
    },
  ]

  const trainer = {n : "null"};
  // const trainer = null;

  // dummy data

  const stepHandler = (trainerId, workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList) => {
    setTrainerId(trainerId)
    setWorkoutName(workoutName)
    setWorkoutCategory(workoutCategory)
    setWorkoutDescription(workoutDescription)
    setWorkoutPicture(workoutPicture)
    setWorkoutVideoLink(workoutVideoLink)
    setWorkoutDuration(workoutDuration)
    setWorkoutSteps(workoutSteps)
    setEquipmentRequired(equipmentRequired)
    setEquipmentList(equipmentList)
    setModal(2);
  }

  const updateProgress = () => {
      setIsDone(!isDone)
      setProgressModal(false);
  }


  return (
    <>
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100'>
      {/* left side */}
      <div className={`left bg-white h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <ClientSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={2} />
      </div>
      <div className="p-5 right overflow-auto overflow-x-hidden w-full h-[100vh] flex">
        {trainer ? (
            modal === 1 ? (
              <div className='w-full transition-all workouts-sect'>
                <h2 className='md:text-2xl font-semibold my-10 transition-all'>Workouts</h2>
                <div className="workouts transition-all">
                  <div className="today">
                    <h3 className='md:text-3xl font-bold'>Today's workouts</h3>
                    <div className="todays flex gap-3 items-center w-full overflow-auto">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination]}
                        className={`w-full h-[40vh] my-5 md:hidden block`}
                        >
                      {/* loop through workouts */}
                      {workouts.map(workout => (
                      <SwiperSlide onClick={() =>stepHandler(workout.trainerId, workout.workoutName, workout.workoutCategory, workout.workoutDescription, workout.workoutPicture, workout.workoutVideoLink, workout.workoutDuration, workout.workoutSteps, workout.equipmentRequired, workout.equipmentList)} >
                        <ClientWorkoutComponent workoutPicture={gymImg} workoutName={workout.workoutName} workoutDuration={workout.workoutDuration} workoutCategory={workout.workoutCategory} equipmentRequired={workout.equipmentRequired} />
                      </SwiperSlide>
                      ))}
                      </Swiper>
                    </div>
                  </div>
    
                  <div className="all w-full">
                    <h3 className='md:text-3xl font-bold'>All workouts</h3>
                    <div className="all md:flex hidden  gap-3 items-center w-full overflow-auto">
                      {/* for desktop */}
                      <Swiper
                          slidesPerView={3}
                          spaceBetween={30}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 6000,
                            disableOnInteraction: true,
                          }}
                          modules={[Autoplay, Pagination]}
                          className={`w-full min-h-[20vh] h-auto my-5`}
                          >
                        {/* loop through workouts */}
                        {workouts.map(workout => (
                      <SwiperSlide onClick={() =>stepHandler(workout.trainerId, workout.workoutName, workout.workoutCategory, workout.workoutDescription, workout.workoutPicture, workout.workoutVideoLink, workout.workoutDuration, workout.workoutSteps, workout.equipmentRequired, workout.equipmentList)} >
                        <div className='rounded-b overflow-hidden mb-10'>
                          <ClientWorkoutComponent workoutPicture={gymImg} workoutName={workout.workoutName} workoutDuration={workout.workoutDuration} workoutCategory={workout.workoutCategory} equipmentRequired={workout.equipmentRequired} />
                        </div> 
                        </SwiperSlide>
                        ))}
                      </Swiper>
                      </div>
                    <div className="all md:hidden flex gap-1 items-center w-full overflow-auto ">
                      {/* for small screen */}
                      <Swiper
                          slidesPerView={2}
                          spaceBetween={8}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 5500,
                            disableOnInteraction: true,
                          }}
                          modules={[Autoplay, Pagination]}
                          className={`w-full min-h-[20vh] h-auto my-5`}
                          >
                        {/* loop through workouts */}
                        {workouts.map(workout => (
                      <SwiperSlide onClick={() =>stepHandler(workout.trainerId, workout.workoutName, workout.workoutCategory, workout.workoutDescription, workout.workoutPicture, workout.workoutVideoLink, workout.workoutDuration, workout.workoutSteps, workout.equipmentRequired, workout.equipmentList)} >
                        <div className='mb-10 rounded-b overflow-hidden'>
                          <div 
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            className='p-4 img rounded-t mb-3 h-[250px] w-full'>
                              <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 rounded capitalize'>{workout.workoutName}</p>
                            </div>
                            <div className="details p-2 flex justify-start gap-5">
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><MdTimer/> {workout.workoutDuration}</p>
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><FaDumbbell/> {workout.workoutCategory}</p>
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500  rounded ${workout.equipmentRequired ? "bg-teal-500 text-white": "bg-gray-400 text-white" }`}>{workout.equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</p>
                            </div>
                        </div> 
                        </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
    
                  </div>
                </div>
              </div>
            ) : (
              <div className='w-full transition-all relative'>
                <h2 className='xl:text-2xl font-semibold my-10 text-gray-400 transition-all' onClick={() => setModal(1)}>Workouts / <span className='text-gray-700'> {workoutName} </span></h2>
                <div className="rounded flex justify-center w-full h-[80vh]">
                  <div className="bg-gray-50 rounded xl:p-5 xl:px-8 xl:w-[90%] w-full overflow-auto relative">
                    <div className="top mb-5 bg-inherit p-5 xl:relative bgw sticky top-0 z-50">
                      <div className="div flex justify-between">
                        <p className='font-semibold text-xl'>{workoutCategory}</p>
                        <p onClick={() => setModal(1)}><RxCrossCircled className='w-10 h-10 hover:text-red-600 transition-all cursor-pointer' /></p>
                      </div>
                      <p className='font-semibold xl:text-3xl text-2xl'>{workoutName}</p>
                    </div>
    
                    <div className="bottom border bg-white min-h-[55vh] md:max-h-[70vh] h-fit rounded overflow-hidden ">
                      <div 
                      style={{
                        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="btop h-[20vh] relative shadow-2xl mb-5"
                      >
                        <div className="txts absolute bottom-5 right-2 flex flex-wrap mx-2 md:m-0 gap-2">
                          <span className='bg-transparent border border-white p-2 px-5 text-white rounded flex gap-3 items-center'><MdTimer/>{workoutDuration}</span>
                          <span className='bg-transparent border border-white p-2 px-5 text-white rounded flex gap-3 items-center'><FaDumbbell/>{workoutCategory}</span>
                          <span className='bg-transparent border border-white p-2 px-5 text-white rounded'>{equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</span>
                        </div>
                      </div>
    
                      <div className="bbottom md:flex gap-3 p-4">
                        <div className="details w-full p-4">
                          <h4 className='md:text-2xl text-gray-400 mb-5'>Details</h4>
                          <div className="box my-4">
                            <h3 className='text-gray-700 capitalize font-semibold'>Workout name</h3>
                            <p className='text-gray-500'>{workoutName}</p>
                          </div>
                          <div className="box my-4">
                            <h3 className='text-gray-700 capitalize font-semibold'>Workout category</h3>
                            <p className='text-gray-500'>{workoutCategory}</p>
                          </div>
                          <div className="box my-4">
                            <h3 className='text-gray-700 capitalize font-semibold'>Workout duration</h3>
                            <p className='text-gray-500'>{workoutDuration}</p>
                          </div>
                          {equipmentRequired && 
                            <div className="box my-4">
                              <h3 className='text-gray-700 capitalize font-semibold'>Equipmelt list</h3>
                              <ul className='px-8 my-2'>
                                {equipmentList.map(equipment => (
                                  <li className='text-gray-500 list-disc'>{equipment}</li>
                                ))}
                              </ul>
                            </div>
                          }
                          <div className="box my-4 w-[90%]">
                            <h3 className='text-gray-700 capitalize font-semibold'>Workout description</h3>
                            <p className='text-gray-500 max-h-[10vh] overflow-auto'>{workoutDescription}</p>
                          </div>
                          <div className="box my-4">
                            <h3 className='text-gray-700 capitalize font-semibold flex items-center gap-2'>Workout video <FaVideo /> </h3>
                            <p className='text-gray-500'>{workoutVideoLink ? workoutVideoLink : "Not available."}</p>
                          </div>
                        </div>
                        <div className="steps w-full p-4 bg-gray-50 border rounded-md h-fit">
                          <h4 className='md:text-2xl text-gray-600 mb-5'>Steps</h4>
                          <div>
                            {workoutSteps}
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="update-progress flex justify-center items-center my-5">
                        <button onClick={() => setProgressModal(!progressModal)} className={`px-10 p-2 border-transparent text-white ${isDone ? "bg-green-500" : "bg-green-300"} rounded-full hover:bg-green-400 transition-all`}>{isDone ? (<p className='transition-all flex items-center gap-3'>Workout completed <FaCheck /></p>) : (<p className='transition-all flex gap-3 items-center'>Update progress</p>)} </button>
                      </div>
                  </div>
                  
                  {/* progress modal */}
                  <div className={`${!progressModal ? "hidden" : "block"} progress-modal absolute m-0 z-50 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center rounded-md sm:p-5 md:p-0`}>
                    <div className='bg-white xl:w-[50%] xl:h-[50%] w-[90%] overflow-auto rounded-lg p-5 xl:px-10'>
                      <div className="tt flex justify-between text-gray-400 gap-2 items-end">
                        <p className='xl:text-xl text-nowrap'>Add your progress</p>
                        <p className='text-nowrap'>As of today  <span className='text-gray-700 sm:font-semibold'>{today} </span> </p>
                      </div>
                      <div className="top sm:flex gap-5 mt-5">
                        <div className="weight-in-picture w-full space-y-2">
                          {/* <label htmlFor='weight-in-picture' className='h-full'>Add weight</label> */}
                          <label htmlFor='weight-in-picture' className='space-y-2'>
                            <p className='text-nowrap'>Add weight picture (from scale)</p>
                            <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                              <ImFilePicture className='w-[50%] h-[50%]' />
                            </div>
                          </label>
                          <input type="file" id='weight-in-picture' className='absolute z-0 top-0 opacity-0' />

                        </div>
                        <div className="progress-picture relative w-full sm:mt-0 mt-2">
                          <label htmlFor='picture' className='space-y-2'>
                            <p className='text-nowrap'>Add picture (mirror picture)</p>
                              <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                                <ImFilePicture className='w-[50%] h-[50%]' />
                              </div>
                          </label>
                          <input type="file" id='picture' className='absolute z-0 top-0 opacity-0' />
                        </div>
                      </div>
                      <div className="bottom my-5 md:space-y-5 space-y-2">
                        <div>
                          <label htmlFor='weight-in-number' className='text-gray-400 md:text-xl flex items-center gap-2'>Add weight in number</label>
                          <div className='border rounded flex justify-start w-full items-center xl:px-5'>
                            <input type="number" max={1000} id='weight-in-number' placeholder='0' className='w-fit bg-transparent border-none focus:ring-0 md:text-2xl text-xl text-center' /> 
                            <p className='md:text-2xl font-semibold italic text-gray-700'>Kg</p>
                          </div>
                        </div>
                        <div>
                          <p className='text-gray-400 md:text-xl flex items-center gap-2'>Additional Note <MdOutlineNoteAlt className='italic' /></p>
                          <textarea name="additionalNote" id="" className='resize-none focus:ring-0 focus:border-black transition-all my-2 w-full h-[5vh] border-gray-200 rounded'></textarea>
                        </div>
                        <div className="btns flex gap-3 justify-center items-center">
                          <div onClick={() => setProgressModal(false)} className="cancel-btn text-red-500 border border-red-500 px-5 p-1 cursor-pointer rounded-full bg-transparent transition-all hover:bg-red-500 hover:text-white flex gap-3 items-center">Cancel <RxCrossCircled /></div>
                          <div onClick={updateProgress} className="Done-btn text-green-500 border border-green-500 px-5 p-1 cursor-pointer rounded-full bg-transparent transition-all hover:bg-green-500 hover:text-white flex items-center gap-2">Mark Done <FaCheck /></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
        ) : (
          <div className='w-full h-full bg-gray-200 rounded text-center p-5 flex justify-center items-center md:mb-0 mb-5'>
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
    </>
  )
}

export default ClientWorkout