import React from 'react'
import { FaCheck, FaDumbbell } from 'react-icons/fa6'
import { MdTimer } from 'react-icons/md'

const TrainerWorkoutComponent = ({ stepHandler, workoutId, workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList
}) => {
  return (
        <div className='bg-gray-50 border rounded sm:h-[35vh] h-[45vh]' onClick={() =>stepHandler(workoutId, workoutName, workoutCategory, workoutDescription, workoutPicture, workoutVideoLink, workoutDuration, workoutSteps, equipmentRequired, equipmentList)} >
          <div className='h-full rounded-b overflow-auto'>
            <div 
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${workoutPicture})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className='p-4 img rounded-t mb-3 h-[80%] w-full'>
                <p className='bg-[rgba(255,255,255,0.8)] w-fit p-2 rounded capitalize'>{workoutName}</p>
              </div>
              <div className="details p-2 flex justify-start gap-5">
                <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><MdTimer /> {workoutDuration}</p>
                <p className={`p-2 px-3 text-nowrap text-sm text-gray-500 bg-gray-200 rounded flex items-center gap-2`}><FaDumbbell /> {workoutCategory}</p>
                <p className={`p-2 px-3 text-nowrap text-sm text-gray-500  rounded ${equipmentRequired ? "bg-teal-500 text-white": "bg-gray-400 text-white" }`}>{equipmentRequired ? <p className='flex items-center gap-2'>Equipment required <FaCheck /> </p> : "No equipment is required. "}</p>
              </div>
          </div> 
        </div>
  )
}

export default TrainerWorkoutComponent