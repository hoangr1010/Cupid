import React from 'react'

export function Experience() {
  return (
    <div className='flex w-screen justify-center'>
        <div className='widget_container w-3/5'>
            <div className='flex items-center justify-between'>
                <div className='text-lg font-bold leading-6 text-grey-900'>
                    Experience
                </div>
                <span className='inline-flex rounded-md'>
                    <button 
                        type="button" 
                        className="text-gray-900 bg-white border border-gray-300 
                        focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 
                        font-medium rounded-full text-sm px-2.5 py-2.5">
                        Add
                    </button>
                </span>
            </div>
        </div>
    </div>
)
}
