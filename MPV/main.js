let currentphrase = "water bottle";

const currentphraseDiv = document.getElementById("currentphrase");
const submitBtn = document.getElementById("submitbutton");
const nextwordinput = document.getElementById("nextwordinput");
const requiredwordspan = document.getElementById("requiredword");

submitBtn.addEventListener("click", function () {
    let nextword = nextwordinput.value.trim(); // to split the input 

    if(nextword === ""){
        console.log("please enter a word");
        return;
    }

    let words = nextword.split(" ");
    if(words.length !== 1){
        console.log("Please enter a single word");
        nextwordinput.value = "";
        return;
    }


    let currentwords = currentphrase.split(" ");
    let lastword = currentwords[1]; // in previous phrase
    let newphrase = lastword + " " + nextword;
    
    currentphrase = newphrase;  // updates the current phrase
    currentphraseDiv.textContent = currentphrase; // updates the displayed current phrase

    requiredwordspan.textContent = nextword;

    nextwordinput.value = ""; //clears the textbox
});