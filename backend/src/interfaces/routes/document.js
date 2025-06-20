// src/interfaces/routes/documentRoutes.js

const express = require('express');
const multer = require('multer');
const { 
  handleUploadDocument, 
  handleGetAllDocuments,
  handleDeleteDocument
} = require('../controllers/document');

const router = express.Router();
const upload = multer(); // Memory storage by default

router.post('/', upload.single('file'), handleUploadDocument);
router.get('/', handleGetAllDocuments);
router.delete('/:id', handleDeleteDocument);

module.exports = router;
