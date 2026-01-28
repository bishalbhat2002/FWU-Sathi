import { Link } from 'react-router-dom'
import FixPageLayout from '../layouts/FixPageLayout';
import ProfilePhoto from '../components/commonComponents/ProfilePhoto';

const Notification = () => {
  return (
    <FixPageLayout >
      {/* Notes Header.... */}
      <div className='pb-6 h-[99%] w-full max-w-160 bg-gray-200 mx-auto shadow mt-2 rounded-md flex flex-col gap-2 shadow items-start rounded overflow-hidden'>
        <Header />

        <div className='w-full px-5 mt-2 flex flex-col gap-2 overflow-auto hide-scrollbar'>
        
        {/* Render Notifications here... */}
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />
            <NotificationLink />

            <p className='text-center font-medium text-gray-700 mt-1 animate-pulse'>Getting older Notifications...</p>
        </div>

      </div>

    </FixPageLayout>
  )
}

export default Notification;


// Header component for Notifications
function Header(){
  return(
      <div className='bg-gray-800 h-12 w-full flex justify-center items-center '>
        <h2 className='text-2xl font-extrabold text-white'>
          All Notifications
        </h2>
    </div>
  )
}


// One Notification Component code
function NotificationLink(){
  return(
    <Link to={"/post/view"} className="w-full shadow-notes p-2 px-4 rounded-sm hover-scale-sm flex items-center bg-white">
     <div className='flex items-center gap-5'>
      <ProfilePhoto />
      <p className=' font-medium text-xs sm:text-sm md:text-md lg:text-lg text-zinc-60' ><b>Bishal Bhat</b> commented on your Post.</p>
     </div>
    </Link>
  )
}