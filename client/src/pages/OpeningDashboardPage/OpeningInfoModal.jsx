import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { changeStatus } from "../../api/opening";
import { changeOpeningList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { IoMdMore } from "react-icons/io";

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
          return { ...opening, status: response.status };
        }
        return opening;
      });

      dispatch(changeOpeningList(newOpeningList));
    }
  };

  return (
    <div>
      {/* Button to show up Modal */}
      <button
        className="secondary-btn rounded-md font-bold"
        onClick={() => setOpenModal(true)}
      >
        <IoMdMore size={20}/>
      </button>

      {/* Opening Modal */}
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

        {/* If status is matched, ask for deny/approve */}
        {opening.status === "matched" && (
          <Modal.Footer>
            <div className="flex flex-wrap gap-2">
              {/* Approve button */}
              <button
                className="success-btn text-white h-fit rounded-md btn-padding"
                onClick={() =>
                  changeOpeningStatus({
                    openingId: opening.openingId,
                    newStatus: "approved",
                  })
                }
              >
                <p>Approve</p>
              </button>

              {/* Deny button */}
              <button
                className="failure-btn text-white h-fit rounded-md btn-padding"
                onClick={() =>
                  changeOpeningStatus({
                    openingId: opening.openingId,
                    newStatus: "waiting",
                  })
                }
              >
                <p>Decline</p>
              </button>
            </div>
          </Modal.Footer>
        )}

        {/* If status is approved, ask for refer status */}
        {opening.status === "approved" && (
          <Modal.Footer>
            <div className="flex flex-wrap gap-2">
              {/* Refer button */}
              <button
                className="success-btn text-white h-fit rounded-md btn-padding"
                onClick={() =>
                  changeOpeningStatus({
                    openingId: opening.openingId,
                    newStatus: "referred",
                  })
                }
              >
                <p>Referred</p>
              </button>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default OpeningInfoModal;
