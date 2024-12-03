const popcat = document.querySelector("#popcat");
const btn = document.querySelector("#btn");

const API_BASE_URL = "http://localhost:3000/api/clicks"; // Backend API URL

const OkingSrc = "./images/Oking.jpg";
const DkingSrc = "./images/Dking.png";

// Assign functions to button events
btn.addEventListener("mousedown", () => handleEvent("mousedown", OkingSrc));
btn.addEventListener("mouseup", () => handleEvent("mouseup", DkingSrc));

popcat.addEventListener("mousedown", () => handleEvent("mousedown", OkingSrc));
popcat.addEventListener("mouseup", () => handleEvent("mouseup", DkingSrc));

async function handleEvent(eventType, imageSrc) {
    // Update the image source
    popcat.src = imageSrc;

    // Send the event to the backend
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event: eventType, image: imageSrc }),
        });

        if (!response.ok) {
            throw new Error(`Failed to save event: ${response.statusText}`);
        }

        console.log("Event saved:", await response.json());
    } catch (err) {
        console.error("Error:", err.message);
    }
}
