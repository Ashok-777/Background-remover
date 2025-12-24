// Grab DOM elements
const fileInput = document.getElementById("fileInput");
const removeBtn = document.getElementById("removeBtn");
const resultImg = document.getElementById("resultImg");

// Event listener for the Remove Background button
removeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image first!");
        return;
    }

    // Disable button while processing
    removeBtn.textContent = "Processing...";
    removeBtn.disabled = true;

    try {
        // Prepare FormData with the image file
        const formData = new FormData();
        formData.append("image", file);

        // Call the Python serverless backend
        const response = await fetch("/api/bg_remover", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to remove background. Status: ${response.status}`);
        }

        // Backend returns base64 PNG
        const data = await response.json();
        resultImg.src = "data:image/png;base64," + data.body;

    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        // Restore button
        removeBtn.textContent = "Remove Background";
        removeBtn.disabled = false;
    }
});
