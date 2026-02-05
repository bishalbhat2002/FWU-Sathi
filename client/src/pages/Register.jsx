import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../components/AuthComponents/AuthHeader";
import RegisterComponent from "../components/AuthComponents/RegisterComponent";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated,
  );

  // Chcek isAuthenticated ...
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <AuthHeader />
      <RegisterComponent />
    </>
  );
};

export default Register;
