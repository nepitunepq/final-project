import { getScore, updateScore } from './api.js';
import {registerClick} from './webstyle.js';
const toggleButton = document.querySelector("#toggleButton");

//TA image
const main_image1 = document.querySelector("#image_ta1");
const main_image2 = document.querySelector("#image_ta2");
let preloadImage1 = new Image();
let preloadImage2 = new Image();
preloadImage1.src = "/resources/TA_1_popNew.PNG";
preloadImage2.src = "/resources/TA_2_pop.PNG";

//Score of each TA
export const count1 = document.querySelector("#ta1");
export const count2 = document.querySelector("#ta2");
export const totalCount1 = document.querySelector("#ta1Clicks");
export const totalCount2 = document.querySelector("#ta2Clicks");
const leadMessage = document.getElementById('leadMessage');

//Pop sound
const sounds = [
    document.getElementById("popSound1"),
    document.getElementById("popSound2"),
    document.getElementById("popSound3"),
    document.getElementById("popSound4"),
    document.getElementById("popSound5")
  ];

export var score1 = { value: 0 };
export var score2 = { value: 0 };

export var skillCount = { value: 0 };

export var whichTa = 1;

var bonusActive = false;

var usedSkillCount = [
    { skill1: 0, skill2: 0, skill3: 0 },
    { skill1: 0, skill2: 0, skill3: 0 }
];

var activatedCombo1 = false;
var activatedCombo2 = false;
var expired = false;

let globalScore_ta1;
let globalScore_ta2;

const score1EachInterval={value: 0}, 
        score2EachInterval={value: 0};

console.log("Ready");

//Update your current score from backend
await backendUpdateScore();
totalCount1.innerHTML = globalScore_ta1.value;
totalCount2.innerHTML = globalScore_ta2.value;
if (globalScore_ta1.value > globalScore_ta2.value) {
    leadMessage.textContent = 'TA JomnoiZ is in the lead';
    } else if (globalScore_ta1.value < globalScore_ta2.value) {
    leadMessage.textContent = 'TA Faro is in the lead';
    } else {
    leadMessage.textContent = 'It\'s a tie';
    }

//Update your current score from local storage
if (localStorage.getItem("score1") != null) {
    score1.value = parseInt(localStorage.getItem("score1"));
    count1.innerHTML = parseInt(score1.value);
    totalCount1.innerHTML = globalScore_ta1.value;

    score2.value = parseInt(localStorage.getItem("score2"));
    count2.innerHTML = parseInt(score2.value);
    totalCount2.innerHTML = globalScore_ta2.value;
}

toggleButton.addEventListener("click", () => {
    switchTA();
});



//Event listener for button
document.querySelector('.tab').addEventListener('click', function() {
    var buttonContainer = document.getElementById('button-container');
    var tableContainer = document.querySelector(".table");
    if (buttonContainer.style.display === 'none') {
      buttonContainer.style.display = 'block';
      if (window.matchMedia("(max-width: 1100px)").matches){
        tableContainer.style.display = 'none';
      }
    } else {
      buttonContainer.style.display = 'none';
      tableContainer.style.display = 'block';
    }
});

//Event listener for TA image

//main_image1 is TA JomnoiZ
main_image1.addEventListener("mousedown", () => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image1.src = preloadImage1.src;
        registerClick();
        createPopEffect();
        handleStart(main_image1, score1, count1, score1EachInterval, skillCount, globalScore_ta1);
    }
});
main_image1.addEventListener("touchstart", () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image1.src = preloadImage1.src;
        registerClick();
        createPopEffect();
        handleStart(main_image1, score1, count1, score1EachInterval, skillCount, globalScore_ta1);
    }
});
main_image1.addEventListener("mouseup", () => {
    main_image1.src = "/resources/TA_1.png";
});

main_image1.addEventListener("mouseleave", () => {
    main_image1.src = "/resources/TA_1.png";
});

main_image1.addEventListener("touchend", () => {
    main_image1.src = "/resources/TA_1.png";
});

//main_image2 is TA Faro
main_image2.addEventListener("mousedown", () => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image2.src = preloadImage2.src;
        registerClick();
        createPopEffect();
        handleStart(main_image2, score2, count2, score2EachInterval, skillCount, globalScore_ta2);
    }
});
main_image2.addEventListener("touchstart", () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image2.src = preloadImage2.src;
        registerClick();
        createPopEffect();
        handleStart(main_image2, score2, count2, score2EachInterval, skillCount, globalScore_ta2);
    }
});

