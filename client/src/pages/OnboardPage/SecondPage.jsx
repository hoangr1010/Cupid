import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

const SecondPage = ({ nextStep }) => {
  return (
    <div className="white-widget px-20 py-16 w-1/2 flex flex-col gap-7 items-center">
      <section className="flex flex-col items-center w-full gap-2">
        <h1 className="text-4xl font-bold text-primaryDark">
          Set Up Your Profile
        </h1>
        <p className="font-semibold text-grayLight text-sm">
          Quick start with 2-step onboard
        </p>
      </section>

      <p className="text-center font-semibold text-sm">
        Please provide your resume and profile information to facilitate
        personalized referral matches between you and potential referrers.
      </p>

      <section className="flex justify-between w-full gap-10">
        <button className="onboard-button hover:border-primary">
          <IoDocumentText size={20} />
          Upload your resume
        </button>
        <button className="onboard-button font-bold hover:border-primary">
          <FaUserEdit size={20} />
          Fill in your profile
        </button>
      </section>

      <button className="filled-dark-btn btn-padding px-10">
        Finish
      </button>
    </div>
  );
};

export default SecondPage;
