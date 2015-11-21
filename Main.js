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

Array.prototype.includes = function(obj) {
    return (this.indexOf(obj) > -1);
};

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

