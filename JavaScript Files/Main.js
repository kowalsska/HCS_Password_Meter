var dictionary = [];

/**Retrieve the data from the dictionary when the web page is loaded
 *
 */
window.onload = function () {
    getAjax("../wordsNew.txt", loadDictionary);
};

/**Retrieve data from a text file
 *
 * @param textFile - The local URL of the text file
 * @param successFunction - The function that is called when the text file is loaded
 */
function getAjax(textFile, successFunction) {

    $.ajax({
        type: "GET",
        url: textFile,
        dataType: "text",
        success: successFunction
    });

}

/** Create the dictionary of words
 *
 * @param data - The dictionary words read in from the text file
 */
function loadDictionary(data) {

    //Split the data up by line and place into an array
    var tempDictionary = data.split('\n');

    //Remove the character return from the end of each line
    for (var i = 0; i < tempDictionary.length; i++) {

        tempDictionary[i] = tempDictionary[i].replace(/[\n\r]/g, '');

        //Ensure all words are lower case and there is no word less than three letters long present
        tempDictionary[i] = tempDictionary[i].toLowerCase();
        if (tempDictionary[i].length <= 2) {
            tempDictionary.splice(i, 1);
        }
    }

    dictionary = tempDictionary;

}

/**Check if an object is present in an array
 *
 * @param obj - The object to search for
 * @returns {boolean}
 */
Array.prototype.includes = function (obj) {
    return (this.indexOf(obj) > -1);
};