import React, { useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';

const ClientChat = () => {
  const [clpsd, setClpsd] = useState(false);
  const [isSelected, setIsSelected] = useState(false);


// dummy data

// dummy data

  return (
  <>
      <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100'>
        {/* left side */}
        <div className={`left bg-white h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
          <ClientSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={3} />
        </div>
        <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] flex">
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
        </div>
      </div>
    </>
  )
}

export default ClientChat