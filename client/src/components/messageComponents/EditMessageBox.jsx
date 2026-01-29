import { Link } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditMessageBox = () => {
  const [editMessage, setEditMessage] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, odio",
  );
  function handleMessageEdit(e) {
    e.preventDefault();
  }

  return (
    <OverlayScreen>
      <form
        onSubmit={handleMessageEdit}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2"
      >
        <Link
          to={"/chat"}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </Link>
       
       <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">Edit Message</h3>

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
          className="text-white text-lg py-1 rounded-sm bg-blue-500 w-full"
        />
      </form>
    </OverlayScreen>
  );
};

export default EditMessageBox;
