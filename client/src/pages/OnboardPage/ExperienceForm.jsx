import React, { useState } from 'react';

export function ExperienceForm() {

    const [formData, setFormData] = useState({
        position: '',
        location: '',
        startYear: '2010',
        startMonth: '1',
        endYear: '2010',
        endMonth: '1',
        organization: '',
        description: ''
    });

    const [formError, setFormError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if start year is greater than end year
        if (parseInt(formData.startYear) > parseInt(formData.endYear)) {
            setFormError("Start year can not be greater than end year");
            return;
        } else if (parseInt(formData.startYear) === parseInt(formData.endYear) && parseInt(formData.startMonth) > parseInt(formData.endMonth)) {
            setFormError("Start month can not be greater than end month");
            return;
        } else {
            setFormError(null)
        }

        // Handle form submission here
        console.log("Position:", formData.position);
        console.log("Location:", formData.location);
        console.log("Start Year:", formData.startYear);
        console.log("Start Month:", formData.startMonth);
        console.log("End Year:", formData.endYear);
        console.log("End Month:", formData.endMonth);
        console.log("Organization:", formData.organization);
        console.log("Description:", formData.description);
        
    };

    return (
        <div>
            <div id="crud-modal" tabindex="-1" aria-hidden="false" class="flex overflow-y-auto overflow-x-hidden bg-opacity-50 bg-black fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Work Experience
                            </h3>
                            <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                            >
                                <svg
                                    class="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    ></path>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <form class="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div class="grid gap-4 grid-cols-2">

                                {/* Position title */}
                                <div class="col-span-2 sm:col-span-1">
                                    <label
                                        for="position"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        *Position title
                                    </label>
                                    <input
                                        type="text"
                                        name="position"
                                        id="position"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Your position title"
                                        required
                                        value={formData.position}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Location */}
                                <div class="col-span-2 sm:col-span-1">
                                    <label
                                        for="location"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Your location"
                                        required=""
                                        value={formData.location}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Start year */}
                                <div class="col-span-1">
                                    <label
                                        for="startYear"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Start Year
                                    </label>
                                    <select
                                        id="startYear"
                                        name='startYear'
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.startYear}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {Array.from({ length: 21 }, (_, index) => (
                                            <option key={index + 2010} value={index + 2010}>
                                                {index + 2010}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Start month */}
                                <div class="col-span-1">
                                    <label
                                        for="startMonth"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Month
                                    </label>
                                    <select
                                        id="startMonth"
                                        name='startMonth'
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.startMonth}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {Array.from({ length: 12 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* End year */}
                                <div class="col-span-1">
                                    <label
                                        for="endYear"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        End year
                                    </label>
                                    <select
                                        id="endYear"
                                        name='endYear'
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.endYear}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {Array.from({ length: 21 }, (_, index) => (
                                            <option key={index + 2010} value={index + 2010}>
                                                {index + 2010}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* End month */}
                                <div class="col-span-1">
                                    <label
                                        for="endMonth"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Month
                                    </label>
                                    <select
                                        id="endMonth"
                                        name='endMonth'
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.endMonth}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {Array.from({ length: 12 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Organization */}
                                <div class="col-span-2">
                                    <label
                                        for="organization"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        *Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="organization"
                                        id="organization"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Your Organization"
                                        required
                                        value={formData.organization}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Description */}
                                <div class="col-span-2">
                                    <label
                                        for="description"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Experience Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your experience description"
                                        value={formData.description}
                                        onChange={(e) => handleChange(e)}
                                    ></textarea>
                                </div>

                                <div class="col-span-2 sm:col-span-1"></div>
                            </div>

                            {/* Validation check message */}
                            {formError && (
                                <p className="text-red-500 text-sm pb-2">*{formError}</p>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                class="inline-flex items-center text-primary hover:text-primaryDark border border-primary hover:bg-primaryLight focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all"
                            >
                                <svg
                                    class="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Add new experience
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

