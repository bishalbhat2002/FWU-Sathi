import ProfilePhoto from "../commonComponents/ProfilePhoto";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { TbHeartFilled } from "react-icons/tb";
import { LiaCommentDots } from "react-icons/lia";
import { TbMessageReport } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Post = () => {
  return (
    <div className="mx-auto max-w-130 w-full bg-white-600 border-1 border-gray-300 rounded-md overflow-hidden">
      <div className="flex gap-4 p-2 items-center border-b border-gray-300 relative">
        <Link to="/profile/id">
          <ProfilePhoto className="h-15 w-15 no-scale-on-hover" />
        </Link>
        <div>
          <Link to="/profile/id">
            <h2 className="font-bold text-xl text-zinc-700">Bishal Bhat</h2>
          </Link>
          <p className="font-light text-sm">2082-12-10 12:10:30</p>
        </div>

        {/* Options for handling posts.... */}
        <div className="absolute top-2 right-2 flex gap-2 ">
          <Link
            to={`/post/edit`}
            className="rounded-full p-1 bg-zinc-200  hover:bg-zinc-300 hover-scale"
            title="Edit Post"
          >
            <MdModeEdit className="size-6 -rotate-15 scale-80 text-zinc-500 hover-scale" />
          </Link>
          <Link
            to={`/post/report`}
            className="rounded-full p-1 bg-zinc-200 group hover-scale"
            title="Report Post"
          >
            <TbMessageReport className="size-6 scale-80 text-zinc-500 hover-scale" />
          </Link>
          <Link
            to={`/post/delete`}
            className="rounded-full p-1 bg-red-200 hover:bg-red-300 group hover-scale"
            title="Report Post"
          >
            <MdDelete className="size-6 scale-80 text-zinc-500 hover-scale group-hover:text-white " />
          </Link>
        </div>
        <div className="px-3 rounded-tl-sm text-zinc-800 bg-zinc-200 absolute right-0 bottom-0">
          5th Semester
        </div>
      </div>
      <div className="p-1">
        <p className="w-full px-2 py-1 shadow text-gray-700 focus:outline-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          exercitationem, fugit asperiores fuga ullam obcaecati rem consectetur
          quae harum ut modi sapiente recusandae dolor vel minima corporis
          tenetur impedit cum!
        </p>
        <div className="w-full relative px-2 py-1">
          <img src="/image.png" alt="Post photo" className="rounded-sm" />
        </div>
      </div>
      <div className="flex rounded-b-sm h-10 gap-1 mx-3 mb-2">
        <button className="w-1/3 flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90">
          {" "}
          {true ? (
            <FaRegHeart />
          ) : (
            <TbHeartFilled className="scale-115 text-red-500" />
          )}{" "}
          <span className="ml-2">1000</span>{" "}
        </button>
        <button className="w-1/3 flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90">
          <LiaCommentDots className="scale-125" />{" "}
          <span className="ml-2">1000</span>{" "}
        </button>
        <button className="w-1/3 flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:scale-96 duration-200 ease-in rounded-md hover:opacity-90">
          <IoIosLink className="scale-110" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Post;
