import React from 'react'

function Form() {

  return (
    <div className='mt-4 ml-5 w-full'>
        <h1 className="text-3xl">Create Request</h1>

        <form>
            <div className='mt-5'>
                <label
                    for='company'
                    className='block mb-2 text-sm font-medium text-gray-900'
                >
                    Company
                </label>
                <input
                    type='text'
                    name='company'
                    id='company'
                    className='text-field block w-1/2 p-2.5'
                    placeholder='Company name'
                />
            </div>

            <div className='mt-5'>
                <label
                    for='priority'
                    className='block mb-2 text-sm font-medium text-gray-900'
                >
                    Priority
                </label>
                <input
                    type='text'
                    name='priority'
                    id='priority'
                    className='text-field block w-1/2 p-2.5'
                    placeholder='priority'
                />
            </div>

            <button type='submit' className='filled-btn px-5 py-2.5 text-center mt-5'>
              Create
            </button>
        </form>

    </div>
  )
}

export default Form
