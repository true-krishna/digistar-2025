const path = require('path');
const { createDocument } = require('../entities/document');
const DocumentModel = require('../infrastructure/db/models/Document');
const { uploadToS3, deleteFromS3 } = require('../infrastructure/s3/s3Client');
const ALLOWED_EXTENSIONS = ['csv', 'xls', 'xlsx', 'docx', 'pdf'];

async function generateUniqueFilename(baseName, ext) {
  const existingDocs = await DocumentModel.find({ name: new RegExp(`^${baseName}(\\(\\d+\\))?\\.${ext}$`, 'i') });

  if (existingDocs.length === 0) {
    return `${baseName}.${ext}`;
  }

  let counter = 2;
  let newName = `${baseName}(${counter}).${ext}`;
  const existingNames = existingDocs.map(doc => doc.name.toLowerCase());

  while (existingNames.includes(newName.toLowerCase())) {
    counter++;
    newName = `${baseName}(${counter}).${ext}`;
  }

  return newName;
}

async function uploadDocumentUseCase(file) {
  if (!file) {
    throw new Error('No file provided to upload');
  }

  try {
    const fileExt = path.extname(file.originalname).toLowerCase().slice(1); // remove dot
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      throw new Error(`File type .${fileExt} is not allowed`);
    }

    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const uniqueName = await generateUniqueFilename(originalName, fileExt);

    file.originalname = uniqueName;

    const s3Result = await uploadToS3(file);

    const documentData = createDocument({
      name: uniqueName,
      type: file.mimetype,
      size: file.size,
      url: s3Result.Location,
    });

    const savedDoc = await DocumentModel.create(documentData);
    return savedDoc;
  } catch (err) {
    console.error('UploadDocumentUseCase error:', err);
    throw new Error(err.message || 'Failed to upload and save document');
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

const deleteDocumentUseCase = async (id) => {
  const doc = await DocumentModel.findById(id);
  if (!doc) throw new Error('Document not found');

  const filename = doc.url.split('/').pop(); // from /media/:filename

  // Stop if S3 deletion fails
  await deleteFromS3(filename);

  // Only delete from DB if S3 delete succeeded
  await doc.deleteOne();

  return { message: 'Document deleted successfully' };
};

module.exports = { 
  uploadDocumentUseCase, 
  getAllDocumentsUseCase,
  deleteDocumentUseCase
};
  

