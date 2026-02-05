import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/AuthComponents/AuthHeader";
import LoginComponent from "../components/AuthComponents/LoginComponent";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated,
  );


  // Chcek isAuthenticated ...
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", {replace:true});
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <AuthHeader />
      <LoginComponent />
    </>
  );
};

export default Login;
