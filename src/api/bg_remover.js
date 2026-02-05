import { removeBackgroundFromImageBuffer } from "@rembg/rembg-node";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const inputBuffer = Buffer.concat(chunks);

    if (!inputBuffer.length) {
      return res.status(400).json({ error: "No image data received" });
    }

    const outputBuffer = await removeBackgroundFromImageBuffer(inputBuffer);

    res.setHeader("Content-Type", "image/png");
    res.status(200).send(outputBuffer);
  } catch (error) {
    res.status(500).json({ error: "Background removal failed" });
  }
}
