import { removeBackgroundFromImageBuffer } from "@rembg/rembg-node";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  try {
    // Read raw request body (image bytes)
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const inputBuffer = Buffer.concat(chunks);

    // Remove background
    const outputBuffer = await removeBackgroundFromImageBuffer(inputBuffer);

    // Convert to base64
    const base64 = outputBuffer.toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(base64);

  } catch (error) {
    console.error(error);
    res.status(500).send("Background removal failed");
  }
}
