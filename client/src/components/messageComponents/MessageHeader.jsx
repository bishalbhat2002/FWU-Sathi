import { useSelector } from "react-redux"

export const Header = ()=>{

  const totalUsers = useSelector(state=>state.userReducer.totalUsers);

  const onlineUsers = useSelector(state=>state.socketReducer.onlineUsers);

  return(
      <div className='bg-gray-800 py-1 w-full flex justify-between pl-5 pr-1 items-center relative'>
        <h2 className='text-md sm:text-lg md:text-xl lg:2xl font-extrabold text-white'>
          FWU BSc.CSIT Chat Group
        </h2>
        <div className="bg-white/90 p-1 rounded-sm">
          <p className="text-[10px] sm:text-xs font-medium flex justify-between">Total Members: &nbsp; <span className="font-bold text-green-800"> {totalUsers}</span></p>
          <p className="text-[10px] sm:text-xs font-medium flex justify-between">Online Members: &nbsp; <span className="font-bold text-green-800"> {onlineUsers?.length}</span></p>
        </div>
    </div>
  )
}
