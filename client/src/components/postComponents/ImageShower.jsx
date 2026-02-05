import { RxCross2 } from "react-icons/rx";
import OverlayScreen from "../../layouts/OverlayScreen";
import { IoMdDownload } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";


const ImageShower = () => {
const navigate = useNavigate();
const {state} = useLocation();

return (
    <OverlayScreen>
      <div className="flex gap-3  bg-white absolute top-[94%] right-5 lg:top-15 lg:right-15 rounded-md">
        {/* <button */}
        {/* <a
          // onClick={() => alert("Download button")}
          href={state.imageUrl}
          download={true}
          className="rounded-full p-1 bg-zinc-300 hover-scale"
        >
          <IoMdDownload className="size-6 text-zinc-500 hover-scale" />
        </a> */}
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-1 bg-zinc-300 border-2 border-white hover-scale"
        >
          <RxCross2 className="size-6 text-zinc-500  hover-scale" />
        </button>
      </div>

      {/*Use condition to show the photo  */}
      <div className="w-full h-full flex justify-center items-center p-2">
        <img
          // src="/image.png"
          src={state.imageUrl}
          alt="Full photo view"
          className="rounded-md max-h-full"
        />
      </div>
    </OverlayScreen>
  );
};

export default ImageShower;
