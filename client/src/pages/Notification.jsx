import { Link } from "react-router-dom";
import FixPageLayout from "../layouts/FixPageLayout";
import ProfilePhoto from "../components/commonComponents/ProfilePhoto";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getNotificationsThunk } from "../store/features/post/post.thunk";

const Notification = () => {
  
  const dispatch = useDispatch();
  const userProfile = useSelector(state=>state.userReducer.userProfile);
  const notifications = useSelector(state=>state.postReducer.notifications);

  useEffect(()=>{
    dispatch(getNotificationsThunk({page:1}));
  }, [])

  useEffect(()=>{
    console.log("fiofw",notifications)
  }, [notifications])

  return (
    <FixPageLayout>
      {/* Notes Header.... */}
      <div className="pb-2 h-[99%] w-full max-w-160 bg-gray-200 mx-auto shadow mt-2 rounded-md flex flex-col gap-2 shadow items-start rounded overflow-hidden">
        <Header />

        <div className="w-full px-5 flex flex-col gap-2 overflow-auto hide-scrollbar">
          {/* Render Notifications here... */}
          {
            notifications?.map(notification=>(
              <NotificationLink key={notification?._id} notification={notification} />
            ))
            }

          {/* <p className="text-center font-medium text-gray-700 mt-1 animate-pulse">
            Getting older Notifications...
          </p> */}
        </div>
      </div>
    </FixPageLayout>
  );
};

export default Notification;

// Header component for Notifications
function Header() {
  return (
    <div className="bg-gray-800 h-12 w-full flex justify-center items-center ">
      <h2 className="text-2xl font-extrabold text-white">All Notifications</h2>
    </div>
  );
}

// One Notification Component code
function NotificationLink({notification}) {
  return (
    <Link
      to={`/post/view/${notification.link}`}
      className="w-full shadow-notes p-2 px-4 rounded-sm hover-scale-sm flex items-center bg-white relative gap-3"
    >
      <ProfilePhoto imgSrc={notification.userId.photo} />
      <p className=" font-medium text-xs sm:text-sm md:text-md lg:text-lg text-zinc-60">
        <b>{notification.userId.name}</b> {notification.notificationMessage}
      </p>
      <small className="text-sm font-semibold text-gray-500 absolute bottom-1 right-2">{new Date(notification?.createdAt).toLocaleString("en-Np")}</small>
    </Link>
  );
}
