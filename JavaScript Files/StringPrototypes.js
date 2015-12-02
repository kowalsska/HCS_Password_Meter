/**Get the entropy of any given string
 *
 * @returns {number} - Entropy of given string
 */
String.prototype.getEntropy = function () {

    // the range of characters used
    var range = 0;

    // increase range if numbers are present
    if (this.regexPresent('[0-9]')) {
        range += 10;
    }
    // increase range if lower case chars are present
    if (this.regexPresent('[a-z]')) {
        range += 26;
    }
    // increase range if upper case chars are present
    if (this.regexPresent('[A-Z]')) {
        range += 26;
    }
    // increase range if non-alphanumeric chars are present
    if (this.regexPresent("\\W")) {
        range += 34;
    }

    // Bit strength calculated by log2(rangeOfChars)*lengthOfPassword
    var tempLogVal = Math.log(range) / Math.log(2);
    // Array to hold entropy @ index 0 and user feedback at index 1
    var entropy = this.length * tempLogVal;
    // Stop from returning NaN value
    if (entropy > 0) {
        return Math.floor(entropy);
    }
    return 0;

};

/**Check a string for a set of characters (e.g. numbers or letters)
 *
 * @param regex - Set of characters to check for (e.g. lower case letters would be '[a-z]')
 * @returns {boolean} - True if the string contains this character set
 */
String.prototype.regexPresent = function(regex) {

    var regExp = new RegExp(regex);
    return this.replace(regExp, "").length < this.length;

};

/**Get all possible substrings of a string
 *
 * @returns {Array} - An array of all substrings
 */
String.prototype.getSubstrings = function() {

    //Take into account the fact that people often replace letters with numbers (a with 4 etc.) and check for these too
    var word = this.toLowerCase();
    word = word.replaceLetters([" ", "", "4", "a", "0", "o",
        "5", "s", "3", "e", "1", "i", "8", "b"]);

    var substrings = [];
    var substr = "";

    //Get all substrings
    for (var i = 0; i < word.length; i++) {
        for (var j = 0; i + j <= word.length; j++) { //added i+j and equal to comparison
            substr = word.substring(j, i + j); //changed word.substring(i, i + j) to word.substring(j, i + j)
            if (substr != "" && substr.length > 2) { //only add substrings longer or equal to 3 chars
                substrings.push(substr);
            }
        }
    }
    substrings.push(word);
    return substrings;

};

/**Replace the letters found in every even position in array with letter that directly follows it
 * E.g. ["a", "b", "i", "j"] will replace all a letters with b and all i letters with j
 *
 * @param array - The array of letters that follows the structure ["replace this", "with this"]
 * @returns {String}
 */
String.prototype.replaceLetters = function (array) {

    var newString = this;

    //Loop through all items in array and replace i with (i + 1)
    for (var i = 0; i < array.length; i += 2) {
        var regExp = new RegExp(array[i], "g");
        newString = newString.replace(regExp, array[i + 1]);
    }

    return newString;

};

