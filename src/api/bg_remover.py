from rembg import remove
import base64

def handler(request):
    if request.method != "POST":
        return {
            "statusCode": 405,
            "body": "Only POST allowed"
        }

    try:
        # Vercel sends body as base64 string
        body = request.body

        if isinstance(body, str):
            input_bytes = base64.b64decode(body)
        else:
            input_bytes = body

        output_bytes = remove(input_bytes)

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
