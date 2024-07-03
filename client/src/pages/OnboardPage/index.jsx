import { useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const OnboardPage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step+1)
  }

  return (
    <div className="onboard-background h-screen flex justify-center items-center">
      {
        {
          1: <FirstPage nextStep={nextStep}/>,
          2: <SecondPage nextStep={nextStep}/>
        }[step]
      }
    </div>
  );
};

export default OnboardPage;
