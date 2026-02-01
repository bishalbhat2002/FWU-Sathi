import ScrollPageLayout from "../layouts/ScrollPageLayout";
import ResizerLayout from "../layouts/ResizerLayout";
import CoverPhoto from "../components/ProfileComponents/CoverPhoto";
import ProfilePicture from "../components/ProfileComponents/ProfilePicture";
import {NameInfo} from "../components/ProfileComponents/NameInfo";
import { About } from "../components/ProfileComponents/About";
import SocialLinks from "../components/ProfileComponents/SocialLinks";
import { Outlet } from "react-router-dom";
import Post from "../components/postComponents/Post";

const Profile = () => {

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
        <Post />
        </div>

      </ResizerLayout>
    </ScrollPageLayout>
  );
};

export default Profile;



