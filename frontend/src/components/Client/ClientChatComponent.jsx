import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';

const ClientChatComponent = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
     <div className={`chats-section transition-all bg-gray-300 md:max-w-[350px] w-full h-[100vh] md:block ${isSelected && "hidden"} transition-all `}>
            <div className="search-bar p-5">
              <label htmlFor='search' className='px-3 bg-white text-gray-600 rounded-full flex justify-between items-center gap-3'>
                <input placeholder='Search accounts by typing emails here...' type="search" name="search" id="search" className='w-full focus:ring-0 border-none bg-transparent' />
                <FaSearch/>
              </label>
            </div>
            <div className="boxes transition-all">
              <div onClick={() => setIsSelected(!isSelected)} className="chatbox bg-white p-4 hover:bg-gray-50 transition-all cursor-pointer flex gap-2">
                <div className="left">Left</div>
                <div className="right">Right</div>
              </div>
            </div>
          </div>

          <div className={`chat transition-all w-full h-[100vh] md:block ${!isSelected && 'hidden'}`}>
            <div className="details transition-all border-r bg-teal-500 w-full p-3 h-[8vh] text-white">
              <div className="left flex justify-between">
                <div className="lleft">
                  <p className=''> Name</p>
                  <p className=''>Online <span className='w-2 h-2 bg-green-400 rounded-full inline-block'></span> </p>
                </div>
                <div className="lright">
                  {isSelected && <FaArrowLeft onClick={() => setIsSelected(!isSelected)} />}
                </div>
              </div>
              <div className="right"></div>
            </div>
            <div className="chat-box flex justify-center bg-inherit items-center h-[90vh] w-full">
              <p className='p-2 rounded-full bg-gray-200 px-5 text-gray-700'>Select chat to start messaging.</p>
            </div>
          </div>
          </>
  )
}

export default ClientChatComponent