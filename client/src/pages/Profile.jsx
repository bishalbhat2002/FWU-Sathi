import ScrollPageLayout from "../layouts/ScrollPageLayout";
import ResizerLayout from "../layouts/ResizerLayout";
import CoverPhoto from "../components/ProfileComponents/CoverPhoto";
import ProfilePicture from "../components/ProfileComponents/ProfilePicture";
import { NameInfo } from "../components/ProfileComponents/NameInfo";
import { About } from "../components/ProfileComponents/About";
import SocialLinks from "../components/ProfileComponents/SocialLinks";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Post from "../components/postComponents/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk } from "../store/features/user/user.thunk";
import { getProfilePostsThunk } from "../store/features/post/post.thunk";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state=>state.userReducer.userProfile)
  const profilePosts = useSelector(state=>state.postReducer.profilePosts)
  const profileLoader = useSelector(state=>state.userReducer.profileLoader)
  const profileLoadSuccess = useSelector(state=>state.userReducer.profileLoadSuccess)
  const userId = useParams().userId || userProfile._id; 


  // console.log('userid from profile: ', userId);

  useEffect(() => {
    dispatch(getProfileThunk({userId}));

    dispatch(getProfilePostsThunk({userId, page:1}))
  }, [userId, ]);


  if(profileLoader){
    return <p className="text-md pt-20 mx-auto max-w-130 flex justify-center text-zinc-700 animate-pulse">Fetching profile. Please wait...</p>
  }

  if(!profileLoader && !profileLoadSuccess){
    return <p className="text-md pt-20 mx-auto max-w-130 flex justify-center text-zinc-700 animate-pulse">No profile exists with provided Id...</p>
  }

  return (
    <ScrollPageLayout>
      <ResizerLayout>
        <CoverPhoto />

        <div className="w-full flex flex-col items-start sm:flex-row sm:items-center sm:justify-between sm:relative sm:-top-5">
          <div className="flex min-w-5/10  items-center gap-5">
            <ProfilePicture />
            <NameInfo />
          </div>

          <Outlet />

          {/* Social Links... */}
          <SocialLinks />
          
        </div>

        {/* Other Information........ */}
        <About />

        {/* Show the Post made by the user....... */}
        <div className="container mx-auto flex flex-col gap-4 mt-3">
          {
            profilePosts?.map(post=>(
              <Post key={post._id}  post={post} /> 
            ))
          }
        </div>
      </ResizerLayout>
    </ScrollPageLayout>
  );
};

export default Profile;
