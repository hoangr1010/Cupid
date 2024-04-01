import React from 'react'
// import { Button } from 'flowbite-react';


const OnboardPage = () => {
return (
    <div>
        <div className='grid grid-cols-1 gap-4 items-center'>
            <div className='flexbox max-w-2xl'>
                <div className='overflow-hidden rounded-lg bg-white shadow'>
                    <div className='flex items-center px-4 py-5 sm:px-6'>
                        <div className='text-lg font-bold leading-6 text-grey-900'>
                            Experience
                        </div>
                        <span className='ml-auto inline-flex rounded-md'>
                            <button 
                                type="button" 
                                className="text-gray-900 bg-white border border-gray-300 
                                focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 
                                font-medium rounded-full text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 
                                dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
                                dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                
                                Add
                            </button>
                        </span>
                        
                    </div>
            
                </div>
            </div>

            <div className='flexbox max-w-2xl'>
                <div className='overflow-hidden rounded-lg bg-white shadow'>
                    <div className='flex items-center px-4 py-5 sm:px-6'>
                        <div className='text-lg font-bold leading-6 text-grey-900'>
                            Education
                        </div>
                        <span className='ml-auto inline-flex rounded-md'>
                            <button 
                                type="button" 
                                className="text-gray-900 bg-white border border-gray-300 
                                focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 
                                font-medium rounded-full text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 
                                dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
                                dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                
                                Add
                            </button>
                        </span>
                        
                    </div>
            
                </div>
            </div>

        </div>

    </div>
)
}

export default OnboardPage;