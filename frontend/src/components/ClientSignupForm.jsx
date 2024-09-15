import React, { useState } from 'react'
import { FloatingLabel, Spinner } from 'flowbite-react'
import { FaArrowRight, FaEnvelope, FaLock, FaPhone, FaUser } from 'react-icons/fa6'
import { toast } from 'react-toastify';
import { useSignupClientMutation } from '../slices/authApiSlice';
import { useNavigate } from 'react-router-dom';

const ClientSignupForm = () => {
  // states
  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [signupClient, {isLoading}] = useSignupClientMutation()

  const navigate = useNavigate();

  const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Passwords don\'t match')
      } else {
        try {
            await signupClient({ firstName, fatherName, sex, DOB: dob, email, phoneNo, password }).unwrap();
            toast.success("Account created successfull!")
            setTimeout(() => {
                navigate('/signin');
            }, 1500)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
      }
  }

  return (
    <>
     <form onSubmit={submitHandler} className="form w-full px-5 my-5">
        <span className='text-gray-500 font-semibold'>Client signup</span>
        <div className="topc md:my-5 md:space-y-4 my-2 space-y-2 text-gray-600">
            <h1 className='font-bold md:text-4xl text-2xl'>My gym</h1>
            <p className='md:text-2xl'>Create your account</p>
        </div>
          <div className="inputs space-y-5 pr-8">
            <label htmlFor='firstName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
              <div className="in w-full">
                <FloatingLabel required value={firstName} onChange={(e) => setFirstName(e.target.value)} id='firstName' type='text' variant="filled" label="First name" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
              </div>
              <div className="icon text-teal-500"><FaUser /></div>
            </label>
            <label htmlFor='fatherName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
              <div className="in w-full">
                <FloatingLabel required value={fatherName} onChange={(e) => setFatherName(e.target.value)} id='fatherName' type='text' variant="filled" label="Father name" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
              </div>
              <div className="icon text-teal-500"><FaUser /></div>
            </label>
            <label htmlFor='email' className="input-box pr-2 w-full border rounded flex items-center justify-between">
              <div className="in w-full">
                <FloatingLabel required value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' variant="filled" label="Email address" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
              </div>
              <div className="icon text-teal-500"><FaEnvelope /></div>
            </label>
            <div className="flex gap-5">
              <label htmlFor='password' className="input-box pr-2 w-full border rounded flex items-center justify-between">
                <div className="in w-full">
                  <FloatingLabel minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' variant="filled" label="Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
                </div>
                <div className="icon text-teal-500"><FaLock /></div>
              </label>
              <label htmlFor='confirmPassword' className="input-box pr-2 w-full border rounded flex items-center justify-between">
                <div className="in w-full">
                  <FloatingLabel minLength={6} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id='confirmPassword' type='password' variant="filled" label="Confirm Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
                </div>
                <div className="icon text-teal-500"><FaLock /></div>
              </label>
            </div>
            <div className='w-full flex gap-5 items-start'>
              <label htmlFor='phoneNo' className="input-box pr-2 w-fit border rounded flex items-center justify-between">
                <div className="in w-full">
                  <FloatingLabel required minLength={10} value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} id='phoneNo' type='tel' variant="filled" label="Phone number" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
                </div>
                <div className="icon text-teal-500"><FaPhone /></div>
              </label>
              <label htmlFor='DOB' className="input-box pr-2 border rounded flex items-center justify-between">
                <div className="in w-full">
                  <input type="date" required value={dob} onChange={(e) => setDOB(e.target.value)} id='DOB' className='focus:ring-0 font-semibold text-teal-500 bg-transparent border-0' />
                </div>
              </label>
              <label htmlFor='sex' className="input-box pr-2 rounded flex items-center justify-between">
                  <select required value={sex} onChange={(e) => setSex(e.target.value)} className='rounded focus:ring-0 focus:border-inherit font-semibold text-teal-500 bg-transparent w-fit border border-gray-200'>
                    <option value=''>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
              </label>
            </div>

            <div className="submit flex items-center justify-end">
              <button type='submit' className='bg-teal-500 p-5 py-2 rounded text-white flex gap-4 items-center border hover:text-teal-500 hover:border-teal-500 hover:bg-transparent transition-all'>
                    Sign up {isLoading && <Spinner />} <span> <FaArrowRight/></span> 
              </button>
            </div>

          </div>

        </form> 
    </>
  )
}

export default ClientSignupForm