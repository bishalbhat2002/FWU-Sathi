import { Link, useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../store/features/message/message.slice";
import { deleteMessageThunk } from "../../store/features/message/message.thunk";
import { useEffect, useState } from "react";

const DeleteMessageBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const messages = useSelector((state) => state.messageReducer.messages);
  const message = messages.find((message) => message._id === messageId);
  const success = useSelector((state) => state.messageReducer.success);
  const loader = useSelector((state) => state.messageReducer.loader);

  const [ready, setReady] = useState(false);

  console.log("message:", message);
  console.log("messages:", messages);

  useEffect(() => {
    dispatch(setSuccess(false));
    setReady(true);
  }, []);

    useEffect(() => {
    if (!ready) return;

    if (!loader && success) {
      navigate(-1);
    }
  }, [success, loader]);

  function handleMessageDelete(e) {
    e.preventDefault();
    dispatch(deleteMessageThunk({ messageId }));
  }

  return (
    <OverlayScreen>
      <div className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2">
        <Link
          to={"/chat"}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </Link>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Delete Message
        </h3>

        {message && (
          <p className="scrollbar-none text-sm sm:text-md bg-white/98 rounded-sm text-gray-800 font-medium w-full p-4">
            {message?.message}
          </p>
        )}

        {/* Delete Confirmation Buttons... */}
        <div className="bg-white mt-2 p-2 rounded-md shadow">
          <h2 className="text-center text-sm sm:text-md md:text-lg font-medium text-zinc-800 ">
            Are you sure, You want to <b className="text-red-600">delete</b>{" "}
            this Message?
          </h2>
          <div className="text-md font-medium flex gap-2">
            <Link to={"/chat"} className="w-1/2">
              <button
                autoFocus={true}
                type="button"
                className="w-full mt-2 inline-block py-2 bg-white/10 border border-black/10 shadow rounded-sm text-zinc-800 hover:bg-blue-200 active:scale-97 ease-in duration-200"
              >
                No, don't Delete.
              </button>
            </Link>
            <button
              type="button"
              onClick={handleMessageDelete}
              className="w-1/2 mt-2 inline-block py-2 bg-red-300 rounded-sm border border-black/10 shadow text-zinc-800 hover:bg-red-400 hover:text-white active:scale-97 ease-in duration-200"
            >
              Yes, Delete.
            </button>
          </div>
        </div>
      </div>
    </OverlayScreen>
  );
};

export default DeleteMessageBox;
