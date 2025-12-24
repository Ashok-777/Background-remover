const fileInput = document.getElementById("fileInput");
const removeBtn = document.getElementById("removeBtn");
const resultImg = document.getElementById("resultImg");

removeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image first!");
        return;
    }

    removeBtn.textContent = "Processing...";
    removeBtn.disabled = true;

    try {
        // Send raw file bytes directly
        const response = await fetch("/api/bg_remover", {
            method: "POST",
            body: await file.arrayBuffer() // send as ArrayBuffer
        });

        if (!response.ok) {
            throw new Error(`Failed to remove background. Status: ${response.status}`);
        }

        const base64 = await response.text(); // Python returns plain base64 string
        resultImg.src = "data:image/png;base64," + base64;

    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        removeBtn.textContent = "Remove Background";
        removeBtn.disabled = false;
    }
});
