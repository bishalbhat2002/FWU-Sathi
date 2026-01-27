import { Outlet } from "react-router-dom"
import CreatePostButton from "../components/postComponents/CreatePostButton"
import MainLayout from "../layouts/MainLayout"
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
    <MainLayout>
      <CreatePostButton />
      <Outlet />

      {/* Posts Here.......  */}
      
      <AllPosts />


    </MainLayout>
  )
}

export default Home