import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../../state";
import { AiOutlineLinkedin } from "react-icons/ai";
import { Button } from "flowbite-react";

const LandingPage = () => {
  const LinkedInAuthorize = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_URL}&state=foobar&scope=openid%20profile%20w_member_social%20email`;
  };

  return (
    <div className="flex flex-col justify-center items-center bg-background min-h-screen w-screen">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Hi, We're{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Cupid
        </span>
      </h1>

      <div className="widget_container flex flex-col items-center justify-center h-fit w-fit ">
        <button
          type="button"
          className="text-white bg-[#0a66c2] hover:bg-[#004b7c]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm pe-3 ps-3 py-2.5 text-center inline-flex items-center"
          onClick={LinkedInAuthorize}
        >
          <AiOutlineLinkedin size={25} />
          <span className="ps-1">Sign in with LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
