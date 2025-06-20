function createDocument({ name, type, size, url, uploadedAt }) {
  if (!name || !type || !size || !url) {
    throw new Error('Missing required fields for document entity');
  }

  return {
    name,
    type,
    size,
    url,
    uploadedAt: uploadedAt || new Date(),
  };
}

module.exports = { createDocument };

