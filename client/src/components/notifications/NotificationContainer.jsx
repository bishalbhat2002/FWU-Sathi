import { NotificationLink } from "./NotificationLink";
import { useSelector } from "react-redux";



export const NotificationContainer = () => {
     const notifications = useSelector((state) => state.postReducer.notifications);


  return (
    <div className="w-full px-5 flex flex-col gap-2 overflow-auto hide-scrollbar">
      {/* Render Notifications here... */}
      {notifications?.map((notification) => (
        <NotificationLink key={notification?._id} notification={notification} />
      ))}

      {notifications?.length === 0 && (
        <p className="pt-30 w-full flex items-center justify-center text-lg font-semibold text-gray-600">
          {" "}
          No notifications found.{" "}
        </p>
      )}

      {/* <p className="text-center font-medium text-gray-700 mt-1 animate-pulse">
            Getting older Notifications...
          </p> */}
    </div>
  );
}
