/**
 * Created by magdakowalska on 24/10/15.
 */

var dictionary = [];

window.onload = function () {
    getAjax("wordsNew.txt", loadDictionary);
};

function getAjax(textFile, successFunction) {

    $.ajax({
        type: "GET",
        url: textFile,
        dataType: "text",
        success: successFunction
    });

}

//TO DO: fix it so user cannot input data until text file is loaded
function loadDictionary(data) {
    var tempDictionary = data.split('\n');

    for(var i = 0; i < tempDictionary.length; i ++){

        tempDictionary[i] = tempDictionary[i].replace(/[\n\r]/g, '');
        tempDictionary[i] = tempDictionary[i].toLowerCase();
        if(tempDictionary[i].length <= 2){
            tempDictionary.splice(i, 1);
        }
    }

        dictionary = tempDictionary;

}


function getEntropy(password) {

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
}

Array.prototype.includes = function(obj) {
    return (this.indexOf(obj) > -1);
};

function getSubstrings(password) {
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

//Replace the letters found in every even position in array with letter that directly follows it
//E.g. ["a", "b", "i", "j"] will replace all a letters with b and all i letters with j
String.prototype.replaceLetters = function(array){

    var newString = this;

    for(var i = 0; i < array.length; i += 2){
        var regExp = new RegExp(array[i], "g");
        newString = newString.replace(regExp, array[i + 1]);
    }

    return newString;
};

function getUsedWords(password){

    var tempPassword = password.toLowerCase();

    tempPassword = tempPassword.replaceLetters([" ", "", "4", "a", "0", "o",
        "5", "s", "3", "e", "1", "i", "8", "b"]);

    var substrings = getSubstrings(tempPassword);
    var dictWordsUsed = [];
    for(var i=0; i < substrings.length; i++) {
        if(dictionary.includes(substrings[i]) == true) {
            dictWordsUsed.push(substrings[i]);
        }
    }
    return dictWordsUsed;

}

function displayRepetitions(password){

    var newHTML = "";
    var repetitions = checkRepetitions(password);

    console.log(repetitions);
    if(repetitions == true){
        newHTML =  "You have three or more repeating letters. Please fix this.";
    }

    document.getElementById("repeatingLetters").innerText = newHTML;

}

function checkRepetitions(password) {
    var repetition = 0;
    for(var i=0; i < password.length - 1; i++) {
        if((password.charCodeAt(i) == password.charCodeAt(i+1)))
        {
            repetition ++;
        }
    }
    return repetition > 1;
}

