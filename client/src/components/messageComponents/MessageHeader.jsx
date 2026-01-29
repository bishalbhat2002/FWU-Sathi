
export const Header = ()=>{
  return(
      <div className='bg-gray-800 h-20 w-full flex justify-between items-center pl-5 pr-1 items-center relative'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-extrabold text-white'>
          FWU BSc.CSIT Chat Group
        </h2>
        <div className="bg-white/90 p-1 rounded-sm">
          <p className="text-[10px] sm:text-xs font-medium flex justify-between">Total Members: &nbsp; <span className="font-bold text-green-800"> 200</span></p>
          <p className="text-[10px] sm:text-xs font-medium flex justify-between">Online Members: &nbsp; <span className="font-bold text-green-800"> 20</span></p>
        </div>
    </div>
  )
}
