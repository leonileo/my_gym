import React, { useEffect, useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import ClientWorkoutComponent from '../../components/Client/ClientWorkoutComponent';

import sadFace from '../../assets/sadface.gif'
import gymImg from '../../assets/images/gymImg.jpg'
import { MdOutlineNoteAlt, MdTimer } from 'react-icons/md';
import { FaCheck, FaCircleXmark, FaDumbbell, FaVideo } from 'react-icons/fa6';
import { RxCrossCircled } from "react-icons/rx";
import { ImFilePicture } from "react-icons/im";
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';
import { PiImageBroken } from 'react-icons/pi';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import MarkdownPreview from '@uiw/react-markdown-preview'

import { useGetProgressMutation, useGetWorkoutQuery, useUpdateWorkoutMutation, useUploadClientPictureMutation, useUploadWeightPictureMutation } from '../../slices/clientApiSlice';

const ClientWorkout = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [isDone, setIsDone] = useState();
  const [progressModal, setProgressModal] = useState(false);
  const [progress, setProgress] = useState();
  const [clientPicture, setClientPicture] = useState(0)
  const [weightInPicture, setWeightInPicture] = useState(0)
  const [weightInNumber, setWeightInNumber] = useState(0)
  const [note, setNote] = useState('')

  // specific workout states
  const [workoutId, setWorkoutId] = useState('');
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

  const {data: workoutData, isLoading, error, refetch} = useGetWorkoutQuery();

  // dummy data
  // const workouts = [ 
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1 hr",
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
  //     equipmentRequired: true,
  //     equipmentList: ['dumbell', 'treadmill'],
  //   },
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups 2",
  //     workoutCategory: "Strength 2",
  //     workoutDescription: "Do 20 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: null,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: null,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
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
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  // ]

  // const trainer = {n : "null"};
  // const trainer = null;
  // dummy data

  const stepHandler = (workoutId, workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList) => {
    setWorkoutId(workoutId)
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

  const [updateWorkout] = useUpdateWorkoutMutation();
  const [uploadWeightPictureImage] = useUploadWeightPictureMutation();
  const [uploadClientPictureImage] = useUploadClientPictureMutation();

  const uploadWeightHandler = async (e) =>{
    const formData = new FormData();
    formData.append('weight-picture', e.target.files[0]);
    try {
        const res = await uploadWeightPictureImage(formData).unwrap();
        toast.success(res.message);
        setWeightInPicture(res.picture);
    } catch (error) {
        toast.error(error?.data?.message || error?.error)
    }
  }

  const uploadClientHandler = async (e) =>{
    const formData = new FormData();
    formData.append('client-picture', e.target.files[0]);
    try {
        const res = await uploadClientPictureImage(formData).unwrap();
        toast.success(res.message);
        setClientPicture(res.picture);
    } catch (error) {
        toast.error(error?.data?.message || error?.error)
    }
  }

  const updateProgress = async (e) => {
      e.preventDefault();

      try{
        const res = updateWorkout({workoutId, 
          weightInPicture: weightInPicture === "" ? progress.weightInPicture : weightInPicture, 
          clientPicture: clientPicture === "" ? progress.clientPicture : clientPicture, 
          weightInNumber: weightInNumber === 0 ? progress.weightInNumber : `${weightInNumber} Killo`, 
          notes: note === "" ? progress.notes : note 
        }).unwrap()
        setProgress(res)
        toast.success("Progress updated successfuly.")
        refetch();
        setProgressModal(false);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }

  return (
    <>
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100'>
      {/* left side */}
      <div className={`left bg-white h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <ClientSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={2} />
      </div>
      <div className="p-5 right relative overflow-auto overflow-x-hidden w-full h-[100vh] flex">
        {isLoading ? 
          <div className='flex justify-center items-center h-[40vh] w-full'>
            <div>
              <div className="flex justify-center w-full">
                <Spinner />
              </div>
              <p>Loading workout data...</p>
            </div>
          </div>
            : error ? 
            <div className='flex justify-center items-center w-full h-[40vh] transition-all'>
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
          : workoutData.trainer && workoutData.workouts.length > 0 ? (
            modal === 1 ? (
              <div className='w-full transition-all workouts-sect'>
                <h2 className='md:text-2xl font-semibold my-10 transition-all'>Workouts</h2>
                <div className="workouts transition-all">
                  <div className="today">
                    <h3 className='md:text-3xl font-bold'>Today's workouts {isLoading ? '' : error ? '': <>({workoutData.todaysWorkouts.length})</>}</h3>
                    <div className="todays flex gap-3 items-center w-full overflow-auto">
                      {workoutData.todaysWorkouts.length > 0
                      ? <Swiper
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
                      {workoutData.todaysWorkouts.map(workout => (
                      <SwiperSlide key={workout._id} onClick={() => stepHandler(workout.workout._id, workout.workout.workoutName, workout.workout.workoutCategory, workout.workout.workoutDescription, workout.workout.workoutPicture, workout.workout.workoutVideoLink, workout.workout.workoutDuration, workout.workout.workoutSteps, workout.workout.equipmentRequired, workout.workout.equipmentList)} >
                        <ClientWorkoutComponent workoutPicture={workout.workout.workoutPicture ? workout.workout.workoutPicture : gymImg} workoutName={workout.workout.workoutName} workoutDuration={workout.workout.workoutDuration} workoutCategory={workout.workout.workoutCategory} equipmentRequired={workout.workout.equipmentRequired} />
                      </SwiperSlide>
                      ))}
                      </Swiper>
                      :           
                      <div className='p-5 w-full h-full'>
                        <div className='w-full h-[40vh] bg-gray-200 rounded text-center p-5 flex justify-center items-center md:mb-0 mb-5'>
                          <div>
                            <div className="flex justify-center">
                              <img src={sadFace} alt='' className='w-28 h-28' />

                            </div>
                            <p>You have no workouts for today.</p>
                          </div>
                        </div>
                      </div>
                      }
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
                        {workoutData.workouts.map(workout => (
                          <SwiperSlide key={workout._id} onClick={() => stepHandler(workout.workout._id, workout.workout.workoutName, workout.workout.workoutCategory, workout.workout.workoutDescription, workout.workout.workoutPicture, workout.workout.workoutVideoLink, workout.workout.workoutDuration, workout.workout.workoutSteps, workout.workout.equipmentRequired, workout.workout.equipmentList)} >
                            <div className='rounded-b overflow-hidden mb-10'>
                              <ClientWorkoutComponent workoutPicture={workout.workout.workoutPicture ? workout.workout.workoutPicture : gymImg} workoutName={workout.workout.workoutName} workoutDuration={workout.workout.workoutDuration} workoutCategory={workout.workout.workoutCategory} equipmentRequired={workout.workout.equipmentRequired} />
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
                        {workoutData.workouts.map(workout => (
                      <SwiperSlide key={workout._id} onClick={() =>stepHandler(workout.workout._id, workout.workout.workoutName, workout.workout.workoutCategory, workout.workout.workoutDescription, workout.workout.workoutPicture, workout.workout.workoutVideoLink, workout.workout.workoutDuration, workout.workout.workoutSteps, workout.workout.equipmentRequired, workout.workout.equipmentList)} >
                        <div className='mb-10 rounded-b overflow-hidden'>
                          <div 
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${workout.workout.workoutPicture ? workout.workout.workoutPicture : gymImg})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            className='p-4 img rounded-t mb-3 h-[250px] w-full'>
                              <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 rounded capitalize'>{workout.workout.workoutName}</p>
                            </div>
                            <div className="details p-2 flex justify-start gap-5">
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><MdTimer/> {workout.workout.workoutDuration}</p>
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><FaDumbbell/> {workout.workout.workoutCategory}</p>
                              <p className={`p-2 px-3 text-nowrap text-sm text-gray-500  rounded ${workout.workout.equipmentRequired ? "bg-teal-500 text-white": "bg-gray-400 text-white" }`}>{workout.workout.equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</p>
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
              <div className='w-full transition-all'>
                <h2 className='xl:text-2xl font-semibold my-10 text-gray-400 transition-all' onClick={() => setModal(1)}>Workouts / <span className='text-gray-700'> {workoutName} </span></h2>
                <div className="rounded flex justify-center w-full h-[80vh]">
                  
                  <WorkoutModal setProgress={setProgress} setIsDone={setIsDone} isDone={isDone} workoutId={workoutId} setWorkoutId={setWorkoutId} setModal={setModal} workoutCategory={workoutCategory} workoutName={workoutName} workoutPicture={workoutPicture} workoutDuration={workoutDuration} equipmentRequired={equipmentRequired} equipmentList={equipmentList} workoutDescription={workoutDescription} workoutVideoLink={workoutVideoLink} workoutSteps={workoutSteps} setProgressModal={setProgressModal} progressModal={progressModal} />
                  
                  {/* progress modal */}
                  {progressModal &&
                    <ProgressModal progress={progress} isDone={isDone} setProgressModal={setProgressModal} updateProgress={updateProgress} today={today} weightInPicture={weightInPicture} clientPicture={clientPicture} uploadWeightHandler={uploadWeightHandler} uploadClientHandler={uploadClientHandler} setWeightInNumber={setWeightInNumber} weightInNumber={weightInNumber} setNote={setNote}/>
                  }
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

const WorkoutModal = ({ setProgress, setIsDone, workoutId, setWorkoutId, setModal, workoutCategory, workoutName, workoutPicture, workoutDuration, equipmentRequired, equipmentList, workoutDescription, workoutVideoLink, workoutSteps, setProgressModal, progressModal, isDone}) => {
  const [getProgress, {isLoading, error}] = useGetProgressMutation();

  const getMyProgress = async () => {
    try {
      const res = await getProgress({workoutId}).unwrap()
      setIsDone(res.isWorkoutDone ? true : false)
      setProgress(res)

    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    getMyProgress()
  }, [])

  return (
    <div className="bg-gray-50 rounded xl:p-5 xl:px-8 xl:w-[90%] w-full overflow-auto relative">
      <div className="top mb-5 bg-inherit p-5 xl:relative bgw sticky top-0 z-40">
        <div className="div flex justify-between">
          <p className='font-semibold text-xl'>{workoutCategory}</p>
          <p onClick={() => {
            setProgress('')
            setWorkoutId('')
            setModal(1)
          }}><RxCrossCircled className='w-10 h-10 hover:text-red-600 transition-all cursor-pointer' /></p>
        </div>
        <p className='font-semibold xl:text-3xl text-2xl'>{workoutName}</p>
      </div>

      <div className="bottom border bg-white min-h-[55vh] h-fit rounded overflow-hidden ">
        <div 
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${workoutPicture ? workoutPicture : gymImg})`,
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
              <div className='text-gray-500'>{workoutVideoLink ? (
              <iframe src={`https://www.youtube.com/embed/${workoutVideoLink.split('/')[workoutVideoLink.split('/').length - 1]}`}  title={`${workoutName}`} frameBorder="0"  allow="accelerometer;  autoplay;  clipboard-write;  encrypted-media;  gyroscope;  picture-in-picture;  web-share"  referrerPolicy="strict-origin-when-cross-origin"  allowFullScreen
              className='w-[50%] h-[20vh] rounded lg:min-w-[550px] min-w-fit' ></iframe>
            ) : "Not available."}</div>
            </div>
          </div>
          <div className="steps w-full p-4 bg-gray-50 border rounded-md h-fit">
            <h4 className='md:text-2xl text-gray-600 mb-5'>Steps</h4>
            <div>
              <MarkdownPreview 
              source={workoutSteps}
              />
            </div>
          </div>
        </div>
      </div>
        <div className="update-progress flex justify-center items-center my-5">
            {isLoading ? 
              <button className={`px-10 p-2 border-transparent text-white bg-blue-400 rounded-full transition-all`}>
                <p>Loading progress data...</p>
              </button>
              : error ? 
              <button className={`px-10 p-2 border-transparent text-white bg-red-500 rounded-full transition-all`}>
                <p>Error occured</p>
              </button>
            : 
              isDone ? 
                  <button onClick={() => setProgressModal(!progressModal)} className={`px-10 p-2 border-transparent text-white bg-green-500 rounded-full hover:bg-green-400 transition-all`}>
                    <p className='transition-all flex items-center gap-3'>Workout completed <FaCheck /></p>
                  </button>
                 : (
                   <button onClick={() => setProgressModal(!progressModal)} className={`px-10 p-2 border-transparent text-white bg-green-300 rounded-full hover:bg-green-400 transition-all`}>
                    <p className='transition-all flex gap-3 items-center'>Update progress</p>
                  </button>
                )
              
            }
        </div>
    </div>
  )
}


const ProgressModal = ({ weightInPicture, clientPicture, progress, isDone, updateProgress, today, uploadWeightHandler, uploadClientHandler, setWeightInNumber, setNote, setProgressModal }) => {
  
  return (
    <div className={`progress-modal absolute m-0 z-40 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center sm:p-5 md:p-0`}>

      {isDone ?
      <div className='bg-white relative xl:w-[50%] xl:h-[60%] w-[90%] overflow-auto rounded-lg p-5 xl:px-10'>
        <div className="flex justify-end p-5 right-0 top-0 absolute">
          <button onClick={() => setProgressModal(false)} ><FaCircleXmark className='sm:text-2xl'/></button>
        </div>

        <div className='mt-8'>
          <div className="tt flex justify-between text-gray-400 gap-2 items-end">
            <p className='xl:text-xl text-nowrap'>Progress data from - <span className='text-gray-700 sm:font-semibold'>{new Date(progress.progressDate.substring(0, 10)).toDateString() } </span></p>
          </div>
          <div className="top sm:flex gap-5 mt-5">
            <div className="weight-in-picture w-full space-y-2">
              <label htmlFor='weight-in-picture' className='space-y-2'>
                <p className='text-nowrap'>Weight picture (from scale)</p>
                <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                  <img src={progress.weightInPicture} alt="" className="h-full"/>
                </div>
              </label>
            </div>
            <div className="progress-picture relative w-full sm:mt-0 mt-2">
              <label htmlFor='picture' className='space-y-2'>
                <p className='text-nowrap'>Body picture (from mirror)</p>
                  <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                    <img src={progress.clientPicture} alt="" className="h-full" />
                  </div>
              </label>
            </div>
          </div>
          <div className="bottom my-5 md:space-y-5 space-y-2">
            <div>
              <p htmlFor='weight-in-number' className='text-gray-400 md:text-xl flex items-center gap-2'>Weight</p>
              <div className='border rounded bg-gray-50 flex justify-start w-fit items-center my-2'>
                <p className='md:text-2xl font-semibold italic text-gray-700 px-5 p-2'>{progress.weightInNumber}</p>
              </div>
            </div>
            {/* <div>
              <p className='text-gray-400 md:text-xl flex items-center gap-2'>Additional Note <MdOutlineNoteAlt className='italic' /></p>
              <textarea onChange={(e) => setNote(e.target.value)} name="additionalNote" id="" className='resize-none focus:ring-0 focus:border-black transition-all my-2 w-full h-[5vh] border-gray-200 rounded'></textarea>
            </div> */}
          </div>
        </div>

      </div>
      :
      <form onSubmit={updateProgress} className='bg-white xl:w-[50%] xl:h-[60%] w-[90%] overflow-auto rounded-lg p-5 xl:px-10'>        
        <div className="tt flex justify-between text-gray-400 gap-2 items-end">
          <p className='xl:text-xl text-nowrap'>Add your progress</p>
          <p className='text-nowrap'>As of today  <span className='text-gray-700 sm:font-semibold'>{today} </span> </p>
        </div>
        <div className="top sm:flex gap-5 mt-5">
          <div className="weight-in-picture w-full space-y-2">
            <label htmlFor='weight-in-picture' className='space-y-2'>
              <p className='text-nowrap'>Add weight picture (from scale)</p>
              <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                {weightInPicture ? 
                <img src={weightInPicture} alt="" className='h-full'/>
                :
                <ImFilePicture className='w-[50%] h-[50%] cursor-pointer' />
                }
              </div>
            </label>
            <input onChange={(e) => uploadWeightHandler(e)} type="file" id='weight-in-picture' className='absolute -z-10 top-0 opacity-0' />

          </div>
          <div className="progress-picture relative w-full sm:mt-0 mt-2">
            <label htmlFor='picture' className='space-y-2'>
              <p className='text-nowrap'>Add picture (mirror picture)</p>
                <div className='p-5 w-full h-[25vh] bg-gray-300 rounded flex justify-center items-center'>
                  {clientPicture ? 
                  <img src={clientPicture} alt="" className='h-full'/>
                  :
                  <ImFilePicture className='w-[50%] h-[50%] cursor-pointer' />
                  }
                </div>
            </label>
            <input onChange={(e) => uploadClientHandler(e)}  type="file" id='picture' className='absolute -z-10 top-0 opacity-0' />
          </div>
        </div>
        <div className="bottom my-5 md:space-y-5 space-y-2">
          <div>
            <label htmlFor='weight-in-number' className='text-gray-400 md:text-xl flex items-center gap-2'>Add weight in number</label>
            <div className='border rounded flex justify-start w-fit items-center px-5'>
              <input onChange={(e) => setWeightInNumber(e.target.value)} type="number" max={1000} id='weight-in-number' placeholder='0' className='w-fit bg-transparent border-none focus:ring-0 md:text-2xl text-xl text-center' /> 
              <p className='md:text-2xl font-semibold italic text-gray-700'>Kg</p>
            </div>
          </div>
          <div>
            <p className='text-gray-400 md:text-xl flex items-center gap-2'>Additional Note <MdOutlineNoteAlt className='italic' /></p>
            <textarea onChange={(e) => setNote(e.target.value)} name="additionalNote" id="" className='resize-none focus:ring-0 focus:border-black transition-all my-2 w-full h-[5vh] border-gray-200 rounded'></textarea>
          </div>
          <div className="btns flex gap-3 justify-center items-center">
            <div onClick={() => setProgressModal(false)} className="cancel-btn text-red-500 border border-red-500 px-5 p-1 cursor-pointer rounded-full bg-transparent transition-all hover:bg-red-500 hover:text-white flex gap-3 items-center">Cancel <RxCrossCircled /></div>
            <button type='submit' className="Done-btn text-green-500 border border-green-500 px-5 p-1 cursor-pointer rounded-full bg-transparent transition-all hover:bg-green-500 hover:text-white flex items-center gap-2">
              Mark Done <FaCheck />
            </button>
          </div>
        </div>
      </form>
      }
    </div>

  )
}

export default ClientWorkout