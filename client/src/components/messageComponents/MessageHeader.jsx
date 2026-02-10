import { useDispatch, useSelector } from "react-redux"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineNotificationsOff } from "react-icons/md";
import { setMuteMessage } from "../../store/features/message/message.slice";
import {toast} from "react-hot-toast";

export const Header = ()=>{

  const totalUsers = useSelector(state=>state.userReducer.totalUsers);
  const onlineUsers = useSelector(state=>state.socketReducer.onlineUsers);
  const muteMessage = useSelector(state=>state.messageReducer.muteMessage);
  const dispatch = useDispatch();

  function handleMessageNotification(e){
    e.preventDefault();
    
    if(muteMessage){
        dispatch(setMuteMessage(false));
          toast("Message notifications enabled", {icon: "🔔", position:"top-right", duration:1000});
      }else{
          dispatch(setMuteMessage(true));
          toast("Message notifications muted", {icon: "🔕", position:"top-right", duration:1000});
      }  
  }

  return(
      <div className='bg-gray-800 py-1 w-full flex justify-between pl-5 pr-1 items-center relative'>
        <h2 className='text-md sm:text-lg md:text-xl lg:2xl font-extrabold text-white'>
          FWU BSc.CSIT Chat Group
        </h2>
        <div className="h-auto flex gap-2">
            <button
            type="button"
            onClick={handleMessageNotification}
              className="hover:scale-104 active:scale-99 transition-all duration-200 ease-in-out"
            >
                {muteMessage ? <MdOutlineNotificationsOff className="size-9 text-zinc-800 bg-zinc-200 p-1 rounded-md"/> : <MdOutlineNotificationsActive className="size-9 text-zinc-800 bg-zinc-200 p-1 rounded-md"/>}
            </button>
            
            <div className="bg-white/90 p-1 rounded-sm">
              <p className="text-[10px] sm:text-xs font-medium flex justify-between">Total Members: &nbsp; <span className="font-bold text-green-800"> {totalUsers}</span></p>
              <p className="text-[10px] sm:text-xs font-medium flex justify-between">Online Members: &nbsp; <span className="font-bold text-green-800"> {onlineUsers?.length}</span></p>
            </div>

          </div>
    </div>
  )
}
