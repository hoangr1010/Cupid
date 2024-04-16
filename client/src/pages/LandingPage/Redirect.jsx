import React from "react";
import { LoadingIcon } from "./../../components/icons/LoadingIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./../../api/auth";

const Redirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authCode) {
      getUserInfo(authCode, navigate, dispatch);
    }
  }, []);

  return (
    <div className="text-center h-screen items-center">
      <div role="status">
        <LoadingIcon />
        <span className="sr-only">Loading...</span>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Redirect;
