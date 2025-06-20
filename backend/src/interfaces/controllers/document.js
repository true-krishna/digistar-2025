const { 
  uploadDocumentUseCase, 
  deleteDocumentUseCase,
  getAllDocumentsUseCase,
} = require('../../usecases/document');

async function handleUploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const savedDoc = await uploadDocumentUseCase(req.file);
    return res.status(201).json({ message: 'Upload successful', document: savedDoc });
  } catch (err) {
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

async function handleDeleteDocument(req, res) {
  console.log(req.params)
  try {
    const { id } = req.params;
    const result = await deleteDocumentUseCase(id);
    res.status(200).json(result);
  } catch (err) {
    console.error('DeleteDocument error:', err.message);
    res.status(404).json({ error: err.message || 'Failed to delete document' });
  }
}

module.exports = { 
  handleUploadDocument, 
  handleGetAllDocuments,
  handleDeleteDocument,
};

