import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/commonComponents/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage?.userId?._id === userProfile._id) return;
      if (location.pathname.startsWith("/chat")) return;

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

  }, [socket, location.pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
