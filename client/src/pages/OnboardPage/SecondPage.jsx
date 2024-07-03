import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import UploadResumeModal from "../ProfilePage/UploadResumeModal";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import AutoFill from "../ProfilePage/AutoFill";

const SecondPage = ({ nextStep }) => {
  const resumeUrl = useSelector((state) => state.auth.user.resume?.url);
  const resumeExist = Boolean(resumeUrl);
  console.log(resumeExist);

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
        <UploadResumeModal
          Trigger={
            <button
              disabled={resumeExist}
              className={
                resumeExist
                  ? "onboard-button flex gap-2 items-center border-0 bg-primaryLight"
                  : "onboard-button flex gap-2 items-center hover:border-primary"
              }
            >
              {resumeExist ? (
                <FaCheckCircle size={20} />
              ) : (
                <IoDocumentText size={20} />
              )}
              Upload your resume
            </button>
          }
        />

        <AutoFill
          Trigger={
            <button className="onboard-button font-bold hover:border-primary">
              <section className="flex gap-2">
                <FaUserEdit size={20} />
                <p>Auto Fill profile</p>
              </section>
              <p className="font-semibold text-grayLight text-xs text-start">
                Optional
              </p>
            </button>
          }
        />
      </section>

      <button
        disabled={!resumeExist}
        onClick={nextStep}
        className="filled-dark-btn btn-padding px-10"
      >
        Finish
      </button>
    </div>
  );
};

export default SecondPage;
