import {Toaster} from "react-hot-toast"
import {Routes, Route} from "react-router"
import { Navbar } from "./components/commonComponents/Navbar"
import Home from "./pages/Home"
import Notes from "./pages/Notes"
import Notification from "./pages/Notification"
import Search from "./pages/Search"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import CreatePost from "./components/postComponents/CreatePost"
import EditPost from "./components/postComponents/EdiPost"
import ReportPost from "./components/postComponents/ReportPost"
import DeletePost from "./components/postComponents/DeletePost"
import CommentPost from "./components/postComponents/CommentPost"
import ImageShower from "./components/postComponents/ImageShower"
import PageNotFound from "./pages/PageNotFound"


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />}>
            {/* Nested Overlay Route */}
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/edit" element={<EditPost />} />
            <Route path="/post/report/" element={<ReportPost />} />
            <Route path="/post/delete/" element={<DeletePost />} />
            <Route path="/post/comment/" element={<CommentPost />} />
            <Route path="/post/view" element={<CommentPost />} />
            <Route path="/post/view-image" element={<ImageShower />} />
          </Route>

          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/*" element={<PageNotFound />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App









/**
 * React Router Vs React Router DOM
 *
 *  import {BrowserRouter, Link, NavLink} from "react-router-dom";
 *
 * import {Routes, Route} from "react-router";
 * 
 */