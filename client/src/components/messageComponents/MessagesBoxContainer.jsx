import { useSelector } from "react-redux";
import { Message } from "./Message";
import { useEffect, useRef } from "react";

export const MessagesBoxContainer = () => {
  const chatRef = useRef(null);
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const messages = useSelector((state) => state.messageReducer.messages);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      ref={chatRef}
      className="w-full flex-1 px-1 md:px-2 lg:px-5 flex flex-col-reverse gap-2 overflow-auto hide-scrollbar"
    >
      {messages?.map((message) => (
        <Message
          key={message?._id}
          direction={
            userProfile?._id === message?.userId?._id ? "end" : "start"
          }
          message={message}
        />
      ))}
    </div>
  );
};
