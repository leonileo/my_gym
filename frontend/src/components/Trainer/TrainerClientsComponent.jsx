import React from 'react'
import { AgeFromDateString } from 'age-calculator';
import { AiOutlineMessage } from "react-icons/ai";
import gymImg from '../../assets/images/gymImg.jpg'

const TrainerClientsComponent = ({ setClient, client, id, setCurrId, currId }) => {
  return (
  <div className='bg-white border rounded p-5 xl:max-h-[35vh] h-full grid gap-3'>
    <div className="top flex justify-between h-fit mb-5">
      <div className="left flex items-start gap-3 rounded-full">
        <div className="img w-[70px] h-[70px] rounded-full"
          style={{
            backgroundImage: `url(${client.picture ? client.picture : gymImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="txt">
          <p className='font-semibold md:text-2xl text-xl'>{client.name}</p>
          <div className="flex gap-2 text-gray-500 items-start">
            <p>{new AgeFromDateString(new Date(client.DOB.substring(0, 10))).age} Years old</p>
            <p>{client.email}</p>
          </div>
        </div>
      </div>
      <div className="right cursor-pointer relative" onClick={() => setCurrId(id)} >
        <div className="opt flex gap-1 items-center">
          <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
          <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
          <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
        </div>
        {/* action modal */}
        {id === currId &&
        <div className="actmodal absolute bg-gray-50 border right-0 rounded w-[200px]">
{/* Will be implemented after the chat functionality */}
          {/* <button onClick={() => setCurrId('')} className='w-full flex gap-2 items-center hover:bg-gray-100 hover:text-teal-500 transition-all p-2'>Send a message <AiOutlineMessage /></button> */}
          <button onClick={() => { setClient(
            client.clientId, 
            client.firstName, 
            client.fatherName, 
            client.sex, 
            client.DOB, 
            client.picture, 
            client.progressId, 
            client.weightBeforeTraining, 
            client.currentWeight, 
            client.plannedWeight, 
            client.email, 
            client.phoneNo, 
            client.workoutsAssignedForMe, 
            client.isAccountFrozen
          ); setCurrId('')}} className='w-full flex gap-2 items-center hover:bg-gray-100 hover:text-teal-500 transition-all p-2'>View details</button>
        </div>
        }
      </div>
    </div>

    <div className="bottom grid grid-cols-3 bg-gray-50 rounded py-2 h-full border">
      <div className="wbox flex justify-center text-center px-2 text-gray-500 border-x">
        <div>
          <p className='capitalize'><span className='xl:inline-block hidden'> Weight</span> before training</p>
          <p className='text-gray-600 text-2xl font-semibold italic'>{client.weightBeforeTraining}</p>
        </div>
      </div>
      <div className="wbox flex justify-center text-center px-2 text-gray-500 border-x">
        <div>
          <p className='capitalize'>Current weight</p>
          <p className='text-gray-600 text-2xl font-semibold italic'>{client.currentWeight}</p>
        </div>
      </div>
      <div className="wbox flex justify-center text-center px-2 text-gray-500 border-x">
        <div>
          <p className='capitalize'>Goal weight</p>
          <p className='text-gray-600 text-2xl font-semibold italic'>{client.plannedWeight}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TrainerClientsComponent