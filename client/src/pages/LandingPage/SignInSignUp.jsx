import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SignInSignUp = () => {
  // action can be: "signin", "signup"
  const { action } = useParams();

  const LinkedInAuthorize = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_LINKEDIN_REDIRECT_URL}&state=foobar&scope=openid%20profile%20w_member_social%20email`;
  };

  return (
    <div className="min-h-screen w-screen onboard-background flex justify-center items-center">
      <div className="white-widget px-20 py-14 w-2/5 flex flex-col gap-5">
        <h1 className="text-5xl text-primaryDark font-bold">
          {
            {
              signup: (
                <h1 className="text-5xl text-primaryDark font-bold">
                  Join <span className="font-righteous font-medium">Cupid</span>{" "}
                  now!
                </h1>
              ),
              signin: (
                <>
                  Welcome back to{" "}
                  <span className="font-righteous font-medium">Cupid</span>!
                </>
              ),
            }[action]
          }
        </h1>

        <p className="text-primaryDark">
          {
            {
              signup: (
                <>
                  Sign up now to connect with top referrers from your dream
                  companies, and take the first step towards finding your
                  perfect job match.
                </>
              ),
              signin: (
                <>
                  Get back on track to continue connecting with top talents or
                  finding your dream job. We're excited to help you on your
                  journey!{" "}
                </>
              ),
            }[action]
          }
        </p>

        <div className="flex justify-end">
          <img
            src="/signInSignUp.png"
            alt="signInSignUp image"
            className="w-1/2 mb-8"
          />
        </div>

        <button
          type="button"
          className="text-white bg-[#0a66c2] hover:bg-[#004b7c]/90 rounded-lg text-sm w-full btn-padding"
          onClick={LinkedInAuthorize}
        >
          <div className="flex justify-center gap-1 items-center font-bold">
            <FaLinkedin size={25} />
            {
              {
                signup: "Sign up with LinkedIn",
                signin: "Sign in with LinkedIn",
              }[action]
            }
          </div>
        </button>
      </div>
    </div>
  );
};

export default SignInSignUp;
