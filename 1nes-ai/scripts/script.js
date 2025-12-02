let currentMode = "ideas";

const modeButtons = document.querySelectorAll(".mode-btn");
const promptInput = document.getElementById("promptInput");
const runBtn = document.getElementById("runBtn");
const responseBox = document.getElementById("responseBox");

// Switch modes
modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        modeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode;
    });
});

// Handle AI request
runBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    runBtn.disabled = true;
    runBtn.textContent = "Thinking...";
    responseBox.innerHTML = "<p>1nes AI is thinking...</p>";

    try {
        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, mode: currentMode }),
        });

        const data = await res.json();
        responseBox.innerHTML = data.ai || "No response.";
    } catch (e) {
        responseBox.innerHTML = "Error contacting backend.";
    }

    runBtn.disabled = false;
    runBtn.textContent = "Ask 1nes AI";
});
