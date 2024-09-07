import React, { useState } from 'react'
import { FloatingLabel, Spinner } from 'flowbite-react'
import { FaArrowRight, FaEnvelope, FaLock, FaUser } from 'react-icons/fa6'
import { toast } from 'react-toastify';
import { useSignupTrainerMutation } from '../slices/authApiSlice';
import { useNavigate } from 'react-router-dom';

const TrainerSignupForm = () => {
  // states
  const [firstName, setFirstName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signupTrainer, {isLoading}] = useSignupTrainerMutation()

  const navigate = useNavigate();

  const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Passwords don\'t match')
      } else {
        try {
            await signupTrainer({ firstName, fatherName, sex, email, phoneNo, password }).unwrap();
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
       <form onSubmit={submitHandler} className="form w-full px-5">
          <span className='text-gray-500 font-semibold'>Trainer signup</span>
          <div className="topc my-5 space-y-4 text-gray-600">
              <h1 className='font-bold md:text-4xl'>My gym</h1>
              <p className='md:text-2xl'>Create your account</p>
          </div>
        <div className="inputs space-y-5 pr-8">
          <label htmlFor='firstName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
              <FloatingLabel id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} variant="filled" label="First name" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaUser /></div>
          </label>
          <label htmlFor='fatherName' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
              <FloatingLabel id='fatherName' value={fatherName} onChange={(e) => setFatherName(e.target.value)} variant="filled" label="Father name" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaUser /></div>
          </label>
          <label htmlFor='email' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
              <FloatingLabel id='email' value={email} onChange={(e) => setEmail(e.target.value)} variant="filled" label="Email address" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaEnvelope /></div>
          </label>
          <div className="flex gap-5">
            <label htmlFor='password' className="input-box pr-2 w-full border rounded flex items-center justify-between">
              <div className="in w-full">
                <FloatingLabel id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} variant="filled" label="Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
              </div>
              <div className="icon text-teal-500"><FaLock /></div>
            </label>
            <label htmlFor='confirmPassword' className="input-box pr-2 w-full border rounded flex items-center justify-between">
              <div className="in w-full">
                <FloatingLabel id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="filled" label="Confirm Password" className='font-semibold text-teal-500 bg-transparent border-0' sizing="md" />
              </div>
              <div className="icon text-teal-500"><FaLock /></div>
            </label>
          </div>
          <div className='w-full flex gap-5'>
            <label htmlFor='sex' className="input-box pr-2 rounded flex items-center justify-between">
                <select required value={sex} onChange={(e) => setSex(e.target.value)} className='rounded focus:ring-0 focus:border-inherit font-semibold text-teal-500 bg-transparent w-fit border border-gray-200'>
                  <option>Sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </label>
            <label htmlFor='phoneNo' className="input-box pr-2 border rounded flex items-center justify-between">
              <div className="in w-full">
                <input type="tel" id='phoneNo' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder='Phone number' className='placeholder:text-inherit focus:ring-0 font-semibold text-teal-500 bg-transparent border-0' />
              </div>
            </label>
          </div>

          <button type='submit' className='bg-teal-500 p-5 py-2 rounded text-white flex gap-4 items-center border hover:text-teal-500 hover:border-teal-500 hover:bg-transparent transition-all'>
            Sign up {isLoading && <Spinner />} <span> <FaArrowRight/></span> 
          </button>
        </div>

    </form>
    </>
  )
}

export default TrainerSignupForm