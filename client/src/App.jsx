import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";

// Import Layouts...
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Import Pages....
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Notification from "./pages/Notification";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import CreatePost from "./components/postComponents/CreatePost";
import EditPost from "./components/postComponents/EdiPost";
import ReportPost from "./components/postComponents/ReportPost";
import DeletePost from "./components/postComponents/DeletePost";
import CommentPost from "./components/postComponents/CommentPost";
import ImageShower from "./components/postComponents/ImageShower";
import PageNotFound from "./pages/PageNotFound";
import EditMessageBox from "./components/messageComponents/EditMessageBox";
import DeleteMessageBox from "./components/messageComponents/DeleteMessageBox";
import ReportMessageBox from "./components/messageComponents/MessageReportBox";
import ChangePassword from "./components/ProfileComponents/ChangePassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/AuthComponents/ForgotPassword";
import ProfileEdit from "./components/ProfileComponents/ProfileEdit";
import EditComment from "./components/postComponents/EditComment";
import ReportComment from "./components/postComponents/ReportComment";
import DeleteComment from "./components/postComponents/DeleteComment";
import Report from "./pages/Report";
import ResolveCommentReport from "./components/reportComponents/ResolveCommentReport";
import ResolvePostReport from "./components/reportComponents/ResolvePostReport";
import ResolveMessageReport from "./components/reportComponents/ResolveMessageReport";
import ForgotPasswordChange from "./components/AuthComponents/ForgotPasswordChange";

const App = () => {
  return (
    <>

      <Routes>
        {/* Apply Main Layout.... These are the pages with Navbar... */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}>
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/edit" element={<EditPost />} />
            <Route path="/post/report/" element={<ReportPost />} />
            <Route path="/post/delete/" element={<DeletePost />} />
            <Route path="/post/comment/" element={<CommentPost />} >
              <Route path="/post/comment/edit" element={<EditComment />} />
              <Route path="/post/comment/report" element={<ReportComment />} />
              <Route path="/post/comment/delete" element={<DeleteComment />} />
            </Route>
            <Route path="/post/view" element={<CommentPost />} />
            <Route path="/post/view-image" element={<ImageShower />} />
          </Route>

          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />}>
            <Route path="/chat/edit" element={<EditMessageBox />} />
            <Route path="/chat/report" element={<ReportMessageBox />} />
            <Route path="/chat/delete" element={<DeleteMessageBox />} />
          </Route>
          <Route path="/notification" element={<Notification />} />
          
          {/* Nested routes for handling Report handling... for admin */}
          <Route path="/report" element={<Report />}>
            <Route path="/report/resolve-post" element={<ResolvePostReport />} />
            <Route path="/report/resolve-comment" element={<ResolveCommentReport />} />
            <Route path="/report/resolve-message" element={<ResolveMessageReport />} />
          </Route>


          <Route path="/notes" element={<Notes />} />
          <Route path="/profile/" element={<Profile />}>
            <Route path="/profile/change-password" element={<ChangePassword />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Route>
          <Route path="/profile/id" element={<Profile />} />
        </Route>

        {/* Apply Authlayout for Login and Register Page... These are the pages without navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-change" element={<ForgotPasswordChange />} />
        </Route>
        {/* 404 Page not found page.... */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

/**
 * React Router Vs React Router DOM
 *
 *  import {BrowserRouter, Link, NavLink} from "react-router-dom";
 *
 * import {Routes, Route} from "react-router";
 *
 */
