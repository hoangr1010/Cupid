import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeUser } from '../../state';
import { AiOutlineLinkedin } from "react-icons/ai";
import { Button } from "flowbite-react"



const LandingPage = () => {

    const name = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    const [user, setUser] = useState("hehe")

    return (
        <div class="flex flex-col justify-center items-center bg-background min-h-screen w-screen">

            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Hi, We're <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Cupid</span>
            </h1>


            <div class="widget_container flex flex-col items-center justify-center h-fit w-fit ">

                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary" placeholder="name@flowbite.com" 
                            onClick={(e) => {
                                dispatch(changeUser(e.target.value))
                            }}
                        
                        required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input value={name} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primaryLight focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary" required />
                    </div>
                
                    </form>

                <button type="button" class="text-white bg-[#0a66c2] hover:bg-[#004b7c]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    <AiOutlineLinkedin size={25} />
                Sign in with LinkedIn
                </button>

            </div>
        </div>
    )
}

export default LandingPage
