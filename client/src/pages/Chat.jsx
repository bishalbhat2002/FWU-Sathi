import { Outlet } from "react-router-dom";
import FixPageLaout from "../layouts/FixPageLayout";
import { Header } from "../components/messageComponents/MessageHeader";
import { MessageWrite } from "../components/messageComponents/MessageWrite";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesThunk } from "../store/features/message/message.thunk";
import { useEffect } from "react";
import { MessagesBoxContainer } from "../components/messageComponents/MessagesBoxContainer";
import { getTotalUserThunk } from "../store/features/user/user.thunk";
import { setOnlineUsers } from "../store/features/socket/socket.slice";
import { appendMessage } from "../store/features/message/message.slice";


const Chat = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socketReducer.socket);
  
  useEffect(() => {
    dispatch(getMessagesThunk({ pages: 1 }));
    dispatch(getTotalUserThunk());
  }, []);


  useEffect(() => {
    // return if socket doesn't exit...
    if (!socket) return;
    console.log("Socket is set:", socket.id);


    const handleNewMessage = (newMessage) => {
        dispatch(appendMessage(newMessage));
    }

    socket.on("newMessage", handleNewMessage);

      // cleanup code
      return ()=>{
        socket.off("newMessage", handleNewMessage);
      }

  }, [socket, dispatch]);

  return (
    <FixPageLaout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[98%] w-full max-w-160 bg-blue-200 mx-auto mt-2 rounded-md flex flex-col justify-between overflow-hidden shadow-2xl relative">
        <Header />

        <MessagesBoxContainer />
        <Outlet />
        <MessageWrite />
      </div>
    </FixPageLaout>
  );
};

export default Chat;
