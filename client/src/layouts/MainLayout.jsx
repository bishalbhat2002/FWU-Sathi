import { Link, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/commonComponents/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { initializeSocket } from "../store/features/socket/socket.slice";
import toast from "react-hot-toast";

const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated,
  );
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const socket = useSelector((state) => state.socketReducer.socket);
  const muteMessage = useSelector((state) => state.messageReducer.muteMessage);
  const muteNotifications = useSelector((state) => state.postReducer.muteNotifications);

  useEffect(() => {
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);


  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage?.userId?._id === userProfile._id) return;
      if (location.pathname.startsWith("/chat")) return;
      
      // if user has muted the message notification then do not show the toast notification
      if(muteMessage) return;
      toast(`${newMessage?.userId?.name} messaged on group!`, {
        icon: "💬",
        position: "top-right",
      });
    };

    // Notify user for the new Message...
    socket?.on("newMessage", handleNewMessage);

    return ()=>{
      socket.off("newMessage", handleNewMessage);
    }

  }, [socket, location.pathname, muteMessage]);


  useEffect(() => {
    if (!socket) return;

    const handleNewNotifications = (newNotification) => {
      if (newNotification?.userId?._id === userProfile._id) return;
      if (location.pathname.startsWith("/notification")) return;
      console.log(newNotification.notification )
      
      // if user has muted the notification then do not show the toast notification
      if(muteNotifications) return;

      toast((t)=>(
        <Link
          to={`post/view/${newNotification.notification?.link}`}
          onClick={() => toast.dismiss(t.id)}
        >
          {
          `${newNotification?.notification?.userId?.name} ${newNotification?.notification?.notificationMessage}`
          }
        </Link>
      ), {
        icon: "🔔",
        position: "top-right",
      });
    };

    // Notify user for the new Notification...
    socket?.on("newNotification", handleNewNotifications);

    return ()=>{
      socket.off("newNotification", handleNewNotifications);
    }

  }, [socket, location.pathname, muteNotifications]);


  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
