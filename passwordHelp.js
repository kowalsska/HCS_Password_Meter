var wordCount = 0;

/**Load the dictionary when the window is loaded
 *
 */
function loadWindow(){

    getAjax("words.txt", function(){
        var password = new Password(sessionStorage.getItem("password"));
        //Highlight what is good and bad about the password entered
        password.highlightRightsWrongs();
    })

}

/**Check how many words the user has entered in the first text box and only allow them to process when its > 8
 *
 * @param inputVal - The sentence which the user has entered
 */
function checkWords(inputVal){

    var wordAmount = document.getElementById('wordAmount');
    var letterInput = document.getElementById('lettersInput');

    //Count how many words are in the sentence
    wordCount = inputVal.wordCount();

    //Allow the user to proceed if over 8 words have been entered
    if(wordCount >= 8){
        wordAmount.style.color = "green";
        letterInput.disabled = false;
    }
    //If they have not entered enough words prompt them to enter more
    else {
        wordAmount.style.color = "red";
        letterInput.disabled = true;
    }

    //Display how many words have been entered
    wordAmount.innerText = wordCount + "/8 words";

}

/**Let the user proceed from the second text box to the third if they have entered the correct amount of letters
 *
 * @param inputVal - User's input - should be the first letter of each word entered in the first text box
 */
function checkLettersInput(inputVal){
document.getElementById('numbersInput').disabled = (inputVal.length !== wordCount);
}

/**Let the user click 'confirm new password' if numbers and symbols have been added to the password
 *
 * @param inputVal - The password the user has entered
 */
function checkNumbersInput(inputVal){
    document.getElementById('newPasswordConfirm').disabled = (inputVal.length <= wordCount || !hasNumSymbols(inputVal));
}

/**Check if a given password has numbers or symbols in it
 *
 * @param password - Password to check for numbers or symbols
 * @returns {*} - True if password has numbers/symbols
 */
function hasNumSymbols(password){
    return (password.regexPresent("\\W") || password.regexPresent('[0-9]'));
}

/**Count the amount of words in any given string
 *
 * @returns {number} - The number of words the string contains
 */
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

/**Show a success message if the entered password is strong enough
 *
 */
function checkStrength(){
    var password = new Password($("#numbersInput").val());
    if(password.strong) document.getElementById("successMessage").style.visibility = 'visible';
    else{
        //Restart the password creation process until user enters a strong enough password
        sessionStorage.setItem("password", password.name);
        window.location.href = "passwordHelp.html";
    }
}