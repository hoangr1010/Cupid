import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const CreateOpeningPage = () => {
    const [formData, setFormData] = useState({
        company: "",
        number: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
      <div className="flex">
        <Sidebar />
  
        <main className="flex-1 flex flex-col items-center p-4">
            <h1 className="text-3xl">Create Openings</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div class="mb-6">
                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Company:</label>
                    <input type="company" id="company" placeholder="Google" value={formData.company} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div class="mb-6">
                    <label for="number" class="block mb-2 text-sm font-medium text-gray-900">Number of Slots</label>
                    <input type="number" id="number" value={formData.number} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" required />
                </div> 

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          </form>
        </main>
      </div>
    );
  };
  
  export default CreateOpeningPage;
  