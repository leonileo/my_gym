import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { MdTimer } from 'react-icons/md';
import { FaCheck, FaDumbbell, FaVideo } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
// quill
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import MarkdownPreview from '@uiw/react-markdown-preview'
import TrainerWorkoutComponent from '../../components/Trainer/TrainerWorkoutComponent';
import TrainerAddWorkoutComponent from '../../components/Trainer/TrainerAddWorkoutComponent';


const TrainerWorkout = () => {
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
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

  const [equipment, setEquipment] = useState('');
  
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
  const [value, setValue] = useState('');
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
   const workouts = [ 
    {
      trainerId: "T-Id-0",
      workoutName: "push ups",
      workoutCategory: "Strength",
      workoutDescription: "Do 10 pushups in a row for 3 - 5 rep.",
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
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
      workoutPicture: gymImg,
      workoutVideoLink: null,
      workoutDuration: "1:30 hr",
      workoutSteps: <div> 1. warm up <br/> <p>Do a 5 minute warm up.</p> <br/> 2. Do your push ups <br/> <p>Do 5 reps of push ups per set. (x5)</p> </div>,
      equipmentRequired: false,
      equipmentList: null,
    },
  ]
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

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={4} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] bg-inherit">
        <div className='md:px-5 my-5'>
        {modal === 1 ? (
          <div className="my-5 md:p-5 p-2 bg-inherit">
            <h2 className='md:text-3xl text-xl text-gray-600'>My Workouts</h2>
            <div className="top flex justify-end w-full pr-5">
              <button onClick={() => setModal(4)} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Add workout</button>
            </div>
            <div className="workouts my-5 grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
              {/* loop through workouts */}
                {workouts.map(workout => (
                  <TrainerWorkoutComponent stepHandler={stepHandler} trainerId={workout.trainerId} workoutName={workout.workoutName} workoutCategory={workout.workoutCategory} workoutDescription={workout.workoutDescription} workoutPicture={workout.workoutPicture} workoutVideoLink={workout.workoutVideoLink} workoutDuration={workout.workoutDuration} workoutSteps={workout.workoutSteps} equipmentRequired={workout.equipmentRequired} equipmentList={workout.equipmentList} 
                  />
                ))}
            </div>
          </div>
        ) : modal === 2 ? (
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

                <div className="bottom border bg-white min-h-[55vh] overflow-auto md:max-h-[70vh] h-fit rounded ">
                  <div 
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="btop min-h-[20vh] lg:h-[20vh] relative shadow-2xl mb-5"
                  >
                    <div className="btns flex items-end h-full p-5">
                      <div className='flex gap-2 items-center'>
                        <button className='text-white hover:bg-transparent hover:border-blue-500 transition-all border border-transparent bg-blue-500 rounded px-5' onClick={() => setModal(3)}>Edit</button>
                        <button className='text-white hover:bg-transparent hover:border-red-500  transition-all border border-transparent bg-red-500 rounded px-5'>Delete</button>
                      </div>
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
              </div>
              
            </div>
          </div>
        ) : modal === 3 ? (
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

                <form onSubmit={handleSubmit} className="bottom border bg-white min-h-[55vh] md:max-h-[70vh] h-fit rounded overflow-auto ">

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
                      {equipmentRequired ? 
                        <div className="box my-4">
                          <h3 className='text-gray-700 capitalize font-semibold'>Equipmelt list</h3>
                          <ul className='px-8 my-2'>
                            <div className="flex gap-4">
                              <input placeholder='Enter equipment here' onChange={(e) => setEquipment(e.target.value)} value={equipment} type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded'/>
                              <button onClick={() => {setEquipmentList([...equipmentList, equipment]); setEquipment('')}}>Add</button>
                            </div>
                            {/* for prod */}
                            {/* {equipmentList.map((equipment) => (
                              <li className='text-gray-500 list-disc'>
                                <div className=' flex items-center gap-5'>
                                  {equipment}
                                  <div className=' rounded-full w-5 h-5 flex items-center justify-center'>
                                    <button type='button'
                                     onClick={() => removeItem(equipment.id)}
                                    className='hover:text-red-500 transition-all'><RxCrossCircled/></button>
                                  </div>
                                </div>
                              </li>
                            ))} */}
{/* dev */}
                            {/* for dev */}
                            {equipmentList.map((equipment, index) => (
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
                              }
{/* dev */}
                          </ul>
                        </div>
                        : <div className="box my-4">
                              <h3 className='text-gray-700 capitalize font-semibold'>Equipmelt list</h3>
                              <ul className='px-8 my-2'>
                                <div className="flex gap-4">
                                  {console.log(equipmentList)}
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
                      </div>
                      <div className="box my-4">
                        <h3 className='text-gray-700 capitalize font-semibold flex items-center gap-2'>Workout video <FaVideo /> </h3>
                        <input type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded w-full' value={workoutVideoLink} placeholder='Enter video link here' onChange={(e) => setWorkoutVideoLink(e.target.value)} />
                      </div>
                    </div>
                    <div className="steps w-full p-4 bg-gray-50 border rounded-md h-fit">
                      <h4 className='md:text-2xl text-gray-600 mb-5'>Steps</h4>
                      <div className='w-full p-5'>
                        <ReactQuill value={value} modules={modules} onChange={setValue} />
                        <div className=' mt-5'>
                          <MarkdownPreview source={value}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit flex justify-center items-center pb-5">
                    <button className='p-2 px-5 rounded border border-teal-500 hover:bg-teal-500 hover:text-white transition-all '>Update workout</button>
                  </div>
                </form>

              </div>
              
            </div>
          </div>
        ) : <div className='p-5 h-full'> 
              <TrainerAddWorkoutComponent setModal={setModal} />
            </div>
        }
        </div>
      </div>
      </div>
  )
}

export default TrainerWorkout