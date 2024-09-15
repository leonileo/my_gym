import React, { useState } from 'react'
import ClientSideNavComponent from '../../components/Client/ClientSideNavComponent'
import ClientChatComponent from '../../components/Client/ClientChatComponent';

const ClientChat = () => {
  const [clpsd, setClpsd] = useState(false);

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
         <ClientChatComponent />
        </div>
      </div>
    </>
  )
}

export default ClientChat