import React, { useState } from 'react'
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent'
import AdminChatComponent from '../../components/Admin/AdminChatComponent';

const AdminChat = () => {
  // states
  const [clpsd, setClpsd] = useState(false);

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={4} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] flex">
        <AdminChatComponent />
      </div>
    </div>
    )
}

export default AdminChat