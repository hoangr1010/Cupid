import React from "react";
// import { Button } from 'flowbite-react';
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Form } from "./ExperienceForm";

const OnboardPage = () => {
  return (
    <div>
      <div className="grid gap-4 justify-center">
        <Education />
        <Experience />
      </div>

      <Form />
    </div>
  );
};

export default OnboardPage;
