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
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
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