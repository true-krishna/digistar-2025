import React from "react";

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <p className="text-sm text-gray-800 font-medium mb-3">{title}</p>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

