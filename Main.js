/**
 * Created by magdakowalska on 24/10/15.
 */

var password = "Ed4tu#pL!123"

function passwordAnalyser(password) {

}

function getEntropy(password) {

    var pwd = String(password);
    var numbersNumOf = 10;
    var lowersNumOf = 26;
    var uppersNumOf = 26;
    var nonAlphaNumericsNumOf = 34;

    /* the range of characters used */
    var range = 0;
    /* the length of the password */
    var pwdLength = pwd.length;

    /* increase range if numbers are present*/
    if (pwd.replace(/[0-9]+/g, "").length < pwdLength) {
        range += numbersNumOf;
    }
    /* increase range if lower case chars are present*/
    if (pwd.replace(/[a-z]+/g, "").length < pwdLength) {
        range += lowersNumOf;
    }
    /* increase range if upper case chars are present*/
    if (pwd.replace(/[A-Z]+/g, "").length < pwdLength) {
        range += uppersNumOf;
    }
    /* increase range if non-alphanumeric chars are present*/
    if (pwd.replace(/\W+/g, "").length < pwdLength) {
        range += nonAlphaNumericsNumOf;
    }

    /*bit strength calculated by log2(rangeOfChars)*lengthOfPassword*/
    var tempLogVal = Math.log(range) / Math.log(2);
    /*Array to hold entropy @ index 0 and user feedback at index 1 */
    var entropy = pwdLength * tempLogVal;
    /* Stop from returning NaN value*/
    if (entropy > 0) {
        return Math.floor(entropy); //Andi: returning the floor from here so that it doesn't need to get done everywhere else
    }
    return 0;
}

function checkDictionary(password) {



}