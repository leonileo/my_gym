import React, { useState } from 'react'
import { FloatingLabel, Spinner } from 'flowbite-react';
import { FaArrowRight, FaEnvelope, FaLock, FaUser } from 'react-icons/fa6';
import { useSignupAdminMutation } from '../slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminSignupForm = () => {
  // sates
    const [firstName, setFirstName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const [signupAdmin, {isLoading}] = useSignupAdminMutation()

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords don\'t match')
        } else {
          try {
              await signupAdmin({ firstName, fatherName, email, password }).unwrap();
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
    <form onSubmit={submitHandler} className="form w-full px-5">
      <span className='text-gray-500 font-semibold'>Admin signup</span>
        <div className="topc my-5 space-y-4 text-gray-600">
            <h1 className='font-bold md:text-4xl'>My gym</h1>
            <p className='md:text-2xl'>Create your account</p>
        </div>
      <div className="inputs space-y-5 pr-8">
        <label htmlFor='firstName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
          <div className="in w-full">
            <FloatingLabel id='firstName' onChange={(e) => setFirstName(e.target.value)}  value={firstName} variant="filled" label="First name" className='font-semibold w-a bg-black text-teal-500 bg-transparent border-0' sizing="md" />
          </div>
          <div className="icon text-teal-500"><FaUser /></div>
        </label>
        <label htmlFor='fatherName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
          <div className="in w-full">
            <FloatingLabel id='fatherName' onChange={(e) => setFatherName(e.target.value)} value={fatherName} variant="filled" label="Father name" className='font-semibold w-a bg-black text-teal-500 bg-transparent border-0' sizing="md" />
          </div>
          <div className="icon text-teal-500"><FaUser /></div>
        </label>
        <label htmlFor='email' className="input-box pr-2 w-full border rounded flex items-center justify-between">
          <div className="in w-full">
            <FloatingLabel id='email' onChange={(e) => setEmail(e.target.value)} variant="filled" value={email} label="Email address" className='font-semibold w-a bg-black text-teal-500 bg-transparent border-0' sizing="md" />
          </div>
          <div className="icon text-teal-500"><FaEnvelope /></div>
        </label>

        <div className="flex gap-5">
          <label htmlFor='password' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
              <FloatingLabel id='password' type='password' onChange={(e) => setPassword(e.target.value)} variant="filled" value={password} label="Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaLock /></div>
          </label>
          <label htmlFor='confirmPassword' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
              <FloatingLabel id='confirmPassword' type='password' onChange={(e) => setConfirmPassword(e.target.value)} variant="filled" value={confirmPassword} label="Confirm Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaLock /></div>
          </label>
        </div>

        <div className="submit flex items-center justify-end">
          <button type='submit' className='bg-teal-500 p-5 py-2 rounded text-white flex gap-4 items-center border hover:text-teal-500 hover:border-teal-500 hover:bg-transparent transition-all'>
            Sign up {isLoading && <Spinner />} <span> <FaArrowRight/></span> 
          </button>
        </div>

      </div>

    </form>
  )
}

export default AdminSignupForm