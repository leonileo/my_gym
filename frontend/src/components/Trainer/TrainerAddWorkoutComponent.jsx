import React, { useState } from 'react'
// quill
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import MarkdownPreview from '@uiw/react-markdown-preview'

const TrainerAddWorkoutComponent = ({setModal}) => {
    // states
    const [equipmentOpt, setEquipmentOpt] = useState();
    // quill
    const [value, setValue] = useState('');
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

  return (
    <div className="my-5 md:p-5 p-2 bg-white rounded h-full overflow-auto">
        <div className="btns flex items-end justify-between">
            <h2 className='sticky top-0 bg-inherit py-2 md:text-3xl text-xl text-gray-600'>Add Workout</h2>
            <button onClick={() => setModal(1)} className='border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition-all px-5'>Cancel</button>
        </div>
        <div className="bottom my-5 space-y-5">
            <div className="add-picture relative h-[25vh] bg-gray-100 flex items-end p-5 rounded w-full">
                <label htmlFor='add-workout-picture' className='bg-white p-5 rounded'>Upload workout picture</label>
                <input className='absolute -z-10 opacity-0' type="file" name="add-workout-picture" id="add-workout-picture" />
            </div>
            <p className='capitalize text-gray-600 text-xl'>Add workout details</p>
            <div className="top xl:flex gap-3 xl:space-y-0 space-y-2">
                <div className="w-[50%] text-gray-500 font-semibold add-name">
                    <label className='block' htmlFor="add-name">Add workout name</label>
                    <input className='border rounded w-full border-gray-400' type="text" name="add-name" id="add-name" />
                </div>
                <div className="r w-full sm:flex block gap-5 space-y-5 xl:space-y-0">
                    <div className="text-gray-500 w-full block font-semibold add-category">
                        <label className='block' htmlFor="add-category">Add workout category</label>
                        <input className='border rounded w-full border-gray-400' type="text" name="add-category" id="add-category" />
                    </div>
                    <div className="text-gray-500 w-full block font-semibold add-duration">
                        <label className='block' htmlFor="add-duration">Add workout duration</label>
                        <input className='border rounded w-full border-gray-400' type="text" name="add-duration" id="add-duration" />
                    </div>
                    <div className="text-gray-500 w-full block font-semibold add-equipment-opt">
                        <label className='block' htmlFor="add-equipment-opt">Add equipment option</label>
                        <select onChange={(e) => setEquipmentOpt(e.target.value)} className='border rounded w-full border-gray-400' name="add-equipment-opt" id="add-equipment-opt" >
                            <option>Select equipment option</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
            </div>
            {equipmentOpt === 'true' && 
                <div className="text-gray-500 w-[50%] block font-semibold add-equipments">
                    <label className='block' htmlFor="add-equipments">Add equipments</label>
                    <textarea className='border rounded h-[100px] resize-none w-full border-gray-400' name="add-equipments" id="add-equipments"></textarea>
                </div>
            }
            <div className="text-gray-500 xl:w-[50%] block font-semibold add-description">
                <label className='block' htmlFor="add-description">Add workout Description</label>
                <textarea className='border rounded h-[100px] resize-none w-full border-gray-400' name="add-description" id="add-equipments"></textarea>
            </div>
            <div className="text-gray-500 w-full xl:h-[20vh] block font-semibold add-steps">
                <label className='block' htmlFor="add-steps">Add workout steps</label>
                <div className='xl:w-[50%] h-full'>
                    <ReactQuill className='xl:h-[10vh]' value={value} modules={modules} onChange={setValue} />
                </div>
            </div>
            <div className="text-gray-500 w-full block font-semibold add-video-link">
                <label className='block' htmlFor="add-video-link">Add workout video-link</label>
                <input className='border rounded xl:w-[50%] w-full border-gray-400' type="text" name="add-video-link" id="add-video-link" />
            </div>
            <div className="submit flex justify-center items-center my-5 md:text-2xl">
                <button className='p-2 px-5 rounded border border-teal-500 hover:bg-teal-500 hover:text-white transition-all '>Create workout</button>
            </div>
        </div>
    </div>
)
}

export default TrainerAddWorkoutComponent