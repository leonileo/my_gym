import React, { useState } from 'react'
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent'
import { FaExclamation } from 'react-icons/fa6';
import { RxCrossCircled } from "react-icons/rx";
import AdminClientsComponent from '../../components/Admin/AdminClientsComponent';
import { useActivateClientAccountMutation, useGetAllClientsQuery, useSuspendClientAccountMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';


const AdminClients = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [preview, setPreview] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);
  const [activateClient, setActivateClient] = useState(false);

  const [clientPicture, setClientPicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [progressId, setProgressId] = useState('');
  const [clientId, setClientId] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [accountCreationDate, setAccountCreationDate] = useState('');
  const [trainerPicture, setTrainerPicture] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [trainerId, setTrainerId] = useState('');

  
  // dummy data  
  // const clients = [
  //   {
  //     clientId: 'C-Id-1',
  //     clientPicture: clientPicture,
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     clientPicture: clientPicture,
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     clientPicture: clientPicture,
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-4',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     clientPicture: clientPicture,
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     clientPicture: clientPicture,
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     clientPicture: clientPicture,
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-4',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-1',
  //     clientPicture: clientPicture,
  //     firstName: 'new',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-2',
  //     clientPicture: clientPicture,
  //     firstName: 'new2',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient2@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-1',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  //   {
  //     clientId: 'C-Id-3',
  //     clientPicture: clientPicture,
  //     firstName: 'new3',
  //     fatherName: 'client',
  //     DOB: '2024-09-10',
  //     sex: 'male',
  //     email: 'newclient3@email.com',
  //     progressId: 'P-Id-2',
  //     phoneNo: '0900000000',
  //     isAccountFrozen: false,
  //     accountCreationDate: '2024-09-10',
  //     trainerId: 'T-Id-4',
  //     trainerName: 'Trainer one',
  //     trainerPicture: trainerPicture,
  //   },
  // ]
  // dummy data

  const { data: clientsData, isLoading, error, refetch } = useGetAllClientsQuery();
  const [suspendClientAccount, {isLoading: suspendLoad}] = useSuspendClientAccountMutation();
  const [activateClientAccount, {isLoading: activateLoad}] = useActivateClientAccountMutation();
  const clients = isLoading || error ? [] : clientsData.clients;

  const previewHandler = ( clientPicture1, name, email, phoneNo, progressId, clientId, sex, age, accountStatus, accountCreationDate, trainerId ) => {
    // assigning trainer data
    clientsData.trainers.map((id) => 
      id.trainerId === trainerId 
      &&(
          setTrainerPicture(id.picture),
          setTrainerName(`${id.firstName} ${id.fatherName}`)
        )
    )
    // assigning client data
    setClientPicture(clientPicture1)
    setName(name)
    setEmail(email)
    setPhoneNo(phoneNo)
    setProgressId(progressId)
    setClientId(clientId)
    setSex(sex)
    setAge(age)
    setAccountStatus(accountStatus)
    setAccountCreationDate(accountCreationDate)
    setTrainerId(trainerId)
    setPreview(true)
  }

  const deleteHandler = (name, clientId) => {
    setName(name)
    setClientId(clientId)
    setDeleteClient(true)
  }

  const activateHandler = (name, clientId) => {
    setName(name)
    setClientId(clientId)
    setActivateClient(true)
  }

  const suspendHandler = (e) => {
    e.preventDefault()
    try{
      if (window.confirm(`Suspend ${name}`)){
        suspendClientAccount({ clientId })
        toast.success(`Successfully suspended ${name}'s account.`)
        refetch()
        setTimeout(() => {
          setDeleteClient(false)
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
        activateClientAccount({ clientId })
        toast.success(`Successfully activated ${name}'s account.`)
        refetch()
        setTimeout(() => {
          setActivateClient(false)
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
          <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={2} />
        </div>
        <div className="relative p-5 py-10 right overflow-hidden w-full h-[100vh]">
          <h2 className='text-2xl my-5 text-gray-600'>Clients</h2>
          <div className="tables my-5 px-5 bg-gray-50 overflow-auto rounded w-full h-[90%]">
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
            clients.length > 0 ? 
            <AdminClientsComponent previewHandler={previewHandler} deleteHandler={deleteHandler} activateHandler={activateHandler} clients={clients} />
            : "NO CLIENT DATA"
            }
          </div>
          {/* preview */}
          {preview && (
            <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full'>
              <div className='w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)] sm:p-5 p-4'>
                <div className='relative bg-[rgba(255,255,255,1)] border md:w-[80%] xl:min-h-[50%] max-h-[80%] rounded p-5 sm:pt-14 xl:flex gap-3 overflow-auto'>
                  <div className="closebtn absolute top-3 right-5 hover:text-red-500 cursor-pointer">
                    <RxCrossCircled onClick={() => setPreview(false)} className='w-7 h-7' />
                  </div>
                  <div className="client w-full">
                    <p className='text-gray-600 font-semibold text-2xl mb-5'>Client info</p>
                    <div className="details">
                      <div className="top xl:flex gap-5">
                        <div className="img-container flex justify-center">
                          <div className="img rounded md:w-[350px] md:h-[350px] w-[150px] h-[150px]"
                            style={{
                              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, .1)), url(${clientPicture})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        </div>
                        <div className="tright">
                          <h2 className="name xl:text-3xl font-semibold capitalize">{name}</h2>
                          <div className="flex xl:text-xl xl:my-0 my-3 items-center gap-2">
                            <p className="email">{email}</p>
                            <span className='w-[5px] h-[5px] bg-gray-500 rounded-full'></span>
                            <p className="phoneNo">0{phoneNo}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bottom my-5 grid xl:grid-cols-3 grid-cols-2 gap-5">
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='xl:text-xl'>Progress Id</p>
                          <p className='p-2 border bg-gray-50 rounded w-full' >{progressId}</p>
                        </div>
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='xl:text-xl'>Client Id</p>
                          <p className='p-2 border bg-gray-50 rounded w-full' >{clientId}</p>
                        </div>
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='xl:text-xl'>Sex</p>
                          <p className='p-2 border bg-gray-50 rounded w-full' >{sex}</p>
                        </div>
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='xl:text-xl'>Date of birth</p>
                          <p className='p-2 border bg-gray-50 rounded w-full' >{age}</p>
                        </div>
                      </div>
                      <p className='text-gray-600 font-semibold md:text-2xl mb-5'>Client account information</p>

                      <div className="client-account-info grid grid-cols-2 gap-5">
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='md:text-xl'>Account status</p>
                          <p className='p-2 border bg-gray-50 rounded w-full flex gap-2 items-center' >{!accountStatus ? "Live" : "Suspended"}
                          <span className={`w-2 h-2 animate-pulse shadow-md ${ !accountStatus ? "shadow-green-600 bg-green-600" : "shadow-red-600 bg-red-600"} rounded-full block`}></span>
                          </p>
                        </div>
                        <div className="progressId text-gray-500 w-full space-y-2">
                          <p className='md:text-xl text-nowrap'>Account creation date</p>
                          <p className='p-2 border bg-gray-50 rounded'>{accountCreationDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="trainer bg-gray-50 border p-5 xl:mt-0 mt-10 w-[50] justify-center">
                    <p className='text-gray-600 font-semibold text-2xl mb-5'>Trainer info</p>
                    <div className="details">
                      <div className="top flex justify-center bg-white p-5 border">
                        <div className="img rounded md:w-[250px] md:h-[250px] w-[150px] h-[150px]"
                          style={{
                            backgroundImage: `url(${trainerPicture})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                      <div className="trainerName text-gray-500 w-full my-2 space-y-2">
                        <p className='text-xl'>Trainer name</p>
                        <p className='p-2 border bg-white rounded'>{trainerName}</p>
                      </div>
                      <div className="trainerId text-gray-500 w-full my-2 space-y-2">
                        <p className='text-xl'>Trainer id</p>
                        <p className='p-2 border bg-white rounded'>{trainerId}</p>
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
                        <button onClick={suspendHandler} className='text-red-500 border border-red-500 rounded p-2 px-5 hover:bg-red-500 transition-all hover:text-white flex gap-2 items-center' >Suspend {suspendLoad && <Spinner />} </button>
                        <button onClick={() => setDeleteClient(false)} className='text-blue-500 border border-blue-500 rounded p-2 px-5 hover:bg-blue-500 transition-all hover:text-white' >Cancel</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* activate */}
          {activateClient && (
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
                        <button onClick={() => setActivateClient(false)} className='text-blue-500 border border-blue-500 rounded p-2 px-5 hover:bg-blue-500 transition-all hover:text-white' >Cancel</button>
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

export default AdminClients