// src/interfaces/routes/documentRoutes.js

const express = require('express');
const multer = require('multer');
const { handleUploadDocument, handleGetAllDocuments } = require('../controllers/document');

const router = express.Router();
const upload = multer(); // Memory storage by default

router.post('/', upload.single('file'), handleUploadDocument);
router.get('/', handleGetAllDocuments);

module.exports = router;
