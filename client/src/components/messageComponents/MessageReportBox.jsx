import { Link } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ProfilePhoto from "../commonComponents/ProfilePhoto";

const ReportMessageBox = () => {
  const [editReport, setEditMessage] = useState("Your report Here....");
  function handleMessageReport(e) {
    e.preventDefault();
  }

  return (
    <OverlayScreen>
      <form
        onSubmit={handleMessageReport}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2"
      >
        <Link
          to={"/chat"}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </Link>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Report Message
        </h3>

        {/* Show Message.... */}
        <ShowMessage />

        <textarea
          value={editReport}
          rows={5}
          name="edit-message"
          autoFocus={true}
          onChange={(e) => setEditMessage(e.target.value)}
          className="scrollbar-none text-sm sm:text-md bg-white/90 rounded-sm w-full p-2 text-gray-700 font-medium"
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

export default ReportMessageBox;

function ShowMessage() {
  return (
    <div className="w-full flex gap-2 bg-yellow-200 p-2 rounded-sm">
      <Link to={"/profile"}>
        <ProfilePhoto className={"h-15 w-15 no-scale-on-hover"} />
      </Link>

      <p className="w-full text-sm sm:text-md bg-white rounded-sm p-2 border-1 border-gray-400 text-gray-700 font-medium">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea ducimus
          repellendus quaerat asperiores qui consectetur, architecto animi
      </p>
    </div>
  );
}
