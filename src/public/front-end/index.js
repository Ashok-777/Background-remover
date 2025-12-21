// your code goes here
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
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/remove_bg", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to remove background.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        resultImg.src = url;
    } catch (error) {
        alert(error.message);
    } finally {
        removeBtn.textContent = "Remove Background";
        removeBtn.disabled = false;
    }
});
