import React, { useState } from 'react'
import AdminSideNavComponent from '../../components/Admin/AdminSideNavComponent'
import gymImg from '../../assets/images/gymImg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignoutMutation } from '../../slices/authApiSlice';
import { logout, setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { FaPencil } from 'react-icons/fa6';
import { Spinner } from 'flowbite-react';
import { CgLogOut } from 'react-icons/cg';
import { useAgetProfileQuery, useAupdateProfileMutation, useUploadAdminImageMutation } from '../../slices/adminApiSlice';
import { IoRefresh } from 'react-icons/io5';
import { TbFileSad } from 'react-icons/tb';

const AdminProfile = () => {
  // states
  const [clpsd, setClpsd] = useState(false);
  const [modal, setModal] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {data: profile, isLoading, error, refetch} = useAgetProfileQuery();
  const [signout, {isLoading: signoutLoad}] = useSignoutMutation();
  const [AupdateProfile, {isLoading: updateLoader}] = useAupdateProfileMutation();
  const [uploadAdminImage] = useUploadAdminImageMutation();


  const uploadFileHandler = async (e) =>{
    const formData = new FormData();
    formData.append('picture', e.target.files[0]);
    try {
        const res = await uploadAdminImage(formData).unwrap();
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
            const res = await AupdateProfile({ 
                 email,
                 phoneNo,
                 firstName,
                 fatherName,
                 picture,
                 password: password && password,
                 isTrainer: true
            }).unwrap();
            
            dispatch(setCredentials(res));
            refetch()
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
        <AdminSideNavComponent clpsd={clpsd} setClpsd={setClpsd} step={5} />
      </div>
      {/* right */}
      <div className="right overflow-auto overflow-x-hidden w-full h-[100vh]">
        <div className="relative p-5 py-10 right overflow-auto overflow-x-hidden w-full md: h-[100vh]">
          {isLoading ?
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
          modal === 1 ?
          <>
            <h2 className='text-2xl my-5 font-semibold text-gray-600 transition-all'>Profile</h2>
            <div className="content bg-white rounded p-3 xl:px-10 overflow-auto h-[90%]">
              <div className="top flex justify-center my-5">
                <div>
                  <div className="div pic w-[250px] h-[250px] rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, .1)), url(${profile.picture ? profile.picture : gymImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  ></div>
                  <p className='text-center font-semibold text-2xl my-2'>{firstName} {fatherName}</p>
                </div>
              </div>
              <div className="flex md:flex-row flex-col-reverse justify-between border-t-4 p-2">
                <div className="bcontents w-full space-y-5">
                  <p className='xl:text-2xl mb-5 text-gray-600'>Account information</p>
                  <div className="firstName space-y-2">
                    <p>First name</p>
                    <p className="w-full p-2 bg-gray-50 border rounded">{profile.firstName}</p>
                  </div>
                  <div className="fatherName space-y-2">
                    <p>Father name</p>
                    <p className="w-full p-2 bg-gray-50 border rounded">{profile.fatherName}</p>
                  </div>
                  <div className="email space-y-2">
                    <p>Email</p>
                    <p className="w-full p-2 bg-gray-50 border rounded">{profile.email}</p>
                  </div>
                </div>
                <div className="btns xl:w-[50%] mb-4 xl:mb-0">
                  <div className="top flex text-nowrap xl:justify-end w-full xl:pr-5 gap-5">
                    <button onClick={() => setModal(2)} className='border border-teal-500 xl:p-3 xl:px-5 p-2 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all flex gap-2 items-center'>Edit profile <FaPencil/> </button>
                    <button onClick={logoutHandler} className='border border-black xl:p-3 xl:px-5 p-2 rounded text-black hover:text-white hover:bg-black transition-all flex gap-2 items-center'>Logout  {signoutLoad ? <Spinner /> : <CgLogOut />} </button>
                  </div>
                </div>
              </div>
            </div>
          </>
          : <>
            <h2 className='md:text-2xl font-semibold text-gray-400 transition-all p-5' onClick={() => setModal(1)}>Profile / <span className='text-gray-700'> Edit </span></h2>
            <div className="content bg-white rounded xl:p-3 xl:xl:px p-2-10 overflow-auto h-[90%]">
              <div className="top flex justify-center my-5">
                <div>
                  <div className="relative div pic w-[250px] h-[250px] rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, .1), rgba(6, 148, 162, .1)), url(${ profile.picture ? profile.picture : gymImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  >
                    <label htmlFor='edit-picture' className="absolute bottom-0 right-5 p-5 cursor-pointer bg-gray-400 hover:bg-teal-500 border border-transparent hover:border-white transition-all rounded-full text-white ">
                      <FaPencil />
                      <input onChange={(e) => uploadFileHandler(e)} className='absolute bottom-0 -z-10 opacity-0' type="file" name="edit-picture" id="edit-picture" />
                    </label>
                  </div>
                  <p className='text-center font-semibold text-2xl my-2'>{firstName} {fatherName}</p>
                </div>
              </div>
              <div className="flex md:flex-row flex-col-reverse justify-between border-t-4 p-2">
                <form onSubmit={updateHandler} className="bcontents w-full space-y-5">
                  <p className='xl:text-2xl mb-5 text-gray-600'>Account information</p>
                  <div className="firstName space-y-2">
                    <label htmlFor='firstName'>First name</label >
                    <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" name="firstName" id="firstName" className="w-full p-2 border-gray-300 bg-gray-50 border rounded"/>
                  </div>
                  <div className="fatherName space-y-2">
                    <label htmlFor='fatherName'>Father name</label >
                    <input value={fatherName} onChange={(e) => {setFatherName(e.target.value)}} type="text" name="fatherName" id="fatherName" className="w-full p-2 border-gray-300 bg-gray-50 border rounded"/>
                  </div>
                  <div className="email space-y-2">
                    <label htmlFor='email'>Email</label >
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" id="email" className="w-full p-2 border-gray-300 bg-gray-50 border rounded"/>
                  </div>
                  <div className="password space-y-2">
                    <label htmlFor='password'>Password</label >
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" id="password" className="w-full p-2 border-gray-300 bg-gray-50 border rounded"/>
                  </div>
                  <div className="confirmPassword space-y-2">
                    <label htmlFor='confirmPassword'>Confirm password</label >
                    <input value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} type="password" name="confirmPassword" id="confirmPassword" className="w-full p-2 border-gray-300 bg-gray-50 border rounded"/>
                  </div>
                  <div className="updatebtn top my-5 xl:my-0 flex w-full pl-10 ">
                    <button className='border border-teal-500 p-3 px-5 rounded text-teal-500 hover:text-white hover:bg-teal-500 transition-all flex gap-3 items-center'>Update profile {updateLoader && <Spinner />} </button>
                  </div>
                </form>
                <div className="btns xl:w-[50%] mb-4 xl:mb-0">
                  <div className="top flex justify-end w-full pr-5 gap-5">
                    <button onClick={() => setModal(1)} className='border border-red-500 p-3 px-5 rounded text-red-500 hover:text-white hover:bg-red-500 transition-all flex gap-2 items-center'>Cancel </button>
                  </div>
                </div>
              </div>
            </div>

          </>
          }

        </div>
      </div>
    </div>
  )
}

export default AdminProfile