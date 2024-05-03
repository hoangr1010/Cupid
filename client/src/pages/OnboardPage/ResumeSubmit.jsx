import React from "react";
import { useState } from "react";
import { valid_url } from "../../utils/user";
import { sendResumeLink } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function ResumeSubmit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resumeLink, setResumeLink] = useState("");

  const [iframeSrc, setIframeSrc] = useState("");

  const previewResume = (e) => {
    e.preventDefault();

    var new_url = valid_url(resumeLink);

    setIframeSrc(new_url);
    setResumeLink(new_url);
  };

  const handleInputChange = (e) => {
    setResumeLink(e.target.value);
  };

  return (
    <>
      <div className="bg-background grid grid-cols-12">
        {/* Resume Submit Form */}
        <div className="flex flex-col gap-5 px-12 py-5 sm:col-start-1 sm:col-span-12 md:col-start-3 md:col-span-8">
          {/* Header */}
          <div className="flex justify-around gap-5">
            <div className="px-5 py-2.5">Add your Resume</div>
            <button
              className="filled-btn px-5 py-2.5 text-center"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Skip
            </button>
          </div>

          {/* Submit resume link */}
          <div>
            <label>Google Drive Link</label>
            <input
              type="text"
              placeholder="Resume Link"
              className="text-field block w-full p-2.5"
              onChange={handleInputChange}
            />
          </div>

          {/* display */}
          <button
            onClick={previewResume}
            className="filled-btn w-fit px-5 py-2.5 text-center"
          >
            Preview
          </button>

          <div className=" h-screen">
            <iframe
              src={iframeSrc}
              className="w-full h-full bg-white"
              title="Resume"
            ></iframe>
          </div>

          <button
            className="filled-btn w-fit px-5 py-2.5 text-center"
            onClick={() => {
              sendResumeLink({ resumeLink }, dispatch, navigate);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