main_image2.addEventListener("mouseup", () => {
    main_image2.src = "/resources/TA_2.png";
});

main_image2.addEventListener("mouseleave", () => {
    main_image2.src = "/resources/TA_2.png";
});

main_image2.addEventListener("touchend", () => {
    main_image2.src = "/resources/TA_2.png";
});

function handleStart(image, score, count, scoreEachInterval, skillCount, globalScore) {
    addScore(image, score, count, scoreEachInterval, skillCount, globalScore);
    
    // Select a random sound from the array
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    
    sound.currentTime = 0;
    sound.play();
    
    image.setAttribute("draggable", false);
}

//-----------------Functions-----------------


//switch team TA JomnoiZ <-> TA Faro
function switchTA() {
    const score_ta1 = document.querySelector("#ta1");
    const score_ta2 = document.querySelector("#ta2");
    const image_ta1 = document.querySelector("#image_ta1");
    const image_ta2 = document.querySelector("#image_ta2");

    if (ta2.classList.contains("hidden")) {
        score_ta2.classList.remove("hidden");
        score_ta1.classList.add("hidden");
        image_ta1.classList.add("fade-spin-out");
        setTimeout(function() {
            image_ta1.classList.add("hidden");
            image_ta1.classList.remove("fade-spin-out");
            void image_ta1.offsetWidth; // Reflow the element
            image_ta2.classList.remove("hidden");
            image_ta2.classList.add("fade-spin-in");
            setTimeout(function() {
                image_ta2.classList.remove("fade-spin-in");
                void image_ta2.offsetWidth; // Reflow the element
            }, 500);
        }, 500);
    } else {
        score_ta1.classList.remove("hidden");
        score_ta2.classList.add("hidden");
        image_ta2.classList.add("fade-spin-out");
        setTimeout(function() {
            image_ta2.classList.add("hidden");
            image_ta2.classList.remove("fade-spin-out");
            void image_ta2.offsetWidth; // Reflow the element
            image_ta1.classList.remove("hidden");
            image_ta1.classList.add("fade-spin-in");
            setTimeout(function() {
                image_ta1.classList.remove("fade-spin-in");
                void image_ta1.offsetWidth; // Reflow the element
            }, 500);
        }, 500);
    }

    if (whichTa == 1) {
        whichTa = 2;
    } else {
        whichTa = 1;
    }
}

//increment score
async function addScore(image, score, count, scoreEachInterval, skillCount, globalScore) {
    score.value++;
    skillCount.value++;
    globalScore.value++;
    scoreEachInterval.value++;
    //check the activated combo
    activateCombo1();
    activateCombo2();
    //console.log(usedSkillCount);
    if(bonusActive){
        score.value++;
        scoreEachInterval.value++;
    }
    if(activatedCombo1){
        console.log("activated combo1");
        score.value+=2;
        scoreEachInterval.value+=2;
    }
    else if (activatedCombo2){
        score.value+=4;
        scoreEachInterval.value+=4;
    }
    count.innerHTML = parseInt(score.value);

    
    //count_.innerHTML = globalScore.value;
    if(bonusActive){
        scoreEachInterval.value++;
    }
    //console.log(scoreEachInterval.value);

    localStorage.setItem("score1", score1.value);
    localStorage.setItem("score2", score2.value);

    runUpdateWhoLead();

}

//Send the new totalScore value to backend every 5 seconds, and update the totalScore value from backend
setInterval(async () => {
    //console.log("Updating score...");
    await sendTotalScore();
    await backendUpdateScore();
    //totalCount1.innerHTML = globalScore_ta1.value;
    //totalCount2.innerHTML = globalScore_ta2.value;
    updateCount1();
    updateCount2();

    runUpdateWhoLead();

}, 5000);

//function that send total score to backend
async function sendTotalScore(){
    await Promise.all([
        updateScore(`ta1`, score1EachInterval.value),
        updateScore(`ta2`, score2EachInterval.value)
    ]);
    //console.log(score1EachInterval.value, score2EachInterval.value);

    //reset scoreEachInterval
    score1EachInterval.value = 0;
    score2EachInterval.value = 0;
}
async function backendUpdateScore(){
    const scores = await getScore();
    //console.log(scores);
    globalScore_ta1 = {value: scores[0].score};
    globalScore_ta2 = {value: scores[1].score};
}

