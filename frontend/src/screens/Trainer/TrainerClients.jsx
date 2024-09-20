import React, { useEffect, useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import TrainerClientsComponent from '../../components/Trainer/TrainerClientsComponent';
import { useGetClientsQuery, useGetClientProgressMutation, useGetWorkoutQuery, useAssignWorkoutMutation, useRemoveAssignedWorkoutMutation, useGetProfileQuery } from '../../slices/trainerApiSlice';
import { Spinner, Timeline } from 'flowbite-react';
import { MdPending } from 'react-icons/md';
import { TbFileSad } from 'react-icons/tb';
import { CgUser } from 'react-icons/cg';
import { FaCheck, FaCircleXmark, FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { AgeFromDateString } from 'age-calculator';
import { IoRefresh } from 'react-icons/io5';

const GetProgress = ({clientId}) => {
  const [getClientProgress, {isLoading, error}, ] = useGetClientProgressMutation();
  const {refetch} = useGetProfileQuery();
  const [progress, setProgress] = useState();
  const [active, setActive] = useState(false);
  const [workoutId, setWorkoutId] = useState();

  const [removeAssignedWorkout] = useRemoveAssignedWorkoutMutation();

  
  const handleRemoveAssigned = async (e) => {
    e.preventDefault();
    try{
      if(window.confirm(`Are your sure you are going to delete assigned workout ${workoutId}`))
      {
        await removeAssignedWorkout({ workoutId, clientId }).unwrap()
        refetch();
        toast.success('Workout assigned successfully.');
      } else {
        toast.info("Workout deletion canceled.")
      }        
    } catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }


  const getProgress = async () => {
    try {
      const res = await getClientProgress({clientId}).unwrap()
      setProgress(res);
      setActive(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    getProgress()
  }, [])

  return (
    isLoading ? <p className='flex gap-3 items-center mt-5'>Loading ... <Spinner /> </p>
    : error ? <p>{error.message}</p>
    : 
    <div className='h-[50vh] mt-5 px-5'>
      <Timeline>
      {active && progress.progress.map(progress => (
        <> 
        <div className='overflow-hidden w-[550px]'>
            <Timeline.Item className='bg-gray-100 rounded'>
              <Timeline.Point icon={progress.isWorkoutDone ? FaCheck : FaXmark} />
              <Timeline.Content>
                <Timeline.Time className='relative'>
                  <h4 className='bg-teal-400 rounded-t text-white p-2'>Progress data on <span className='font-semibold'>{progress.progressDate.substring(0, 10)}</span></h4>
                  <form onSubmit={handleRemoveAssigned} onClick={() => setWorkoutId(progress.workout._id)} className="absolute right-0 close flex w-full justify-end p-2">
                    <button className='flex gap-1 items-center text-red-600 text-sm '>Remove <FaCircleXmark /> </button>
                  </form>
                </Timeline.Time>
                <Timeline.Title className='p-5'>{progress.workout.workoutName}</Timeline.Title>
                <Timeline.Body className='px-5 pb-4'>
                  <div className="bottom">
                    <p className='font-semibold flex gap-2 items-center'>Weight in number: <span className='font-normal'>{progress.weightInNumber ? progress.weightInNumber : <p className='flex gap-2 items-center'>Pending <MdPending /> </p> }</span></p>
                    <p className='font-semibold flex gap-2 items-center'>Workout completed: <span className='font-normal'>{progress.isWorkoutDone ? "Completed" :  <p className='flex gap-2 items-center'>Pending <MdPending /> </p>}</span></p>
                    {progress.isWorkoutDone && <p className='font-semibold'>Workout completed at: <span className='font-normal'>{progress.progressDate ? progress.progressDate.substring(0, 10) : <p className='flex gap-2 items-center'>Pending <MdPending /> </p>}</span></p>}
                    <p className='font-semibold flex gap-2 items-center'>Notes: <span className='font-normal'>{progress.notes ? progress.notes : "None"}</span></p>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </div>
          </>
      ))}
      </Timeline>
    </div>
  )
}

const GetWorkout = ({clientId, clientName}) => {
  const [workoutId, setWorkoutId] = useState('');

  const {data:workout, isLoading} = useGetWorkoutQuery();
  const [assignWorkout, {isLoading: assignLoad}] = useAssignWorkoutMutation();

  const handleAssign = async (e) => {
    e.preventDefault();
    try{

      await assignWorkout({ workoutId, clientId}).unwrap()
      toast.success('Workout assigned successfully.');
    } catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div>
      
      {isLoading ? <p className='flex gap-3 items-center mt-5'>Loading ... <Spinner /> </p>
      : workout.myWorkouts ?
      <form onSubmit={handleAssign} className='my-5 space-y-2'>
          <label htmlFor="Workout" className='block'>Select workout</label>
          <select required onChange={(e) => setWorkoutId(e.target.value)} name="Workout" id="Workout">
            <option value="">Choose workout</option>
            {workout.myWorkouts.map(workout => (
              <option value={workout._id}> {workout.workoutName} </option>
            ))}
          </select>
          <div className="flex items-center my-5">
            <button type='submit' className='flex gap-4 items-center bg-teal-400 rounded-md text-white p-2 px-5 hover:bg-white hover:text-teal-400 border border-transparent hover:border-teal-400 transition-all'>
              Assign {assignLoad && <Spinner />}
            </button>
          </div>
      </form>
      : <div>
        <p>You don't have no workouts available to assign for {clientName}</p>
      </div>
      }
    </div>
  )
}

const TrainerClients = () => {
  const [clpsd, setClpsd] = useState(false);
  const [currId, setCurrId] = useState('');
  const [modal, setModal] = useState(1);
  const [active, setActive] = useState(1);

  const [clientId, setClientId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [fatherName, setfatherName] = useState('')
  const [sex, setSex] = useState('')
  const [DOB, setDOB] = useState('')
  const [picture, setPicture] = useState('')
  const [progressId, setProgressId] = useState('')
  const [weightBeforeTraining, setWeightBeforeTraining] = useState('')
  const [currentWeight, setCurrentWeight] = useState('')
  const [plannedWeight, setPlannedWeight] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [workoutsAssignedForMe, setWorkoutsAssignedForMe] = useState('')
  const [isAccountFrozen, setIsAccountFrozen] = useState('')

  const setClient = (clientId, firstName, fatherName, sex, DOB, picture, progressId, weightBeforeTraining, currentWeight, plannedWeight, email, phoneNo, workoutsAssignedForMe, isAccountFrozen )=> {
    setClientId(clientId)
    setFirstName(firstName)
    setfatherName(fatherName)
    setSex(sex)
    setDOB(DOB)
    setPicture(picture)
    setProgressId(progressId)
    setWeightBeforeTraining(weightBeforeTraining)
    setCurrentWeight(currentWeight)
    setPlannedWeight(plannedWeight)
    setEmail(email)
    setPhoneNo(phoneNo)
    setWorkoutsAssignedForMe(workoutsAssignedForMe)
    setIsAccountFrozen(isAccountFrozen)
    setModal(2)
  }

  // dummy data
  // const clients = [
  // //   {
  // //     picture: gymImg,
  // //     name: "Client one",
  // //     DOB: '2005-03-15',
  // //     email: 'clientone@mail.com',
  // //     weightBeforeTraining: '90',
  // //     currentWeight: '72',
  // //     plannedWeight: '60',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client two",
  // //     DOB: '2000-03-15',
  // //     email: 'clienttwo@mail.com',
  // //     weightBeforeTraining: '80',
  // //     currentWeight: '65',
  // //     plannedWeight: '50',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client one",
  // //     DOB: '2005-03-15',
  // //     email: 'clientone@mail.com',
  // //     weightBeforeTraining: '90',
  // //     currentWeight: '72',
  // //     plannedWeight: '60',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client two",
  // //     DOB: '2000-03-15',
  // //     email: 'clienttwo@mail.com',
  // //     weightBeforeTraining: '80',
  // //     currentWeight: '65',
  // //     plannedWeight: '50',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client one",
  // //     DOB: '2005-03-15',
  // //     email: 'clientone@mail.com',
  // //     weightBeforeTraining: '90',
  // //     currentWeight: '72',
  // //     plannedWeight: '60',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client two",
  // //     DOB: '2000-03-15',
  // //     email: 'clienttwo@mail.com',
  // //     weightBeforeTraining: '80',
  // //     currentWeight: '65',
  // //     plannedWeight: '50',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client one",
  // //     DOB: '2005-03-15',
  // //     email: 'clientone@mail.com',
  // //     weightBeforeTraining: '90',
  // //     currentWeight: '72',
  // //     plannedWeight: '60',
  // //   },
  // //   {
  // //     picture: gymImg,
  // //     name: "Client two",
  // //     DOB: '2000-03-15',
  // //     email: 'clienttwo@mail.com',
  // //     weightBeforeTraining: '80',
  // //     currentWeight: '65',
  // //     plannedWeight: '50',
  // //   },
  // ]
  // const progress = [
  //   {
  //     workout: "Yoga",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "76 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-10"
  //   },
  //   {
  //     workout: "Yoga",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "76 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-09"
  //   },
  //   {
  //     workout: "Digup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  //   {
  //     workout: "Pushup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  //   {
  //     workout: "Digup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  //   {
  //     workout: "Pushup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  //   {
  //     workout: "Digup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  //   {
  //     workout: "Pushup",
  //     clientPicture: gymImg,
  //     weightInPicture: gymImg,
  //     weightInNumber: "56 Killo gram",
  //     isWorkoutDone: true,
  //     progressDate: "2024-09-08"
  //   },
  // ];
  // dummy data

  const { data: client, isLoading, error } = useGetClientsQuery();
  const clients = isLoading ? [] : error ? [] : client.myClients;

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={2} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh]">
        <div className="my-5 md:p-5 p-2">
          <div className='md:px-5 my-5 w-full'>
            <h2 className='md:text-3xl text-xl text-gray-600'>My clients</h2>
            { isLoading ? 
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
          : 
               modal === 1 ?
               <div className={`my-clients ${clients.length > 0 && "grid"} xl:grid-cols-2 gap-4 px-5 my-10 w-full`}>
                  {/* loop through clients array */}
                  {clients.length > 0 ? clients.map((client, id) => 
                    <TrainerClientsComponent setClient={setClient} client={client} id={id} setCurrId={setCurrId} currId={currId}/>
                  ):
                  <div className='flex justify-center items-center w-full h-[25vh]'>
                    <div className='xl:text-3xl text-xl text-center text-teal-500 '>
                      <p className='flex items-center gap-3 justify-center'>You have no clients for now <TbFileSad /></p>
                      <div className="flex gap-2 justify-center text-xl my-2">
                        <p> When you approve a client's request, <br /> it will be shown here. </p>
                      </div>
                    </div>
                  </div>
                }
                </div>
                : 
                <div className='my-10 md:px-10 px-2'>
                  <div className='trainer p-1 h-full bg-white overflow-auto'>
                    <div className="top w-full h-[10vh] relative pl-8 md:mb-28 mb-16 rounded-t"
                      style={{
                        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div onClick={() => {setModal(1); setCurrId('')}} className="closeBtn flex gap-3 justify-end px-5 w-full">
                        <div className="text-red-500 bg-white p-2 my-5 rounded hover:bg-red-500 transition-all hover:text-white cursor-pointer">
                          <FaXmark/>
                        </div>
                      </div>
                      <div className="absolute md:top-[50%] top-[60%] flex gap-4 items-end">
                        <div
                        style={{
                          backgroundImage: `url(${gymImg})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="img md:w-[150px] md:h-[150px] w-28 h-28 border-4 border-white rounded-full">
                        </div>
                        <div className="txt">
                          <div className="flex gap-2">
                            <p className='font-semibold md:text-2xl text-xl flex gap-2 items-center'>{firstName} {fatherName} </p>
                            <div className="badge px-1 w-fit border border-yellow-300 font-light text-yellow-300 rounded flex items-center gap-1">
                              <p>Client</p>
                              <CgUser className='w-[25px] h-[25px]'/>
                            </div>
                          </div>
                            <p className='font-semibold text-gray-400 flex items-center gap-2 line-clamp-1'>{sex} <span className='relative top-[.8px] w-1 h-1 rounded-full bg-gray-500'></span> {email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bottom pl-8 my-2">
                      <div className="opt h-full sticky py-3 pr-4 -top-2 bg-white w-full">
                        <div className='border-b flex gap-4 w-full overflow-auto text-nowrap scrollNone'>
                          <button onClick={() => setActive(1)} className={`border-b-[2px] transition-all ${active === 1 ? " border-teal-500": "border-transparent"} `}>Account</button>
                          <button onClick={() => setActive(2)} className={`border-b-[2px] transition-all ${active === 2 ? " border-teal-500": "border-transparent"} `}>Fitness</button>
                          <button onClick={() => setActive(3)} className={`border-b-[2px] transition-all ${active === 3 ? " border-teal-500": "border-transparent"} `}>Assign</button>
                        </div>
                      </div>

                      {active === 1 ? (
                      <div className='status transition-all'>
                        <h3 className='md:text-xl text-gray-700 capitalize'>Account information</h3>
                        <div className="bottom text-gray-500 my-5">
                          <div className="ClientId space-y-2">
                            <p className='text-gray-600 font-semibold text-xl'>Client id</p>
                            <p>{clientId}</p>
                          </div>
                          <div className="ProgressId space-y-2">
                            <p className='text-gray-600 font-semibold text-xl'>Progress Id</p>
                            <p>{progressId}</p>
                          </div>
                          <div className="phoneNo space-y-2">
                            <p className='text-gray-600 font-semibold text-xl'>Phone number</p>
                            <p>{phoneNo}</p>
                          </div>
                          <div className="Age space-y-2">
                            <p className='text-gray-600 font-semibold text-xl'>Age</p>
                            <p>{DOB.substring(0, 10)} ({new AgeFromDateString(new Date(DOB.substring(0, 10))).age} Years old)</p>
                          </div>
                          <div className="Status">
                            <p className='text-gray-600 font-semibold text-xl'>Account status</p>
                            <p className='flex gap-2 items-center'>{isAccountFrozen ? "Deactivated" : "Live"} <span className={`w-2 h-2 ${isAccountFrozen ? "bg-red-500" : "animate-pulse shadow-md shadow-green-600 bg-green-600"} rounded-full block`}></span></p>

                          </div>
                        </div>
                      </div>
                      ) : active === 2 ? (
                        <div className='transition-all py-3'>
                          <h3 className='md:text-xl text-gray-700 capitalize'>Progress information</h3>
                          <GetProgress clientId={clientId} />
                        </div>
                      ): 
                      (
                        <div className='transition-all py-3'>
                          <h3 className='md:text-xl text-gray-700 '>Assign a workout</h3>
                          <GetWorkout clientId={clientId} clientName={`${firstName} ${fatherName}`} />
                        </div>
                      )
                      }
                    </div>
                  </div>
                </div>
              }
          </div>
        </div>
      </div>        
    </div>
  )
}

export default TrainerClients