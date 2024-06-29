import React from "react";
import { useState } from "react";
import { sendFile } from "../../api/request";
import { useDispatch } from "react-redux";
import { validateFileName } from "../../utils/request";
import { FileUploader } from "react-drag-drop-files";

const FileRequest = (request) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <form>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          // disabled={!validateFileName(request, name)}
          className="success-btn text-white h-fit rounded-md btn-padding"
          onClick={(e) => {
            e.preventDefault();
            sendFile(request, name, file, dispatch);
          }}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default FileRequest;
