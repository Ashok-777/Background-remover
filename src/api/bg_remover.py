from rembg import remove, new_session
import base64

session = new_session("u2net")  # preload model

def handler(request):
    if request.method != "POST":
        return {"statusCode": 405, "body": "Only POST allowed"}

    try:
        # Ensure bytes are received correctly
        body = request.body
        input_bytes = body if isinstance(body, bytes) else bytes(body, "utf-8")

        output_bytes = remove(input_bytes, session=session)
        encoded = base64.b64encode(output_bytes).decode("utf-8")

        return {"statusCode": 200, "headers": {"Content-Type": "text/plain"}, "body": encoded}

    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
