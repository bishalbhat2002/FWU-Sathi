import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSelfState } from "../../store/features/user/user.slice";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated,
  );
  const authLoader = useSelector((state) => state.userReducer.authLoader);

  useEffect(() => {
    dispatch(loadSelfState());
  }, []);

  if (authLoader && !isAuthenticated) {
    return <p className="text-md m-5 animate-pulse">Please Wait...</p>;
  }

  if (!authLoader && !isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
