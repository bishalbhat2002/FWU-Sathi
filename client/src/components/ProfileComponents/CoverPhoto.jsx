import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const CoverPhoto = () => {
  const [cover, setCover] = useState(null);

  function handleCoverChange(e) {
    e.preventDefault();
    alert("Apli callll..")
  }

  return (
    <>
      <div className="relative border-1 border-zinc-200 border-t-0 bg-linear-to-b from-zinc-300 to-zinc-100 mb-1 w-full h-35 rounded-b-md overflow-clip">
        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            alt=""
            className="w-full"
          />
        )}

        <div className="text-lg font-semibold absolute top-4 right-4">
          <input
            type="file"
            accept="image/*"
            hidden={true}
            id="coverPhoto"
            onChange={(e) => setCover(e.target.files[0])}
          />
          <button
            onClick={() => document.getElementById("coverPhoto").click()}
            className="bg-zinc-300 rounded-full p-1 text-zinc-800 hover:opacity-90 active:scale-97 ease-in duration-200"
          >
            <MdModeEdit className="-rotate-15 scale-80 text-zinc-800 hover-scale" />
          </button>
        </div>

        {cover && (
          <div className="absolute bottom-2 text-xs right-2 flex gap-2">
            <button
              onClick={handleCoverChange}
              autoFocus={true}
              className="text-white hover-scale bg-blue-500 opacity-90 hover:opacity-100 rounded-md px-2 py-1"
            >
              Save cover
            </button>

            <button
              onClick={(e)=>setCover(null)}
              className="text-white hover-scale bg-zinc-500 opacity-90 hover:opacity-100 rounded-md px-2 py-1 text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverPhoto;
