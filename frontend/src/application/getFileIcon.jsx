import React from 'react';
import { FaFileExcel, FaFilePdf, FaFileWord, FaFilePowerpoint } from "react-icons/fa";

export const getFileIcon = (ext) => {
  switch (ext) {
    case "xls":
    case "xlsx":
    case "csv":
      return <FaFileExcel className="text-green-600 w-6 h-6 mt-1" />;
    case "doc":
    case "docx":
      return <FaFileWord className="text-blue-600 w-6 h-6 mt-1" />;
    case "ppt":
    case "pptx":
      return <FaFilePowerpoint className="text-red-500 w-6 h-6 mt-1" />;
    case "pdf":
      return <FaFilePdf className="text-red-600 w-6 h-6 mt-1" />;
    default:
      return <FaFileExcel className="text-gray-500 w-6 h-6 mt-1" />;
  }
};

