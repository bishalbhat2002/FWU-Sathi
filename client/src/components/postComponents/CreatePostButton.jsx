
import ProfilePhoto from '../commonComponents/ProfilePhoto'
import { Link } from 'react-router-dom'

const CreatePost = () => {
  return (
    <Link to={"/post/create"} className=''>
    <div className='max-w-130 mx-auto border-1 shadow border-black/20 px-2 py-2 mt-2 rounded-md flex gap-2 items-center'>
     <ProfilePhoto />
      <p className='text-md text-gray-600'>What's on your Mind, Bishal?</p>
     </div>
    </Link>
  )
}

export default CreatePost