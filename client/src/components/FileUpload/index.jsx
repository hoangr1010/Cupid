import React from "react";
import { useState } from "react";
import { sendFile } from "../../api/request";
import { useDispatch } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { IoCloudUpload } from "react-icons/io5";

/**
 * 
 * @param {*} request 
 * @returns 
 */
export const FileUpload = (request) => {
  // const [file, setFile] = useState("");
  const dispatch = useDispatch();

  const handleChange = (file) => {
    const name = file.name;
    console.log(file);
    console.log(name);
    // console.log(a);
    console.log(request);

    sendFile(request, name, file, dispatch);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={["PDF"]}>
      <div className="w-full h-32 border-2 border-dashed rounded-xl border-primary flex flex-col justify-center items-center">
        <IoCloudUpload size={30} style={{ color: "1EC69A" }} />
        <div className="text-sm flex">
          <button className=" text-primary underline underline-offset-2">Click to upload </button>
          <div className="ms-1">or drag and drop file</div>
        </div>
      </div>
    </FileUploader>
  );
};
