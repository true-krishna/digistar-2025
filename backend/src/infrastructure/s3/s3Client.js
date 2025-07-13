const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadToS3(file) {
  try {
    const fileExt = path.extname(file.originalname);
    const key = `uploads/${uuidv4()}${fileExt}`;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return await s3.upload(params).promise();
  } catch (error) {
    console.error('S3 upload failed:', error);
    throw new Error('Failed to upload file to S3');
  }
}

async function deleteFromS3(filename) {
  const key = `uploads/${filename}`;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    return { message: 'File deleted from S3' };
  } catch (error) {
    console.error('S3 delete failed:', error);
    throw new Error('Failed to delete file from S3');
  }
}

module.exports = { uploadToS3, deleteFromS3 };
