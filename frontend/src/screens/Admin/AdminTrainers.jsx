import React, { useState } from 'react'
import { FaExclamation } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent';
import AdminTrainersComponent from '../../components/Admin/AdminTrainersComponent';
import { MdVerified } from 'react-icons/md';
import { PiShootingStarFill } from "react-icons/pi";
import CountUp from 'react-countup';

const AdminTrainers = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [preview, setPreview] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);

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
  


  // dummy data  
  const trainers = [
    {
      trainerId: 'T-Id-1',
      firstName: 'new',
      fatherName: 'client',
      sex: 'male',
      clients: 5,
      picture: picture,
      verifiedTrainer: true,
      description: 'Trainer escription will be here',
      serviceList: 6,
      email: 'newclient@email.com',
      phoneNo: '0900000000',
      myWorkouts: 56,
      isAccountFrozen: false,
      accountCreationDate: '2024-09-15',
    },
  ]
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

  const deleteHandler = ( trainerId, name, sex, clients, picture, verifiedTrainer, description, serviceList, email, phoneNo, myWorkouts, accountCreationDate ) => {
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
    setDeleteClient(true);
  }

  return (
    <div className=' relative w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
        {/* left side */}
        <div className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
          <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={3} />
        </div>
        <div className="relative p-5 py-10 right overflow-auto w-full md: h-[100vh]">
          <h2 className='text-2xl my-5 text-gray-600'>Trainers</h2>
          <div className="table my-5 px-5 bg-gray-50 rounded w-full">
            <AdminTrainersComponent previewHandler={previewHandler} deleteHandler={deleteHandler} trainers={trainers} />
          </div>
          {/* preview */}
          {preview && (
            <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full'>
              <div className='w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)] p-5'>
                <div className='relative bg-[rgba(255,255,255,1)] border w-[70%] min-h-[50%] rounded p-5 pt-14'>
                  <div className="closebtn absolute top-3 right-5 hover:text-red-500 cursor-pointer">
                    <RxCrossCircled onClick={() => setPreview(false)} className='w-7 h-7' />
                  </div>
                  <div className="top xl:flex justify-around mb-5">
                    <div className="trainer w-full">
                      <p className='text-gray-600 font-semibold text-2xl mb-5'>Trainer info</p>
                      <div className="details px-5">
                        <div className="top mb-5 flex gap-5">
                          <div className="img rounded w-[350px] h-[250px]"
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${picture})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
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
                              <p className='p-1 px-3 border bg-gray-50 rounded font-semibold w-fit' >{phoneNo}</p>
                            </div>
                            <div className="phoneNo text-gray-500 w-full my-2">
                              <p>Trainer id</p>                      
                              <p className='p-1 px-3 border bg-gray-50 rounded font-semibold w-fit' >{trainerId}</p>
                            </div>
                          
                          </div>
                        </div>
                        <div className="trainer description text-gray-500 w-full space-y-2">
                          <p className='text-xl'>Trainer description</p>
                          <p className='p-2 border bg-gray-50 rounded w-[50%] h-40 overflow-auto' >{description}</p>
                        </div>
                      </div>
                    </div>
                    {/* right side */}
                    {clients > 10 && 
                    <div>
                      <div className="top-rated w-[350px] bg-teal-50 hover:bg-teal-100 transition-all group rounded h-fit p-4 text-xl flex justify-around">
                        <PiShootingStarFill className='text-teal-300 xl:text-4xl text-2xl scale-150 group-hover:translate-x-2 animate-pulse transition-all' />
                        <p className='xl:text-4xl text-2xl font-bold italic group-hover:text-teal-300 transition-all '>Top Rated</p>
                      </div>
                    </div>
                    }
                  </div>

                  {/* trainer status */}
                  <div className="stat grid grid-cols-3 gap-1">
                    <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] p-5 flex justify-center items-center text-gray-600 font-semibold min-h-[10vh] rounded">
                      <div className='text-2xl text-center'>
                        <p>All Services</p>
                        <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={serviceList} duration={5} /></p>
                      </div>
                    </div>
                    <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] p-5 flex justify-center items-center text-gray-600 font-semibold min-h-[10vh] rounded">
                      <div className='text-2xl text-center'>
                        <p>All Clients</p>
                        <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={clients} duration={5} /></p>
                      </div>
                    </div>
                    <div className="service bg-gradient-to-br from-teal-500 to-[rgba(200,255,255,1)] p-5 flex justify-center items-center text-gray-600 font-semibold min-h-[10vh] rounded">
                      <div className='text-2xl text-center'>
                        <p>All Workouts</p>
                        <p className='bg-teal-400 p-2 rounded text-white'><CountUp start={0} end={myWorkouts} duration={5} /></p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          {/* delete */}
            {deleteClient && (
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
                          <button className='text-red-500 border border-red-500 rounded p-2 px-5 hover:bg-red-500 transition-all hover:text-white' >Suspend</button>
                          <button onClick={() => setDeleteClient(false)} className='text-blue-500 border border-blue-500 rounded p-2 px-5 hover:bg-blue-500 transition-all hover:text-white' >Cancel</button>
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