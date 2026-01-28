import OverlayScreen from "../../layouts/OverlayScreen";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";

const ImageShower = () => {
  return (
    <OverlayScreen>
      <div className="flex gap-3 px-2 py-1 bg-white absolute top-15 right-15 border-1 border-zinc-400 rounded-md">
          <button
          onClick={()=>alert("Download button")}
            className="rounded-full p-1 bg-zinc-300 hover-scale"
          >
            <IoMdDownload className="size-6 text-zinc-500 hover-scale" />
          </button> 
          <Link
            to={"/"}
            className="rounded-full p-1 bg-zinc-300 hover-scale"
          >
            <RxCross2 className="size-6 text-zinc-500 hover-scale" />
          </Link>

        </div>

           {/*Use condition to show the photo  */}
            <div className="max-w-full relative">
              <img src="/image.png" alt="Post photo" 
              className="rounded-md lg:scale-130 xl:scale-150" />
            </div>
          

    </OverlayScreen>
  );
};

export default ImageShower;
