const { uploadDocumentUseCase, getAllDocumentsUseCase } = require('../../usecases/document');

async function handleUploadDocument(req, res) {
  console.log(req)
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const savedDoc = await uploadDocumentUseCase(req.file);
    return res.status(201).json({ message: 'Upload successful', document: savedDoc });
  } catch (err) {
    console.log('err', err)
    console.error('DocumentController error:', err.message);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

async function handleGetAllDocuments(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllDocumentsUseCase({ page, limit });
    res.status(200).json(result);
  } catch (err) {
    console.error('GetAllDocuments error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch documents' });
  }
}

module.exports = { handleUploadDocument, handleGetAllDocuments };

