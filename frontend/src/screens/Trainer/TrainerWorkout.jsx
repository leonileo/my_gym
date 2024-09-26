import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import TrainerWorkoutComponent from '../../components/Trainer/TrainerWorkoutComponent';
import TrainerAddWorkoutComponent from '../../components/Trainer/TrainerAddWorkoutComponent';
// icons
import { TbFileSad } from "react-icons/tb";
import { Spinner } from 'flowbite-react';
import { IoRefresh, IoWarning } from 'react-icons/io5';
import { MdTimer } from 'react-icons/md';
import { FaCheck, FaCircleXmark, FaDumbbell, FaVideo } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
// quill
import MarkdownPreview from '@uiw/react-markdown-preview'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
// redux functions
import { useDeleteWorkoutMutation, useTgetWorkoutQuery, useTupdateWorkoutMutation, useUploadTrainerImageMutation } from '../../slices/trainerApiSlice';
import { toast } from 'react-toastify';
// dev
// import gymImg from '../../assets/images/gymImg.jpg'

const TrainerWorkout = () => {
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
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
  const [equipment, setEquipment] = useState('');
  const [equipmentOpt, setEquipmentOpt] = useState();
  const [previewImg, setPreviewImg] = useState();

  // using db
  // const removeItem = (itemId) => {
  //   // Filter out the item with the given ID
  //   const updatedItems = equipmentList.filter((item) => item.id !== itemId);
  //   setEquipmentList(updatedItems);
  // };

  // for dummy data
  const removeItem = (index) => {
    const updatedItems = [...equipmentList];
    updatedItems.splice(index, 1);
    setEquipmentList(updatedItems);
  };

  // quill
  const modules = {
    toolbar: [
      [{ header: [1,2,3,4,5,6, false] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'unordered' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video']
    ],
  }

  // dummy data
  //  const workouts = [ 
  //   {
  //     trainerId: "T-Id-0",
  //     workoutName: "push ups",
  //     workoutCategory: "Strength",
  //     workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
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
  //     workoutPicture: gymImg,
  //     workoutVideoLink: null,
  //     workoutDuration: "1:30 hr",
  //     workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
  //     equipmentRequired: false,
  //     equipmentList: null,
  //   },
  // ]
  // dummy data

  const { data: workout, isLoading, error, refetch } = useTgetWorkoutQuery();
  const [updateWorkout, {isLoading: updateLoader}] = useTupdateWorkoutMutation();
  const [deleteWorkout, {isLoading: deleteLoader}] = useDeleteWorkoutMutation();
  const workouts = isLoading ? [] : error ? [] : workout.myWorkouts;
  const [uploadTrainerImage] = useUploadTrainerImageMutation();

  const uploadFileHandler = async (e) =>{
      const formData = new FormData();
      formData.append('picture', e.target.files[0]);
      try {
          const res = await uploadTrainerImage(formData).unwrap();
          toast.success(res.message);
          setWorkoutPicture(res.picture);
      } catch (error) {
          toast.error(error?.data?.message || error?.error)
      }
  }

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await updateWorkout({
          workoutId,
          workoutName,
          workoutCategory,
          workoutDescription,
          workoutPicture,
          workoutVideoLink,
          workoutDuration,
          workoutSteps,
          equipmentRequired: equipmentOpt === 'true' ? true : false,
          equipmentList
        }).unwrap(); 
        toast.success('Workout updated');
        refetch();
        setModal(1)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      const updatedService = {
        workoutId,
        workoutName,
        workoutCategory,
        workoutDescription,
        workoutPicture,
        workoutVideoLink,
        workoutDuration,
        workoutSteps,
        equipmentRequired,
        equipmentList
    }

    const result = await updateWorkout(updatedService);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success('Workout updated');
        setWorkoutId('')
        setWorkoutName('')
        setWorkoutCategory('')
        setWorkoutDescription('')
        setWorkoutPicture('')
        setWorkoutVideoLink('')
        setWorkoutDuration('')
        setWorkoutSteps('')
        setEquipmentRequired('')
        setEquipmentList('')
        setEquipment('')
        setModal(1)
    }
  }

  const deleteHandler = async (workoutID) => {
    if (window.confirm(`Are you sure you want to delete ${workoutID}`)) {
      try {
        await deleteWorkout(workoutID);
        refetch()
        toast.success("Workout Deleted")
        setTimeout(() => {
          setModal(1)
        }, 1500);
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    } else {
      alert("Workout deletion canceled")
    }
  }

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={4} />
      </div>

      {/* right */}
      <div className="right overflow-auto relative overflow-x-hidden w-full h-[100vh] bg-inherit">
        <div className='md:px-5 my-5'>
        {modal === 1 ? (
          <div className="my-5 md:p-5 p-2 bg-inherit">
            <h2 className='md:text-3xl text-xl text-gray-600'>My workouts</h2>
            { workouts.length > 0 && <div className="top flex justify-end w-full pr-5">
              <button onClick={() => setModal(4)} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Add workout</button>
            </div>}
            <div className={`workouts my-5 w-full ${!isLoading && !error && workouts.length !== 0 && `grid xl:${workouts.length < 3 ? "grid-cols-2": "grid-cols-3"} sm:grid-cols-2`} gap-5`}>
              {/* loop through workouts */}
                {isLoading
                ? 
                <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
                  <div className='flex gap-2 items-center xl:text-[30px] transition-all'>
                    <p className='text-teal-500'>Loading...</p>
                    <Spinner className='xl:w-[30px] xl:h-[30px]' />
                  </div>
                </div>   
                : error ? 
                <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
                  <div className='flex gap-2 items-center xl:text-[30px] transition-all'>
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
                : (workouts.length > 0 ? workouts.map(workout => (
                  <>
                    <TrainerWorkoutComponent stepHandler={stepHandler} workoutId={workout._id} workoutName={workout.workoutName} workoutCategory={workout.workoutCategory} workoutDescription={workout.workoutDescription} workoutPicture={workout.workoutPicture} workoutVideoLink={workout.workoutVideoLink} workoutDuration={workout.workoutDuration} workoutSteps={workout.workoutSteps} equipmentRequired={workout.equipmentRequired} equipmentList={workout.equipmentList} />
                  </>
                  ))
                  : <div className='flex justify-center items-center w-full h-[25vh]'>
                      <div className=' xl:text-4xl text-2xl'>
                        <p className='flex items-center gap-3 text-teal-500'>There are no workout data available <TbFileSad /></p>
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => setModal(4)} className='my-3 text-2xl rounded text-teal-500 hover:underline transition-all'>Create workout now</button>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        ) : modal === 2 || modal === 5 || modal === 6 ? (
          // view modal
          <div className='w-full transition-all relative'>
            <h2 className='md:text-2xl font-semibold my-10 text-gray-400 transition-all p-5' onClick={() => setModal(1)}>My workouts / <span className='text-gray-700'> {workoutName} </span></h2>
            <div className="rounded flex justify-center w-full h-[80vh]">
              <div className="bg-gray-50 rounded md:p-5 md:px-8 md:w-[90%] w-full overflow-auto relative">
                <div className="top mb-5 bg-inherit p-5 md:relative bgw sticky top-0 z-50">
                  <div className="div flex justify-between">
                    <p className='font-semibold text-xl'>{workoutCategory}</p>
                    <p onClick={() => setModal(1)}><RxCrossCircled className='w-10 h-10 hover:text-red-600 transition-all cursor-pointer' /></p>
                  </div>
                  <p className='font-semibold text-3xl'>{workoutName}</p>
                </div>

                <div className="bottom border bg-white min-h-[55vh]  h-fit rounded ">
                  <div className="btop relative shadow-2xl mb-2 h-full"
                    style={{
                    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${workoutPicture})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                  <div className=' h-full bg-[rgba(255,255,255,0.2)] group'
                    style={{
                      backdropFilter: 'blur(5px)'
                    }}>
                    <div className='flex justify-center items-center w-full h-[15vh] py-3'>
                        <img onClick={() => { setPreviewImg(workoutPicture); setModal(6)} }  src={workoutPicture} alt="workout" className='cursor-pointer h-full rounded group-hover:animate-pulse' />
                    </div>

                    <div className="bbottom my-5 xl:my-0 xl:flex grid relative justify-between h-full p-2">
                      <div className="btns flex items-end xl:h-full p-5">
                        <div className='flex gap-2 items-center'>
                          <button onClick={() => setModal(3)} className='p-1 text-white hover:bg-transparent hover:border-blue-500 transition-all border border-transparent bg-blue-500 rounded px-5'>Edit</button>
                          <button onClick={() => setModal(5)} className='p-1 text-white hover:bg-transparent hover:border-red-500  transition-all border border-transparent bg-red-500 rounded px-5'>Delete</button>
                        </div>
                      </div>
                      
                      <div className="txts xl:absolute bottom-5 right-2 flex flex-wrap mx-2 md:m-0 gap-2">
                        <span className='bg-transparent border border-white p-2 px-5 text-white rounded flex gap-3 items-center'><MdTimer/>{workoutDuration}</span>
                        <span className='bg-transparent border border-white p-2 px-5 text-white rounded flex gap-3 items-center'><FaDumbbell/>{workoutCategory}</span>
                        <span className='bg-transparent border border-white p-2 px-5 text-white rounded'>{equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</span>
                      </div>
                    </div>
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
                          <iframe src={`https://www.youtube.com/embed/${workoutVideoLink.split('/')[workoutVideoLink.split('/').length - 1]}`}  title={`${workoutName}`} frameborder="0"  allow="accelerometer;  autoplay;  clipboard-write;  encrypted-media;  gyroscope;  picture-in-picture;  web-share"  referrerpolicy="strict-origin-when-cross-origin"  allowfullscreen
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
              </div>
              
            </div>
          </div>
        ) : modal === 3 ? (
          // edit modal
          <div className='w-full transition-all relative'>
            <h2 className='md:text-2xl font-semibold my-10 text-gray-400 transition-all p-5' onClick={() => setModal(1)}>My workouts / <span className='text-gray-700'> {workoutName} </span></h2>
            <div className="rounded flex justify-center w-full h-[80vh]">
              <div className="bg-gray-50 rounded md:p-5 md:px-8 md:w-[90%] w-full overflow-auto relative">
                <div className="top mb-5 bg-inherit p-5 md:relative bgw sticky top-0 z-50">
                  <div className="div flex justify-between">
                    <p className='font-semibold text-xl'>{workoutCategory}</p>
                    <p onClick={() => setModal(1)}><RxCrossCircled className='w-10 h-10 hover:text-red-600 transition-all cursor-pointer' /></p>
                  </div>
                  <p className='font-semibold text-3xl'>{workoutName}</p>
                </div>

                <form onSubmit={handleUpdate} className="bottom border bg-white min-h-[55vh] h-fit rounded overflow-auto ">

                  <div 
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${workoutPicture})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="btop min-h-[20vh] relative shadow-2xl mb-5"
                  >
                  <div className='my-2 xl:p-5 p-2 h-full bg-[rgba(255,255,255,0.2)]'
                  style={{
                      backdropFilter: 'blur(10px)'
                  }}
                  >
                    <div className='flex justify-center items-center w-full h-[20vh]'>
                        <img src={workoutPicture} alt="workout" className='h-[80%] rounded' />
                    </div>
                    <label htmlFor='add-workout-picture' className='bg-white xl:p-5 p-2 rounded'>Change workout picture</label>
                    <input onChange={(e) => {uploadFileHandler(e)}} className='absolute -z-10 opacity-0' type="file" name="add-workout-picture" id="add-workout-picture" />
                  </div>

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
                        <input placeholder='Enter workout name here' type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                      </div>
                      <div className="box my-4">
                        <h3 className='text-gray-700 capitalize font-semibold'>Workout category</h3>
                        <input placeholder='Enter workout category here' type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutCategory} onChange={(e) => setWorkoutCategory(e.target.value)} />
                      </div>
                      <div className="box my-4">
                        <h3 className='text-gray-700 capitalize font-semibold'>Workout duration</h3>
                        <input placeholder='Enter workout duration here' type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutDuration} onChange={(e) => setWorkoutDuration(e.target.value)} />
                      </div>
                      <div className="text-gray-500 w-full block font-semibold add-equipment-opt">
                        <label className='block' htmlFor="add-equipment-opt">Add equipment option</label>
                        <select required value={equipmentOpt} onChange={(e) => setEquipmentOpt(e.target.value)} className='border rounded w-full border-gray-400' name="add-equipment-opt" id="add-equipment-opt" >
                            <option>Select equipment option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                      </div>
                      {equipmentRequired ? 
                        <div className="box my-4">
                          <h3 className='text-gray-700 capitalize font-semibold'>Equipmelt list</h3>
                          <ul className='px-8 my-2'>
                            <div className="flex items-center gap-4">
                              <input placeholder='Enter equipment here' onChange={(e) => setEquipment(e.target.value)} value={equipment} type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded'/>
                              <p className='cursor-pointer' onClick={() => {setEquipmentList([...equipmentList, equipment]); setEquipment('')}}>Add</p>
                            </div>
                            {/* for prod */}
                            {equipmentList.map((equipment) => (
                              <li className='text-gray-500 list-disc'>
                                <div className=' flex items-center gap-5'>
                                  {equipment}
                                  <div className=' rounded-full w-5 h-5 flex items-center justify-center'>
                                    <p
                                     onClick={(e) => removeItem(e, equipment.id)}
                                    className='hover:text-red-500 transition-all'><RxCrossCircled/></p>
                                  </div>
                                </div>
                              </li>
                            ))}
{/* dev */}
                            {/* for dev */}
                            {/* {equipmentList.map((equipment, index) => (
                                <li className='text-gray-500 list-disc'>
                                  <div className=' flex items-center gap-5'>
                                    {equipment}
                                    <div className=' rounded-full w-5 h-5 flex items-center justify-center'>
                                      <button type='button'
                                      onClick={() => removeItem(index)}
                                      className='hover:text-red-500 transition-all'><RxCrossCircled/></button>
                                    </div>
                                  </div>
                                </li>
                              )) 
                              } */}
{/* dev */}
                          </ul>
                        </div>
                        : <div className="box my-4">
                              <h3 className='text-gray-700 capitalize font-semibold'>Equipmelt list</h3>
                              <ul className='px-8 my-2'>
                                <div className="flex gap-4">
                                  <input placeholder='Enter equipment here' onChange={(e) => setEquipment(e.target.value)} value={equipment} type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded'/>
                                  <button type='button' onClick={() => {setEquipmentList(equipmentList !== null ? [...equipmentList, equipment] : [equipment]); setEquipment('')}}>Add</button>
                                </div>

                                {equipmentList !== null &&
                                equipmentList.map((equipment, index) => (
                                <li className='text-gray-500 list-disc'>
                                  <div className=' flex items-center gap-5'>
                                    {equipment}
                                    <div className=' rounded-full w-5 h-5 flex items-center justify-center'>
                                      <button type='button'
                                      onClick={() => removeItem(index)}
                                      className='hover:text-red-500 transition-all'><RxCrossCircled/></button>
                                    </div>
                                  </div>
                                </li>
                              )) }
                              </ul>
                          </div>
                      }
                      <div className="box my-4 w-[90%]">
                        <h3 className='text-gray-700 capitalize font-semibold'>Workout description</h3>
                        <input placeholder='Enter workout description here' type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutDescription} onChange={(e) => setWorkoutDescription(e.target.value)} />
                      </div><div className="box my-4 w-[90%]">
                        <h3 className='text-gray-700 capitalize font-semibold'>Workout description</h3>
                        <input placeholder='Enter workout description here' type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutDescription} onChange={(e) => setWorkoutDescription(e.target.value)} />
                      </div>
                      <div className="box my-4">
                        <h3 className='text-gray-700 capitalize font-semibold flex items-center gap-2'>Workout video <FaVideo /> </h3>
                        <input type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutVideoLink} placeholder='Enter video link here' onChange={(e) => setWorkoutVideoLink(e.target.value)} />
                      </div>
                    </div>
                    <div className="steps w-full p-4 bg-gray-50 border rounded-md h-fit">
                      <h4 className='md:text-2xl text-gray-600 mb-5'>Steps</h4>
                      <div className='w-full p-5'>
                        <ReactQuill value={workoutSteps} modules={modules} onChange={setWorkoutSteps} />
                        <div className=' mt-5'>
                          <MarkdownPreview source={workoutSteps}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit flex justify-center items-center pb-5">
                    <button type='submit' className='p-2 px-5 rounded border border-teal-500 hover:bg-teal-500 hover:text-white transition-all '>
                      Update workout {updateLoader && <Spinner />}
                    </button>
                  </div>
                </form>

              </div>
              
            </div>
          </div>
        ) : modal === 4 && <div className='p-5 h-full'> 
            {/* Create modal */}
              <TrainerAddWorkoutComponent setModal={setModal} />
          </div>}
        </div>
        
        {/* delete modal */}
        { modal === 5 &&  (
            <div className='bg-[rgba(0,0,0,0.5)] z-50 w-full p-2 top-0 left-0 absolute h-[100vh] flex justify-center items-center'>
                <div className="bg-white rounded border sm:w-[50%] w-[90%] p-2 px-5 h-[25vh] flex items-center justify-center">
                  <div>
                    <p className='text-center text-xl flex gap-3 items-center'><IoWarning /> You are going to delete {workoutName}.</p>
                    <p className='text-center'>Do you want to proceede ?</p>
                    <div className="flex gap-2 justify-center my-5 items-center">
                      <button onClick={() => { deleteHandler(workoutId) }} className='border p-2 rounded bg-white border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white'>
                        Delete {deleteLoader && <Spinner /> }
                      </button>
                      <button onClick={() => setModal(2)} className='border p-2 rounded bg-white border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white'>Cancle</button>
                    </div>
                  </div>
                </div>
            </div>
        )}

        {/* preview modal */}
        { modal === 6 && (
          <div className='w-full h-full absolute flex items-center justify-center bg-[rgba(10,10,10,0.9)] top-0 left-0 z-50 text-white p-5 transition-all'>
            <div className='h-[80%] w-[80%] transition-all '>
              <div className="flex justify-end w-full bg-teal-400 rounded p-2 items-center gap-2 px-4 transition-all">
                <p className='w-full text-center'>Image viewer</p>
                <div onClick={() => {setModal(2); setPreviewImg('')} } className=" cursor-pointer flex items-center gap-2">
                  <button>Close</button>
                  <FaCircleXmark />
                </div>
              </div>
              <div className='h-full p-2 transition-all overflow-auto flex justify-center items-start w-full'>
                <img src={previewImg} alt="" className='' />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default TrainerWorkout