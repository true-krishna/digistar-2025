const { createDocument } = require('../entities/document');
const DocumentModel = require('../infrastructure/db/models/Document');
const { uploadToS3 } = require('../infrastructure/s3/s3Client');

async function uploadDocumentUseCase(file) {
  if (!file) {
    throw new Error('No file provided to upload');
  }

  try {
    const s3Result = await uploadToS3(file);

    const documentData = createDocument({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      //url: `${process.env.BASE_URL}/media/${s3Result.Key.split('/').pop()}`,
      url: s3Result.Location
    });

    const savedDoc = await DocumentModel.create(documentData);
    return savedDoc;
  } catch (err) {
    console.error('UploadDocumentUseCase error:', err);
    throw new Error('Failed to upload and save document');
  }
}

async function getAllDocumentsUseCase({ page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;

  const [documents, total] = await Promise.all([
    DocumentModel.find().sort({ uploadedAt: -1 }).skip(skip).limit(limit),
    DocumentModel.countDocuments()
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: documents,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

module.exports = { uploadDocumentUseCase, getAllDocumentsUseCase };

