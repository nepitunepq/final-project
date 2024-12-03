import { getStat, updateStat } from './api.js';

document.addEventListener("DOMContentLoaded", function() {
    // Show the modal when the page is loaded
    console.log("Page loaded");
    var modal = document.getElementById("infoModal");
    modal.style.opacity = "0";
    modal.style.display = "block";
    fadeIn(modal, 300);

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        fadeOut(modal, 300, function() {
            modal.style.display = "none";
        });
    }
});

//function to lock orientation
//if the browser supports screen.orientation.lock, use it
//normally, on mobile devices, screen.lockOrientation is used
function lockOrientation() {
    if (screen.orientation.lock) {
        screen.orientation.lock("portrait");
    } else if (screen.lockOrientation) {
        screen.lockOrientation("portrait");
    } else if (screen.mozLockOrientation) {
        screen.mozLockOrientation("portrait");
    } else if (screen.msLockOrientation) {
        screen.msLockOrientation("portrait");
    }
}

lockOrientation();

function moveContent() {
    var content = document.querySelector(".modal-content");
    var init = window.innerHeight / 2;
    var top = 0;
    var direction = 1;
    var interval = 50;

    function animateContent() {
        top += direction;
        content.style.top = init + top + "px";

        if (top >= 10 || top <= -10) {
            direction *= -1;
        }
    }

    var animation = setInterval(animateContent, interval);

    window.onclick = function(event) {
        clearInterval(animation);
    }
}

moveContent();
//function to fade in and fade out
function fadeIn(element, duration) {
    var opacity = 0;
    var interval = 50;
    var gap = interval / duration;

    element.style.display = "block";
    element.style.opacity = opacity;

    function increaseOpacity() {
        opacity += gap;
        element.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fading);
        }
    }

    var fading = setInterval(increaseOpacity, interval);
}

function fadeOut(element, duration, callback) {
    var opacity = 1;
    var interval = 50;
    var gap = interval / duration;

    function decreaseOpacity() {
        opacity -= gap;
        element.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fading);
            callback();
        }
    }

    var fading = setInterval(decreaseOpacity, interval);
}


// cps calculation
let clicks = [];
let intervalId = null;
let lastClickTime = null;

export function registerClick() {
    clicks.push(Date.now());
    lastClickTime = Date.now();

    // Start interval if it's not already running
    if (!intervalId) {
        intervalId = setInterval(calculateAverageCPS, 100);
    }
}

function calculateAverageCPS() {
    let now = Date.now();
    clicks = clicks.filter(clickTime => now - clickTime <= 1000);
    let cps = Math.min(clicks.length , 40); // Ensure cps is between 0 and 40

    // Define color ranges
    let colors = [
        {cps: 10, color: [255, 242, 198]},
        {cps: 15, color: [255, 165, 0]},
        {cps: 30, color: [253, 45, 45]},
        {cps: 40, color: [123, 123, 123]}
    ];

    // Find the current color range
    let startColor, endColor, i;
    for (let i = 0; i < colors.length - 1; i++) {
        if (cps <= colors[i+1].cps) {
            startColor = colors[i].color;
            endColor = colors[i+1].color;
            cps -= colors[i].cps;

             // Calculate weight based on CPS
    let weight = cps / (colors[i+1].cps - colors[i].cps);

    // Calculate interpolated color
    let interpolatedColor = startColor.map((start, i) => {
        return Math.round(start * (1 - weight) + endColor[i] * weight);
    });

    // Set background color
    document.body.style.background = `linear-gradient(to left, rgb(255, 242, 198), rgb(${interpolatedColor.join(", ")}))`;

            break;
        }
    }



    if (now - lastClickTime >= 1000) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

const main_image1 = document.querySelector("#image_ta1");
const main_image2 = document.querySelector("#image_ta2");

main_image1.addEventListener("mousedown", (event) => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        showClickText("Click", event);
    }
});
main_image1.addEventListener("touchstart", (event) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        showClickText("Click", event);
    }
});
main_image1.addEventListener("touchmove", (event) => {
    // Check if the user agent indicates a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // Update the position of "Click" text as the touch moves
        showClickText("Click", event.touches[0]);      
        // Prevent default behavior to avoid unwanted scrolling
        event.preventDefault();
    }
});

main_image2.addEventListener("mousedown", (event) => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        showClickText("Click", event);
    }
});
main_image2.addEventListener("touchstart", (event) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        showClickText("Click", event);
    }
});
main_image2.addEventListener("touchmove", (event) => {
    // Check if the user agent indicates a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // Update the position of "Click" text as the touch moves
        showClickText("Click", event.touches[0]);
        
        // Prevent default behavior to avoid unwanted scrolling
        event.preventDefault();
    }
});

function showClickText(text, event) {
    // Create a new div
    let div = document.createElement("div");

    // Set its text
    div.textContent = text;

    // Style it
    div.style.position = "absolute";
    let x, y;
    if (event.type === 'touchstart') {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.fontSize = "small";
    div.style.userSelect = "none";
    div.style.pointerEvents = "none";

    // Append it to the body
    document.body.appendChild(div);

    // Generate random end points for the animation
    let randomX = Math.floor(Math.random() * 200 - 100);
    let randomY = Math.floor(Math.random() * 200 - 100);

    // Animate it
    div.animate([
        // keyframes
        { transform: 'translate(0, 0) rotate(0)', opacity: 1, offset: 0 },
        { transform: `translate(${randomX}px, ${randomY}px) rotate(360deg)`, opacity: 0, offset: 1 }
    ], { 
        // timing options
        duration: 1000,
        iterations: 1
    }).onfinish = () => {
        // Remove the div once the animation is complete
        div.remove();
    };
}

window.addEventListener('orientationchange', function() {
    if (window.orientation === 90 || window.orientation === -90) {
        // Clear all components
        document.body.innerHTML = '';

        // Create and display message
        const message = document.createElement('div');
        message.textContent = 'ROTATE YOUR DEVICE BACK PLEASE!';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '2em';
        message.style.color = 'black';
        document.body.appendChild(message);
    } else {
        // Reload the page when the device is rotated back to portrait mode
        location.reload();
    }
});

window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};