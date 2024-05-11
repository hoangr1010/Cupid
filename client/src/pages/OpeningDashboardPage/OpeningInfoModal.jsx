import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { changeStatus } from "../../api/opening";
import { changeOpeningList } from "../../state";
import { useSelector, useDispatch } from "react-redux";

const OpeningInfoModal = (opening) => {
  const dispatch = useDispatch();
  const openings = useSelector((state) => state.opening.list) || null;
  const [openModal, setOpenModal] = useState(false);

  const changeOpeningStatus = async ({ openingId, newStatus }) => {
    const formData = { openingId, newStatus };
    const response = await changeStatus(formData);

    if (response) {
      // change opening list with updated status Object
      const newOpeningList = openings.map((opening) => {
        if (opening._id === response._id) {
          return response;
        }
        return opening;
      })

      dispatch(changeOpeningList(newOpeningList));
    }
  };

  return (
    <div>
      <button
        className="secondary-btn p-2 rounded-sm font-bold"
        onClick={() => setOpenModal(true)}
      >
        Details
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h1 className="font-bold">Referral Opening</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="text-base leading-relaxed text-grayLight">
            <li>Company: {opening.company}</li>
            <li>Status: {opening.status}</li>
            <li>Date created: {opening.date}</li>
          </div>
        </Modal.Body>
        {opening.status === "matched" && (
          <Modal.Footer>
            <div className="text-base text-grayLight">
              Matched Candidate: {opening.requestId}
              <div className="flex flex-wrap gap-2">
                <Button
                  color="success"
                  onClick={() =>
                    changeOpeningStatus({
                      openingId: opening.openingId,
                      newStatus: "approved",
                    })
                  }
                >
                  Approve
                </Button>
                <Button
                  color="failure"
                  onClick={() =>
                    changeOpeningStatus({
                      openingId: opening.openingId,
                      newStatus: "waiting",
                    })
                  }
                >
                  Decline
                </Button>
              </div>
            </div>
          </Modal.Footer>
        )}
        {opening.status === "approved" && (
          <Modal.Footer>
            <div className="text-base text-grayLight">
              Approved Candidate: {opening.requestId}
            </div>
          </Modal.Footer>
        )}
        {opening.status === "referred" && (
          <Modal.Footer>
            <div className="text-base text-grayLight">
              Referred Candidate: {opening.requestId}
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default OpeningInfoModal;
