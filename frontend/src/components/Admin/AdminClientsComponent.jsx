import React from 'react'
import { FaEye } from 'react-icons/fa6';
import { MdNoAccounts } from 'react-icons/md';
import gymImg from '../../assets/images/gymImg.jpg'

const AdminClientsComponent = ({ previewHandler, deleteHandler, clients }) => {

  return (
    <div className="table my-5 xl:px-5 bg-gray-100 rounded">
    <table>
      <thead>
        <tr>
          <td className='text-nowrap pr-2'>Client id</td>
          <td className='text-nowrap pr-2'>First name</td>
          <td className='text-nowrap pr-2'>Father name</td>
          <td className='text-nowrap pr-2'>Date of birth</td>
          <td className='text-nowrap pr-2'>Sex</td>
          <td className='text-nowrap pr-2'>Email</td>
          <td className='text-nowrap pr-2'>Trainer's id</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.clientId}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.firstName}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.fatherName}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.DOB}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.sex}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.email}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{client.trainerId}</td>
            <td className='py-5 text-nowrap text-gray-500'>
              <div className='flex gap-2 items-center'>
                <button onClick={() => previewHandler(gymImg, `${client.firstName} ${client.fatherName}`, client.email, client.phoneNo, client.progressId, client.clientId, client.sex, client.DOB, client.accountStatus, client.accountCreationDate, client.trainerPicture, client.trainerName, client.trainerId)}
                  className='px-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex gap-2 items-center'><FaEye/> Preview</button>
                <button onClick={() => deleteHandler(gymImg, `${client.firstName} ${client.fatherName}`, client.email, client.phoneNo, client.progressId, client.clientId, client.sex, client.DOB, client.accountStatus, client.accountCreationDate, client.trainerPicture, client.trainerName, client.trainerId)} className='px-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Suspend</button>
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