const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const s3 = new AWS.S3({
  region: 'ap-southeast-1',
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

module.exports = { uploadToS3 };
