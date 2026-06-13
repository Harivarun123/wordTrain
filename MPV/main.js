let currentword = "";
let history = [];

const submitBtn = document.getElementById("submitbutton");
const nextwordinput = document.getElementById("nextwordinput");
const requiredwordspan = document.getElementById("requiredword");
const message = document.getElementById("message");

const startscreen = document.getElementById("startscreen");
const gamescreen = document.getElementById("gamescreen");
const startwordinput = document.getElementById("startwordinput");
const startbutton = document.getElementById("startbutton");

const historyDiv = document.getElementById("history");
const lengthDiv = document.getElementById("length");

gamescreen.style.display = "none";
startbutton.addEventListener("click",function(){
    let startword = startwordinput.value.trim();

    if(startword === ""){
        return;
    }
    startscreen.style.display = "none";
    gamescreen.style.display = "block";

    currentword = startword;

    requiredwordspan.textContent = startword;
});

submitBtn.addEventListener("click", function () {
    let nextword = nextwordinput.value.trim(); // to split the input 

    if(nextword === ""){
        message.textContent = "Please enter a word";
        nextwordinput.value = "";
        return;
    }

    let words = nextword.split(" ");
    if(words.length !== 1){
        message.textContent = "please enter a single word";
        nextwordinput.value = "";
        return;
    }


    let newphrase = currentword + " " + nextword;
    history.push(newphrase);
    lengthDiv.textContent = "Length : " + history.length; 
    historyDiv.innerHTML = "";//clears the history

    for (let i = history.length - 1; i >= 0; i--) {
        historyDiv.innerHTML += history[i] + "<br>";
    }
    
    currentword = nextword;  // updates the current phrase

    requiredwordspan.textContent = nextword;

    message.textContent = "";
    nextwordinput.value = "";
});