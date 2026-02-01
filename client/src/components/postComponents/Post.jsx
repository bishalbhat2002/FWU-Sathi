import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { TbHeartFilled } from "react-icons/tb";
import { LiaCommentDots } from "react-icons/lia";
import { TbMessageReport } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import { Comment } from "./Comment";
// import { CommentWrite } from "./WriteComment";
// import { useState } from "react";
// import CommentPost from "./CommentPost";

const Post = ({commentBtnDisabled=false}) => {

  const navigate = useNavigate();
  return (
    <>
      <div className="mx-auto max-w-130 w-full bg-white shadow-post rounded-md overflow-hidden">
        <div className="flex gap-4 p-2 items-center shadow-bottom relative bg-white">
          <Link to="/profile/id">
            <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
          </Link>
          <div>
            <Link to="/profile/id">
              <h2 className="font-bold text-xl text-zinc-700 line-clamp-1">
                Bishal Bhat
              </h2>
            </Link>
            <p className="font-medium text-gray-500 text-sm -mt-1">
              5th Semester
            </p>
          </div>

          {/* Options for handling posts.... */}
          <div className="absolute top-1 right-1 border-1 border-black/20 flex gap-2 px-2 py-1 rounded-md ">
            <Link
              to={`/post/edit`}
              className="rounded-full p-1 bg-white hover:bg-gray-400 group hover-scale"
              title="Edit Post"
            >
              <MdModeEdit className="size-4 -rotate-15 text-zinc-500 group-hover:text-white hover-scale" />
            </Link>

            <Link
              to={`/post/report`}
              className="rounded-full p-1 bg-white hover:bg-gray-400 group hover-scale"
              title="Report Post"
            >
              <TbMessageReport className="size-4 text-zinc-500 group-hover:text-white hover-scale" />
            </Link>

            <Link
              to={`/post/delete`}
              className="rounded-full p-1 bg-white hover:bg-red-300 group hover-scale"
              title="Delete Post"
            >
              <MdDelete className="size-4 text-zinc-500 hover-scale group-hover:text-white " />
            </Link>
          </div>

          <div className="pr-1 pb-0.5 rounded-tl-sm text-zinc-400 font-medium absolute right-0 bottom-0">
            2082-12-10 12:10:30
          </div>
        </div>
        <div className="p-1 bg-white">
          <p className="w-full px-2 py-1 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            exercitationem, fugit asperiores fuga ullam obcaecati rem
            consectetur quae harum ut modi sapiente recusandae dolor vel minima
            corporis tenetur impedit cum!
          </p>
          <div className="w-full relative px-2 py-1">
            <img
              src="/image.png"
              alt="Post photo"
              className="rounded-sm"
              onClick={() => navigate("/post/view-image")}
            />
          </div>
        </div>
        <div className="bg-white flex rounded-b-sm h-10 gap-1 mx-3 mb-2">
          <button className="w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90">
            {" "}
            {true ? (
              <FaRegHeart />
            ) : (
              <TbHeartFilled className="scale-115 text-red-500" />
            )}{" "}
            <span className="ml-2">1000</span>{" "}
          </button>

          <Link
          to={"/post/comment"}
          className={`w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90 ${commentBtnDisabled?"hidden":""}`}
          >
            <LiaCommentDots className="scale-125" />{" "}
            <span className="ml-2">1000</span>{" "}
          </Link>

          <button className="w-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90">
            <IoIosLink className="scale-110" />{" "}
          </button>
        </div>
      </div>

    </>
  );
};

export default Post;
