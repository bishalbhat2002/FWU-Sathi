import React from 'react'

const ProfilePhoto = ({className}) => {
  
  return (
    <div className={`overflow-hidden h-10 w-10 rounded-full bg-amber-50 border-2 border-violet-600 p-0.5 hover:scale-104 ease duration-200 active:scale-97 ${className}`}>
     <img src="/luffy.png" alt="" className='scale-107'/>
    </div>
  )
}

export default ProfilePhoto