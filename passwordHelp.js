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
document.getElementById('newPasswordConfirm').disabled = (inputVal.length !== wordCount);
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