import axios from 'axios';

const API_URL = 'http://localhost:3000/api/document';

export const getDocuments = async ({ pageParam = 0 }) => {
  const res = await axios.get(`http://localhost:3000/api/document?skip=${pageParam}&limit=5`);
  return {
    data: res.data.data,
    total: res.data.pagination.total,
    nextSkip: pageParam + res.data.data.length,
    hasMore: pageParam + res.data.data.length < res.data.pagination.total,
  };
};

export const uploadDocument = async ({ file, onUploadProgress }) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });

  return res.data;
};

export const deleteDocument = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

