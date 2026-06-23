let currentword = "";
let history = [];
let usedwords = [];

const submitBtn = document.getElementById("submitbutton");
const restartbutton = document.getElementById("restartbutton");
const nextwordinput = document.getElementById("nextwordinput");
const requiredwordspan = document.getElementById("requiredword");
const message = document.getElementById("message");

const startscreen = document.getElementById("startscreen");
const gamescreen = document.getElementById("gamescreen");
const startwordinput = document.getElementById("startwordinput");
const startbutton = document.getElementById("startbutton");
const startmessage = document.getElementById("startmessage");

const historyDiv = document.getElementById("history");
const lengthDiv = document.getElementById("length");

loadGame();
console.log(localStorage.getItem("wordTrainGame"));
console.log(currentword);
console.log(history);
console.log(usedwords);
if (currentword !== "") {
    startscreen.style.display = "none";
    gamescreen.style.display = "block";

    requiredwordspan.textContent = currentword;
    lengthDiv.textContent = "Length : " + history.length;

    historyDiv.innerHTML = "";

    for (let i = history.length - 1; i >= 0; i--) {
        historyDiv.innerHTML += history[i] + "<br>";
    }
}

if (currentword === "") {
    startscreen.style.display = "block";
    gamescreen.style.display = "none";
}
startwordinput.focus();

startwordinput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startbutton.click();
    }
});

nextwordinput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitBtn.click();
    }
});

startbutton.addEventListener("click", function() {
    let startword = startwordinput.value.trim().toLowerCase();

    if (startword === "") {
        startmessage.textContent = "Please enter a word";
        return;
    }

    if (/\s/.test(startword)) {
        startmessage.textContent = "Please enter a single word";
        startwordinput.value = "";
        return;
    }

    startmessage.textContent = "";
    startscreen.style.display = "none";
    gamescreen.style.display = "block";

    currentword = startword;
    requiredwordspan.textContent = startword;
    usedwords = [startword];

    nextwordinput.focus();
    saveGame();
});

submitBtn.addEventListener("click", function() {
    let nextword = nextwordinput.value.trim().toLowerCase();

    if (nextword === "") {
        message.textContent = "Please enter a word";
        nextwordinput.value = "";
        return;
    }

    if (/\s/.test(nextword)) {
        message.textContent = "Please enter a single word";
        nextwordinput.value = "";
        return;
    }

    if(usedwords.includes(nextword)){
        message.textContent = "Word already used";
        nextwordinput.value = "";
        return;
    }
    usedwords.push(nextword);
    let newphrase = currentword + " " + nextword;
    history.push(newphrase);

    lengthDiv.textContent = "Length : " + history.length;
    historyDiv.innerHTML = "";

    for (let i = history.length - 1; i >= 0; i--) {
        historyDiv.innerHTML += history[i] + "<br>";
    }

    currentword = nextword;
    requiredwordspan.textContent = nextword;

    saveGame();

    message.textContent = "";
    nextwordinput.value = "";
});

restartbutton.addEventListener("click", function() {
    startscreen.style.display = "block";
    gamescreen.style.display = "none";

    currentword = "";
    history = [];
    usedwords = [];

    historyDiv.innerHTML = "";
    lengthDiv.textContent = "Length : 0";

    startwordinput.value = "";
    nextwordinput.value = "";

    message.textContent = "";
    startmessage.textContent = "";
    requiredwordspan.textContent = "";

    startwordinput.focus();
    localStorage.removeItem("wordTrainGame");
});


function saveGame() {
    const gameData = {
        currentword,
        history,
        usedwords
    };

    localStorage.setItem("wordTrainGame", JSON.stringify(gameData));
}

function loadGame() {
    let savedData = localStorage.getItem("wordTrainGame");

    if (savedData === null) {
        return;
    }

    let gameData = JSON.parse(savedData);

    currentword = gameData.currentword;
    history = gameData.history;
    usedwords = gameData.usedwords;
}