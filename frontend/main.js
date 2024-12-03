const popcat = document.querySelector("#popcat");
const btn = document.querySelector("#btn");

const OkingSrc = "./images/Oking.jpg"; // Image path for Oking
const DkingSrc = "./images/Dking.png"; // Image path for Dking

// Assign functions to button events
btn.addEventListener("mousedown", Oking);
btn.addEventListener("mouseup", Dking);

popcat.addEventListener("mousedown", Oking);
popcat.addEventListener("mouseup", Dking);

function Oking() {
    popcat.src = OkingSrc; // Update the source to Oking
}

function Dking() {
    popcat.src = DkingSrc; // Update the source to Dking
}
