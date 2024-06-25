import { useState } from "react";
import { Modal } from "flowbite-react";
import FileRequest from "./FileRequest";
import { useSelector, useDispatch } from "react-redux";
import { getFileName } from "../../utils/request";
import { delFile } from "../../api/request";
import { IoClose } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";

const RequestInfoModal = (request) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
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
      >
        <Modal.Header>
          <h1 className="font-bold">Referral Request</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="h-fit">
            <div className="font-bold text-xl flex justify-start mx-3.5">
              Referral Request
              {/* header */}
            </div>
            <div className="h-0.5 w-90 bg-primary m-3.5"></div>
            <div className="flex flex-row">
              {/* the main stuff, chia lm 2 */}
              <div className="w-1/2 px-4 mx-4">
                {/* upload file */}
                <FileRequest request={request} />
                <div className="text-lg font-semibold">Uploaded files</div>

                <ul>
                  {uploadedFiles.map((file) => (
                    <li
                      key={file}
                      className="flex justify-between rounded-xl p-2 items-center my-2 border-2"
                    >
                      <div className="flex items-center w-3/4">
                        <FaFile
                          size={40}
                          className="mx-1.5"
                          style={{ color: "1EC69A" }}
                        />
                        <div className="w-fit h-fit font-medium">
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

              <div className="w-1/2">
                {/* note from referer and your note */}
                <div>Notes</div>
              </div>
            </div>
          </div>

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
        <Modal.Footer>
          <button className="success-btn text-white h-fit rounded-md btn-padding">
            Done
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestInfoModal;
