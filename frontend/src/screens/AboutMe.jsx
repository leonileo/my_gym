import React from 'react';
import profilePic from '../assets/profile.jpg'
import { FaBackward } from 'react-icons/fa6';


const AboutMe = () => {
  return (
    <div className="max-w-[50%] mx-auto p-6 bg-gray-200 rounded-lg shadow-lg h-[100vh] w-full">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
            <a href='/' className='font-semibold flex items-center gap-3'>Enough about me? let's get back to the app <FaBackward /></a>
        </div>
      <p className="text-gray-600 text-lg mb-3">
        Hi, I'm <span className="font-semibold">Kaleb wendwessen</span>
        <div className="img-container rounded border border-white p-2 my-2 w-[300px] h-[300px] flex justify-center">
            <img src={profilePic} alt="kaleb wendwessen" className='rounded w-full' />
        </div>
        A passionate <span className="font-semibold">Software engineer</span> with a love for <span className="font-semibold"> web development</span>.
        I specialize in <span className="font-semibold">building full-stack web applications from concept to deployment</span>.  
        and have worked on projects involving <span className="font-semibold"> involving cutting-edge technologies</span>. 
        Some of my recent projects include:
    </p>
    <ul className="list-disc pl-5 text-gray-600 text-lg mb-3">
        <li>
        <a href='https://warka.onrender.com/' className="underline font-semibold">Warka:</a> A mobile-based project that helps diasporas and people at work plant a legacy tree, with integrated payment features.
        </li>
        <li>
        <a href='https://caleb-shop.onrender.com/' className="underline font-semibold">Caleb Shop:</a> An e-commerce platform built for streamlined online shopping.
        </li>
        <li>
        <a href='https://ethioamba.com/' className="underline font-semibold">Ethio Amba:</a> A web app for an agency, allowing the company to showcase recent work and add partners.
        </li>
        <li>
        <a href='https://my-gym.onrender.com/' className="underline font-semibold">MY GYM:</a> A fitness hub for the gym community, enabling trainers to manage clients, create workouts, and provide an admin dashboard for control over user accounts.
        </li>
    </ul>
      <p className="text-gray-600 text-lg mb-3">
        My mission is to 
        <span className="font-semibold"> create exceptional software by continuously improving through every project and experience. Wherever I go, I strive to give my all and deliver the best possible results, building upon the lessons learned from previous projects and always seeking to learn new things. </span>
        I am dedicated to mastering my software engineering skills, enhancing my testing techniques, and refining my end-to-end project creation process—from design to deployment.
    </p>
      <p className="text-gray-600 text-lg mb-3">
        In my free time, I enjoy <span className="font-semibold">reading personal development books, as I admire the wisdom and insights these authors share</span>. 
        I believe in continuous growth and am always looking for new opportunities to expand my horizons.
      </p>
      <p className="text-gray-600 text-lg">
        Feel free to connect with me on <span className="font-semibold"><a href='https://linkedin.com/in/kaleb-wendwessen'>Linkedin</a>, <a href='https://www.instagram.com/kalebleo4'>Instagram</a> or <a href='tel:0930306825'>give me a call +251930306825</a></span> to discuss potential collaborations, 
        projects, or just to say hello!
      </p>
    </div>
  );
}

export default AboutMe;