let currentphrase = "water bottle";

const currentphraseDiv = document.getElementById("currentphrase");
const submitBtn = document.getElementById("submitbutton");
const nextwordinput = document.getElementById("nextwordinput");
const requiredwordspan = document.getElementById("requiredword");
const message = document.getElementById("message");

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


    let currentwords = currentphrase.split(" ");
    let lastword = currentwords[1]; // in previous phrase
    let newphrase = lastword + " " + nextword;
    
    currentphrase = newphrase;  // updates the current phrase
    currentphraseDiv.textContent = currentphrase; // updates the displayed current phrase

    requiredwordspan.textContent = nextword;

    message.textContent = "";
    nextwordinput.value = "";
});