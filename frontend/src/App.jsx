import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineReload,
} from "react-icons/ai";
import { FaFileExcel, FaFileWord, FaFilePowerpoint, FaFilePdf } from "react-icons/fa";
import { FiInbox } from 'react-icons/fi';

const files = []


const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

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
      return <FaFileExcel className="text-gray-500 w-6 h-6 mt-1" />; // fallback
  }
};

const FileItem = ({ name, date, size, status, progress = 0 }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
      {/* File Icon */}
      <div className="flex-shrink-0 mt-1">
        {getFileIcon(name)}
      </div>

      {/* File Info */}
      <div className="flex-1 space-y-1">
        {/* Top Row: Name & Actions */}
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <div className="flex gap-2">
            {status === "failed" && (
              <AiOutlineReload className="text-gray-400 hover:text-blue-500 cursor-pointer" />
            )}
            <AiOutlineDelete className="text-gray-400 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Meta */}
        <p className="text-xs text-gray-500">
          {date} &bull; {size}
        </p>

        {/* Status Indicator */}
        {status === "uploading" && (
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">{progress}% uploading...</p>
          </div>
        )}

        {status === "completed" && (
          <p className="text-xs text-green-600 font-medium mt-1">Upload completed</p>
        )}

        {status === "failed" && (
          <p className="text-xs text-red-500 font-medium mt-1">Upload failed</p>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F5F9]">
      <div className="bg-white rounded shodow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upload File</h2>
          {/*
            <AiOutlineClose className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl" />
            <button class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
          */}
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 mb-2">
          <p>
            Drag and Drop or 
            <span className="text-green-600 font-medium cursor-pointer"> Browse </span>
            to Upload
          </p>
          <p className="text-sm text-gray-400">Support formats: csv, xls, xlsx</p>
        </div>
        {/*
        <div className="text-sm  mb-4 cursor-pointer flex items-center">
          <AiOutlineDownload />
          <span className="text-green-600 mx-1">Download </span>sample data for file upload
        </div>
        */}
        <div className="border-gray-200 rounded-lg p-3 max-h-96 overflow-y-auto space-y-2">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-12">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FiInbox size={32} />
              </div>
              <p className="text-sm text-gray-500">No files uploaded yet.</p>
            </div>
          ) : (
            files.map((file, index) => <FileItem key={index} {...file} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default App
