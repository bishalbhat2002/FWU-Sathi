import {Link} from "react-router-dom"
import ProfilePhoto  from "../commonComponents/ProfilePhoto"

export const User = () => {

return (
  <Link to={"/profile"} className="min-w-75 max-w-120 bg-white  shadow px-3 py-2 rounded flex gap-3">
     <ProfilePhoto className={"h-22 w-22 "} />
     <NameInfo />
  </Link>
  );
};



// Searched User Other Info...
function NameInfo(){
  return (
    <div className="font-bold text-sm w-fill">
      <h2 className="text-lg text-gray-700 line-clamp-1">Bishal Bhat</h2>
      <h3 className="text-sm text-gray-600 line-clamp-1">8th Sem - BSc.CSIT</h3>
      <h3 className="text-xs text-gray-500 line-clamp-1">FWU Central Campus</h3>
      <h3 className="text-xs text-gray-400 line-clamp-1">Mahendranagar</h3>
    </div>
  )
}
