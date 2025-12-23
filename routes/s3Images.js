const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Temporarily disabled pending migration away from AWS S3 to Supabase Storage.
// Keeps the same route signature but returns 503 to prevent accidental uploads.
router.post("/upload", upload.array("images", 10), async (req, res) => {
  /* try {
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
  } */
  router.post("/upload", upload.array("images", 10), async (req, res) => {
    return res.status(503).json({
      success: false,
      message: "Image upload is temporarily disabled while we migrate storage.",
    });
  });
});

module.exports = router;
