import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";
import { getFileIcon } from "../../application/getFileIcon";
import { ConfirmationModal } from "./ConfirmationModal";

export const FileItem = ({
  name,
  date,
  size,
  status,
  progress = 0,
  onDelete,
  isDeleting = false,
  errorMessage,
}) => {
  const ext = name.split(".").pop().toLowerCase();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 mt-1">{getFileIcon(ext)}</div>

        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-800">{name}</p>
            <div className="flex gap-2">
              {status === "failed" && (
                <AiOutlineReload className="text-gray-400 hover:text-blue-500 cursor-pointer" />
              )}
              <button
                className="text-gray-400 hover:text-red-500 cursor-pointer relative"
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin block"></span>
                ) : (
                  <AiOutlineDelete size={18} />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">{date} • {size}</p>

          {status === "uploading" && progress < 100 && (
            <>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-2 bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">{progress}% uploading...</p>
            </>
          )}

          {status === "completed" && (
            <p className="text-xs text-green-600 font-medium mt-1">Upload completed</p>
          )}

         {status === "failed" && (
            <div className="mt-1">
              <p className="text-xs text-red-500 font-medium">Upload failed</p>
              {errorMessage && (
                <p className="text-xs text-red-400">{errorMessage}</p>
              )}
            </div>
          )} 
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          onDelete();
          setShowConfirm(false);
        }}
        title={`Delete "${name}"?`}
        description="This action cannot be undone."
      />
    </>
  );
};

