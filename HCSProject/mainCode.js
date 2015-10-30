var dictionary;

window.onload = function () {
    //getAjax("firstNames.txt", namesList);
    getAjax("dictionary.txt", loadDictionary);
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

    dictionary = data.split('\n');

}

function wordSearch() {

    var word = $("#wordInput").val().toLowerCase();
    console.log(word);
    if ($.isNumeric(word)){
        console.log("Your password contains only numbers. Please enter a new password");
    }
    else if (dictionary.indexOf(word) > -1) {
        console.log("Your password contains a word. Please enter a new password.");
    }
    else{
        console.log("Your password is strong");
    }

    }

function namesList(data){

    var newNamesList = data.split("\n");
    var finishedNamesList = "";

    for(var i = 0; i < newNamesList.length; i++){

        var name = newNamesList[i].split(" ");
        finishedNamesList += name[0].toLowerCase() + '\n';
    }

    console.log(finishedNamesList);
}