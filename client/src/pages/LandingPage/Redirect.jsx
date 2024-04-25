import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./../../api/auth";
import { Spinner } from "flowbite-react";

const Redirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authCode) {
      getUserInfo(authCode, navigate, dispatch);
    }
  }, [authCode,navigate,dispatch]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className="fill-primary w-16 h-16" aria-label="Loading" />
    </div>
  );
};

export default Redirect;
