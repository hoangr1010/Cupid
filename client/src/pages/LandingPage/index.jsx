import { AiOutlineLinkedin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateSignIn = () => {
    navigate("/auth/signin");
  };

  const navigateSignUp = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="bg-background h-screen flex justify-between p-20">
      <section className="flex flex-col gap-10 w-4/6 py-32 px-10 grow">
        <div>
          <h1 className="text-transparent bg-clip-text mb-4 bg-gradient-to-b to-primary from-primaryDark font-righteous text-9xl">
            Cupid
          </h1>

          <p className="text-primaryDark font-bold text-2xl mb-7 ml-2">
            Forget Tinder, Meet Cupid!
          </p>

          <p className="text-primaryDark text-justify ml-2 text-lg">
            Welcome to Cupid, where talent meets opportunity! Our platform
            connects job seekers with insiders at their dream companies, making
            referrals easy and rewarding for everyone involved.
          </p>
        </div>

        <div className="flex gap-5 ml-2">
          <button
            className="filled-dark-btn btn-padding px-7"
            onClick={navigateSignUp}
          >
            Join us
          </button>
          <button
            className="text-dark-btn btn-padding px-7"
            onClick={navigateSignIn}
          >
            Log in
          </button>
        </div>
      </section>
      <section className="flex h-full w-full justify-end relative">
        <div className="bg-gradient-to-t to-primary from-primaryDark w-[538px] h-[666px] rounded-2xl"></div>
        <img
          src="landingPage.png"
          alt="landing page"
          className="absolute h-96 top-40 right-32"
        />
      </section>{" "}
    </div>
  );
};

export default LandingPage;
