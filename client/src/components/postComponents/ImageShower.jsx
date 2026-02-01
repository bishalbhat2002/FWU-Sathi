import { RxCross2 } from "react-icons/rx";
import OverlayScreen from "../../layouts/OverlayScreen";
import { IoMdDownload } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ImageShower = () => {
const navigate = useNavigate();

  return (
    <OverlayScreen>
      <div className="flex gap-3 px-2 py-1 bg-white absolute top-[94%] right-5 lg:top-15 lg:right-15 border-1 border-zinc-400 rounded-md">
        <button
          onClick={() => alert("Download button")}
          className="rounded-full p-1 bg-zinc-300 hover-scale"
        >
          <IoMdDownload className="size-6 text-zinc-500 hover-scale" />
        </button>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-1 bg-zinc-300 border-2 border-white hover-scale"
        >
          <RxCross2 className="size-6 text-zinc-500  hover-scale" />
        </button>
      </div>

      {/*Use condition to show the photo  */}
      <div className="max-w-full relative">
        <img
          src="/image.png"
          alt="Post photo"
          className="rounded-md lg:scale-130 xl:scale-150"
        />
      </div>
    </OverlayScreen>
  );
};

export default ImageShower;
