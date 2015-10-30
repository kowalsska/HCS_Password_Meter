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

    var words = data.split('\n');
    dictionary = words;

}



function getEntropy(password) {

    var pwd = String(password);
    var numbersNumOf = 10;
    var lowersNumOf = 26;
    var uppersNumOf = 26;
    var nonAlphaNumericsNumOf = 34;

    //var numbers = false;
    var upCase = false;
    var lowCase = false;
    var symbols = false;

    /* the range of characters used */
    var range = 0;
    /* the length of the password */
    var pwdLength = pwd.length;

    /* increase range if numbers are present*/
    if (pwd.replace(/[0-9]+/g, "").length < pwdLength) {
        range += numbersNumOf;
        numbers = true;
    }
    /* increase range if lower case chars are present*/
    if (pwd.replace(/[a-z]+/g, "").length < pwdLength) {
        range += lowersNumOf;
        lowCase = true;
    }
    /* increase range if upper case chars are present*/
    if (pwd.replace(/[A-Z]+/g, "").length < pwdLength) {
        range += uppersNumOf;
        upCase = true;
    }
    /* increase range if non-alphanumeric chars are present*/
    if (pwd.replace(/\W+/g, "").length < pwdLength) {
        range += nonAlphaNumericsNumOf;
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
    return (arr.indexOf(obj) != -1);
}

function getSubstrings(password) {
    var substrings = new Array();
    var substr = "";
    var word = password.toLowerCase();
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; i+j <= word.length; j++) { //added i+j and equal to comparison
            substr = word.substring(j, i + j); //changed word.substring(i, i + j) to word.substring(j, i + j)
            if(substr != "" && substr.length > 1) substrings.push(substr); //removing empty substring
        }
    }
    substrings.push(word);
    return substrings;
}

function checkDictionary(password) {
    var substrings = getSubstrings(password);
    var dictWordsUsed = new Array();
    for(var i=0; i < substrings.length; i++) {
        if(include(dictionary, substrings[i]) == true ) {
            dictWordsUsed.push(substrings[i]);
        }
    }
    if(dictWordsUsed.length > 0) {
        return dictWordsUsed;
    } else {
        return "No dictionary words used."
    }

}

function checkRepetitions(password) {
    var repetition = 0;
    for(var i=0; i < password.length - 1; i++) {
        if((password.charCodeAt(i) == (password.charCodeAt(i+1) + 1)) ||
            (password.charCodeAt(i) == (password.charCodeAt(i+1) - 1)) ||
            (password.charCodeAt(i) == password.charCodeAt(i+1)))
        {
            repetition += 1;
        }
    }
    return repetition != 0;
}

