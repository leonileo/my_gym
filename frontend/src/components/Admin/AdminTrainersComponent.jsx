import React from 'react'
import { FaEye } from 'react-icons/fa6';
import { MdNoAccounts } from 'react-icons/md';
import gymImg from '../../assets/images/gymImg.jpg'

const AdminTrainersComponent = ({ previewHandler, deleteHandler, trainers }) => {
  return (
    <table className='w-full overflow-auto'>
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
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{id + 1}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.trainerId}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.firstName}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.fatherName}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.sex}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.email ? trainer.email : trainer.phoneNo}</td>
            <td className='py-5 text-nowrap text-gray-500 pr-2'>{trainer.description}</td>
            <td className='py-5 text-nowrap text-gray-500'>
              <div className='flex gap-2 items-center'>
                <button onClick={() => previewHandler(
                  trainer.trainerId, `${trainer.firstName} ${trainer.fatherName}`, trainer.sex, trainer.clients, gymImg, trainer.verifiedTrainer, trainer.description, trainer.serviceList, trainer.email, trainer.phoneNo, trainer.myWorkouts, trainer.accountCreationDate
                  )}
                  className='px-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex gap-2 items-center'><FaEye/> Preview</button>
                <button onClick={() => deleteHandler(gymImg, `${trainer.firstName} ${trainer.fatherName}`, trainer.email, trainer.phoneNo, trainer.progressId, trainer.clientId, trainer.sex, trainer.DOB, trainer.accountStatus, trainer.accountCreationDate, trainer.trainerPicture, trainer.trainerName, trainer.trainerId)} className='px-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all flex gap-2 items-center'><MdNoAccounts/> Suspend</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminTrainersComponent