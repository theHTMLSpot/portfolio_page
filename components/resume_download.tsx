import React from "react";

const ResumeDownloadButton = () => {
  return (
    <a
      href="/data/resume.pdf"
      className="w-fit transition-all duration-300 hover:text-teal-500 hover:underline"
      download
    >
      Download My Resume
    </a>
  );
};

export default ResumeDownloadButton;
