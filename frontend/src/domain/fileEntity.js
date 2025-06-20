// Represents the structure of a file entity
export const createFileEntity = ({ name, date, size, status, progress }) => ({
  name,
  date,
  size,
  status, // "uploading", "completed", "failed"
  progress: progress || 0
});

