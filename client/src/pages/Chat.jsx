import { Outlet } from "react-router-dom";
import FixPageLaout from "../layouts/FixPageLayout";
import { Header } from "../components/messageComponents/MessageHeader";
import { MessageWrite } from "../components/messageComponents/MessageWrite";
import { useDispatch } from "react-redux";
import { getMessagesThunk } from "../store/features/message/message.thunk";
import { useEffect } from "react";
import { MessagesBoxContainer } from "../components/messageComponents/MessagesBoxContainer";
import { getTotalUserThunk } from "../store/features/user/user.thunk";


const Chat = () => {

  const dispatch = useDispatch();
  
  useEffect(()=>{
      dispatch(getMessagesThunk({pages:1}));
      dispatch(getTotalUserThunk());
  }, [])  






  return (
    <FixPageLaout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[98%] w-full max-w-160 bg-blue-200 mx-auto mt-2 rounded-md flex flex-col justify-between overflow-hidden shadow-2xl relative">
        <Header />

        <MessagesBoxContainer />
       
        {/* <div className="w-full px-1 md:px-2 lg:px-5 flex flex-col gap-2 overflow-auto hide-scrollbar">
          <Message direction={"end"} msg={"1st"} />
          <Message direction={"start"} msg={"2st"} />
          <Message direction={"end"} msg={"3st"} /> 
          <Message direction={"end"} />
          <Message direction={"start"} />
          <Message direction={"end"} /> 
          <Message direction={"end"} />
          <Message direction={"start"} />
          <Message direction={"end"} />
        </div> */}
        <Outlet />
        <MessageWrite />
      </div>
    </FixPageLaout>
  );
};

export default Chat;
