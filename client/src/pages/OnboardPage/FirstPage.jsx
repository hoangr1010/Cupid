import React from "react";

const FirstPage = ({ nextStep }) => {
  return (
    <div className="white-widget px-32 py-16 w-1/2 flex flex-col gap-10 items-center">
      {/* text area */}
      <section className="flex flex-col items-center w-full gap-4">
        <p className="text-xl font-bold">Sign Up Successful!</p>
        <h1 className="text-4xl font-bold text-primaryDark">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text mb-4 bg-gradient-to-r from-primaryDark to-primary font-righteous font-medium">
            Cupid
          </span>
        </h1>
        <div className="text-center font-semibold">
          <p>Your account has been created successfully</p>
          <p>
            You're now ready to start connecting with top referrers and
            discovering exciting career opportunities.
          </p>
        </div>
      </section>

      {/* image area */}
      <img src="/goldMedal.png" alt="goldMedal" className="w-1/2 h-full" />

      <button onClick={nextStep} className="filled-dark-btn btn-padding">
        Complete Your Profile
      </button>
    </div>
  );
};

export default FirstPage;
