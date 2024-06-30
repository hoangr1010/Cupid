import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import ConversationBox from "../../components/ConversationBox";
import FileBox from "../../components/FileBox";
import { useSelector } from "react-redux";
import RequestInfoModal from "./RequestInfoModal";
import { LuExternalLink } from "react-icons/lu";
import { toast } from "sonner";
import PercentageChart from "../../components/PercentageChart";
import EvaluationText from "../../components/EvaluationText";

const RequestCard = (props) => {
  const { request, trigger } = props;
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const files = request.request_files;

  const conversation = request.InfoRequest.Conversation;

  const TriggerElement = React.cloneElement(trigger, {
    onClick: () => {
      setOpenModal(true);
    },
  });

  return (
    <>
      {TriggerElement}
      <Modal
        dismissible
        size="3xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header>
          <div className="font-bold px-4 mt-3">My Request</div>
        </Modal.Header>
        <Modal.Body>
          <div className="h-0.5 bg-grayLighter "></div>
          {request.InfoRequest.isActive ? (
            <div className="flex justify-center p-1 bg-pink text-white font-semibold text-sm rounded-md m-2">
              <div>Referrer requested for extra information</div>
              <RequestInfoModal
                request={request}
                trigger={
                  <button className="mx-3 underline hover:underline-offset-2">
                    Update now
                  </button>
                }
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex ms-2 mt-3">
            <div className="me-2 w-1/2">
              {/* main part */}
              <div className="mb-3">
                <div className="font-semibold">Your Resume</div>
                <div className="w-4/5">
                  <FileBox fileUrl={user.resume.url} />
                </div>
              </div>
              <div className="my-3">
                <div className="font-semibold">Job Posting</div>

                <div className="flex">
                  <div className="border flex w-2/3 rounded-lg bg-grayLighter">
                    <a href={request.job_posting_url}>
                      <button className="w-10 h-8 flex justify-center items-center">
                        <LuExternalLink />
                      </button>
                    </a>

                    <div className="content-center overflow-hidden px-2 bg-white rounded-e-lg">
                      {request.job_posting_url}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(request.job_posting_url);
                      toast.success("Link copied");
                    }}
                    className="mx-3 px-3 bg-primaryLight text-primaryDark font-semibold text-sm rounded-lg"
                  >
                    Copy link
                  </button>
                </div>
              </div>

              {request.status === "waiting" ? (
                <></>
              ) : (
                <section className="flex gap-6 w-fit h-fit mt-7">
                  <PercentageChart percentage={request.compatibility} />

                  <div className="flex items-center relative grow">
                    <EvaluationText percentage={request.compatibility} />
                  </div>
                </section>
              )}
            </div>

            {request.request_files.length ? (
              <div className="w-full ms-2">
                <div className="font-semibold">Uploaded Files</div>

                {files.map((file) => (
                  <div className="w-4/5 my-1">
                    <FileBox fileUrl={file} />
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          {conversation.length ? (
            <div className="mb-1 mx-2">
              {/* <div className="h-0.5 bg-primary mx-3"></div> */}
              <div className="font-semibold">Information Update</div>
              <div className="h-0.5 bg-grayLighter mb-1"></div>
              <ConversationBox
                conversation={conversation}
                currentRole="candidate"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="h-0.5 bg-grayLighter "></div>
          <div className="flex justify-end">
            <button
              onClick={() => setOpenModal(false)}
              className="mt-2 me-2 py-1.5 px-3 rounded-lg border-2 border-primaryLight font-semibold text-primaryDark hover:text-primary"
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestCard;
