import FixPageLayout from "../layouts/FixPageLayout"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsThunk } from "../store/features/post/post.thunk";
import { appendNotification } from "../store/features/post/post.slice";
import toast from "react-hot-toast";
import { NotificationContainer } from "../components/notifications/NotificationContainer";
import { NotificationHeader } from "../components/notifications/NotificationHeader";


const Notification = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socketReducer.socket);

  useEffect(() => {
    dispatch(getNotificationsThunk({ page: 1 }));
  }, []);


  useEffect(() => {
    if(!socket) return;

    const handleNewNotification = ({ notification }) => {
      console.log(notification);
      dispatch(appendNotification(notification));
    }

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    }

  }, [socket]);




  return (
    <FixPageLayout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[99%] w-full max-w-160 bg-gray-200 mx-auto shadow mt-2 rounded-md flex flex-col gap-2 items-start overflow-hidden">
        <NotificationHeader />

        <NotificationContainer />
      
      </div>
    </FixPageLayout>
  );
};

export default Notification;

