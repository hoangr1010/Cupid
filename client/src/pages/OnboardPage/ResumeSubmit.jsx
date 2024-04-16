import React from "react";
import { useState } from "react";

export function ResumeSubmit() {
  const [resumeLink, setResumeLink] = useState("");

  const [iframeSrc, setIframeSrc] = useState("");

  const previewResume = (e) => {
    e.preventDefault();
    console.log(resumeLink);

    // need to split resumeLink to grab parts before "/view"
    // setIframeSrc(${resumeLink}/preview)

    var split_url = resumeLink.split("/");
    // console.log(split_url);

    var new_url = "";
    for (var i = 0; i < split_url.length; i++) {
      if (i == split_url.length - 1) {
        new_url += "preview";
      } else {
        new_url += split_url[i] + "/";
      }
    }

    console.log(new_url);

    setIframeSrc(
     new_url
    );
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
            <button className="filled-btn">Skip</button>
          </div>

          {/* Submit resume link */}
          <div>
            <label>Google Drive Link</label>
            <input
              type="text"
              placeholder="Resume Link"
              className="text-field block w-full p-2.5"
              value={resumeLink}
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
            <iframe src={iframeSrc} className="w-full h-full bg-white"></iframe>
          </div>

          <button className="filled-btn">Submit</button>
        </div>
      </div>
    </>
  );
}
