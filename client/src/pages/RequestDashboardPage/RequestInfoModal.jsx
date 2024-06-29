import { useRef, useState } from "react";
import { Modal } from "flowbite-react";
import FileRequest from "./FileRequest";
import { useSelector, useDispatch } from "react-redux";
import { getFileName } from "../../utils/request";
import { FileUpload } from "../../components/FileUpload";
import { delFile, sendMultipleFiles, replyRequest } from "../../api/request";
import { IoClose } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const RequestInfoModal = (props) => {
  const { request } = props;
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [uploadFiles, setUploadFile] = useState([]);
  const dispatch = useDispatch();
  // const formData = new FormData();
  const formData = useRef(new FormData());
  const navigate = useNavigate();

  const uploadedFiles = request.request_files ?? [];

  const handleSubmit = async () => {
    setUploadFile([], []);
    setNote("");

    await sendMultipleFiles(formData.current, request, dispatch);
    formData.current = new FormData();
    console.log(note);

    await replyRequest(request._id, note);

    // change to navigate(`/request/${request._id}`); after writing
    // request component
    navigate(`/request`);
    navigate(0);
    // resetModal();
    
  };

  return (
    <>
      <button
        className="secondary-btn btn-padding rounded-sm font-bold"
        onClick={() => {
          setOpenModal(true);
          console.log(request);
        }}
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
        <Modal.Body>
          {/* <div className="h-fit"> */}
          <div className="font-bold text-xl flex justify-start mx-3.5">
            Information Update
          </div>

          <div className="h-0.5 w-90 bg-primary m-3.5"></div>

          <div className="flex flex-row m-3.5 h-96">
            {/* the main stuff, chia lm 2 */}
            <div className="w-1/2 me-4">
              {/* upload file */}
              <FileUpload
                formData={formData.current}
                uploadFiles={uploadFiles}
                setUploadFile={setUploadFile}
              ></FileUpload>
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
              {request.InfoRequest.isActive ? (
                <div className="h-fit mb-6">
                  <div className="text-primaryDark font-medium">
                    The referer sent you a note
                  </div>
                  <div className="rounded-xl w-full h-fit min-h-14 bg-primaryLight px-3 py-1 text-sm">
                    {
                      request.InfoRequest.Conversation[
                        request.InfoRequest.Conversation.length - 1
                      ].message
                    }
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div>
                <div className="font-medium">Add a note</div>
                <textarea
                  maxLength={250}
                  placeholder="Enter text here... (optional)"
                  className="w-full h-24 border-gray-200 rounded-xl text-sm"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
              onClick={() => {
                setOpenModal(false);
                setUploadFile([], []);
                formData.current = new FormData();
                setNote("");
              }}
            >
              Cancel
            </button>
            <button
              className="py-1.5 px-3 mx-3 rounded-lg bg-primaryLight font-semibold text-primaryDark  hover:text-primary"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestInfoModal;
