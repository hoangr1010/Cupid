import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { changeStatus } from "../../../api/opening";
import { changeRequestStatusInOpening } from "../../../state";
import { useDispatch } from "react-redux";
import PercentageChart from "../../../components/PercentageChart";
import EvaluationText from "../../../components/EvaluationText";
import FileBox from "../../../components/FileBox";
import { TbExternalLink } from "react-icons/tb";
import RequestInfoModal from "../RequestInfoModal";
import ConversationBox from "../../../components/ConversationBox";

const OpeningInfoModal = ({ request, Trigger }) => {
  // If requestId is specified in route
  const { requestId } = useParams();
  let isOpen = false;
  if (requestId === request._id) {
    isOpen = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(isOpen);

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const TriggerElement = React.cloneElement(Trigger, {
    onClick: () => setOpenModal(true),
  });

  const changeRequestStatus = async (newStatus) => {
    setIsButtonLoading(true);
    const formData = { requestId: request._id, newStatus };
    const newRequest = await changeStatus(formData);

    if (newRequest) {
      const requestId = newRequest._id;
      const newStatus = newRequest.status;
      dispatch(changeRequestStatusInOpening({ requestId, newStatus }));
    }
    setIsButtonLoading(false);
  };

  const CandidateFullName =
    request.candidate_id.first_name + " " + request.candidate_id.last_name;
  const resumeUrl = request.candidate_id.resume.url;
  const jobPostingUrl = request.job_posting_url;
  const requestFiles = request.request_files;
  const isConversation = request.InfoRequest.Conversation.length > 0;
  const conversation = request.InfoRequest.Conversation;

  const onModalClose = () => {
    setOpenModal(false);
    navigate("/opening");
  };

  return (
    <div>
      {/* Button to show up Modal */}
      {TriggerElement}

      {/* Opening Modal */}
      <Modal size="4xl" show={openModal} onClose={onModalClose}>
        <Modal.Header>
          <p className="font-bold text-2xl">Candidate Overview</p>
        </Modal.Header>

        <Modal.Body>
          <div className="py-2 px-6 flex flex-col gap-4 w-full">
            <p className="text-primaryDark font-bold">{CandidateFullName}</p>
            <div>
              <div className="md:flex md:gap-8">
                <section className="flex gap-6 w-fit h-fit">
                  <PercentageChart percentage={request.compatibility} />

                  <div className="flex items-center relative grow">
                    <EvaluationText percentage={request.compatibility} />
                  </div>
                </section>

                <section className="grow flex flex-col gap-1">
                  <section>
                    <a
                      href={jobPostingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center hover:text-primaryDark"
                    >
                      <p className="font-bold">Job Posting</p>
                      <TbExternalLink />
                    </a>
                  </section>

                  <div className="mb-3 lg:m-0">
                    <section>
                      <p className="font-bold">Resume</p>
                      <FileBox fileUrl={resumeUrl} />
                    </section>

                    {requestFiles.length > 0 && (
                      <section>
                        <p className="font-bold">Uploaded Files</p>
                        <div className="flex flex-col gap-1">
                          {requestFiles.map((fileUrl) => (
                            <FileBox fileUrl={fileUrl} />
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </section>
              </div>
              <div className="h-0.5 w-90 bg-primary mx-3"></div>
            </div>

            {isConversation && (
              <section>
                <p className="font-bold text-lg">Information Update</p>
                <ConversationBox
                  conversation={conversation}
                  currentRole="referrer"
                />
              </section>
            )}
            {isConversation && (
              <div className="h-0.5 w-90 bg-primary mx-3"></div>
            )}

            <section className="flex justify-end">
              {/* If status is matched, ask for deny/approve */}
              {request.status === "matched" && (
                <div className="flex flex-wrap gap-2">
                  {/* Deny button */}
                  <button
                    disabled={isButtonLoading}
                    onClick={() => {
                      changeRequestStatus("waiting");
                    }}
                    className="outline-btn h-fit rounded-md btn-padding"
                  >
                    <p>Decline Referral</p>
                  </button>

                  {/* Approve button */}
                  <button
                    disabled={isButtonLoading}
                    onClick={() => {
                      changeRequestStatus("approved");
                    }}
                    className="filled-btn h-fit rounded-md btn-padding"
                  >
                    <p>Accept Referral</p>
                  </button>
                </div>
              )}

              {/* If status is approved, ask for refer status */}
              {request.status === "approved" && (
                <div className="flex flex-wrap gap-2">
                  {/* Request Info button */}
                  <RequestInfoModal
                    request={request}
                    Trigger={
                      <button
                        disabled={isButtonLoading}
                        className="outline-btn h-fit rounded-md btn-padding"
                      >
                        <p>Request Information</p>
                      </button>
                    }
                  />

                  {/* Refer button */}
                  <button
                    disabled={isButtonLoading}
                    onClick={() => {
                      changeRequestStatus("referred");
                    }}
                    className="filled-btn h-fit rounded-md btn-padding"
                  >
                    <p>Refer Candidate</p>
                  </button>
                </div>
              )}
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OpeningInfoModal;
