import { uploadDocument as uploadApi } from '../../infrastructure/api/fileApi';

export const uploadDocument = async ({ file, onUploadProgress, tempId }) => {
  try {
    const res = await uploadApi(file, onUploadProgress);
    return {
      ...res.document,
      tempId,
    };
  } catch (error) {
    throw  error?.response?.data?.error || 'Upload failed';
  }
};
