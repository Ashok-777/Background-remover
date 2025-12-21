# ==============================
# RELIABLE BG REMOVER (COLAB)
# ==============================

!pip install -q rembg pillow

from google.colab import files
from rembg import remove
from PIL import Image
import io, os

print("Upload an image (JPG / JPEG / PNG)")

# Upload image
uploaded = files.upload()
image_path = list(uploaded.keys())[0]

# Load image safely
original_img = Image.open(image_path).convert("RGBA")
print("Original Image:")
display(original_img)

print("Removing background... Please wait.")

# Convert image to bytes (correct way)
input_buffer = io.BytesIO()
original_img.save(input_buffer, format="PNG")
input_bytes = input_buffer.getvalue()

# Remove background (high accuracy default model)
output_bytes = remove(input_bytes)

# Load result correctly
result_img = Image.open(io.BytesIO(output_bytes)).convert("RGBA")
print("Background Removed Preview:")
display(result_img)

# ----------------------------
# SAVE TRANSPARENT PNG
# ----------------------------
png_path = "bg_removed.png"
result_img.save(png_path, format="PNG")

# ----------------------------
# SAVE JPG (WHITE BACKGROUND)
# ----------------------------
white_bg = Image.new("RGB", result_img.size, (255, 255, 255))
white_bg.paste(result_img, mask=result_img.getchannel("A"))

jpg_path = "bg_removed.jpg"
white_bg.save(jpg_path, format="JPEG", quality=95)

# ----------------------------
# VERIFY FILE INTEGRITY
# ----------------------------
print("File verification:")
print("PNG size:", os.path.getsize(png_path), "bytes")
print("JPG size:", os.path.getsize(jpg_path), "bytes")

# ----------------------------
# DOWNLOAD OPTIONS
# ----------------------------
print("Download background-removed image:")
files.download(png_path)
files.download(jpg_path)
