import React from "react";
import { MdDone } from "react-icons/md";
import { processPasscode } from "../../api/opening";
import { toast } from "sonner";

export const VerificationBox = ({ setPasscode, email }) => {
  // use this function to automatically focus on the next input
  const focusNextInput = (el, prevId, nextId) => {
    if (el.value.length === 0) {
      if (prevId) {
        document.getElementById(prevId).focus();
      }
    } else {
      if (nextId) {
        document.getElementById(nextId).focus();
      }
    }
  };

  React.useEffect(() => {
    const inputs = document.querySelectorAll("[data-focus-input-init]");
    inputs.forEach((input) => {
      input.addEventListener("keyup", function () {
        const prevId = this.getAttribute("data-focus-input-prev");
        const nextId = this.getAttribute("data-focus-input-next");
        focusNextInput(this, prevId, nextId);
      });
    });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    // get index of the digit in passcode array
    const index = parseInt(id.split("-")[1]) - 1;

    // set new passcode based on change
    setPasscode((prevPasscode) => {
      const newPasscode = [...prevPasscode];
      newPasscode[index] = value;
      return newPasscode;
    });
  };

  const sendEmail = async () => {
    const success = await processPasscode(email);
    if (success) {
      toast.success("Passcode is sent!");
    } else {
      toast.error("Failed to send passcode, try again!");
    }
  };

  return (
    <>
      <div className="border-b-2 border-gray-200"></div>

      <div className="py-3">
        <div className="text-center">
          {/* <div className="flex items-center gap-2 justify-center text-primaryDark">
            <MdDone className="h-8 w-8" />
            <h1 className="text-center text-xl font-bold">Passcode is sent!</h1>
          </div> */}
          <p className="text-grayLight text-xs">
            Please enter the 6-digit verification code
          </p>
          <p className="text-grayLight text-xs">
            that was sent to{" "}
            <span className="text-primary italic">{email}</span>
          </p>
        </div>

        <section className="max-w-sm mx-auto">
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse justify-center py-2">
            <div>
              <label htmlFor="code-1" className="sr-only">
                First code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-next="code-2"
                id="code-1"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="code-2" className="sr-only">
                Second code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev="code-1"
                data-focus-input-next="code-3"
                id="code-2"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="code-3" className="sr-only">
                Third code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev="code-2"
                data-focus-input-next="code-4"
                id="code-3"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="code-4" className="sr-only">
                Fourth code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev="code-3"
                data-focus-input-next="code-5"
                id="code-4"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="code-5" className="sr-only">
                Fifth code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev="code-4"
                data-focus-input-next="code-6"
                id="code-5"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="code-6" className="sr-only">
                Sixth code
              </label>
              <input
                type="text"
                maxLength="1"
                data-focus-input-init
                data-focus-input-prev="code-5"
                id="code-6"
                className="block w-9 h-9 py-3 text-sm font-bold text-center text-field rounded-md"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end"></div>

          <section className="text-center">
            <p className="text-grayLight text-xs">
              Didn’t receive a code?{" "}
              <span
                onClick={sendEmail}
                className="text-primary underline cursor-pointer"
              >
                Resend
              </span>
            </p>
          </section>
        </section>
      </div>
    </>
  );
};
