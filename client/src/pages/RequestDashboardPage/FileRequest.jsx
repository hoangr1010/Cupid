import React from "react";
import { useState } from "react";
import { sendFile } from "../../api/request";
import { useDispatch } from "react-redux";

const FileRequest = (request) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="success-btn text-white h-fit rounded-md btn-padding"
          onClick={(e) => {
            e.preventDefault();
            sendFile(request, name, file, dispatch);
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileRequest;
