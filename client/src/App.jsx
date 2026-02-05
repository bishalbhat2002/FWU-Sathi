import { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router";

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
import ProfileEdit from "./components/ProfileComponents/ProfileEdit";
import EditComment from "./components/postComponents/EditComment";
import ReportComment from "./components/postComponents/ReportComment";
import DeleteComment from "./components/postComponents/DeleteComment";
import Report from "./pages/Report";
import ResolveCommentReport from "./components/reportComponents/ResolveCommentReport";
import ResolvePostReport from "./components/reportComponents/ResolvePostReport";
import ResolveMessageReport from "./components/reportComponents/ResolveMessageReport";
import ForgotPasswordChange from "./components/AuthComponents/ForgotPasswordChange";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSelfState } from "./store/features/user/user.slice";
import { LoggedInProtectedRoute } from "./components/AuthComponents/LoggedInProtectedRoute";
import ViewPost from "./components/postComponents/ViewPost";

const App = () => {
  return (
    <>
      {/* Apply Main Layout.... These are the pages with Navbar... */}
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />}>
            <Route path="post/create" element={<CreatePost />} />
            <Route
              path="post/edit/:postId"
              element={
                <ProtectedRoute>
                  <EditPost />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="post/report/:postId"
              element={
                <ProtectedRoute>
                  <ReportPost />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="post/delete/:postId"
              element={
                <ProtectedRoute>
                  <DeletePost />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="post/:postId/comment"
              element={
                <ProtectedRoute>
                  <CommentPost />{" "}
                </ProtectedRoute>
              }
            >
              {/* Comment related Posts. */}
              <Route
                path="edit/:commentId"
                element={
                  <ProtectedRoute>
                    <EditComment />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="report/:commentId"
                element={
                  <ProtectedRoute>
                    <ReportComment />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="delete/:commentId"
                element={
                  <ProtectedRoute>
                    <DeleteComment />{" "}
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="post/view/:postId" element={<ViewPost />} />
            <Route path="post/view-image" element={<ImageShower />} />
          </Route>

          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />}>
            <Route path="edit/:messageId" element={<EditMessageBox />} />
            <Route path="report/:messageId" element={<ReportMessageBox />} />
            <Route path="delete/:messageId" element={<DeleteMessageBox />} />
          </Route>
          <Route path="/notification" element={<Notification />} />

          {/* Nested routes for handling Report handling... for admin */}
          <Route path="/report" element={<Report />}>
            <Route
              path="resolve-post/postId"
              element={<ResolvePostReport />}
            />
            <Route
              path="resolve-comment/commentId"
              element={<ResolveCommentReport />}
            />
            <Route
              path="resolve-message/messageId"
              element={<ResolveMessageReport />}
            />
          </Route>

          <Route path="/notes" element={<Notes />} />
          <Route path="/profile/" element={<Profile />}>
            <Route
              path="change-password"
              element={<ChangePassword />}
            />
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        {/* Apply Authlayout for Login and Register Page... These are the pages without navbar */}
        <Route
          element={
            <LoggedInProtectedRoute>
              {" "}
              <AuthLayout />{" "}
            </LoggedInProtectedRoute>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password-change"
            element={<ForgotPasswordChange />}
          />
        </Route>

        {/* 404 Page not found page.... */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <PageNotFound />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster containerStyle={{ top: "10%" }} />
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
