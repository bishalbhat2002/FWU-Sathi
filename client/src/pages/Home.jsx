import { Outlet } from "react-router-dom"
import CreatePostButton from "../components/postComponents/CreatePostButton"
import ScrollPageLayout from "../layouts/ScrollPageLayout"
import CreatePost from "../components/postComponents/CreatePost"
import { useEffect } from "react"
import AllPosts from "../components/postComponents/AllPosts"

const Home = () => {

  /**
 * Code to check the Rerender of Home Page
 */
  // useEffect(()=>{
  //   alert("rerender huaa")
  // })



  return (
    <ScrollPageLayout >
      <CreatePostButton />
      <Outlet />

      {/* Posts Here.......  */}
      
      <AllPosts />


    </ScrollPageLayout>
  )
}

export default Home