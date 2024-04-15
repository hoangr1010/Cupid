import React from "react";
// import { Button } from 'flowbite-react';
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Form } from "./ExperienceForm";
import { ResumeSubmitForm } from "./ResumeSubmitForm";

const OnboardPage = () => {
  return (
    <div>
      {/* <div className="grid gap-4 justify-center">
        <Education />
        <Experience />
      </div>

      <Form /> */}
      <ResumeSubmitForm />
    </div>
  );
};

export default OnboardPage;
