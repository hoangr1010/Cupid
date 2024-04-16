import React from "react";
import { useState } from "react";

export function ResumeSubmit() {
  const [resumeLink, setResumeLink] = useState("");

  const [iframeSrc, setIframeSrc] = useState("");

  const previewResume = (e) => {
    e.preventDefault();
    console.log(resumeLink);

    var split_url = resumeLink.split("/");

    // Check if split_url is a link drive

    // Make google drive link with "preview" ending
    var new_url = "";
    for (var i = 0; i < split_url.length; i++) {
      if (i == split_url.length - 1) {
        new_url += "preview";
      } else {
        new_url += split_url[i] + "/";
      }
    }

    console.log(new_url);

    setIframeSrc(new_url);
    setResumeLink(new_url);
    console.log(iframeSrc);
  };

  const handleInputChange = (e) => {
    setResumeLink(e.target.value);
  };

  return (
    <>
      <div className="bg-background">
        {/* Resume Submit Form */}
        <div className="flex flex-col gap-5 px-12 py-5 max-w-4xl">
          {/* Header */}
          <div className="flex justify-around gap-5">
            <div className="px-5 py-2.5">Add your Resume</div>
            <button
              className="filled-btn"
              // onClick={direct to HomePage}
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
          <button onClick={previewResume} className="filled-btn w-fit">
            Preview
          </button>

          <div className=" h-screen">
            <iframe src={iframeSrc} className="w-full h-full bg-white"></iframe>
          </div>

          <button
            className="filled-btn w-fit"
            // onClick={send resumeLink to server}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
