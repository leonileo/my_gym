import React from 'react'
import { CgTrash } from 'react-icons/cg'
import { MdOutlineEdit } from 'react-icons/md'

const TrainerServiceComponent = ({ servicePicture, serviceName, serviceDescription, id, setCurrId, currId }) => {
  return (
    <div className='border bg-gray-50 rounded p-5 space-y-5'>
      <div className='top flex gap-5 items-start'>
        <div className='img w-full h-[250px] rounded'
          style={{
            backgroundImage: `url(${servicePicture})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
          <div className="opt relative flex gap-1 items-center cursor-pointer">
            <div onClick={() => setCurrId(id)} className='space-y-1'>
              <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
              <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
              <div className="w-[5px] h-[5px] bg-gray-700 rounded-full block"></div>
            </div>
            {/* action modal */}
            {id === currId &&
              <div className="actmodal absolute bg-gray-50 border top-0 right-3 transition-all rounded w-[200px]">
                <button onClick={() => setCurrId('')} className='w-full flex gap-2 items-center hover:bg-gray-100 hover:text-teal-500 transition-all p-2'>Delete service<CgTrash /></button>
                <button onClick={() => setCurrId('')} className='w-full flex gap-2 items-center hover:bg-gray-100 hover:text-teal-500 transition-all p-2'>Update service<MdOutlineEdit /></button>
              </div>
              }
          </div>
      </div>
      <div className="px-5 txt flex gap-4 items-center text-gray-600">
        <p className='border bg-white p-2 rounded font-semibold text-teal-500'>{serviceName}</p>
        <p className='border bg-white p-2 rounded truncate'>{serviceDescription}</p>
      </div>
    </div>

  )
}

export default TrainerServiceComponent