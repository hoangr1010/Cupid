import React from "react";

const Message = ({ messageText, isMine, sameAsPrevious, sender }) => {
  const otherRole = sender === "candidate" ? "Candidate" : "Referrer";

  return (
    <div className={isMine && "flex justify-end"}>
      <section className="flex flex-col">
        {isMine && !sameAsPrevious && (
          <p className="text-xs text-primaryDark text-end font-bold">
            Your Note
          </p>
        )}

        {!isMine && !sameAsPrevious && (
          <p className="text-xs text-grayLight text-start font-bold">
            {otherRole} Note
          </p>
        )}
        <p
          className={
            isMine ? "my-message max-w-lg" : "another-message max-w-lg"
          }
        >
          {messageText}
        </p>
      </section>
    </div>
  );
};

export default Message;
