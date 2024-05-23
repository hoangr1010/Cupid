import { useState } from "react";
import { Modal } from "flowbite-react";

const RequestInfoModal = () => {
  const [openModal, setOpenModal] = useState(false);

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
        <Modal.Body>hi</Modal.Body>
        <Modal.Footer>
          <button className="success-btn text-white h-fit rounded-md btn-padding">
            Upload file
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestInfoModal;
