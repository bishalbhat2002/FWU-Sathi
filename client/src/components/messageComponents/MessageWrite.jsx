import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export const MessageWrite = ()=>{

  const [message, setMessage] = useState("");
  
  // Handle Message Type
  function handleMessageType(e){
    setMessage(e.target.value);
  }

  // Handle Message Send
  function handleMessageSend(){
    alert(message, "Message send");
  }

  return (
      <form onSubmit={handleMessageSend} className="mx-auto w-[97%] bg-zinc-200 flex justify-between gap-2 rounded-sm p-2">
      <input
        type="text"
        value={message}
        onChange={handleMessageType}
        name="comment"
        autoFocus={true}
        className="w-full focus:outline-blue-500 bg-white px-2 text-gray-700 font-medium"
        placeholder="Your Message here...."
      />
      <button 
      type="submit"
      onClick={handleMessageSend}
      className="flex hover-scale p-2 bg-blue-400 rounded-md">
        <RiSendPlaneFill className="size-7 text-white" />
      </button>
      </form>
  );
}