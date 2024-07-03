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
import UploadResumeModal from "../UploadResumeModal";

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
          {/* <button
            onClick={() => setOpenModal(true)}
            className="hover:text-primary cursor-pointer"
          >
            <MdModeEditOutline />
          </button> */}
          <UploadResumeModal
            Trigger={
              <button
                onClick={() => setOpenModal(true)}
                className="hover:text-primary cursor-pointer"
              >
                <MdModeEditOutline />
              </button>
            }
          />
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
        <AutoFill
          Trigger={
            <button className="filled-btn w-full py-2">
              Auto Fill Your Profile
            </button>
          }
        />

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
