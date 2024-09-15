import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import TrainerClientsComponent from '../../components/Trainer/TrainerClientsComponent';

const TrainerClients = () => {
  const [clpsd, setClpsd] = useState(false);
  const [currId, setCurrId] = useState('');

  // dummy data
  const clients = [
    {
      picture: gymImg,
      name: "Client one",
      DOB: '2005-03-15',
      email: 'clientone@mail.com',
      weightBeforeTraining: '90',
      currentWeight: '72',
      plannedWeight: '60',
    },
    {
      picture: gymImg,
      name: "Client two",
      DOB: '2000-03-15',
      email: 'clienttwo@mail.com',
      weightBeforeTraining: '80',
      currentWeight: '65',
      plannedWeight: '50',
    },
    {
      picture: gymImg,
      name: "Client one",
      DOB: '2005-03-15',
      email: 'clientone@mail.com',
      weightBeforeTraining: '90',
      currentWeight: '72',
      plannedWeight: '60',
    },
    {
      picture: gymImg,
      name: "Client two",
      DOB: '2000-03-15',
      email: 'clienttwo@mail.com',
      weightBeforeTraining: '80',
      currentWeight: '65',
      plannedWeight: '50',
    },
    {
      picture: gymImg,
      name: "Client one",
      DOB: '2005-03-15',
      email: 'clientone@mail.com',
      weightBeforeTraining: '90',
      currentWeight: '72',
      plannedWeight: '60',
    },
    {
      picture: gymImg,
      name: "Client two",
      DOB: '2000-03-15',
      email: 'clienttwo@mail.com',
      weightBeforeTraining: '80',
      currentWeight: '65',
      plannedWeight: '50',
    },
    {
      picture: gymImg,
      name: "Client one",
      DOB: '2005-03-15',
      email: 'clientone@mail.com',
      weightBeforeTraining: '90',
      currentWeight: '72',
      plannedWeight: '60',
    },
    {
      picture: gymImg,
      name: "Client two",
      DOB: '2000-03-15',
      email: 'clienttwo@mail.com',
      weightBeforeTraining: '80',
      currentWeight: '65',
      plannedWeight: '50',
    },
  ]

  // dummy data

  return (
    <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
      {/* left side */}
      <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
        <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={2} />
      </div>

      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh]">
        <div className="my-5 md:p-5 p-2">
          <div className='md:px-5 my-5'>
            <h2 className='md:text-3xl text-xl text-gray-600'>My clients</h2>
            <div className="my-clients grid xl:grid-cols-2 gap-4 px-5 my-10">
              {/* loop through clients array */}
              {clients.map((client, id) => 
                <TrainerClientsComponent picture={client.picture} name={client.name} DOB={client.DOB} email={client.email} weightBeforeTraining={client.weightBeforeTraining} currentWeight={client.currentWeight} plannedWeight={client.plannedWeight} id={id} setCurrId={setCurrId} currId={currId}/>
              )}
            </div>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default TrainerClients