function Password(password){

    this.name = password;
    this.entropy = getEntropy(this.name);
    this.characterCount = password.length;
    this.subStringsArray = getSubstrings(this.name);
    this.usedWords = this.getUsedWords();
    this.repeatedChars = this.checkRepetitions();

    return this;

}

getEntropy = function(password){

    var pwd = String(password);

    /* the range of characters used */
    var range = 0;
    /* the length of the password */
    var pwdLength = pwd.length;

    /* increase range if numbers are present*/
    if (pwd.replace(/[0-9]+/g, "").length < pwdLength) {
        range += 10;
    }
    /* increase range if lower case chars are present*/
    if (pwd.replace(/[a-z]+/g, "").length < pwdLength) {
        range += 26;
    }
    /* increase range if upper case chars are present*/
    if (pwd.replace(/[A-Z]+/g, "").length < pwdLength) {
        range += 26;
    }
    /* increase range if non-alphanumeric chars are present*/
    if (pwd.replace(/\W+/g, "").length < pwdLength) {
        range += 34;
    }

    /*bit strength calculated by log2(rangeOfChars)*lengthOfPassword*/
    var tempLogVal = Math.log(range) / Math.log(2);
    /*Array to hold entropy @ index 0 and user feedback at index 1 */
    var entropy = pwdLength * tempLogVal;
    /* Stop from returning NaN value*/
    if (entropy > 0) {
        return Math.floor(entropy);
    }
    return 0;

};

function getSubstrings(password){
    var substrings = [];
    var substr = "";
    var word = password.toLowerCase();
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; i+j <= word.length; j++) { //added i+j and equal to comparison
            substr = word.substring(j, i + j); //changed word.substring(i, i + j) to word.substring(j, i + j)
            if(substr != "" && substr.length > 2) { //only add substrings longer or equal to 3 chars
                substrings.push(substr);
            }
        }
    }
    substrings.push(word);
    return substrings;
}

Password.prototype.getUsedWords = function(){

    var tempPassword = this.name.replaceLetters([" ", "", "4", "a", "0", "o",
        "5", "s", "3", "e", "1", "i", "8", "b"]);

    var substrings = getSubstrings(tempPassword);
    var dictWordsUsed = [];
    for(var i=0; i < substrings.length; i++) {
        if(dictionary.includes(substrings[i]) == true) {
            dictWordsUsed.push(substrings[i]);
        }
    }
    return dictWordsUsed;

};

Password.prototype.checkRepetitions = function(){
    var repetition = 0;
    for(var i=0; i < this.name.length - 1; i++) {
        if((this.name.charCodeAt(i) == this.name.charCodeAt(i+1)))
        {
            repetition ++;
        }
    }
    return repetition > 1;
};

Password.prototype.highlightWrongs = function(){

    var newHTML = "";

    if(this.usedWords.length > 0){

        newHTML += "<p>Words are not allowed in the password. You have used the following words: </p><ul>";

        for(var i = 0; i < this.usedWords.length; i ++){
            newHTML += "<li>" + this.usedWords[i] + "</li>";
        }

        newHTML += "</ul>";

    }

    if(this.characterCount < 8){
        newHTML += "<p>Your password needs to have at least 8 characters - your's only had " + this.characterCount + "<p>";
    }

    if(this.repeatedChars){
        newHTML += "<p>Your password cannot have three or more of the same letters in a row<p>";
    }

    document.getElementById("wordsUsedList").innerHTML = newHTML;

};