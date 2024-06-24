import React, { useState } from "react";
import { Modal, Label } from "flowbite-react";

const RequestInfoModal = ({ request, Trigger }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [requestText, setRequestText] = useState("");

  const candidateFullName =
    request.candidate_id.first_name + " " + request.candidate_id.last_name;

  const TriggerElement = React.cloneElement(Trigger, {
    onClick: () => {
      setOpenModal(true);
    },
  });

  return (
    <div>
      {/* Button to show up Modal */}
      {TriggerElement}
      {/* Opening Modal */}
      <Modal size="2xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="font-bold text-xl">Request Information</p>
        </Modal.Header>

        <Modal.Body>
          <form className="flex flex-col gap-4">
            <p className="font-bold text-primaryDark">{candidateFullName}</p>
            <section>
              <p className="text-sm font-bold">
                What information are you requesting?{" "}
                <span className="text-pink">*</span>
              </p>
              <textarea
                className="p-3 rounded-lg h-32 overflow-auto text-field w-full"
                placeholder="Enter message for candidate here..."
                autoFocus={true}
                maxLength={250}
                value={requestText}
                onChange={(e) => {
                  setRequestText(e.target.value);
                }}
              />

              <p className="text-xs text-grayLight text-end">
                Max. 250 characters
              </p>
            </section>

            <section className="flex justify-end">
              <div className="flex flex-wrap gap-2">
                <button className="outline-btn h-fit rounded-md btn-padding">
                  <p>Cancel</p>
                </button>

                <button className="filled-btn h-fit rounded-md btn-padding">
                  <p>Request Information</p>
                </button>
              </div>
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RequestInfoModal;
