import React, { useState } from 'react'
// quill
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useCreateWorkoutMutation, useGetWorkoutQuery, useUploadTrainerImageMutation } from '../../slices/trainerApiSlice';
import { toast } from 'react-toastify';
import { RxCrossCircled } from 'react-icons/rx';
import { Spinner } from 'flowbite-react';

const TrainerAddWorkoutComponent = ({setModal}) => {
    // states
    const [picture, setPicture] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [equipmentOpt, setEquipmentOpt] = useState();
    const [equipmentList, setEquipmentList] = useState([]);
    const [equipment, setEquipment] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [timeT, setTimeT] = useState();

    // quill
    const modules = {
    toolbar: [
        [{ header: [1,2,3,4,5,6, false] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
        { list: 'ordered' },
        { list: 'unordered' },
        { indent: '-1' },
        { indent: '+1' },
        ],
        ['link', 'image', 'video']
    ],
    }

    const removeItem = (index) => {
        const updatedItems = [...equipmentList];
        updatedItems.splice(index, 1);
        setEquipmentList(updatedItems);
      };

    const { refetch } = useGetWorkoutQuery();
    const [createWorkout, { isLoading: workoutLoading}] = useCreateWorkoutMutation();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addWorkout = {
            workoutName: name,
            workoutCategory: category,
            workoutDescription: description,
            workoutPicture: picture,
            workoutVideoLink: videoLink && videoLink,
            workoutDuration: `${duration} ${timeT}`,
            workoutSteps: steps,
            equipmentRequired: equipmentOpt === 'true' ? true : false,
            equipmentList: equipmentList,
        }

        const newWorkout = await createWorkout(addWorkout)
        if (newWorkout.error) {
            toast.error(newWorkout.error?.data?.message);
        } else {
            toast.success("Workout created");
            setTimeout(() => {
                refetch()
                setModal(1);
            }, 500)
        }
    }

  return (
    <div className="my-5 md:p-5 p-2 bg-white rounded h-full overflow-auto">
        <div className="btns flex items-end justify-between">
            <h2 className='sticky top-0 bg-inherit py-2 md:text-3xl text-xl text-gray-600'>Add Workout</h2>
            <button onClick={() => setModal(1)} className='border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all px-5'>Cancel</button>
        </div>
        <form onSubmit={handleSubmit} className="bottom my-5 space-y-5">
            {picture ?
            <div className="add-picture relative h-[25vh] bg-gray-100 rounded w-full"
                style={{
                backgroundImage: `url(${picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
                <div className='my-2 xl:p-5 p-2 h-full bg-[rgba(255,255,255,0.2)]'
                style={{
                    backdropFilter: 'blur(10px)'
                }}
                >
                    <div className='flex justify-center items-center w-full h-[20vh]'>
                        <img src={picture} alt="workout" className='h-[80%] rounded' />
                    </div>
                    <label htmlFor='add-workout-picture' className='bg-white xl:p-5 p-2 rounded'>Change workout picture</label>
                    <input onChange={(e) => {uploadFileHandler(e)}} className='absolute -z-10 opacity-0' type="file" name="add-workout-picture" id="add-workout-picture" />
                </div>
            </div>
            :
            <div className="add-picture relative h-[25vh] bg-gray-100 flex items-end p-5 rounded w-full">
                <label htmlFor='add-workout-picture' className='bg-white p-5 rounded'>Upload workout picture</label>
                <input onChange={(e) => {uploadFileHandler(e)}} className='absolute -z-10 opacity-0' type="file" name="add-workout-picture" id="add-workout-picture" />
            </div>
            }
            <p className='capitalize text-gray-600 text-xl'>Add workout details</p>
            <div className="top xl:flex gap-3 xl:space-y-0 space-y-2">
                <div className="xl:w-[50%] w-full text-gray-500 font-semibold add-name">
                    <label className='text-nowrap block' htmlFor="add-name">Add workout name</label>
                    <input required onChange={(e) => setName(e.target.value)} className='border rounded w-full border-gray-400' type="text" name="add-name" id="add-name" />
                </div>
                <div className="r w-full xl:flex block gap-5 space-y-5 xl:space-y-0">
                    <div className="text-gray-500 w-full block font-semibold add-category">
                        <label className='text-nowrap block' htmlFor="add-category">Add workout category</label>
                        <input required onChange={(e) => setCategory(e.target.value)} className='border rounded w-full border-gray-400' type="text" name="add-category" id="add-category" />
                    </div>
                    <div className="text-gray-500 w-full block font-semibold add-duration">
                        <label className='text-nowrap block' htmlFor="add-duration">Add workout duration</label>
                        <div className='border rounded w-full border-gray-400 flex overflow-hidden'>
                            <input required onChange={(e) => setDuration(e.target.value)} className='border-0 focus:ring-0 lg:w-full min-w-[100px]' type="text" name="add-duration" id="add-duration" />
                            <select onChange={(e) => setTimeT(e.target.value)} required className='border-l-gray-500 border-transparent'>
                                <option value="">--Select time--</option>
                                <option value="minute">minute</option>
                                <option value="hour">hour</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-gray-500 w-full block font-semibold add-equipment-opt">
                        <label className='block' htmlFor="add-equipment-opt">Add equipment option</label>
                        <select required onChange={(e) => setEquipmentOpt(e.target.value)} className='border rounded w-full border-gray-400' name="add-equipment-opt" id="add-equipment-opt" >
                            <option>Select equipment option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
            </div>
            {equipmentOpt === "true" && 
                <div className="text-gray-500 xl:w-[50%] block font-semibold add-equipments">
                    <label className='block' htmlFor="add-equipments">Add equipments</label>
                    <div className="flex gap-4">
                        <input id="add-equipments" placeholder='Enter equipment here' onChange={(e) => setEquipment(e.target.value)} value={equipment} type="text" className='bg-gray-50 border p-2 border-gray-200 my-2 rounded'/>
                        <button onClick={() => {setEquipmentList([...equipmentList, equipment]); setEquipment('')}}>Add</button>
                    </div>
                    <div className='p-2 border rounded h-[100px] resize-none w-full border-gray-400' name="add-equipments">
                          <ul className="pl-10">
                          {equipmentList.map((equipment, index) => (
                                <li className='text-gray-500 list-decimal'>
                                  <div className=' flex items-center gap-5'>
                                    {equipment}
                                    <div className=' rounded-full w-5 h-5 flex items-center justify-center'>
                                      <button type='button'
                                      onClick={() => removeItem(index)}
                                      className='hover:text-red-500 transition-all'><RxCrossCircled /></button>
                                    </div>
                                  </div>
                                </li>
                              )) 
                              }
                          </ul>
                    </div>
                </div>
            }
            <div className="text-gray-500 xl:w-[50%] block font-semibold add-description">
                <label className='block' htmlFor="add-description">Add workout Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} required className='border rounded h-[100px] resize-none w-full border-gray-400' name="add-description" id="add-description"></textarea>
            </div>
            <div className="text-gray-500 w-full xl:h-[20vh] block font-semibold add-steps">
                <label className='block' htmlFor="add-steps">Add workout steps</label>
                <div className='xl:w-[50%] h-full w-full overflow-auto'>
                    <ReactQuill className='xl:h-[10vh] text-nowrap' value={steps} modules={modules} onChange={setSteps} />
                </div>
            </div>
            <div className="text-gray-500 w-full block font-semibold add-video-link">
                <label className='block' htmlFor="add-video-link">Add workout video-link</label>
                <input onChange={(e) => setVideoLink(e.target.value)} className='border rounded xl:w-[50%] w-full border-gray-400' type="text" name="add-video-link" id="add-video-link" />
            </div>
            <div className="submit flex justify-center items-center my-5 md:text-2xl">
                <button type='submit' className='p-2 px-5 rounded border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all flex items-center gap-4 '>
                    Create workout {workoutLoading && <Spinner />}
                </button>
            </div>
        </form>
    </div>
)
}

export default TrainerAddWorkoutComponent