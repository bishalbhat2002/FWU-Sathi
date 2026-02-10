import {Link} from "react-router-dom";
import ProfilePhoto from "../commonComponents/ProfilePhoto";


export const NotificationLink = ({ notification }) => {

   return (
    <Link
      to={`/post/view/${notification.link}`}
      className="w-full shadow-notes p-2 px-4 rounded-sm hover-scale-sm flex items-center bg-white relative gap-3"
    >
      <ProfilePhoto imgSrc={notification.userId.photo} />
      <p className=" font-medium text-xs sm:text-sm md:text-md lg:text-lg text-zinc-60">
        <b>{notification.userId.name}</b> {notification.notificationMessage}
      </p>
      <small className="text-xs sm:text-sm font-semibold text-gray-500 absolute bottom-1 right-2">
        {new Date(notification?.createdAt).toLocaleString("en-Np")}
      </small>
    </Link>
  );
}
