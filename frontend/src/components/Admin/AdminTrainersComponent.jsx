import React from 'react'
import { FaEye } from 'react-icons/fa6';
import { MdNoAccounts } from 'react-icons/md';

const AdminTrainersComponent = ({ previewHandler, deleteHandler, activateHandler, trainers }) => {
  return (
    <table>
      <thead>
        <tr>
          <td className='text-nowrap pr-2'>N<u>o</u></td>
          <td className='text-nowrap pr-2'>Trainer id</td>
          <td className='text-nowrap pr-2'>First name</td>
          <td className='text-nowrap pr-2'>Father name</td>
          <td className='text-nowrap pr-2'>Sex</td>
          <td className='text-nowrap pr-2'>Contact</td>
          <td className='text-nowrap pr-2'>Description</td>
          <td className='text-nowrap pr-2'>actions</td>
        </tr>
      </thead>
      <tbody>
        {trainers.map((trainer, id) => (
          <tr key={id}>
            <td className={`p-5 text-nowrap text-gray-500 `}>{id + 1}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.trainerId}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.firstName}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.fatherName}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.sex}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.email ? trainer.email : trainer.phoneNo}</td>
            <td className={`p-5 text-nowrap text-gray-500 ${trainer.isAccountFrozen && "line-through"} `}>{trainer.description ? trainer.description : "Not available"}</td>
            <td className='py-5 text-nowrap text-gray-500'>
              <div className='flex gap-2 items-center'>
                <button onClick={() => previewHandler(
                  trainer.trainerId, `${trainer.firstName} ${trainer.fatherName}`, trainer.sex, trainer.clients.length, trainer.picture, trainer.verifiedTrainer, trainer.description, trainer.serviceList.length, trainer.email, trainer.phoneNo, trainer.myWorkouts.length, trainer.createdAt
                  )}
                  className='px-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex gap-2 items-center'><FaEye/> Preview</button>
                {trainer.isAccountFrozen 
                  ?
                  <button onClick={() => activateHandler(`${trainer.firstName} ${trainer.fatherName}`, trainer.trainerId)} className='px-2 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Activate</button>
                  :
                  <button onClick={() => deleteHandler(`${trainer.firstName} ${trainer.fatherName}`, trainer.trainerId)} className='px-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Suspend</button>
                }
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminTrainersComponent