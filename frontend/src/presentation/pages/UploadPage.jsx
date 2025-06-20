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
  const [deletingId, setDeletingId] = useState(null);

  // Get paginated documents from API
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextSkip : undefined,
  });

  // Handle file deletion
  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      setDeletingId(null);
      queryClient.invalidateQueries(['documents']);
    },
    onError: () => {
      setDeletingId(null);
    },
  }); 

  // Handle file upload
  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: (uploadedDoc) => {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f._id === uploadedDoc.tempId
            ? {
                _id: uploadedDoc._id,
                name: uploadedDoc.name,
                size: uploadedDoc.size,
                uploadedAt: uploadedDoc.uploadedAt,
                url: uploadedDoc.url,
                status: 'completed',
                progress: 100,
              }
            : f
        )
      );
    },
    onError: (error, { tempId }) => {
      const message = error || 'Upload failed';
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f._id === tempId
            ? { ...f, status: 'failed', errorMessage: message }
            : f
        )
      );
    },
  });

  // Handle file select
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempId = `temp-${Date.now()}`;

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

  // Fetch more files on scroll
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      fetchNextPage();
    }
  };

  // Merge uploaded + API files without duplicates
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
            <label className="text-green-600 font-medium cursor-pointer">
              {" "}Browse
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept=".xls,.xlsx,.csv,.doc,.docx,.ppt,.pptx,.pdf"
              />
            </label>
            {" "} file to Upload
          </p>
          <p className="text-sm text-gray-400">Support formats: csv, xls, xlsx, docx, pdf</p>
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
                date={
                  file.uploadedAt
                    ? new Date(file.uploadedAt).toLocaleString()
                    : 'Just now'
                }
                status={file.status || 'completed'}
                progress={file.progress || 0}
                errorMessage={file.errorMessage}
                onDelete={() => {
                  if (file.status === 'uploading' || file.status === 'failed') {
                    // Local delete only
                    setUploadingFiles((prev) => prev.filter((f) => f._id !== file._id));
                  } else {
                    deleteMutation.mutate(file._id);
                  }
                }}
                isDeleting={deletingId === file._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

