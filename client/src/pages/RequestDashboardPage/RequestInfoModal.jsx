import { useState } from "react";
import { Modal } from "flowbite-react";
import FileRequest from "./FileRequest";
import { useSelector, useDispatch } from "react-redux";
import { getFileName } from "../../utils/request";
import { delFile } from "../../api/request";

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
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h1 className="font-bold">Referral Request</h1>
        </Modal.Header>
        <Modal.Body>
          <div>Required actions</div>
          <div>Provided files</div>
          <ul>
            {uploadedFiles.map((file) => (
              <li>
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
          <FileRequest request={request} />
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
