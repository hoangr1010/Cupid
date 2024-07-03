import { React, useState } from "react";
import { useSelector } from "react-redux";
import { sendResume } from "../../../api/user";
import { useDispatch } from "react-redux";
import FileBox from "../../../components/FileBox";
import { MdModeEditOutline } from "react-icons/md";
import AutoFill from "../AutoFill";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { FileUploader } from "react-drag-drop-files";
import { IoCloudUpload } from "react-icons/io5";

function Resume() {
  const user = useSelector((state) => state.auth.user);
  const resume = user.resume.url;
  const [openModal, setOpenModal] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await sendResume(file, dispatch);
    setIsLoading(false);
    handleCancel();
  };

  const handleCancel = () => {
    setFile(null);
    setOpenModal(false);
    setFileName("");
  };

  const handleChange = (file) => {
    setFile(file);
    setFileName(file.name);
  };

  return (
    <div>
      <div className="widget_container flex flex-col gap-2">
        <div className="flex items-center justify-between text-primaryDark">
          <div>
            <h2 className="text-lg font-bold">My Resume</h2>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="hover:text-primary cursor-pointer"
          >
            <MdModeEditOutline />
          </button>
        </div>
        <FileBox fileUrl={resume} />
        <div>
          <button
            onClick={() => setOpenResume(true)}
            className="flex w-full justify-start"
          >
            <p className="text-xs text-primary hover:text-primaryDark">
              View your resume
            </p>
          </button>
        </div>
        <AutoFill />

        <Modal show={openModal} onClose={() => handleCancel()}>
          <Modal.Header>
            <p className="font-bold text-primaryDark text-2xl">Resume</p>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <div className="flex flex-col gap-3 items-center justify-center">
                <Spinner
                  className="fill-primary w-10 h-10"
                  aria-label="Loading"
                />
                <p className="font-semibold">Uploading your resume</p>
              </div>
            ) : (
              <div>
                <form
                  className="pt-2.5 flex flex-col gap-4"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div>
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      types={["PDF"]}
                    >
                      <div className="my-2 w-full h-32 border-2 border-dashed rounded-xl border-primary flex flex-col justify-center items-center">
                        <IoCloudUpload size={30} style={{ color: "1EC69A" }} />
                        {fileName && (
                          <p className="mt-2 text-sm text-primaryDark font-bold">
                            {fileName} is ready to be uploaded!
                          </p>
                        )}
                        <div className="text-sm flex">
                          <button className=" text-primary underline underline-offset-2">
                            Click to upload{" "}
                          </button>
                          <div className="ms-1">or drag and drop file</div>
                        </div>
                      </div>
                    </FileUploader>
                  </div>
                  <div className="justify-center flex">
                    <button
                      className="filled-btn btn-padding w-48"
                      type="submit"
                      disabled={!file}
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Modal.Body>
        </Modal>

        <Modal
          size="4xl"
          show={openResume}
          onClose={() => setOpenResume(false)}
        >
          <ModalHeader>
            <p className="font-bold text-primaryDark text-2xl">
              Resume Preview
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="h-screen">
              <iframe
                src={`${process.env.REACT_APP_S3_BUCKET_LINK}/${resume}`}
                className="w-full h-full"
              ></iframe>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <div>
              <a
                href={`${process.env.REACT_APP_S3_BUCKET_LINK}/${resume}`}
                className="filled-btn px-20 py-3"
                download
                target="_blank"
              >
                Download
              </a>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Resume;
