const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

const s3 = new AWS.S3({
  region: 'ap-southeast-1',
});

router.get('/media/:filename', async (req, res) => {
  const filename = req.params.filename;
  const key = `uploads/${filename}`; // match your S3 key pattern

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };

  try {
    const headData = await s3.headObject(params).promise();
    res.set({
      'Content-Type': headData.ContentType,
      'Content-Length': headData.ContentLength,
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    const fileStream = s3.getObject(params).createReadStream();
    fileStream.pipe(res);
  } catch (err) {
    console.error('S3 fetch error:', err.message);
    res.status(404).json({ error: 'File not found' });
  }
});

module.exports = router;
