import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import { sendResume } from "../../api/user";
import { useDispatch } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const resume = user.resume_url;
  const [file, setFile] = useState("");
  const [newResume, setNewResume] = useState(false);
  const dispatch = useDispatch();

  return (
    <main className="flex overflow-auto gap-6 h-full w-full">
      <div className="widget_container h-fit items-center">
        <Avatar img={user.picture_url} size="xl" />
        <p className="font-bold text-grayLight text-lg text-center">
          {user.first_name} {user.last_name}
        </p>
      </div>

      <div className="widget_container basis-8/12 flex-grow h-fit pb-16">
        <h2 className="font-bold text-lg">Resume</h2>
        {resume && !newResume ? (
          <div>
            <div className="h-screen pt-2.5">
              <iframe src={user.resume_url} className="w-full h-full"></iframe>
            </div>

            <button
              className="filled-btn w-fit px-5 py-2.5 text-center m-2.5"
              onClick={() => {
                console.log(resume && !newResume);
                setNewResume(!newResume);
              }}
            >
              Upload new resume
            </button>
          </div>
        ) : (
          <div>
            <form
              className="pt-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (resume) {
                  setNewResume(!newResume);
                }
                sendResume(file, dispatch);
              }}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF (MAX. 800x400px)
                  </p>
                </div>
              </label>
              <button
                className="filled-btn w-fit px-5 py-2.5 text-center m-2.5"
                type="submit"
              >
                Upload
              </button>
            </form>
            {resume && (
              <div>
                <button
                  onClick={() => setNewResume(!newResume)}
                  className="filled-btn w-fit px-5 py-2.5 text-center m-2.5 mt-0"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ProfilePage;
