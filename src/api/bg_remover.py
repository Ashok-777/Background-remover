from rembg import remove
import base64

def handler(request):
    if request.method != "POST":
        return {
            "statusCode": 405,
            "body": "Only POST allowed"
        }

    try:
        # Read raw body (image bytes)
        input_bytes = request.body

        # Remove background
        output_bytes = remove(input_bytes)

        # Encode as base64
        encoded = base64.b64encode(output_bytes).decode("utf-8")

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "text/plain"
            },
            "body": encoded
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": str(e)
        }
