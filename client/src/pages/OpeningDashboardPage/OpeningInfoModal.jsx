import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { updateOneOpeningField } from "../../api/opening";
import { changeOpeningList } from "../../state";
import { useSelector, useDispatch } from "react-redux";

const OpeningInfoModal = (opening) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id) || null;
  const [openModal, setOpenModal] = useState(true);

  const changeStatus = async ({ openingId, field, newValue }) => {
    const formData = { openingId, field, newValue };
    const response = await updateOneOpeningField(formData);
    console.log(response);
    if (response) {
      dispatch(changeOpeningList(response));
    }
  };

  return (
    <div>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        size="sm"
        onClick={() => setOpenModal(true)}
      >
        More
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Referral Opening</Modal.Header>
        <Modal.Body>
          <div className="text-base leading-relaxed text-gray-500">
            <li>Company: {opening.company}</li>
            <li>Status: {opening.status}</li>
            <li>Date created: {opening.date}</li>
          </div>
        </Modal.Body>
        {opening.status === "matched" && (
          <Modal.Footer>
            <div className="text-base text-gray-500">
              Matched Candidate: {opening.requestId}
              <div className="flex flex-wrap gap-2">
                <Button
                  color="success"
                  onClick={() =>
                    changeStatus({
                      openingId: opening.openingId,
                      field: "status",
                      newValue: "approved",
                    })
                  }
                >
                  Approve
                </Button>
                <Button
                  color="failure"
                  onClick={() =>
                    changeStatus({
                      openingId: opening.openingId,
                      field: "status",
                      newValue: "waiting",
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
            <div className="text-base text-gray-500">
              Approved Candidate: {opening.requestId}
            </div>
          </Modal.Footer>
        )}
        {opening.status === "referred" && (
          <Modal.Footer>
            <div className="text-base text-gray-500">
              Referred Candidate: {opening.requestId}
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default OpeningInfoModal;
