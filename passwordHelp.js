var wordCount = 0;

function checkWords(inputVal){

    var wordAmount = document.getElementById('wordAmount');
    var letterInput = document.getElementById('lettersInput');
    wordCount = inputVal.wordCount();

    if(wordCount >= 8){
        wordAmount.style.color = "green";
        letterInput.disabled = false;
    }
    else {
        wordAmount.style.color = "red";
        letterInput.disabled = true;
    }

    wordAmount.innerText = wordCount + "/8 words";

}

function checkLettersInput(inputVal){
document.getElementById('numbersInput').disabled = (inputVal.length !== wordCount);
}

function checkNumbersInput(inputVal){
    console.log(wordCount);

    document.getElementById('newPasswordConfirm').disabled = (inputVal.length <= wordCount || !hasNumSymbols(inputVal));
}

function hasNumSymbols(password){

    return (password.replace(/\W+/g, "").length < password.length || password.replace(/[0-9]+/g, "").length < password.length);

}

String.prototype.wordCount = function () {

    var wordCount = 0;

    if (this.length > 0)wordCount++;

    for (var i = 1; i < this.length; i++) {
        if (this.charCodeAt(i - 1) == 32 && this.charCodeAt(i) !== 32) {
            wordCount++;
        }
    }

    return wordCount;

};

function highlightWords(password){

    var newHTML = "";
    var usedWords = getUsedWords(password);

    if(usedWords.length > 0){

        newHTML += "<li>Words are not allowed in the password. You have used the following words: </li>";

        for(var i = 0; i < usedWords.length; i ++){
            newHTML += "<li>" + usedWords[i] + "</li>";
        }

    }

    document.getElementById("wordsUsedList").innerHTML = newHTML;

    displayRepetitions(password);

    return usedWords.length > 0;

}

function showSuccessMessage(){
    document.getElementById("successMessage").style.visibility = 'visible';
}