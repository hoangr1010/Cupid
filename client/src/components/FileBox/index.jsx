import React from "react";
import { BsFileEarmarkFill } from "react-icons/bs";
import { getFileNameFromUrl } from "../../utils/user.js";

const FileBox = ({ fileUrl }) => {
  const fileLink = `${process.env.REACT_APP_S3_BUCKET_LINK}/${fileUrl}`;

  return (
    <section className="widget_container px-3 py-2 flex gap-3 w-full">
      <BsFileEarmarkFill className="text-primary" size={30} />
      <a
        href={fileLink}
        className="font-semibold text-sm content-center hover:text-primary"
        target="_blank"
        // rel="noopener noreferrer"
      >
        {getFileNameFromUrl(fileUrl)}
      </a>
    </section>
  );
};

export default FileBox;
