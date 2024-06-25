import { useEffect, useRef } from "react";
import Message from "./Message";

const ConversationBox = ({ conversation, currentRole }) => {

  // Scroll to bottom functionality
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [conversation]);

  return (
    <div className="flex flex-col gap-1 max-h-60 overflow-auto">
      {conversation.map((message, index) => {
        // Check if previous message having same sender
        const sameAsPrevious = index > 0 && conversation[index - 1].sender === message.sender

        return (
        <Message
          messageText={message.message}
          sender={message.sender}
          isMine={message.sender == currentRole}
          sameAsPrevious={sameAsPrevious}
        />
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationBox;
