import React from "react";
import { useState } from "react";
import { sendFile } from "../../api/request";
import { useDispatch } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { IoCloudUpload } from "react-icons/io5";
import { fileValidate, validateFileName } from "../../utils/request";
import { FaFile } from "react-icons/fa6";

let nextId = 0;

export const FileUpload = (props) => {
  const { formData, uploadFiles, setUploadFile } = props;
  const dispatch = useDispatch();

  const handleChange = (file) => {

    if (fileValidate(uploadFiles, file)) {
      setUploadFile([...uploadFiles, { id: nextId++, name: file.name }]);
      formData.append("file", file);
    }

  };

  return (
    <>
      <FileUploader handleChange={handleChange} name="file" types={["PDF"]}>
        <div className="my-2 w-full h-32 border-2 border-dashed rounded-xl border-primary flex flex-col justify-center items-center">
          <IoCloudUpload size={30} style={{ color: "1EC69A" }} />
          <div className="text-sm flex">
            <button className=" text-primary underline underline-offset-2">
              Click to upload{" "}
            </button>
            <div className="ms-1">or drag and drop file</div>
          </div>
        </div>
      </FileUploader>

      <div>
        <ul>
          {uploadFiles.map((f) => (
            <li key={f.id}>
              <div className="flex items-center w-4/5 p-2 border rounded-lg m-1">
                <FaFile
                  size={30}
                  className="mx-1.5"
                  style={{ color: "1EC69A" }}
                ></FaFile>
                <div className="w-fit h-fit font-medium ms-1 text-sm">
                  {f.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
