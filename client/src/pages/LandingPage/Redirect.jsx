import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./../../api/auth";
import { Spinner } from "flowbite-react";

const Redirect = ({ isAuthenticated }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  
  React.useEffect(() => {
    if (isAuthenticated) {
      // if user is authenticated, directly redirect to profile page
      navigate("/profile");
    } else {
      if (authCode) {
        // if user is not authenticate and authCode exist
        getUserInfo(authCode, navigate, dispatch);
      } else {
        // if Params doesn't contain a authorization code
        if(isAuthenticated) {
          // but user is authenticated, direct to profile page
          navigate("/profile");
        } else {
          // and user is not authenticated, direct to landing page
          navigate("/");
        }
      }
    } 
  }, [authCode,navigate,dispatch]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className="fill-primary w-16 h-16" aria-label="Loading" />
    </div>
  );
};

export default Redirect;
