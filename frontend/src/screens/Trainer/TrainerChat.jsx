import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import TrainerChatComponent from '../../components/Trainer/TrainerChatComponent'

const TrainerChat = () => {
  const [clpsd, setClpsd] = useState(false);

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={5} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] flex">
        <TrainerChatComponent />
      </div>
    </div>
  )
}

export default TrainerChat