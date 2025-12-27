const fileInput = document.getElementById("fileInput");
const removeBtn = document.getElementById("removeBtn");
const resultImg = document.getElementById("resultImg");

removeBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please select an image first!");

    removeBtn.textContent = "Processing...";
    removeBtn.disabled = true;

    try {
        // Use FormData to send image to Node.js backend
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/bg_remover", {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const base64 = await response.text();
        resultImg.src = "data:image/png;base64," + base64;

    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        removeBtn.textContent = "Remove Background";
        removeBtn.disabled = false;
    }
});
