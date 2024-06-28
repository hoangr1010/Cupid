import { useState } from "react";
import { Modal } from "flowbite-react";
import FileRequest from "./FileRequest";
import { useSelector, useDispatch } from "react-redux";
import { getFileName } from "../../utils/request";
import { FileUpload } from "../../components/FileUpload";
import { delFile, sendMultipleFiles } from "../../api/request";
import { IoClose } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";

const RequestInfoModal = (request) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const formData = new FormData();

  const uploadedFiles = useSelector(
    (state) => state.request.list[request.request.priority - 1].request_files,
  );

  return (
    <>
      <button
        className="secondary-btn btn-padding rounded-sm font-bold"
        onClick={() => setOpenModal(true)}
      >
        Details
      </button>
      <Modal
        dismissible
        size="4xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        {/* <Modal.Header>
          <h1 className="font-bold">Referral Request</h1>
        </Modal.Header> */}
        <Modal.Body>
          {/* <div className="h-fit"> */}
          <div className="font-bold text-xl flex justify-start mx-3.5">
            Referral Request header
          </div>

          <div className="h-0.5 w-90 bg-primary m-3.5"></div>

          <div className="flex flex-row m-3.5 h-96">
            {/* the main stuff, chia lm 2 */}
            <div className="w-1/2 me-4">
              {/* upload file */}
              <FileUpload formData={formData}></FileUpload>
              {/* <FileRequest request={request} /> */}
              <div className="text-lg font-semibold mt-6">Uploaded files</div>

              <ul>
                {uploadedFiles.map((file) => (
                  <li
                    key={file}
                    className="flex justify-between rounded-lg w-4/5 p-2 items-center my-2 border"
                  >
                    <div className="flex items-center w-3/4">
                      <FaFile
                        size={30}
                        className="mx-1.5"
                        style={{ color: "1EC69A" }}
                      />
                      <div className="w-fit h-fit font-medium text-sm">
                        {getFileName(file)}
                      </div>
                    </div>

                    <button
                      className="h-fit rounded-full p-1.5 hover:bg-red-200"
                      onClick={() => delFile(file, dispatch)}
                    >
                      {/* delete */}
                      <IoClose className="hover:fill-red-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 ms-4">
              {/* note from referer and your note */}
              <div className="h-1/2">
                <div className="text-primaryDark">
                  The referer sent you a note
                </div>
                <div className="rounded-xl w-full h-2/3 bg-primaryLight"></div>
              </div>
              <div>
                <div>Add a note</div>
                <textarea
                  maxLength={250}
                  placeholder="Enter text here... (optional)"
                  className="w-full h-24 border-gray-200 rounded-xl text-sm"
                />
                <div className="text-xs flex justify-end text-gray-500 font-medium">
                  Max. 250 characters
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="py-1.5 px-3 rounded-lg border border-primary font-semibold text-primaryDark hover:text-primary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="py-1.5 px-3 mx-3 rounded-lg bg-primaryLight font-semibold text-primaryDark  hover:text-primary"
              onClick={() => sendMultipleFiles(formData, request, dispatch)}
            >
              Send
            </button>
          </div>
          {/* </div> */}

          {/* <div>Required actions</div> */}
          {/* <div>Provided files</div> */}
          {/* <ul>
            {uploadedFiles.map((file) => (
              <li key={file}>
                {getFileName(file)}{" "}
                <button
                  className="success-btn text-white h-fit rounded-md btn-padding"
                  onClick={() => delFile(file, dispatch)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
          <FileRequest request={request} /> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <button className="success-btn text-white h-fit rounded-md btn-padding">
            Done
          </button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default RequestInfoModal;