export function activateBonus() {
    bonusActive = true;
    setTimeout(deactivateBonus, 10000);
}

export function sendUpdateScore(amount,ta){
    if(ta==1){
        score1EachInterval.value += amount;
        count1.innerHTML = parseInt(score1.value); //this line just to update the score from skill.js immediately
    }
    else{
        score2EachInterval.value += amount;
        count1.innerHTML = parseInt(score1.value); //this line just to update the score from skill.js immediately
    }
}
function deactivateBonus() {
    bonusActive = false;
}


export function activateCombo1(){
    if(usedSkillCount[whichTa-1].skill1>=2 && usedSkillCount[whichTa-1].skill3 >= 1){
        activatedCombo1 = true;
        resetCountUsedSkill();
        setTimeout(deactivateCombo1,20000);
        showBigText("Special Skill Activated!");


    }
}
export function activateCombo2(){
    if(usedSkillCount[whichTa-1].skill2>=1 && usedSkillCount[whichTa-1].skill3 >= 1 && usedSkillCount[whichTa-1].skill1 >= 1){
        activatedCombo2 = true;
        resetCountUsedSkill();
        setTimeout(deactivateCombo2,5000);
        showBigText("Special Skill Activated!");
    }
}
function resetCountUsedSkill(){
    usedSkillCount = [
        { skill1: 0, skill2: 0, skill3: 0 },
        { skill1: 0, skill2: 0, skill3: 0 }
    ];
}
function deactivateCombo1(){
    activatedCombo1 = false;
}
function deactivateCombo2(){
    activatedCombo2 = false;
    expired = true;
}

export function sendUsedSkillCount(idx,ta){
    if(idx==1){
        usedSkillCount[ta].skill1++;
    }
    else if(idx==2){
        usedSkillCount[ta].skill2++;
    }
    else{
        usedSkillCount[ta].skill3++;
    }
}



let intervalId1, intervalId2;

function updateCount1() {
    clearInterval(intervalId1);
    let start = parseInt(totalCount1.innerHTML);
    let end = globalScore_ta1.value;
    let step = (end - start) / 50;
    let current = start;
    intervalId1 = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end;
            clearInterval(intervalId1);
        }
        totalCount1.innerHTML = Math.round(current);
    }, 100);
}

function updateCount2() {
    clearInterval(intervalId2);
    let start = parseInt(totalCount2.innerHTML);
    let end = globalScore_ta2.value;
    let step = (end - start) / 50;
    let current = start;
    intervalId2 = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end;
            clearInterval(intervalId2);
        }
        totalCount2.innerHTML = Math.round(current);
    }, 100);

}

export function showBigText(text){
    // Create a new div element
    let div = document.createElement("div");

    // Set its text
    div.textContent = text;

    // Style it
    div.style.position = "fixed";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.fontSize = "50px";
    div.style.textAlign = "center";
    div.style.zIndex = "1000";
    div.style.fontWeight = "bold";
    div.style.color = "white";
    div.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    div.style.fontFamily = "'Verdana', cursive, sans-serif";
    div.style.userSelect = "none";
    div.style.pointerEvents = "none";

    // Append it to the body
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.transition = "opacity 3s";
        div.style.opacity = "0";
    }, 3000);

    // Remove it from the DOM after it has faded out
    setTimeout(() => {
        document.body.removeChild(div);
    }, 6000);
}

function runUpdateWhoLead(){
    if (globalScore_ta1.value > globalScore_ta2.value) {
        leadMessage.textContent = 'TA JomnoiZ is in the lead';
        } else if (globalScore_ta1.value < globalScore_ta2.value) {
        leadMessage.textContent = 'TA Faro is in the lead';
        } else {
        leadMessage.textContent = 'It\'s a tie';
        }
}

function createPopEffect() {
    const effect = document.createElement('div');
    effect.className = 'pop-effect';
    effect.style.left = `${Math.random() * window.innerWidth}px`;
    effect.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(effect);
    setTimeout(() => document.body.removeChild(effect), 1000);
}
