// import React from "react";
import { Modal } from "flowbite-react";
import { useRef, useState } from "react";

export function ResumeSubmitForm() {
  const [resumeLink, setResumeLink] = useState("");

  const [iframeSrc, setIframeSrc] = useState("");

  const previewResume = (e) => {
    e.preventDefault();
    console.log(resumeLink);

    // need to slit resumeLink to grab parts before "/view"
    // setIframeSrc(${resumeLink}/preview)

    setIframeSrc(
      // `https://drive.google.com/file/d/${resumeLink}/preview?usp=sharing`
      resumeLink
    );
    console.log(iframeSrc);
  };

  const handleInputChange = (e) => {
    setResumeLink(e.target.value);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div>ResumeSubmitForm</div>
      <button onClick={() => setOpenModal(true)}>
        Open Resume Submission form
      </button>

      <Modal
        show={openModal}
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />

        <Modal.Body>
          <form>
            <div className="flex flex-col gap-4">
              {/* submit resume link */}
              <div>
                <label htmlFor="abc">Google Drive Link</label>
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

              <div>
                <iframe src={iframeSrc} className="w-full"></iframe>
              </div>

              <button className="filled-btn w-fit px-5 py-2.5 text-center">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResumeSubmitForm;
