import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { LuUploadCloud } from 'react-icons/lu';
import TrainerServiceComponent from '../../components/Trainer/TrainerServiceComponent';

const TrainerService = () => {
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [currId, setCurrId] = useState('');


  // dummy data
  const services = [
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
    {
      servicePicture: gymImg,
      serviceName: 'Cardio',
      serviceDescription: 'I will help you with any type of cardio exercise.'
    },
  ]
  // dummy data
  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={3} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh]">
        <div className="my-5 md:p-5 p-2">
          {modal === 1 ? (
            <div className="my-services md:px-5 my-5 w-full">
              <h2 className='md:text-3xl text-xl text-gray-600'>Trainer service</h2>
              <div className="top flex justify-end w-full pr-5">
                <button onClick={() => setModal(2)} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Add service</button>
              </div>
              <div className="bottom grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 my-3 gap-5">
                {/* loop through trainer services */}
                {services.map((service, id) => (
                  <TrainerServiceComponent  servicePicture={service.servicePicture}
                  serviceName={ service.serviceName}
                  serviceDescription={ service.serviceDescription}
                  id={id} setCurrId={setCurrId} currId={currId}
                   />
                ))}
              </div>
          </div>
          ) 
          : (
            <div className='h-full p-5'>
              <div className="txt md:text-3xl text-xl flex items-center gap-2">
                <h2 className='text-gray-400 cursor-pointer hover:text-gray-600 transition-all' onClick={() => setModal(1)}>Trainer service / </h2>
                <p className='text-gray-600'>Add service</p>
              </div>
              <div className="add-service p-5 bg-gray-50 border rounded w-full my-5">
                <div className="top xl:flex gap-3 xl:h-[45vh]">
                  <label htmlFor='service-picture' className="add-service-picture group flex justify-center cursor-pointer items-center bg-white hover:border-dashed hover:border-teal-500 transition-all border rounded max-h-[40vh] w-full">
                    <div className='md:space-y-5 space-y-2 relative group-hover:text-teal-500 transition-all'>
                      <div className="flex justify-center">
                        <LuUploadCloud className='xl:w-[250px] w-[80px] h-[80px] xl:h-[250px]'/>
                      </div>
                      <p className='text-center md:text-2xl'>Upload picture</p>
                      <input className='absolute z-0 opacity-0' type="file" name="service-picture" id="service-picture" />
                    </div>
                  </label>
                  <div className="fields w-full my-5 md:m-0 space-y-3">
                    <div className="name xl:flex items-start gap-5 ">
                      <label htmlFor="name" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service name</label>
                      <input type="text" id='name' className='w-full [350px] rounded border-gray-300' />
                    </div>
                    <div className="description xl:flex items-start gap-5 ">
                      <label htmlFor="description" className='md:text-xl w-[250px] text-gray-700 font-semibold'>Service description</label>
                      <textarea name="" id='description' className='w-full [350px] h-[25vh] rounded border-gray-300'></textarea>
                    </div>

                  </div>
                </div>
                <div className="btn flex justify-center">
                  <button type='submit' className='px-5 p-2 rounded border border-teal-500 w-[300px] text-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white transition-all'>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrainerService