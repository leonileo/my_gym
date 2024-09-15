import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { CgCodeSlash, CgLogOut, CgUser } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { Spinner, Tooltip } from 'flowbite-react';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../../slices/authApiSlice';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const TrainerProfile = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [editMode, setEditMode] = useState(0);
  const [newFirstName, setNewFirstName] = useState('');
  const [newFatherName, setNewFatherName] = useState('');
  const [newSex, setNewSex] = useState('');
  const [newDOB, setNewDOB] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNo, setNewPhoneNo] = useState('');

  const [signout, {isLoading: signoutLoad}] = useSignoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // user infotmation
  const { userInfo } = useSelector((state) => state.auth)
  const name = userInfo.name;
  const email = userInfo.email;
  
  const logoutHandler = async () => {
    if (window.confirm('Are you sure you want to logout ?')) {
      try {
          await signout().unwrap();
          dispatch(logout());
          toast.success("Logout successfull!")
          setTimeout(() => {
            navigate('/signin')          
          }, 1500);         
      } catch (error) {
          toast.error(error?.data?.message || error.error);
      }
    }
  }

  return (
      <div className='w-full min-h-[100vh] h-full flex items-start bg-gray-100 '>
        {/* left side */}
        <div  className={`left bg-white z-50 top-0 h-full transition-all ${clpsd ? "w-[100px]": "md:w-[250px]"}`}>
          <TrainerSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={6} />
        </div>

        {/* right */}
        <div className="right overflow-auto overflow-x-hidden w-full h-[100vh] bg-inherit p-5">
          <div className='md:px-5 my-5'>
            {modal === 1 ? (
              <>
              <h2 className=' py-5 md:text-3xl text-xl text-gray-600'>Profile</h2>
              <div className="top flex justify-end w-full pr-5 gap-5">
                <button onClick={() => setModal(2)} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all flex gap-2 items-center'>Edit profile <FaPencil/> </button>
                <button onClick={logoutHandler} className='border border-black p-3 px-5 rounded text-black hover:text-white hover:bg-black transition-all flex gap-2 items-center'>Logout  {signoutLoad ? <Spinner /> : <CgLogOut />} </button>
              </div>
              <div className="bottom md:p-10 mt-4 xl:mt-0 xl:flex gap-3 justify-start space-y-4 xl:space-y-0">
                <div className="rleft xl:w-[40%] w-full bg-white rounded h-fit p-2 px-10">
                  <p className='font-semibold text-xl text-gray-600'>Account information</p>
                  <div className="profile-pic flex items-start gap-5 py-5">
                    <div className="w-[100px] h-[100px] rounded-full pic"
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="txts space-y-2">
                      <h2 className='text-xl font-semibold'>{name}</h2>
                      <div className="flex gap-2 items-center">
                        <div className="badge px-1 w-fit border border-yellow-300 font-light text-yellow-300 rounded flex items-center gap-1">
                          <p>Trainer</p>
                          <CgUser className='w-[25px] h-[25px]'/>
                        </div>
                        <span className='w-[5px] h-[5px] bg-gray-600 rounded-full'></span>
                        <Tooltip content='Trainer id'>
                          <p className='text-gray-600 font-semibold' >{'T-Id-2'}</p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                    <div className="email my-5">
                      <p className='text-gray-500'>Email</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{email}</p>
                    </div>
                    <div className="phoneNo my-5">
                      <p className='text-gray-500'>Phone number</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{'phoneNo'}</p>
                    </div>
                    <div className="verified my-5">
                      <p className='text-gray-500'>Verified trainer</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2 flex gap-3 items-center' >{''} Verified Trainer <MdVerified className='text-blue-500' /></p>
                    </div>
                </div>
                <div className="rright xl:w-[60%] w-full bg-white rounded h-fit p-2 px-10">
                  <p className='font-semibold text-xl text-gray-600'>Personal information</p>
                  <div className="xl:flex gap-2 items-center">
                    <div className="firstName my-5 w-full">
                      <p className='text-gray-500'>First name</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{'first name'}</p>
                    </div>
                    <div className="fatherName my-5 w-full">
                      <p className='text-gray-500'>Father name</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{'father name'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="sex my-5 w-full">
                      <p className='text-gray-500'>Sex</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{'Male'}</p>
                    </div>
                    <div className="DOB my-5 w-full">
                      <p className='text-gray-500'>Date of birth</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{'2000-01-15'}</p>
                    </div>
                  </div>
                  <div className="Description my-5 w-full">
                    <p className='text-gray-500'>Discription</p>
                    <p className='h-[15vh] overflow-auto text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >I am a trainer, with id T-Id-2</p>
                  </div>

                </div>
              </div>
              </>
            ) 
            : (
              <>
              <h2 className='py-5 md:text-3xl text-xl text-gray-600'>Profile</h2>
              <div className="top flex justify-end w-full pr-5">
                <button onClick={() => setModal(1)} className='border border-red-500 p-3 px-5 rounded text-red-500 hover:text-white hover:bg-red-500 transition-all flex gap-2 items-center'>Cancel Edit </button>
              </div>
              <div className="bottom xl:p-10 mt-4 xl:mt-0 xl:flex gap-3 justify-start space-y-4 xl:space-y-0">
                <div onClick={() => setEditMode(1)} className={`transition-all relative ${editMode === 1 && "border-2 border-green-400"} rleft xl:w-[40%] w-full bg-white rounded h-fit p-2 px-5 xl:px-10`}>
                  {/* edit mode */}
                  {editMode === 1 && 
                  <div className="transition-all edit-mode absolute -top-5 left-1 bg-blue-950 px-2 rounded">
                    <p className='text-white flex items-center gap-1'>Edit mode <CgCodeSlash/></p>
                  </div>
                  }
                  <p className='font-semibold text-xl text-gray-600'>Account information</p>
                  <div className="profile-pic flex items-start gap-5 py-5">
                    <div className="relative w-[100px] h-[100px] rounded-full pic overflow-visible"
                      style={{
                        backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <label htmlFor='edit-picture' className="absolute -bottom-0 right-0 p-2 cursor-pointer bg-gray-400 hover:bg-teal-500 transition-all rounded-full text-white ">
                        <FaPencil />
                        <input className='absolute bottom-0 -z-10 opacity-0' type="file" name="edit-picture" id="edit-picture" />
                      </label>
                    </div>
                    <div className="txts space-y-2">
                      <h2 className='text-xl font-semibold'>{name}</h2>
                      <div className="flex gap-2 items-center">
                        <div className="badge px-1 w-fit border border-yellow-300 font-light text-yellow-300 rounded flex items-center gap-1">
                          <p>Trainer</p>
                          <CgUser className='w-[25px] h-[25px]'/>
                        </div>
                        <span className='w-[5px] h-[5px] bg-gray-600 rounded-full'></span>
                        <Tooltip content='Trainer id'>
                          <p className='cursor-not-allowed text-gray-600 font-semibold' >{'T-Id-2'}</p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                    <div className="email my-5">
                      <label htmlFor='email' className='text-gray-500'>Email</label>
                      <input type="email" 
                      name="email" id="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={`${email}`} 
                      className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                    </div>
                    <div className="phoneNo my-5">
                      <label htmlFor='phoneNo' className='text-gray-500'>Phone number</label>
                        <input type="tel"
                        name="phoneNo" id="phoneNo"
                        value={newPhoneNo}
                        onChange={(e) => setNewPhoneNo(e.target.value)}
                        placeholder={`${'phoneNo'}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                    </div>
                    <div className="verified my-5">
                      <p className='text-gray-500'>Verified trainer</p>
                      <p className='cursor-not-allowed text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2 flex gap-3 items-center' >{''} Verified Trainer <MdVerified className='text-blue-500' /></p>
                    </div>
                </div>
                <div onClick={() => setEditMode(2)} className={`transition-all relative ${editMode === 2 && "border-2 border-green-400"} rright xl:w-[60%] w-full bg-white rounded h-fit p-2 px-5 xl:px-10`}>
                  {/* edit mode */}
                  {editMode === 2 && 
                  <div className="transition-all edit-mode absolute -top-5 left-1 bg-blue-950 px-2 rounded">
                    <p className='text-white flex items-center gap-1'>Edit mode <CgCodeSlash/></p>
                  </div>
                  }
                  <p className='font-semibold text-xl text-gray-600'>Personal information</p>
                  <div className="xl:flex gap-2 items-center">
                    <div className="firstName my-5 w-full">
                        <label htmlFor='firstName' className='text-gray-500'>First name</label>
                        <input type="text"
                        name="firstName" id="firstName"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        placeholder={`${'FirstName'}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                    </div>
                    <div className="fatherName my-5 w-full">
                        <label htmlFor='fatherName' className='text-gray-500'>Father name</label>
                        <input type="text"
                        name="fatherName" id="fatherName"
                        value={newFatherName}
                        onChange={(e) => setNewFatherName(e.target.value)}
                        placeholder={`${'FatherName'}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="sex my-5 w-full">
                        <label htmlFor='sex' className='text-gray-500'>Sex</label>
                        <select name="sex" id="sex"
                        value={newSex}
                        onChange={(e) => setNewSex(e.target.value)}
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >
                          <option>Select </option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                    </div>
                    <div className="DOB my-5 w-full">
                        <label htmlFor='DOB' className='text-gray-500'>Date of birth</label>
                        <input type="date"
                        name="DOB" id="DOB"
                        value={newDOB}
                        onChange={(e) => setNewDOB(e.target.value)}
                        placeholder={`${'DOB'}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                    </div>
                  </div>
                  <div className="Description my-5 w-full">
                        <label htmlFor='description' className='text-gray-500'>Description</label>
                        <input type="text"
                        name="description" id="description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder={`${'description'}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                  </div>

                </div>
              </div>
              <div className="updatebtn top my-5 xl:my-0 flex w-full pl-10 ">
                <button className='border w-[250px] border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Update profile</button>
              </div>
              </>
            )}

          </div>

        </div>
      </div>  
      )
}

export default TrainerProfile