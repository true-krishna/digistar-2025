import React, { useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDocuments } from '../../application/file/fetchDocuments';
import { uploadDocument } from '../../application/file/uploadDocument';
import { deleteDocument } from '../../application/file/deleteDocument';
import { FileItem } from '../components/FileItem';
import { FiInbox } from 'react-icons/fi';

export const UploadPage = () => {
  const queryClient = useQueryClient();
  const containerRef = useRef();

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextSkip : undefined;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries(['documents']);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: (uploadedDoc) => {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f._id === uploadedDoc.tempId
            ? {
                ...uploadedDoc,
                status: 'completed',
                progress: 100,
              }
            : f
        )
      );
    },
    onError: (_, { tempId }) => {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f._id === tempId ? { ...f, status: 'failed' } : f
        )
      );
    },
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempId = `temp-${Date.now()}`;

    // Show file immediately with 0% progress
    setUploadingFiles((prev) => [
      {
        _id: tempId,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
      },
      ...prev,
    ]);

    uploadMutation.mutate({
      file,
      tempId,
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f._id === tempId ? { ...f, progress: percent } : f
          )
        );
      },
    });
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      fetchNextPage();
    }
  };

  // Merge API data and uploading files (remove duplicate _ids)
  const seen = new Set();
  const apiFiles = (data?.pages.flatMap(p => p.data) || []).filter(file => {
    if (seen.has(file._id)) return false;
    seen.add(file._id);
    return true;
  });

  const allFiles = [...uploadingFiles, ...apiFiles];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F5F9]">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upload File</h2>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 mb-2">
          <p>
            Drag and Drop or
            <label className="text-green-600 font-medium cursor-pointer">
              {" "}Browse
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
            to Upload
          </p>
          <p className="text-sm text-gray-400">Support formats: csv, xls, xlsx</p>
        </div>

        <div
          className="border-gray-200 rounded-lg p-3 max-h-96 overflow-y-auto space-y-2"
          onScroll={handleScroll}
          ref={containerRef}
        >
          {allFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-12">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FiInbox size={32} />
              </div>
              <p className="text-sm text-gray-500">No files uploaded yet.</p>
            </div>
          ) : (
            allFiles.map((file) => (
              <FileItem
                key={file._id}
                name={file.name}
                size={(file.size / 1000).toFixed(1) + ' KB'}
                date={file.uploadedAt ? new Date(file.uploadedAt).toLocaleString() : 'Just now'}
                status={file.status || 'completed'}
                progress={file.progress || 0}
                onDelete={() => deleteMutation.mutate(file._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

