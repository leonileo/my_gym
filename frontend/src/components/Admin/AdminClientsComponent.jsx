import React from 'react'
import { FaEye } from 'react-icons/fa6';
import { MdNoAccounts } from 'react-icons/md';
import { AgeFromDateString } from 'age-calculator';

const AdminClientsComponent = ({ previewHandler, deleteHandler, activateHandler, clients }) => {

  return (
    <div className="table my-5 rounded w-full">
    <table className='w-full'>
      <thead>
        <tr>
          <td className='text-nowrap p-5'>Client id</td>
          <td className='text-nowrap p-5'>First name</td>
          <td className='text-nowrap p-5'>Father name</td>
          <td className='text-nowrap p-5'>Date of birth</td>
          <td className='text-nowrap p-5'>Sex</td>
          <td className='text-nowrap p-5'>Email</td>
          <td className='text-nowrap p-5'>Trainer's id</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr className={`hover:bg-white transition-all`}>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.firstName}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.fatherName}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.clientId}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.DOB ? `${client.DOB.substring(0, 10)} - ${new AgeFromDateString(new Date(client.DOB.substring(0, 10))).age} yrs old` : "Not available"}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.sex}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.email}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${client.isAccountFrozen && "line-through"}`}>{client.trainerId ? client.trainerId : "Not available"}</td>
            <td className={`p-5 text-nowrap text-gray-500`}>
              <div className='flex gap-2 items-center'>
                <button onClick={() => previewHandler(client.picture, `${client.firstName} ${client.fatherName}`, client.email, client.phoneNo, client.progressId, client.clientId, client.sex, client.DOB.substring(0, 10), client.accountStatus, client.createdAt.substring(0, 10), client.trainerId)}
                  className='px-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex gap-2 items-center'><FaEye/> Preview</button>
                {client.isAccountFrozen 
                  ?
                  <button onClick={() => activateHandler(`${client.firstName} ${client.fatherName}`, client.clientId)} className='px-2 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Activate</button>
                  :
                  <button onClick={() => deleteHandler(`${client.firstName} ${client.fatherName}`, client.clientId)} className='px-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Suspend</button>
                }
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    )
}

export default AdminClientsComponent