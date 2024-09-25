import React, { useState } from 'react'
import { FaExclamation } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent';
import AdminTrainersComponent from '../../components/Admin/AdminTrainersComponent';
import { MdVerified } from 'react-icons/md';
import { PiShootingStarFill } from "react-icons/pi";
import CountUp from 'react-countup';
import { useActivateTrainerAccountMutation, useGetAllTrainersQuery, useSuspendTrainerAccountMutation } from '../../slices/adminApiSlice';
import gymImg from '../../assets/images/gymImg.jpg'
import { Spinner, Tooltip } from 'flowbite-react';
import { toast } from 'react-toastify';
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';

const AdminTrainers = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [preview, setPreview] = useState(false);
  const [deleteTrainer, setDeleteTrainer] = useState(false);
  const [activateTrainer, setActivateTrainer] = useState(false);

  const [trainerId, setTrainerId] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [clients, setClients] = useState(0);
  const [picture, setPicture] = useState('');
  const [verifiedTrainer, setVerifiedTrainer] = useState('');
  const [description, setDescription] = useState('');
  const [serviceList, setServiceList] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [myWorkouts, setMyWorkouts] = useState('');
  const [accountCreationDate, setAccountCreationDate] = useState('');
  
  const { data: trainersData, isLoading, error, refetch } = useGetAllTrainersQuery();
  const [suspendTrainerAccount, {isLoading: suspendLoad}] = useSuspendTrainerAccountMutation();
  const [activateTrainerAccount, {isLoading: activateLoad}] = useActivateTrainerAccountMutation();
  const trainers = isLoading || error ? [] : trainersData;



  // dummy data  
  // const trainers = [
  //   {
  //     trainerId: 'T-Id-1',
  //     firstName: 'new',
  //     fatherName: 'client',
  //     sex: 'male',
  //     clients: 5,
  //     picture: picture,
  //     verifiedTrainer: true,
  //     description: 'Trainer escription will be here',
  //     serviceList: 6,
  //     email: 'newclient@email.com',
  //     phoneNo: '0900000000',
  //     myWorkouts: 56,
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-15',
  //   },
  // ]
  // dummy data

  const previewHandler = ( trainerId, name, sex, clients, picture, verifiedTrainer, description, serviceList, email, phoneNo, myWorkouts, accountCreationDate ) => {
    setTrainerId(trainerId);
    setName(name);
    setSex(sex);
    setClients(clients);
    setPicture(picture);
    setVerifiedTrainer(verifiedTrainer);
    setDescription(description);
    setServiceList(serviceList);
    setEmail(email);
    setPhoneNo(phoneNo);
    setMyWorkouts(myWorkouts);
    setAccountCreationDate(accountCreationDate);
    setPreview(true);
  }


  const deleteHandler = (name, trainerId) => {
    setName(name)
    setTrainerId(trainerId)
    setDeleteTrainer(true)
  }

  const activateHandler = (name, trainerId) => {
    setName(name)
    setTrainerId(trainerId)
    setActivateTrainer(true)
  }

  const suspendHandler = (e) => {
    e.preventDefault()
    try{
      if (window.confirm(`Suspend ${name}`)){
        suspendTrainerAccount({ trainerId })
        toast.success(`Successfully suspended ${name}'s account.`)
        refetch()
        setTimeout(() => {
          setDeleteTrainer(false)
        }, 1000);
      } else {
        toast.info("Process canceled.")
      }
    } catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }

  const activationHandler = (e) => {
    e.preventDefault()
    try{
      if (window.confirm(`Activated ${name}`)){
        activateTrainerAccount({ trainerId })
        toast.success(`Successfully activated ${name}'s account.`)
        refetch()
        setTimeout(() => {
          setActivateTrainer(false)
        }, 1000);
      } else {
        toast.info("Process canceled.")
      }
    } catch(err){
      toast.error(err?.data?.message || err.error);
    }
  }
  
  return (
    <div className=' relative w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
        {/* left side */}
        <div className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
          <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={3} />
        </div>
        <div className="relative p-5 py-10 right overflow-hidden w-full md: h-[100vh]">
          <h2 className='text-2xl my-5 text-gray-600'>Trainers</h2>
          <div className="tables my-5 px-5 bg-gray-50 rounded overflow-auto w-full h-[90%]">
          {isLoading ? 
              <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
                <div className='flex gap-2 items-center xl:text-[20px] transition-all'>
                  <p className='text-teal-500'>Loading...</p>
                  <Spinner className='xl:w-[30px] xl:h-[30px]' />
                </div>
              </div>
              : error ? 
              <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
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
            :
            trainers.length > 0 ? 
              <AdminTrainersComponent previewHandler={previewHandler} deleteHandler={deleteHandler} activateHandler={activateHandler} trainers={trainers} />
            : "NO CLIENT DATA"
            }
          </div>

          {/* preview */}
          {preview && (
          <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full'>
            <div className='w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)] p-5'>
              <div className='relative bg-[rgba(255,255,255,1)] overflow-auto border md:w-[70%] max-h-[90%] min-h-[50%] rounded p-5 pt-14'>
                <div className="closebtn absolute top-3 right-5 hover:text-red-500 cursor-pointer">
                  <RxCrossCircled onClick={() => setPreview(false)} className='w-7 h-7' />
                </div>
                <div className="top xl:flex justify-around mb-5">
                  <div className="trainer w-full">
                    <p className='text-gray-600 font-semibold text-2xl mb-5'>Trainer info</p>
                    <div className="details xl:px-5">
                      <div className="top mb-5 md:flex xl:justify-normal justify-around xl:gap-5">
                        <div className="img-container flex justify-center xl:mb-0 mb-2">
                          <div className="img rounded xl:w-[350px] xl:h-[350px] w-[150px] h-[150px]"
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, .1)), url(${picture ? picture : gymImg })`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        </div>
                        <div className="tright">
                          <div className="name-badge flex gap-3 items-start">
                            <h2 className="name xl:text-3xl font-semibold capitalize">{name}</h2>
                            {verifiedTrainer &&
                            <div className="vbadge bg-blue-50 text-xl text-blue-500 group p-1 px-2 rounded flex items-center gap-2">
                              <MdVerified className='text-blue-500  group-hover:rotate-[360deg] transition-all' />
                              <p>Verified</p>
                            </div>
                            }
                          </div>
                          <div className="email text-gray-500 w-full my-2">
                            <p>Email</p>
                            <p className='p-1 px-3 border bg-gray-50 rounded font-semibold w-fit' >{email}</p>
                          </div>
                          <div className="phoneNo text-gray-500 w-full my-2">
                            <p>Phone number</p>                      
                            <p className='p-1 px-3 border bg-gray-50 rounded font-semibold w-fit' > {phoneNo ? phoneNo : "Not avalibale"}</p>
                          </div>
                          <div className="phoneNo text-gray-500 w-full my-2">
                            <p>Trainer id</p>                      
                            <p className='p-1 px-3 border bg-gray-50 rounded font-semibold w-fit' >{trainerId}</p>
                          </div>
                        
                        </div>
                      </div>
                      <div className="trainer info flex-wrap justify-start md:flex-nowrap xl:mb-0 mb-5 text-gray-500 w-full xl:space-y-2 flex xl:block items-start gap-5">
                        <div>
                          <p className='md:text-xl'>Sex</p>
                          <p className='p-2 border md:w-fit bg-gray-50 rounded' >{sex}</p>
                        </div>
                        <div>
                          <p className='md:text-xl'>Account created at</p>
                          <p className='p-2 border md:w-fit bg-gray-50 rounded' >{new Date(accountCreationDate.substring(0, 10)).toDateString()}</p>
                        </div>
                        <div>
                          <p className='md:text-xl'>Trainer description</p>
                          <p className='p-2 border bg-gray-50 rounded md:w-[50%] w-fit xl:h-40 h-fit overflow-auto' >{description ? description : "Not available"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* right side */}
                  {clients > 10 ? 
                  <div>
                    <div className="top-rated w-[350px] bg-teal-50 hover:bg-teal-100 transition-all group rounded h-fit p-4 text-xl flex justify-around">
                      <PiShootingStarFill className='text-teal-300 xl:text-4xl md:text-2xl scale-150 group-hover:translate-x-2 animate-pulse transition-all' />
                      <p className='xl:text-4xl md:text-2xl font-bold italic group-hover:text-teal-300 transition-all '>Top Rated</p>
                    </div>
                  </div> :
                  <>
                  <div>
                    <div className="group relative top-rated w-[350px] bg-slate-100 text-slate-300 rounded h-fit p-4 text-xl flex justify-around">
                      <PiShootingStarFill className='xl:text-4xl md:text-2xl scale-150' />
                      <p className='xl:text-4xl md:text-2xl font-bold italic '>Top Rated</p>
                      {/* tooltip */}
                      <div className='absolute group-hover:-bottom-[50%] group-hover:opacity-100 opacity-0 bottom-0 bg-black rounded-lg p-2 transition-all'>
                        <p className='text-sm'>This trainer will earn this badge after {10 - clients} clients </p>
                      </div>
                    </div>
                  </div>
                  </>
                  }
                </div>

                {/* trainer status */}
                <div className="stat grid grid-cols-3 gap-1">
                  <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] md:p-5 text-nowrap p-2 flex justify-center items-center text-gray-600 font-semibold md:min-h-[10vh] h-fit rounded-l-md rounded-br-md ">
                    <div className='md:text-2xl text-center'>
                      <p>All Services</p>
                      <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={serviceList} duration={5} /></p>
                    </div>
                  </div>
                  <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] md:p-5 text-nowrap p-2 flex justify-center items-center text-gray-600 font-semibold md:min-h-[10vh] h-fit rounded-b-md">
                    <div className='md:text-2xl text-center'>
                      <p>All Clients</p>
                      <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={clients} duration={5} /></p>
                    </div>
                  </div>
                  <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] md:p-5 text-nowrap p-2 flex justify-center items-center text-gray-600 font-semibold md:min-h-[10vh] h-fit rounded-r-md rounded-bl-md ">
                    <div className='md:text-2xl text-center'>
                      <p>All Workouts</p>
                      <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={myWorkouts} duration={5} /></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>)}

          {/* delete */}
          {deleteTrainer && (
            <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full'>
              <div className='w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)] p-5'>
                <div className='relative bg-white [rgba(255,255,255,0.8)] border w-[80%] min-h-[20%] rounded p-5 pt-14 flex gap-3 justify-center items-center'>
                  <div className='h-full'>
                    <div className="flex justify-center mb-2">
                      <div className="top p-2 px-5 w-fit h-fit flex items-center gap-3 xl:text-2xl">
                        <FaExclamation className='text-red-500 bg-red-100 rounded-full p-1' />
                        <p className='text-red-500'>Warning</p>
                      </div>
                    </div>
                    <div className="wbody p-4 bg-gray-50 h-full border">
                      <p className='text-center text-xl'>You are going to suspend {name}'s account, Do you want to proceed?</p>
                      <div className="flex gap-2 justify-center my-5">
                      <button onClick={suspendHandler} className='text-red-500 border border-red-500 rounded p-2 px-5 hover:bg-red-500 transition-all hover:text-white flex gap-2 items-center' >Suspend {suspendLoad && <Spinner />} </button>
                        <button onClick={() => setDeleteTrainer(false)} className='text-blue-500 border border-blue-500 rounded p-2 px-5 hover:bg-blue-500 transition-all hover:text-white' >Cancel</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* activate */}
          {activateTrainer && (
            <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full'>
              <div className='w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)] p-5'>
                <div className='relative bg-white [rgba(255,255,255,0.8)] border w-[80%] min-h-[20%] rounded p-5 pt-14 flex gap-3 justify-center items-center'>
                  <div className='h-full'>
                    <div className="flex justify-center mb-2">
                      <div className="top p-2 px-5 w-fit h-fit flex items-center gap-3 xl:text-2xl">
                        <FaExclamation className='text-green-500 bg-green-100 rounded-full p-1' />
                        <p className='text-green-500'>Activation!</p>
                      </div>
                    </div>
                    <div className="wbody p-4 bg-gray-50 h-full border">
                      <p className='text-center text-xl'>You are going to activate {name}'s account.</p>
                      <div className="flex gap-2 justify-center my-5">
                        <button onClick={activationHandler} className='text-green-500 border border-green-500 rounded p-2 px-5 hover:bg-green-500 transition-all hover:text-white flex gap-2 items-center' >Proceed {activateLoad && <Spinner />} </button>
                        <button onClick={() => setActivateTrainer(false)} className='text-blue-500 border border-blue-500 rounded p-2 px-5 hover:bg-blue-500 transition-all hover:text-white' >Cancel</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
  )
}

export default AdminTrainers