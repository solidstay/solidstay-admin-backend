const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        success: false,
        message: "Supabase credentials are not configured.",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const bucket = process.env.SUPABASE_BUCKET;
    if (!bucket) {
      return res.status(500).json({
        success: false,
        message: "Supabase bucket is not configured.",
      });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `uploads/${Date.now()}-${uuidv4()}-${safeName}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          throw error;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
      })
    );

    return res.status(200).json({ success: true, urls: uploads });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
