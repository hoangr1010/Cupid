import React from "react";
import { useNavigate } from "react-router-dom";

const ThirdPage = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/");
  }
  return (
    <div className="white-widget px-32 py-16 w-1/2 flex flex-col gap-10 items-center">
      {/* text area */}
      <section className="flex flex-col items-center w-full gap-4">
        <p className="text-xl font-bold">Profile Set Up Successfully!</p>
        <h1 className="text-4xl font-bold text-primaryDark">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text mb-4 bg-gradient-to-r from-primaryDark to-primary font-righteous font-medium">
            Cupid
          </span>
        </h1>
        <div className="text-center font-semibold">
          <p>Your profile is now complete. </p>
          <p>
            Start exploring opportunities, connecting with referrers, or
            referring top talent today!
          </p>
        </div>
      </section>

      {/* image area */}
      <img src="/goldMedal.png" alt="goldMedal" className="w-1/2 h-full" />

      <button onClick={navigateToDashboard} className="filled-dark-btn btn-padding">
        Go to Dashboard
      </button>
    </div>
  );
};

export default ThirdPage;
