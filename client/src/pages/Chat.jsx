import { Link } from "react-router-dom";
import FixPageLaout from "../layouts/FixPageLayout";

import { Header } from "../components/messageComponents/MessageHeader";
import { Message } from "../components/messageComponents/Message";
import ProfilePhoto from "../components/commonComponents/ProfilePhoto";
import { MessageWrite } from "../components/messageComponents/MessageWrite";

const Chat = () => {
  return (
    <FixPageLaout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[98%] w-full max-w-160 bg-blue-200 mx-auto mt-2 rounded-md flex flex-col items-start overflow-hidden shadow-2xl">
        <Header />
        <div className="w-full px-5 flex flex-col gap-2 overflow-auto hide-scrollbar">
          <Message direction={"end"} />
          <Message direction={"start"} />
          <Message direction={"end"} /> 
          <Message direction={"end"} />
          <Message direction={"start"} />
          <Message direction={"end"} /> 
          <Message direction={"end"} />
          <Message direction={"start"} />
          <Message direction={"end"} />
        </div>
        <MessageWrite />
      </div>
    </FixPageLaout>
  );
};

export default Chat;
