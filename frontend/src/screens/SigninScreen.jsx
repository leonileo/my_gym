import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gymImg from '../assets/images/gymImg.jpg'
import { LiaUserShieldSolid } from "react-icons/lia";
import { PiUsersThreeLight } from "react-icons/pi";
import { LiaUserAltSolid } from "react-icons/lia";
import AdminForm from '../components/AdminForm'
import { FaArrowLeft, FaRegCopyright } from 'react-icons/fa6'
import TrainerForm from '../components/TrainerForm'
import ClientForm from '../components/ClientForm'
import { useSelector } from 'react-redux';

const SigninScreen = () => {
// states
  const [steps, setSteps] = useState(0);
  const year = new Date().getFullYear()

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (userInfo){
    var isAdmin = userInfo.isAdmin;
    var isTrainer = userInfo.isTrainer;
    var isClient = userInfo.isClient;
  }

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || 
  isAdmin ? '/admin' : isTrainer ? '/trainer' : isClient ? '/client' : '/';

  useEffect(() => {
      if (userInfo) {
          navigate(redirect);
      }
  }, [navigate, redirect, userInfo])

  return (
    <>
      <HeaderComponent />
      <div className="signin p-5 min-h-[80vh] md:flex gap-5">
        <div 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(6, 148, 162, 1)), url(${gymImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
        className="image w-full rounded min-h-[20vh] flex items-end text-white">
          <div className="flex w-full justify-center text-center p-5">
            <div className='font-semibold'>
              <p>Signin today!</p>
              <p>Dont have an account? <Link to={'/signup'} className='underline'>Sign up</Link> now.</p>
            </div>
          </div>
        </div>
        <div className="form w-full flex items-center my-5 md:my-0">
          <div className='w-full grid items-end h-full'>
            {/* choose account */}
            {steps === 0 &&
            <div className='choose-account w-full transition-all my-5'>
              <h3 className='mx-5 block md:text-center md:text-2xl font-semibold md:font-normal text-xl'>Choose your account type to signin.</h3>
              <div className="accounts flex flex-wrap md:flex-nowrap justify-center gap-4 my-5">
                <div onClick={() => setSteps(1)} className="cursor-pointer hover:bg-transparent admin flex border bg-gradient-to-r  from-[rgba(0,0,0,0.8)] hover:to-[rgba(0,0,0,0.8)] to-[rgba(6,148,162,0.9)] hover:from-[rgba(6,148,162,0.9)] text-teal-500 hover:text-white duration-200 border-teal-500 md:w-full min-w-[100px] rounded p-5 transition-all">
                  <div >
                    <div className="icon flex justify-start">
                      <LiaUserShieldSolid className='md:text-5xl text-3xl' />
                    </div>
                    <p className='md:text-2xl'>Admin</p>
                  </div>
                </div>
                <div onClick={() => setSteps(2)} className="cursor-pointer hover:bg-transparent trainer flex border bg-gradient-to-r from-[rgba(0,0,0,0.8)] hover:to-[rgba(0,0,0,0.8)] to-[rgba(6,148,162,0.9)] hover:from-[rgba(6,148,162,0.9)] text-teal-500 hover:text-white duration-200 border-teal-500 md:w-full min-w-[100px] rounded p-5 transition-all">
                  <div>
                    <div className="icon flex justify-start">
                      <PiUsersThreeLight className='md:text-5xl text-3xl' />
                    </div>
                    <p className='md:text-2xl'>Trainer</p>
                  </div>
                </div>
                <div onClick={() => setSteps(3)} className="cursor-pointer hover:bg-transparent client flex border bg-gradient-to-r from-[rgba(0,0,0,0.8)] hover:to-[rgba(0,0,0,0.8)] to-[rgba(6,148,162,0.9)] hover:from-[rgba(6,148,162,0.9)] text-teal-500 hover:text-white duration-200 border-teal-500 md:w-full min-w-[100px] rounded p-5 transition-all">
                  <div>
                    <div className="icon flex justify-start">
                      <LiaUserAltSolid className='md:text-5xl text-3xl' />
                    </div>
                    <p className='md:text-2xl'>Client</p>
                  </div>
                </div>
              </div>
            </div>
            }
              {steps !== 0 && <span onClick={() => setSteps(0)} className='cursor-pointer hover:underline transition-all flex items-center gap-2 text-teal-500 font-semibold text-sm'><FaArrowLeft /> Change account</span>}

              {/* admin form component */}
              {steps === 1 && <AdminForm />}

              {/* trainer form component */}
              {steps === 2 && <TrainerForm />}

              {/* clients form component */}
              {steps === 3 && <ClientForm />}

            <div className='w-full text-center text-gray-600 flex justify-center'>
              <p className='flex items-center'><FaRegCopyright />&nbsp;Copyright {year} <span className='font-semibold'> &nbsp;My Gym</span></p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default SigninScreen