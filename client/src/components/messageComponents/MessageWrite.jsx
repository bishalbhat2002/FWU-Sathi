import { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux"
import { sendMessageThunk } from "../../store/features/message/message.thunk";

export const MessageWrite = ()=>{

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const success = useSelector(state=>state.messageReducer.success)
  const loader = useSelector(state=>state.messageReducer.loader)

  useEffect(()=>{
    if(!loader && success){
      setMessage("");
    }
  }, [success, loader])

  // Handle Message Send
  function handleMessageSend(e){
    e.preventDefault();
    if(message.length === 0)
      return;
    dispatch(sendMessageThunk({message}));
  }

  return (
      <form onSubmit={handleMessageSend} className="mx-auto w-[97%] bg-zinc-200 flex justify-between gap-2 rounded-sm p-2">
      <input
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
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