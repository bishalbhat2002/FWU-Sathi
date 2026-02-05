import { Link, useNavigate, useParams } from "react-router-dom";
import OverlayScreen from "../../layouts/OverlayScreen";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utilities/getImageUrl";

const ReportComment = () => {
  const [reportComment, setReportComment] = useState("Your report Here....");
  const navigate = useNavigate();
  const commentId = useParams().commentId;

  const comments = useSelector((state) => state.postReducer.comments);
  const comment = comments.find((comment) => comment._id === commentId);

  function handleCommentReport(e) {
    e.preventDefault();
  }

  return (
    <OverlayScreen>
      <form
        onSubmit={handleCommentReport}
        className="w-[80vw] relative max-w-130 bg-gray-800 p-5 rounded-md flex flex-col gap-2"
      >
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-1 bg-gray-800 absolute border-2 border-white -right-3 -top-3 hover-scale"
        >
          <RxCross2 className="size-6 text-white hover-scale" />
        </button>

        <h3 className="text-white text-lg font-semibold text-center -mt-3 mb-1">
          Report Comment
        </h3>

        {/* Show Message.... */}
        <ShowComment comment={comment} />

        <textarea
          value={reportComment}
          rows={5}
          name="edit-message"
          autoFocus={true}
          onChange={(e) => setReportComment(e.target.value)}
          className="scrollbar-none text-sm sm:text-md bg-white/90 rounded-sm w-full p-2 text-gray-700 font-medium"
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

export default ReportComment;

// Component to show the Comment....
function ShowComment({ comment }) {
  return (
    <div className="w-full flex gap-2 bg-blue-200/40 p-2 rounded-sm">
      <Link to={"/profile"}>
        <ProfilePhoto
          imgSrc={comment.userId.photo}
          className={"h-15 w-15 no-scale-on-hover"}
        />
      </Link>

      <div className="w-full bg-white rounded-sm px-3 py-2 border-1 border-gray-400 text-gray-700 font-medium">
        <h2 className="text-md sm:textlg font-bold text-zinc-700">
          {comment.userId.name}
        </h2>
        <p className="text-sm sm:text-md">{comment.comment}</p>
      </div>
    </div>
  );
}
