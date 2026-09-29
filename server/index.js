const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Configuration
const upload = multer({ dest: "uploads/" });

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Image Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        res.json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Image upload failed"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});