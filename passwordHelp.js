function checkWords(inputVal){

    var wordAmount = document.getElementById('wordAmount');
    var wordCount = 0;

    if(inputVal.length > 0)wordCount ++;

    for(var i = 1; i < inputVal.length; i ++){
        if(inputVal.charCodeAt(i - 1) == 32 && inputVal.charCodeAt(i) !== 32){
            wordCount ++;
        }
    }

    if(wordCount >= 8)wordAmount.style.color = "green";
    else wordAmount.style.color = "red";

    wordAmount.innerText = wordCount + "/8 words";
}