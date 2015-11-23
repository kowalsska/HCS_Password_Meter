/** Create a new Password object and find all relevant values such as entropy and strength
 *
 * @param password - Password string
 * @returns {Password} - Password object with all relevant values included
 * @constructor
 */
function Password(password) {

    this.name = password;
    this.entropy = password.getEntropy();
    this.characterCount = password.length;
    this.subStringsArray = password.getSubstrings();
    this.usedWords = this.getUsedWords();
    this.repeatedChars = this.checkRepetitions();
    this.numbersUsed = password.regexPresent('[0-9]');
    this.capsMixUsed = (password.regexPresent('[a-z]') && password.regexPresent('[A-Z]'));
    this.specCharsUsed = password.regexPresent("\\W");
    this.strong = (this.entropy > 70 && (this.usedWords == 0) && !this.repeatedChars);

    return this;
}

/**Get all dictionary words contained in the password
 *
 * @returns {Array} - An array of all words contain within the password
 */
Password.prototype.getUsedWords = function () {

    var dictWordsUsed = [];

    //Loop through all substrings of the password
    for (var i = 0; i < this.subStringsArray.length; i++) {
        if (dictionary.includes(this.subStringsArray[i]) == true) {
            dictWordsUsed.push(this.subStringsArray[i]);
        }
    }
    return dictWordsUsed;

};

/**Check the password for three or more repeated characters
 *
 * @returns {boolean} - True if a character is repeatedly more than three consecutive times
 */
Password.prototype.checkRepetitions = function () {
    var repetition = 0;
    for (var i = 0; i < this.name.length - 1; i++) {
        if ((this.name.charCodeAt(i) == this.name.charCodeAt(i + 1))) {
            repetition++;
        }
    }
    return repetition > 1;
};

/**Tell the user what they did correctly and what they could improve when creating a password
 *
 */
Password.prototype.highlightRightsWrongs = function () {

    //Put all negative points in red and all positive points in green
    var newHTML = "<div style='color: red'>";
    var goodHTML = "<div style='color: green'>";

    //Display the relevant message concerning dictionary words used
    if (this.usedWords.length > 0) {

        newHTML += "<p>Words are not allowed in the password. You have used the following words: </p><ul>";

        for (var i = 0; i < this.usedWords.length; i++) {
            newHTML += "<li>" + this.usedWords[i] + "</li>";
        }

        newHTML += "</ul>";

    }
    else{
        goodHTML += "<p>You have not used any words in your password. This is great because it makes it harder for others to guess<p>";
    }

    //Display the relevant message concerning character count
    if (this.characterCount < 8) {
        newHTML += "<p>Your password needs to have at least 8 characters - your's only has " + this.characterCount + "<p>";
    }
    else{
        goodHTML += "<p>Your password has " + this.characterCount + " characters - this is great!<p>";
    }

    //Display the relevant message concerning the use of a mix of lower and upper case letters
    if(!this.capsMixUsed){
        newHTML += "<p>It is best to use a mixture of small and big letters<p>";
    }
    else{
        goodHTML += "<p>You have used a mixture of small and big letters which is perfect when making a password<p>";
    }

    //Display the relevant message concerning numbers used
    if(!this.numbersUsed){
        newHTML += "<p>Passwords should contain numbers as well as letters<p>";
    }
    else {
        goodHTML += "<p>You have used numbers in your password which makes it much harder to guess<p>";
    }

    //Display the relevant message concerning special characters used
    if(!this.specCharsUsed){
        newHTML += "<p>Great passwords will contain special characters like ! and &<p>";
    }
    else {
        goodHTML += "<p>You have used special characters making your password much stronger<p>";
    }

    if (this.repeatedChars) {
        newHTML += "<p>Your password cannot have three or more of the same letters in a row<p>";
    }

    newHTML += "</div>";
    goodHTML += "</div>";

    //Display the newly created HTML on screen
    document.getElementById("passwordPoints").innerHTML = newHTML + goodHTML;

};