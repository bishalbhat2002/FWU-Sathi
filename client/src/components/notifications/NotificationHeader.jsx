import toast from "react-hot-toast";
import { MdOutlineNotificationsActive, MdOutlineNotificationsOff } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setMuteNotifications } from "../../store/features/post/post.slice";


export const NotificationHeader = () => {

  const muteNotifications = useSelector(
    (state) => state.postReducer.muteNotifications,
  );

  const dispatch = useDispatch();

  const handleMuteNotifications = (e) => {
    e.preventDefault();
    if (muteNotifications) {
      dispatch(setMuteNotifications(false));

      toast("Notifications enabled", {
        icon: "🔔",
        position: "top-right",
        duration: 1000,
      });

    } else {
      dispatch(setMuteNotifications(true));
      toast("Notifications muted", {
        icon: "🔕",
        position: "top-right",
        duration: 1000,
      });
    }
  };

  return (
    <div className="bg-gray-800 py-2 w-full flex justify-between pl-6 pr-2 items-center ">
      <h2 className="text-2xl font-extrabold text-white">All Notifications</h2>
      <button
        type="button"
        onClick={handleMuteNotifications}
        className="hover:scale-104 active:scale-99 transition-all duration-200 ease-in-out"
      >
        {muteNotifications ? (
          <MdOutlineNotificationsOff className="size-9 text-zinc-800 bg-zinc-200 p-1 rounded-md" />
        ) : (
          <MdOutlineNotificationsActive className="size-9 text-zinc-800 bg-zinc-200 p-1 rounded-md" />
        )}
      </button>
    </div>
  );
};
