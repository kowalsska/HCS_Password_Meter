/**
 * Created by magdakowalska on 24/10/15.
 */

var dictionary = [];

window.onload = function () {
    getAjax("words.txt", loadDictionary);
};

function getAjax(textFile, successFunction) {

    $.ajax({
        type: "GET",
        url: textFile,
        dataType: "text",
        success: successFunction
    });

}

function loadDictionary(data) {
    var tempDictionary = data.split('\n');

    for(var i = 0; i < tempDictionary.length; i ++){

        tempDictionary[i] = tempDictionary[i].replace(/[\n\r]/g, '');
        tempDictionary[i] = tempDictionary[i].toLowerCase();
        if(tempDictionary[i].length <= 3){
            tempDictionary.splice(i, 1);
        }
    }

        dictionary = tempDictionary;

}


function getEntropy(password) {

    var pwd = String(password);

    //var numbers = false;
    var upCase = false;
    var lowCase = false;
    var symbols = false;
    var numbers = true;

    /* the range of characters used */
    var range = 0;
    /* the length of the password */
    var pwdLength = pwd.length;

    /* increase range if numbers are present*/
    if (pwd.replace(/[0-9]+/g, "").length < pwdLength) {
        range += 10;
        numbers = true;
    }
    /* increase range if lower case chars are present*/
    if (pwd.replace(/[a-z]+/g, "").length < pwdLength) {
        range += 26;
        lowCase = true;
    }
    /* increase range if upper case chars are present*/
    if (pwd.replace(/[A-Z]+/g, "").length < pwdLength) {
        range += 26;
        upCase = true;
    }
    /* increase range if non-alphanumeric chars are present*/
    if (pwd.replace(/\W+/g, "").length < pwdLength) {
        range += 34;
        symbols = true;
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

function include(arr,obj) {
    return (arr.indexOf(obj) > -1);
}

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

}

function getUsedWords(password){

    var tempPassword = password.toLowerCase();
    tempPassword = tempPassword.replace(" ", "");
    tempPassword = tempPassword.replace("4", "a");
    tempPassword = tempPassword.replace("0", "o");
    tempPassword = tempPassword.replace("5", "s");
    tempPassword = tempPassword.replace("3", "e");

    var substrings = getSubstrings(tempPassword);
    var dictWordsUsed = [];
    for(var i=0; i < substrings.length; i++) {
        if(include(dictionary, substrings[i]) == true) {
            dictWordsUsed.push(substrings[i]);
        }
    }
    return dictWordsUsed;

}

function checkDictionary(password) {
    return getUsedWords(password).length > 0;
}

function checkRepetitions(password) {
    var repetition = 0;
    for(var i=0; i < password.length - 1; i++) {
        if((password.charCodeAt(i) == password.charCodeAt(i+1)))
        {
            repetition ++;
        }
    }
    return repetition > 2;
}

