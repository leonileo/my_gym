import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { LuUploadCloud } from 'react-icons/lu';
import TrainerServiceComponent from '../../components/Trainer/TrainerServiceComponent';
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServiceQuery, useUpdateServiceMutation, useUploadTrainerImageMutation } from '../../slices/trainerApiSlice';
import { toast } from 'react-toastify';
import { FaCircleXmark } from 'react-icons/fa6';
import { Spinner } from 'flowbite-react';
import { TbFileSad } from 'react-icons/tb';
import { IoRefresh } from 'react-icons/io5';

const TrainerService = () => {
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [currId, setCurrId] = useState('');

  const [serviceId, setServiceId] = useState();
  const [serviceName, setServiceName] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [picture, setPicture] = useState();

  // dummy data
  // const services = [
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  //   {
  //     servicePicture: gymImg,
  //     serviceName: 'Cardio',
  //     serviceDescription: 'I will help you with any type of cardio exercise.'
  //   },
  // ]
  // dummy data

  const { data: service, isLoading, error, refetch } = useGetServiceQuery();
  const services = isLoading ? [] : error ? [] : service.myServices;

  const [createService, { isLoading: createServiceLoading}] = useCreateServiceMutation();
  const [updateService, { isLoading: updateServiceLoading}] = useUpdateServiceMutation();
  const [deleteService, { isLoading: deleteServiceLoading}] = useDeleteServiceMutation();
  const [uploadTrainerImage] = useUploadTrainerImageMutation();

  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);
    try {
        const res = await uploadTrainerImage(formData).unwrap();
        toast.success(res.message);
        setPicture(res.picture);
    } catch (error) {
        toast.error(error?.data?.message || error?.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addService = {
      serviceName,
      serviceDescription,
      servicePicture: picture
    }

    const newService = await createService(addService)
    if (newService.error) {
        toast.error(newService.error?.data?.message);
    } else {
        toast.success("Service Created!")
        refetch()
        setTimeout(() => {
            setModal(1)
        }, 500)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await updateService({
          serviceId,
          serviceName,
          serviceDescription,
          servicePicture: picture
        }).unwrap(); 
        toast.success('Service updated');
        refetch();
        setModal(1)
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      const updatedService = {
        serviceId,
        serviceName,
        serviceDescription,
        servicePicture: picture
    }

    const result = await updateService(updatedService);
    if (result.error) {
        toast.error(result.error);
    } else {
        toast.success('Service updated');
        setModal(1)
    }
  }

  const deleteHandler = async (serviceID) => {
    if (window.confirm(`Are you sure you want to delete ${serviceID}`)) {
      try {
        await deleteService(serviceID);
        refetch()
        toast.success("Service Deleted")
        setTimeout(() => {
          setModal(1)
        }, 1500);
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    } else {
      alert("Service deletion canceled")
    }
  }

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={3} />
      </div>

      {/* right */}
      <div className="right relative overflow-auto overflow-x-hidden w-full h-[100vh]">
        <div className="my-5 md:p-5 p-2">
          {(modal === 1 || modal === 4) && (
            <div className="my-services md:px-5 my-5 w-full">
              <h2 className='md:text-3xl text-xl text-gray-600'>Trainer service</h2>
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
            : <>
                {services.length > 0 && <div className="top flex justify-end w-full pr-5">
                  <button onClick={() => setModal(2)} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Add service</button>
                </div>}
                <div className={`bottom ${services.length > 0 &&"grid"} xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-3 gap-5`}>
                  {/* loop through trainer services */}
                  {services.length > 0 ? services.map((service, id) => (
                    <TrainerServiceComponent
                    servicePicture={service.servicePicture ? service.servicePicture : gymImg }
                    serviceName={ service.serviceName}
                    serviceDescription={ service.serviceDescription}
                    id={id} setCurrId={setCurrId} currId={currId} 
                    setModal={setModal}
                    setServiceName={setServiceName}
                    setServiceDescription={setServiceDescription}
                    setPicture={setPicture}
                    setServiceId={setServiceId}
                    serviceId={service._id}
                  />
                  )) 
                  :
                  <div className='flex justify-center items-center w-full h-[25vh]'>
                      <div className=' xl:text-4xl text-2xl'>
                        <p className='flex items-center gap-3 text-teal-500'>There are no services you created. <TbFileSad /></p>
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => setModal(2)} className='my-3 text-2xl rounded text-teal-500 hover:underline transition-all'>Create service now</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </>
              }
          </div>
          )}

          {/* create service modal */}
          { modal === 2 && (
            <div className='h-full p-5'>
              <div className="txt md:text-2xl text-xl flex items-center gap-2 transition-all">
                <h2 className='text-gray-400 cursor-pointer hover:text-gray-600 transition-all' onClick={() => setModal(1)}>Trainer service / </h2>
                <p className='text-gray-600 transition-all'>Add service</p>
              </div>
              <form onSubmit={handleSubmit} className="add-service p-5 bg-gray-50 border rounded w-full my-5">
                <div className="btn flex justify-end my-5">
                  <button onClick={() => { setServiceName(''); setServiceDescription(''); setPicture(''); setModal(1)}} className='px-5 p-2 rounded border border-red-500 max-w-[300px] text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all flex gap-4 items-center'>
                    Close
                    <FaCircleXmark/>
                  </button>
                </div>
                <div className="top xl:flex gap-3 xl:h-[45vh]">
                  <label htmlFor='service-picture' className="add-service-picture group flex justify-center cursor-pointer items-center bg-white hover:border-dashed hover:border-teal-500 transition-all border rounded max-h-[40vh] w-full">
                    <div className='md:space-y-5 space-y-2 relative group-hover:text-teal-500 transition-all'>
                        {picture ? picture :
                        <div className="flex justify-center">
                          <LuUploadCloud className='xl:w-[250px] w-[80px] h-[80px] xl:h-[250px]'/>
                        </div>
                        }
                      <p className='text-center md:text-2xl'>Upload picture</p>
                      <input onChange={(e) => {uploadFileHandler(e)}} className='absolute z-0 opacity-0' type="file" name="service-picture" id="service-picture" />
                    </div>
                  </label>
                  <div className="fields w-full my-5 md:m-0 space-y-3">
                    <div className="name xl:flex items-start gap-5 ">
                      <label htmlFor="name" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service name</label>
                      <input onChange={(e) => setServiceName(e.target.value)} type="text" id='name' className='w-full [350px] rounded border-gray-300' />
                    </div>
                    <div className="description xl:flex items-start gap-5 ">
                      <label htmlFor="description" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service description</label>
                      <textarea onChange={(e) => setServiceDescription(e.target.value)} name="" id='description' className='w-full [350px] h-[25vh] rounded border-gray-300'></textarea>
                    </div>

                  </div>
                </div>
                <div className="btn flex justify-center">
                  <button type='submit' className='px-5 p-2 rounded border border-teal-500 text-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white transition-all flex gap-3 items-center'>
                    Submit {createServiceLoading && <Spinner />}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* preview modal */}
          {modal === 3 && (
            <div className='h-full p-5'>
              <div className="txt md:text-2xl text-xl flex items-center gap-2 transition-all">
                <h2 className='text-gray-400 cursor-pointer hover:text-gray-600 transition-all' onClick={() => setModal(1)}>Trainer service / </h2>
                <p className='text-gray-600 transition-all'>{serviceName}</p>
              </div>
              <div className="add-service p-5 bg-gray-50 border rounded w-full my-5">
                <div className="btn flex justify-end">
                  <button onClick={() => { setServiceName(''); setServiceDescription(''); setPicture(''); setModal(1)}} className='px-5 p-2 rounded border border-red-500 max-w-[300px] text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all flex gap-4 items-center'>
                    Close
                    <FaCircleXmark/>
                  </button>
                </div>

                <div className="top gap-3 my-5">
                  <div className="add-service-picture group flex justify-center items-center bg-white transition-all border rounded min-h-[40vh] w-full">
                    <div className='md:space-y-5 space-y-2 p-5 w-[550px] h-[550px] flex justify-center items-center relative'>
                      <div className='img w-full h-full rounded'
                        style={{
                          backgroundImage: `url(${picture})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="fields w-[50%] my-5 md:m-0 space-y-3">
                    <div className="name gap-5 space-y-2 my-2">
                      <p className='md:text-2xl w-[250px] text-gray-700 font-semibold'>Service name</p>
                      <div className='w-full rounded bg-white p-3 border'>{serviceName}</div>
                    </div>
                    <div className="description gap-5 space-y-2 my-2">
                      <p className='md:text-2xl w-[250px] text-gray-700 font-semibold'>Service description</p>
                      <div className='w-full rounded bg-white p-3 border'>{serviceDescription}</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* delete modal */}
          {modal === 4 && (
            <div className='bg-[rgba(0,0,0,0.5)] w-full p-2 top-0 left-0 absolute h-[100vh] flex justify-center items-center'>
               <div className="bg-white rounded border w-full xl:w-[50%] p-2 py-5 flex items-center justify-center">
                <div>
                  <p className='text-center xl:text-2xl text-xl'>You are going to delete service {serviceName}. <br/> Do you want to proceede?</p>
                  <div className="flex gap-2 justify-center my-5 items-center">
                    <button onClick={() => { deleteHandler(serviceId) }} className='border p-2 rounded bg-white border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white'>
                      Delete {deleteServiceLoading && <Spinner /> }
                    </button>
                    <button onClick={() => setModal(1)} className='border p-2 rounded bg-white border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white'>Cancle</button>
                  </div>
                </div>
               </div>
            </div>
          )}

          {/* update modal */}
          { modal === 5 && (
            <div className='h-full p-5'>
              <div className="txt md:text-2xl text-xl flex items-center gap-2 transition-all">
                <h2 className='text-gray-400 cursor-pointer hover:text-gray-600 transition-all' onClick={() => setModal(1)}>Trainer service / </h2>
                <p className='text-gray-600 transition-all'>Update service</p>
              </div>
              <form onSubmit={handleUpdate} className="add-service p-5 bg-gray-50 border rounded w-full my-5">
                <div className="btn flex justify-end my-5">
                  <button onClick={() => { setServiceName(''); setServiceDescription(''); setPicture(''); setModal(1)}} className='px-5 p-2 rounded border border-red-500 max-w-[300px] text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all flex gap-4 items-center'>
                    Close
                    <FaCircleXmark/>
                  </button>
                </div>
                <div className="top xl:flex gap-3 xl:h-[45vh]">
                  <div className="add-service-picture group flex justify-center cursor-pointer items-center bg-white transition-all border rounded max-h-[40vh] overflow-auto w-full">
                    <div className='md:space-y-5 space-y-2 p-5 w-[550px] max-h-[550px] h-full flex justify-center items-center relative'>
                      <div className='w-full relative'>
                        <div className='img w-full mb-5 h-[250px] rounded'
                          style={{
                            backgroundImage: `url(${picture})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        ></div>
                        <input onChange={(e) => {uploadFileHandler(e)}} className='absolute -z-10 opacity-0 ' type="file" name="service-picture" id="service-picture" />
                        <label htmlFor='service-picture' className='text-center p-2 cursor-pointer z-10 px-5 border rounded border-teal-500 hover:bg-teal-500 hover:text-white transition-all' >Update picture</label>
                      </div>
                    </div>
                  </div>
                  <div className="fields w-full my-5 md:m-0 space-y-3">
                    <div className="name xl:flex items-start gap-5 ">
                      <label htmlFor="name" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service name</label>
                      <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} type="text" id='name' className='w-full [350px] rounded border-gray-300' />
                    </div>
                    <div className="description xl:flex items-start gap-5 ">
                      <label htmlFor="description" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service description</label>
                      <textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} name="" id='description' className='w-full [350px] h-[25vh] rounded border-gray-300'></textarea>
                    </div>

                  </div>
                </div>
                <div className="btn flex justify-center">
                  <button type='submit' className='px-5 p-2 rounded border border-teal-500 text-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white transition-all flex items-center gap-3'>
                    Update {updateServiceLoading && <Spinner />}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default TrainerService