// api/bg_remover.js
import express from "express";
import fileUpload from "express-fileupload";
import { removeBackgroundFromImageBuffer } from "@rembg/rembg-node";
import cors from "cors";

const app = express();

// Allow requests from frontend (if needed)
app.use(cors());

// Enable file upload
app.use(fileUpload({
    createParentPath: true
}));

app.post("/", async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).send("No image uploaded");
        }

        const imageFile = req.files.image;
        const inputBuffer = imageFile.data;

        // Remove background
        const outputBuffer = await removeBackgroundFromImageBuffer(inputBuffer);

        // Convert to base64
        const base64 = outputBuffer.toString("base64");

        res.setHeader("Content-Type", "text/plain");
        res.send(base64);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

// Start server only if running locally
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
