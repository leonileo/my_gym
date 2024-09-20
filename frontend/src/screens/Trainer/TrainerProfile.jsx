import React, { useState } from 'react'
import TrainerSideNavComponent from '../../components/Trainer/TrainerSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { useDispatch } from 'react-redux';
import { CgCodeSlash, CgLogOut, CgUser } from 'react-icons/cg';
import { MdVerified } from 'react-icons/md';
import { Spinner, Tooltip } from 'flowbite-react';
import { FaPencil } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../../slices/authApiSlice';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useUpdateProfileMutation, useUploadTrainerImageMutation } from '../../slices/trainerApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';

const TrainerProfile = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [editMode, setEditMode] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [sex, setSex] = useState('');
  const [DOB, setDOB] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {data: profile, isLoading, error} = useGetProfileQuery();
  const [signout, {isLoading: signoutLoad}] = useSignoutMutation();
  const [updateProfile, {isLoading: updateProfileLoad, error: errorUpdate}] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // user infotmation  
  const [uploadTrainerImage] = useUploadTrainerImageMutation();

  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);
    try {
        const res = await uploadTrainerImage(formData).unwrap();
        toast.success(res.message);
        setPicture(res.picture);
    } catch (error) {
        toast.error(error?.data?.message || error?.error)
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error('Password do not match')
    } else{
        try {
            const res = await updateProfile({ 
                 email,
                 phoneNo,
                 firstName,
                 fatherName,
                 sex,
                 DOB,
                 description,
                 picture,
                 password: password && password,
                 isTrainer: true
            }).unwrap();
            
            dispatch(setCredentials(res));
            toast.success('Profile updated successfully.')
            setModal(1)
        } catch (error) {
            toast.error(error?.data?.message || error.error)                
        }
    }
  }

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
          { isLoading ?
          <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
            <div className='flex gap-2 items-center xl:text-[30px] transition-all'>
              <p className='text-teal-500'>Loading...</p>
              <Spinner className='xl:w-[30px] xl:h-[30px]' />
            </div>
          </div>   
          : error ? 
          <div className='flex justify-center items-center w-full h-[50vh] transition-all'>
            <div className='flex gap-2 items-center xl:text-[30px] transition-all'>
              <div>
                <div className='flex items-center gap-4 text-center'>
                  <p className='text-teal-500'>An error has occured. please refresh the page and try again.</p>
                  <TbFileSad className='text-teal-500'/>
                </div>
                <div className='flex items-center justify-center gap-4 text-teal-400 animate-pulse'>
                  <button onClick={() => window.location.reload()} className='text-center flex gap-2 items-center'>Refresh</button>
                  <IoRefresh />
                </div>
              </div>
            </div>
          </div>
          :
          <div className='md:px-5 my-5'>
            {modal === 1 ? (
              <>
              <h2 className=' py-5 md:text-3xl text-xl text-gray-600'>Profile</h2>
              <div className="top flex justify-end w-full pr-5 gap-5">
                <button onClick={() => {
                  setEmail(profile.email ? profile.email : "");
                  setPhoneNo(profile.phoneNo ? profile.phoneNo : "");
                  setFirstName(profile.firstName ? profile.firstName : "");
                  setFatherName(profile.fatherName ? profile.fatherName : "");
                  setSex(profile.sex ? profile.sex : "");
                  setDOB(profile.DOB ? profile.DOB : "");
                  setDescription(profile.description ? profile.description :"");
                  setPicture(profile.picture ? profile.picture : "");

                  setModal(2);
                }} className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all flex gap-2 items-center'>
                  Edit profile <FaPencil/> 
                </button>
                <button onClick={logoutHandler} className='border border-black p-3 px-5 rounded text-black hover:text-white hover:bg-black transition-all flex gap-2 items-center'>Logout  {signoutLoad ? <Spinner /> : <CgLogOut />} </button>
              </div>
              <div className="bottom md:p-10 mt-4 xl:mt-0 xl:flex gap-3 justify-start space-y-4 xl:space-y-0">
                <div className="rleft xl:w-[40%] w-full bg-white rounded h-fit p-2 px-10">
                  <p className='font-semibold text-xl text-gray-600'>Account information</p>
                  <div className="profile-pic flex items-start gap-5 py-5">
                    <div className="w-[100px] h-[100px] rounded-full pic"
                      style={{
                        backgroundImage: `url(${profile.picture ? profile.picture : gymImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="txts space-y-2">
                      <h2 className='text-xl font-semibold'>{profile.firstName} {profile.fatherName}</h2>
                      <div className="flex gap-2 items-center">
                        <div className="badge px-1 w-fit border border-yellow-300 font-light text-yellow-300 rounded flex items-center gap-1">
                          <p>Trainer</p>
                          <CgUser className='w-[25px] h-[25px]'/>
                        </div>
                        <span className='w-[5px] h-[5px] bg-gray-600 rounded-full'></span>
                        <Tooltip content='Trainer id'>
                          <p className='text-gray-600 font-semibold' >{profile.trainerId}</p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                    <div className="email my-5">
                      <p className='text-gray-500'>Email</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.email}</p>
                    </div>
                    <div className="phoneNo my-5">
                      <p className='text-gray-500'>Phone number</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.phoneNo ? profile.phoneNo : "Not available"}</p>
                    </div>
                    {profile.verifiedTrainer &&
                    <div className="verified my-5">
                      <p className='text-gray-500'>Verified trainer</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2 flex gap-3 items-center'>Verified Trainer <MdVerified className='text-blue-500' /></p>
                    </div>}
                </div>
                <div className="rright xl:w-[60%] w-full bg-white rounded h-fit p-2 px-10">
                  <p className='font-semibold text-xl text-gray-600'>Personal information</p>
                  <div className="xl:flex gap-2 items-center">
                    <div className="firstName my-5 w-full">
                      <p className='text-gray-500'>First name</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.firstName}</p>
                    </div>
                    <div className="fatherName my-5 w-full">
                      <p className='text-gray-500'>Father name</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.fatherName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="sex my-5 w-full">
                      <p className='text-gray-500'>Sex</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.sex ? profile.sex : "Not available"}</p>
                    </div>
                    <div className="DOB my-5 w-full">
                      <p className='text-gray-500'>Date of birth</p>
                      <p className='text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.DOB ? profile.DOB.substring(0, 10) : "Not available"}</p>
                    </div>
                  </div>
                  <div className="Description my-5 w-full">
                    <p className='text-gray-500'>Discription</p>
                    <p className='h-[15vh] overflow-auto text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' >{profile.description ? profile.description : "Not available"}</p>
                  </div>

                </div>
              </div>
              </>
            ) 
            : (
              <>
              <h2 className='font-semibold my-5 md:text-3xl text-xl text-gray-400 transition-all p-5' onClick={() => setModal(1)}>Profile / <span className='text-gray-700'> Edit</span></h2>

              <div className="top flex justify-end w-full pr-5">
                <button onClick={() => setModal(1)} className='border border-red-500 p-3 px-5 rounded text-red-500 hover:text-white hover:bg-red-500 transition-all flex gap-2 items-center'>Cancel Edit </button>
              </div>
              <form onSubmit={updateHandler} >
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
                          backgroundImage: `url(${picture ? picture : gymImg})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <label htmlFor='edit-picture' className="absolute -bottom-0 right-0 p-2 cursor-pointer bg-gray-400 hover:bg-teal-500 transition-all rounded-full text-white ">
                          <FaPencil />
                          <input onChange={(e) => {uploadFileHandler(e)}} className='absolute bottom-0 -z-10 opacity-0' type="file" name="edit-picture" id="edit-picture" />
                        </label>
                      </div>
                      <div className="txts space-y-2">
                        <h2 className='text-xl font-semibold'>{firstName} {fatherName}</h2>
                        <div className="flex gap-2 items-center">
                          <div className="badge px-1 w-fit border border-yellow-300 font-light text-yellow-300 rounded flex items-center gap-1">
                            <p>Trainer</p>
                            <CgUser className='w-[25px] h-[25px]'/>
                          </div>
                          <span className='w-[5px] h-[5px] bg-gray-600 rounded-full'></span>
                          <Tooltip content='Trainer id'>
                            <p className='cursor-not-allowed text-gray-600 font-semibold' >{profile.trainerId}</p>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                      <div className="email my-5">
                        <label htmlFor='email' className='text-gray-500'>Email</label>
                        <input type="email" 
                        name="email" id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={`${email}`} 
                        className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                      <div className="phoneNo my-5">
                        <label htmlFor='phoneNo' className='text-gray-500'>Phone number</label>
                          <input type="tel"
                          name="phoneNo" id="phoneNo"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          placeholder={`${'phoneNo'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                      <div className="password my-5">
                        <label htmlFor='password' className='text-gray-500'>Password</label>
                          <input type="password"
                          name="password" id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={`${'password'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                      <div className="confirmPassword my-5">
                        <label htmlFor='confirmPassword' className='text-gray-500'>Confirm password</label>
                          <input type="password"
                          name="confirmPassword" id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder={`${'Confirm password'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                      {profile.verifiedTrainer &&
                      <div className="verified my-5">
                        <p className='text-gray-500'>Verified trainer</p>
                        <p className='cursor-not-allowed text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2 flex gap-3 items-center' >{''} Verified Trainer <MdVerified className='text-blue-500' /></p>
                      </div>
                      }
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
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={`${'FirstName'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                      <div className="fatherName my-5 w-full">
                          <label htmlFor='fatherName' className='text-gray-500'>Father name</label>
                          <input type="text"
                          name="fatherName" id="fatherName"
                          value={fatherName}
                          onChange={(e) => setFatherName(e.target.value)}
                          placeholder={`${'FatherName'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="sex my-5 w-full">
                          <label htmlFor='sex' className='text-gray-500'>Sex</label>
                          <select name="sex" id="sex"
                          value={sex}
                          onChange={(e) => setSex(e.target.value)}
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
                          value={DOB}
                          onChange={(e) => setDOB(e.target.value)}
                          placeholder={`${'DOB'}`} 
                          className='block w-full border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2' />
                      </div>
                    </div>
                    <div className="Description my-5 w-full">
                          <label htmlFor='description' className='text-gray-500'>Description</label>
                          <textarea 
                          name="description" id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder={`${description}`} 
                          className='block w-full resize-none [80%] h-[15vh] border-gray-200 text-gray-700 font-semibold bg-gray-50 border rounded-md p-3 mt-2'
                          ></textarea>
                    </div>

                  </div>
                </div>
                <div className="updatebtn top my-5 xl:my-0 flex w-full pl-10 ">
                  {updateProfileLoad ?
                  <button disabled className='border w-[250px] border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>
                    Updating profile <Spinner /> </button>
                  : errorUpdate ? 
                  <button type='submit' className='border w-[250px] border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Error try again</button>
                  :
                  <button type='submit' className='border w-[250px] border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all'>Update profile</button>
                  }
                </div>
              </form>
              </>
            )}

          </div>
          }
        </div>
      </div>  
      )
}

export default TrainerProfile