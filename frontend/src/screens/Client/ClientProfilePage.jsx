import React, { useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import { FaBookJournalWhills, FaClockRotateLeft, FaDumbbell, FaIdBadge, FaInfo, FaPencil, FaRegIdCard } from 'react-icons/fa6';
import gymImg from '../../assets/images/pImg.ico'
import { useDispatch } from 'react-redux';
import { FaIdCardAlt, FaTelegramPlane } from 'react-icons/fa';
import { HiStatusOnline } from "react-icons/hi";
import { Spinner, Timeline } from 'flowbite-react';
import { MdAddAlarm, MdVerified } from 'react-icons/md';
import { IoRefresh, IoWarningOutline } from 'react-icons/io5';
import { RiMailSendFill } from 'react-icons/ri';
import { useAddTrainerMutation, useGetProfileQuery, useRemoveTrainerMutation, useUpdateProfileMutation, useUpdateWeightInfoMutation, useUploadClientImageMutation } from '../../slices/clientApiSlice';
import { TbFileSad } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import { format } from 'timeago.js';

const ClientProfilePage = () => {
  const [clpsd, setClpsd] = useState(false);
  const [active, setActive] = useState(1);
  const [delName, setDelName] = useState('');
  const [delInput, setDelInput] = useState('');
  const [delModal, setDelModal] = useState(false);
  const [trainerAdd, setTrainerAdd] = useState(false);
  const [modal, setModal] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [sex, setSex] = useState('');
  const [DOB, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [beforeTraining, setBeforeTraining] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');


  const {data: profileData, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, {isLoading: updateProfileLoad, error: errorUpdate}] = useUpdateProfileMutation();
  const [uploadClientImage] = useUploadClientImageMutation();
  const [updateWeightInfo, {isLoading: weightLoading}] = useUpdateWeightInfoMutation();
  const [addTrainer, {isLoading: requestLoading}] = useAddTrainerMutation();

  const dispatch = useDispatch();

  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);
    try {
        const res = await uploadClientImage(formData).unwrap();
        toast.success(res.message);
        setPicture(res.picture);
    } catch (error) {
        toast.error(error?.data?.message || error?.error)
    }
  }

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
        await addTrainer({
          trainerId,
          note: additionalNote 
          }).unwrap();
        
        refetch()
        toast.success('Request sent successfully.')
    } catch (error) {
        toast.error(error?.data?.message || error.error)                
    }
  }

  const addWeightInfo = async (e) => {
    e.preventDefault();
    try {
        await updateWeightInfo({ 
          weightBeforeTraining: beforeTraining,
          currentWeight: currentWeight,
          plannedWeight: goalWeight,
          }).unwrap();
        
        refetch()
        toast.success('Weight info updated successfully.')
    } catch (error) {
        toast.error(error?.data?.message || error.error)                
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error('Password do not match')
    } else {
        try {
            const res = await updateProfile({ 
                 email,
                 phoneNo,
                 firstName,
                 fatherName,
                 sex,
                 DOB,
                 picture,
                 password: password && password,
                 isClient: true
            }).unwrap();
            
            dispatch(setCredentials(res));
            refetch()
            toast.success('Profile updated successfully.')
            setModal(1)
        } catch (error) {
            toast.error(error?.data?.message || error.error)                
        }
    }
  }

  const [removeTrainer] = useRemoveTrainerMutation();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await removeTrainer({
        trainerId: profileData.trainer._id
      }).unwrap();

      toast.success(`Deleted! ${profileData.trainer.firstName} ${profileData.trainer.fatherName}`);
      setDelModal(false);
      setDelName("")
      setDelInput("")  
    } catch (error) {
      toast.error(error?.data?.message || error.error)                
    }

  }

  // dummy data

  // progress available
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

  // progress not available
  // const progress = null;

  // trainer info available
  // const trainer = {
  //   name: "Trainer 1",
  //   sex: "Male",
  //   picture: gymImg,
  //   email: "trainer1@email.com",
  //   verifiedTrainer: true,
  //   description: "I am trainer 1, a great trainer!",
  //   serviceList: ["Yoga", "Weight loss", "Bulk", "Lifting"],
  //   phoneNo: "0900000000",
  // };
  // dummy data
  // trainer info not available
  // const trainer = null;
  
  return (
    <>
      <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100'>
        {/* left side */}
        <div className={`left bg-white h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
          <ClientSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={4} />
        </div>
        <div className="p-5 right relative overflow-auto w-full h-[100vh] flex">
          {
             isLoading ? <div className='flex justify-center items-center h-[40vh] w-full'>
             <div>
               <div className="flex justify-center w-full">
                 <Spinner />
               </div>
               <p>Loading...</p>
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
            : modal === 1 ? (
              <>
                <div className='my-10 w-full'>
                  <h2 className='md:text-2xl font-semibold mb-5'>Profile</h2>
                  <div className="profile flex justify-center w-full h-full relative">
                    <div className='bg-gray-50 border md:w-[70%] w-full h-fit p-5 rounded-md'>
                      <div className="top flex">
                        <div className="picture flex gap-2 justify-center w-[90%] items-start">
                          <div
                            className="picture md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded"
                            style={{
                              backgroundImage: `url(${profileData.client.picture ? profileData.client.picture : gymImg})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        </div>
                        <div className='flex items-start'>
                          <p onClick={() => setModal(2)} className='p-2 bg-gray-200 text-teal-500 rounded px-5 flex gap-5 hover:text-white hover:bg-teal-500 transition-all cursor-pointer items-center'> <span className='xl:inline hidden text-nowrap'>Edit profile</span> <FaPencil /></p>
                        </div>
                      </div>
      
                      <div className="bottom my-5 border-t-2 border-teal-600 xl:flex gap-2">
                        <div className="personal w-full">
                          <p className='my-2 text-gray-600'>Personal information</p>
                          <div className='px-2 space-y-5'>
                            <div className="name text-gray-500">
                              <p className='md:text-xl'>Name</p>
                              <p className='md:font-semibold md:text-sm'>{profileData.client.firstName} {profileData.client.fatherName}</p>
                            </div>
                            <div className="dob text-gray-500 capitalize">
                              <p className='md:text-xl'>Date of birth</p>
                              <p className='md:font-semibold md:text-sm'>{profileData.client.DOB.substring(0, 10)}</p>
                            </div>
                            <div className="phone number text-gray-500 capitalize">
                              <p className='md:text-xl'>phone number</p>
                              <p className='md:font-semibold md:text-sm'>0{profileData.client.phoneNo}</p>
                            </div>
                            <div className="email text-gray-500">
                              <p className='md:text-xl'>Email</p>
                              <p className='md:font-semibold md:text-sm'>{profileData.client.email}</p>
                            </div>
                            <div className="flex justify-between">
                              <div className="sex text-gray-500 capitalize">
                                <p className='md:text-xl'>Sex</p>
                                <p className='md:font-semibold md:text-sm'>{profileData.client.sex}</p>
                              </div>
      
                            </div>
                          </div>
                        </div>
                        
                        <div className="tabs w-full">
                          <div className="top flex gap-5 my-2 border-b">
                            <button onClick={() => setActive(1)} className={`md:m-0 mt3 border-b transition-all ${ active === 1 ? "border-b-teal-500 " : "border-transparent"}`}>Account</button>
                            <button onClick={() => setActive(2)} className={`md:m-0 mt3 border-b transition-all ${ active === 2 ? "border-b-teal-500 " : "border-transparent"}`}>Progress</button>
                            <button onClick={() => setActive(3)} className={`md:m-0 mt3 border-b transition-all ${ active === 3 ? "border-b-teal-500 " : "border-transparent"}`}>Trainer</button>
                          </div>
                          <div className="tb border-2 rounded p-3 pb-5">
                            {active === 1 ? (
                            <div className="account w-full transition-all">
                              <h2 className='my-b text-gray-400 text-sm'>Account information</h2>
                              <div>
                                <div className="Id text-gray-500 space-y-2 capitalize my-4">
                                  <p className='md:text-xl flex gap-2 items-center'>ID <FaIdCardAlt /></p>
                                  <p className='md:font-semibold md:text-sm text-gray-700'>{profileData.client.clientId}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                  <div className="AccountCreation text-gray-500 space-y-2 capitalize">
                                    <p className='md:text-xl flex gap-2 items-center'>Account created <FaClockRotateLeft /></p>
                                    <p className='md:font-semibold md:text-sm text-gray-700'>{profileData.client.createdAt.substring(0, 10)}</p>
                                  </div>
                                  <div className="AccountCreation text-gray-500 space-y-2 capitalize">
                                    <p className='md:text-xl flex gap-2 items-center'>Account updated <FaClockRotateLeft /></p>
                                    <p className='md:font-semibold md:text-sm text-gray-700'>{new Date(profileData.client.updatedAt).toDateString()}</p>
                                  </div>
                                </div>
                                <div className="AccountStatus text-gray-500 space-y-2 capitalize my-4">
                                  <p className='md:text-xl flex gap-2 items-center'>Account status <HiStatusOnline  /></p>
                                  {profileData.client.isAccountFrozen ?
                                  <p className='md:font-semibold md:text-sm text-gray-700 flex gap-2 items-center'>Suspended <span className={`w-2 h-2 animate-pulse shadow-md shadow-red-600 bg-red-600 rounded-full block`}></span></p>
                                  : 
                                  <p className='md:font-semibold md:text-sm text-gray-700 flex gap-2 items-center'>Live <span className={`w-2 h-2 animate-pulse shadow-md shadow-green-600 bg-green-600 rounded-full block`}></span></p>
                                  }
                                </div>
                              </div>
                            </div>
                            )
                            : active === 2 ? (
                              <div className='transition-all'>
                                <h2 className='my-b text-gray-400 text-sm'>Progress information</h2>
                                <div className='flex gap-2 items-start w-full'>
                                  <div className='my-5 w-full'>
                                    <span className='underline font-semibold'>Weight progress</span>
                                    <p className='px-2 py-2 text-gray-500'>- Current weight {profileData.client.currentWeight}</p>
                                    <div className="timeline h-[16vh] overflow-y-auto my-2 w-fit px-10 p-2 shadow-md rounded-md">
                                      {profileData.progress.progress.length > 0 ?
                                      <Timeline>
                                        {/* loop through progress */}
                                        {profileData.progress.progress.map((progress) => (
                                          <Timeline.Item>
                                            <Timeline.Point icon={FaDumbbell} />
                                            <Timeline.Content>
                                              <Timeline.Time> {new Date(progress.progressDate).toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : progress.progressDate.substring(0, 10)} </Timeline.Time>
                                              <Timeline.Title className='text-gray-400 italic'> {progress.weightInNumber} </Timeline.Title>
                                              <Timeline.Body> {progress.workout.workoutName} {progress.isWorkoutDone} </Timeline.Body>
                                            </Timeline.Content>
                                          </Timeline.Item>
                                        ))}
                                      </Timeline>
                                      :
                                      <div className='no progress flex justify-center text-gray-500 my-3'>
                                      <p className='text-center font-semibold'>Your progresses will be here.</p>
                                      </div>
                                      }
                                    </div>
                                  </div>
                                  
                                  <div className="add-weight-info w-full">
                                    {/* add weight information */}
                                    <div className="add-weight-info">
                                      <h2 className='font-semibold'>Add weight info</h2>
                                      <form onSubmit={addWeightInfo} className="px-1">
                                        <div className="box space-y-1 my-1">
                                          <label htmlFor='cweight'>Weight before training</label>
                                          <input required max={200} maxLength={3} id='cweight' type='number' onChange={(e) => setBeforeTraining(e.target.value)} className='w-full block p-1 border border-gray-300 rounded' placeholder='Add current weight in killo gram.' />
                                        </div>
                                        <div className="box space-y-1 my-1">
                                          <label htmlFor='cweight'>Current Weight</label>
                                          <input id='cweight' type='number' onChange={(e) => setCurrentWeight(e.target.value)} className='w-full block p-1 border border-gray-300 rounded' placeholder='Add current weight in killo gram.' />
                                        </div>
                                        <div className="box space-y-1 my-1">
                                          <label htmlFor='pweight'>Your goal Weight</label>
                                          <input required max={200} maxLength={3} id='pweight' type='number' onChange={(e) => setGoalWeight(e.target.value)} className='w-full block p-1 border border-gray-300 rounded' placeholder='Add goal weight in killo gram.' />
                                        </div>
      
                                        <div className="btn my-5">
                                          <button className='border border-teal-500 hover:bg-teal-500 rounded p-2 px-5 hover:text-white transition-all flex gap-3 items-center'>
                                            Submit
                                            {weightLoading && <Spinner />}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                            : (
                              <div className='transition-all'>
                                <h2 className='my-b text-gray-400 text-sm'>Trainer information</h2>
                                {profileData.myRequest && !profileData.myRequest.Approved ? 
                                  <div className='rounded flex group bg-white items-start gap-10 p-5'>
                                    <div className="flex justify-center">
                                      <div className="flex bg-teal-500 text-white group-hover:bg-transparent transition-all group-hover:border-teal-500 border border-transparent group-hover:text-teal-400 overflow-hidden rounded-full md:w-32 md:h-32 w-20 h-20 items-center justify-center">
                                        <div>
                                          <FaTelegramPlane className='md:group-hover:translate-y-10 group-hover:translate-y-7 -translate-x-1 -translate-y-52 transition-all md:w-20 md:h-20 w-14 h-14' />
                                          <FaTelegramPlane className='group-hover:translate-y-52 -translate-x-1 md:-translate-y-10 -translate-y-7 transition-all md:w-20 md:h-20 w-14 h-14' />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="txt">
                                      <p className='my-2 font-semibold'>Your request is sent <span className='text-teal-500'> {format(profileData.myRequest.createdAt)}</span>.</p>
                                      <p>After your trainer approve the request, you'll be able to see the information about them here.</p>
                                    </div>
                                  </div>
                              : 
                                  (profileData.trainer ?
                                  <div className="trainer h-full [20vh] overflow-auto">
                                    <div className='my-2 info flex justify-start'>
                                      <div className="box bg-white w-fit rounded border border-teal-500 text-center flex gap-3 overflow-hidden">
                                        <div className="left p-2">
                                          <div 
                                          style={{
                                            backgroundImage: `url(${profileData.trainer.picture ? profileData.trainer.picture: gymImg})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                          }}
                                          className="img w-28 h-28 rounded-full mb-2"></div>
                                          <div className="txt">
                                            <div className="name text-gray-500">
                                              <p className='font-semibold'>{profileData.trainer.firstName} {profileData.trainer.fatherName}</p>
                                              <p className='font-semibold'>{profileData.trainer.trainerId}</p>
                                            </div>
                                          </div>
                                        </div>
      
                                        <div className="right bg-gray-100 w-full text-start">
                                          <div className="top p-2">
                                            <p className='text-gray-700 font-semibold'>Account details</p>
                                            <div className="px-2 space-y-1 mt-2 text-gray-500">
                                              <p className='font-semibold text-sm'>Trainer since {new Date(profileData.trainer.createdAt).toDateString()}</p>
                                              <p className='font-semibold text-sm flex gap-2 items-center'>Verified trainer <MdVerified /></p>
                                            </div>
                                            {profileData.myRequest &&
                                            <>
                                            <p className='text-gray-700 font-semibold my-2'>Partnership details</p>
                                            <div className='text-gray-500 px-2'>
                                              <p className='font-semibold text-sm'>Started coaching <b>{profileData.client.firstName}</b> at {new Date(profileData.myRequest.updatedAt).toDateString()}</p>
                                            </div>
                                            </>
                                            }
                                          </div>
                                        </div>
      
                                      </div>
                                    </div>
                                    <fieldset className="bottom  my-5 border border-red-500 px-4 p-1 rounded w-full">
                                      <legend className='text-red-500 my-5'>Warining the below action can't be undone!</legend>
                                      <p onClick={() => { setDelName(`${profileData.trainer.firstName} ${profileData.trainer.fatherName}`); setDelModal(true)}} className='w-fit border p-2 cursor-pointer rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all'>Stop partnership with <span className='font-semibold'>{profileData.trainer.firstName} {profileData.trainer.fatherName}</span></p>
                                    </fieldset>
                                  </div>
                                  : 
                                  <div className='w-full h-full'>
                                      <div className='w-full h-full cursor-pointer' onClick={() => setTrainerAdd(true)}>
                                      {!trainerAdd ? 
                                        (
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
                                        </>)
                                        : (<>
                                          <div className='flex items-start w-full h-full p-5 transition-all'>
                                            <form onSubmit={handleRequest} className='w-full md:max-h-[25vh] h-full bg-white rounded flex gap-5 p-5'>
                                              <div className='w-full md:flex items-start gap-2'>
                                                <label htmlFor="trainerId" className='w-full'>
                                                  Enter your trainer id
                                                  <div className='w-full flex md:justify-start justify-center'>
                                                    <FaRegIdCard className='w-[150px] h-[150px] text-teal-500'/>
                                                  </div>
                                                </label>
                                                
                                                <div className='w-full p-1 space-y-5 text-teal-500'>
                                                  <div className='relative w-full flex items-center border rounded mt-5'>
                                                    <input required value={trainerId} onChange={(e) => setTrainerId(e.target.value)} type="text" id='trainerId' className='border-none focus:ring-0 rounded w-[90%]' placeholder='Enter your trainer id - T-Id-0' />
                                                    <label htmlFor='trainerId' className="icon right-3 top-[60%]">
                                                      <FaIdBadge className='w-5 h-5' />
                                                    </label>
                                                  </div>
                                                  <div className='relative w-full flex items-start border rounded mt-5'>
                                                    <textarea value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)} id='notes' maxLength={200} className=' border-none resize-none focus:ring-0 rounded w-[90%] h-[10vh]' placeholder='Send a note. maximum of 200 letter.'  ></textarea>
                                                    <label htmlFor='notes' className="icon right-3 top-[60%] mt-2">
                                                      <FaBookJournalWhills className='w-5 h-5' />
                                                    </label>
                                                  </div>
                                                  <button className='px-5 p-2 bg-gray-200 text-gray-500 rounded hover:bg-teal-500 hover:text-white flex items-center gap-1 transition-all group'>
                                                    <RiMailSendFill className='group-hover:-translate-x-2 transition-all' />
                                                    Send a request {requestLoading && <Spinner />}
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
                              )
                            }
                          </div>
                        </div>
                      </div>
      
                    </div>
                    
                  </div>
                </div>
                {/* delete modal */}
                {delModal && (
                  <div className='absolute w-full h-full left-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-start md:p-5'>
                    <div className='bg-white md:w-[50%] w-[90%] py-2 px-5 sticky top-0'>
                      <div className='flex justify-center items-center my-5 text-red-500'>
                        <div>
                          <div className="flex justify-center">
                            <IoWarningOutline className='w-10 h-10'/>
                          </div>
                          <p className='text-center'> Delete <span className='font-semibold'>{delName}</span></p>
                        </div>
                      </div>
                      <div className="info text-red-500 mb-5">
                        <div className="top flex items-start gap-2">
                          <div className='bg-red-50 p-2 rounded-full w-8 h-8'><FaInfo /></div>
                          <div>
                            <p>By deleting your trainer, you will no longer have access to any resources associated with the trainer.</p>
                            <div className="txt">
                              <div className='flex items-center gap-2'>
                                <p className=''>Services like:</p>
                                <p className='text-sm'>Workouts,</p>
                                <p className='text-sm'>Online coaching,</p>
                                <p className='text-sm'>Tips and resources,</p>
                                <p className='text-sm'>Text messages</p>
                              </div>
                            </div>
      
                          </div>
                        </div>
      
                      </div>
                      <label htmlFor="trainerDel">Enter trainer id in the input box.</label>
                      <input id='trainerDel' className='rounded border-gray-300 transition-all focus:ring-0 focus:border-inherit my-3 w-full' type="text" 
                      value={delInput} onChange={(e) => { setDelInput(e.target.value)}} 
                      placeholder={`Type ${delName} to delete`}
                      />
      
                      <div className="btns flex items-end gap-3 justify-end px-5 w-full">
                        {delName === delInput && <button onClick={handleDelete} className='px-5 p-2 border border-red-500 rounded hover:bg-red-500 hover:text-white text-red-500 transition-all'>Delete</button>}
                        <button onClick={() => {setDelName(''); setDelInput(''); setDelModal(!delModal)}} className='px-5 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white text-blue-500 transition-all'>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='w-full transition-all relative'>
                <h2 className='cursor-pointer md:text-2xl font-semibold my-10 text-gray-400 transition-all' onClick={() => setModal(1)}>Profile / <span className='text-gray-700'> Edit profile </span></h2>
                <div className="profile flex justify-center w-full h-full relative">
                    <div className='bg-gray-50 border md:w-[70%] w-full h-fit p-5 rounded-md'>
                      <div className="top flex">
                        <div className="picture flex gap-2 justify-center w-[90%] items-start">
                          <div
                            className="relative picture md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded"
                            style={{
                              backgroundImage: `url(${picture ? picture : gymImg})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <div className="editbtn absolute bottom-0 right-0">
                              <label htmlFor='picture' >
                                <div className='w-15 h-15 border border-gray-200 bg-[rgba(0,0,0,0.4)] cursor-pointer text-white hover:text-teal-500 hover:bg-white transition-all p-3 rounded-full m-2'>
                                    <FaPencil className='w-full h-full'/>
                                </div>
                              </label>
                            </div>
                            <div className="relative">
                              <input onChange={(e) => {uploadFileHandler(e)}} type="file" name="picture" id="picture" className='-z-10 opacity-0 absolute top-0' />
                            </div>
                          </div>
                        </div>
                      </div>
      
                      <div className="bottom my-5 border-t-2 border-teal-600 xl:flex gap-2">
                        <form onSubmit={updateHandler} className="personal w-full">
                          <p className='my-2 text-gray-600'>Update personal information</p>
                          <div className='px-2 space-y-1'>
                            <div className="flex gap-4 items-end">
                              <div className="fName text-gray-500 capitalize space-y-2">
                                <label htmlFor='firstName' className='md:text-xl'>First name</label>
                                <input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" value={firstName} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                              <div className="fName text-gray-500 capitalize space-y-2">
                                <label htmlFor='fatherName' className='md:text-xl'>Father name</label>
                                <input onChange={(e) => setFatherName(e.target.value)} type="text" name="fatherName" id="fatherName" value={fatherName} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                            </div>
                            <div className="flex gap-4 items-end">
                              <div className="dob text-gray-500 capitalize space-y-2">
                                <label htmlFor='dob' className='md:text-xl'>dob</label>
                                <input type="date" name="dob" id="dob" value={DOB} onChange={(e) => setDOB(e.target.value)} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                              <div className="sex text-gray-500 capitalize space-y-2">
                                <label htmlFor='sex' className='md:text-xl'>Sex</label>
                                <select name="sex" id="sex" className='block rounded' onChange={(e) => setSex(e.target.value)}>
                                  <option value=''>Choose sex</option>
                                  <option value={'Female'}>Female</option>
                                  <option value={'Male'}>Male</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-4 items-end">
                              <div className="phone number text-gray-500 capitalize space-y-2">
                                <label htmlFor='phoneNo' className='md:text-xl'>phone number</label>
                                <input type="tel" name="phoneNo" id="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                              <div className="email text-gray-500 capitalize space-y-2">
                                <label htmlFor='email' className='md:text-xl'>Email</label>
                                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                            </div>
                            <div className="flex gap-4 items-end">
                              <div className="password text-gray-500 capitalize space-y-2">
                                <label htmlFor='password' className='md:text-xl'>Password</label>
                                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                              <div className="confirmPassword text-gray-500 capitalize space-y-2">
                                <label htmlFor='confirmPassword' className='md:text-xl'>Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className='md:font-semibold md:text-sm block rounded p-2' />
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-center items-start my-5 gap-5'>
                            {/* <button className='p-2 border border-teal-500 text-teal-500 rounded px-5 flex gap-5 hover:text-white hover:bg-teal-500 transition-all cursor-pointer items-center'> Update profile</button> */}
                            {updateProfileLoad ?
                            <button disabled className='border border-teal-500 p-2 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>
                              Updating profile <Spinner /> </button>
                            : errorUpdate ? 
                            <button type='submit' className='border border-teal-500 p-2 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Error try again</button>
                            :
                            <button type='submit' className='border border-teal-500 p-2 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Update profile</button>
                            }
                            <button onClick={() => setModal(1)} className='border border-red-500 p-2 px-5 rounded text-red-500 hover:text-white hover:bg-red-500 transition-all flex gap-2 items-center'>Cancel </button>
                          </div>
                        </form>
                      </div>
      
                    </div>
                    
                  </div>
              </div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default ClientProfilePage