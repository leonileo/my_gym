import React, { useState } from 'react'
import { format } from 'timeago.js'
import gymImg from '../../assets/images/gymImg.jpg'
import { Spinner } from 'flowbite-react'

const TrainerRequestComponent = ({request, requestHandler, requestLoading}) => {
    const [load, setLoad] = useState();

  return (
    <form className='h-full rounded-b overflow-hidden'>
        <div className="top flex justify-end gap-2 text-gray-500">
            <p>Request sent</p>
            <span className='font-semibold'>{format(request.date)}</span>
        </div>
        <div className="bottom flex flex-wrap justify-start items-start gap-5">
            <div className="w-[100px] h-[100px] rounded-full"
            style={{
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .2), rgba(6, 148, 162, .2)), url(${request.client ? request.client.picture : gymImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            ></div>
            <div className="name md:text-2xl text-xl text-gray-600">
            <p>{request.client && `${request.client.firstName} ${request.client.fatherName}`}</p>
            <p className='md:text-xl'>{request.note ? request.note : "No additional note written."}</p>
            </div>
        </div>
        <div className="approve-btns flex gap-3 my-5">
            <button onClick={(e) => { setLoad(1); requestHandler(e, true, request.client._id)}} className='w-full px-5 p-2 rounded border border-teal-600 text-teal-600 hover:bg-teal-500 hover:text-white transition-all '>Approve {requestLoading && load === 1 && <Spinner/> }</button>
            <button onClick={(e) => { setLoad(2); requestHandler(e,false, request.client._id)}} className='w-full px-5 p-2 rounded border border-red-600 text-red-600 hover:bg-red-500 hover:text-white transition-all '>Deny {requestLoading && load === 2 && <Spinner/> }</button>
        </div>
    </form>
  )
}

export default TrainerRequestComponent