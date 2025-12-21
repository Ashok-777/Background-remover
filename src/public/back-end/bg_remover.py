from rembg import remove
from PIL import Image
import io, base64

def handler(request):
    """
    Vercel serverless function to remove image background.
    Expects a POST request with a file field named "image".
    Returns a base64 PNG image.
    """

    # 1️⃣ Only allow POST
    if request.method != "POST":
        return {
            "statusCode": 405,
            "body": "Method Not Allowed. Use POST."
        }

    # 2️⃣ Check if file exists in the request
    if "image" not in request.files:
        return {
            "statusCode": 400,
            "body": "No image file provided."
        }

    # 3️⃣ Read the uploaded image
    file = request.files["image"]
    input_bytes = file.read()

    try:
        # 4️⃣ Remove background
        output_bytes = remove(input_bytes)

        # 5️⃣ Return as base64 for frontend
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "image/png"},
            "body": base64.b64encode(output_bytes).decode("utf-8"),
            "isBase64Encoded": True
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Error removing background: {str(e)}"
        }
