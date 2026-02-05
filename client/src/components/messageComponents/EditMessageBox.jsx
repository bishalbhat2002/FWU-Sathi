import { Link, useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess } from "../../store/features/message/message.slice";
import { editMessageThunk } from "../../store/features/message/message.thunk";

const EditMessageBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const messages = useSelector((state) => state.messageReducer.messages);
  const message = messages.find((message) => message._id === messageId);
  const success = useSelector((state) => state.messageReducer.success);
  const loader = useSelector((state) => state.messageReducer.loader);

  const [ready, setReady] = useState(false);

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



  const [editMessage, setEditMessage] = useState(message?.message);
  function handleMessageEdit(e) {
    e.preventDefault();

    dispatch(editMessageThunk({messageId, editMessage}))
  }

  return (
    <OverlayScreen>
      <form
        onSubmit={handleMessageEdit}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2 "
      >
        <Link
          to={"/chat"}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </Link>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Edit Message
        </h3>

        <textarea
          value={editMessage}
          rows={5}
          name="edit-message"
          autoFocus={true}
          onChange={(e) => setEditMessage(e.target.value)}
          className="scrollbar-none text-sm sm:text-md bg-white/90 rounded-sm w-full p-2"
        />

        <input
          type="submit"
          value={"Save Changes"}
          className="text-white text-lg py-1 rounded-sm bg-blue-400 hover:bg-blue-500 active:scale-98 duration-200 ease-in  w-full"
        />
      </form>
    </OverlayScreen>
  );
};

export default EditMessageBox;
