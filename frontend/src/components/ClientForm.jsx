import React, { useState } from 'react'
import { FloatingLabel, Spinner } from 'flowbite-react'
import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { useSigninClientMutation } from '../slices/authApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const ClientForm = () => {
    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const [signinClient, {isLoading}] = useSigninClientMutation()

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/client/dashboard';


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await signinClient({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Signin successfull!")
            setTimeout(() => {
                navigate(redirect);
            }, 1500)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
}
  return (
    <form onSubmit={submitHandler} className="form w-full px-5 transition-all">
        <span className='text-gray-500 font-semibold'>Client signin</span>
        <div className="topc my-5 space-y-4 text-gray-600">
            <h1 className='font-bold md:text-4xl'>My gym</h1>
            <p className='md:text-2xl'>Signin into your account</p>
        </div>
        <div className="inputs space-y-5 pr-8">
            <label htmlFor='email' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
                <FloatingLabel value={email} onChange={(e) => setEmail(e.target.value)} id='email' variant="filled" label="Email address" type='email' className='font-semibold w-a bg-black text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaEnvelope /></div>
            </label>
            <label htmlFor='password' className="input-box pr-2 w-full border rounded flex items-center justify-between">
            <div className="in w-full">
                <FloatingLabel value={password} onChange={(e) => setPassword(e.target.value)} id='password' variant="filled" label="Password" type='password' className='font-semibold w-a bg-black text-teal-500 bg-transparent border-0' sizing="md" />
            </div>
            <div className="icon text-teal-500"><FaLock /></div>
            </label>
            <div className="submit flex items-center justify-end">
                <button type='submit' className='bg-teal-500 p-5 py-2 rounded text-white flex gap-4 items-center border hover:text-teal-500 hover:border-teal-500 hover:bg-transparent transition-all'>
                    Sign in {isLoading && <Spinner />} <span> <FaArrowRight/></span> 
                </button>
            </div>
        </div>
    </form>
  )
}

export default ClientForm