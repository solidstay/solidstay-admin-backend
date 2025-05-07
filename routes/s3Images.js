const express = require("express");
const axios = require("axios");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => r.Location);

    res.status(200).json({ success: true, urls });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
