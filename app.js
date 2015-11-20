var imgArray = ["images/frame_67_delay-0.04s.png", "images/frame_3_delay-0.04s.png", "images/frame_5_delay-0.04s.png",
    "images/frame_6_delay-0.04s.png", "images/frame_8_delay-0.04s.png", "images/frame_10_delay-0.04s.png",
    "images/frame_11_delay-0.04s.png", "images/frame_14_delay-0.04s.png", "images/frame_16_delay-0.04s.png",
    "images/frame_19_delay-0.04s.png", "images/frame_22_delay-0.04s.png", "images/frame_24_delay-0.04s.png",
    "images/frame_27_delay-0.04s.png"];

angular.module("app",[]);
angular.module("app").controller('MainCtrl',['$scope', '$window',  function($scope, $window){
    $scope.message = 'Hello';
    $scope.name = "";
    $scope.password = "";
    $scope.minEntropy = 22;
    $scope.maxEntropy = 70;

    $scope.updateMessage = function(message){
        $scope.message = message;
    };

    $scope.getEntropy = function(text){
        return text.length;
    };

    $scope.getImage = function (){

        var pwdStrength =Math.trunc((getEntropy($scope.name)-$scope.minEntropy)/(($scope.maxEntropy-$scope.minEntropy)/12));
        console.log(pwdStrength);
        var imgToSwap = "";

        if(pwdStrength>12)
            imgToSwap = imgToSwap= "images/frame_27_delay-0.04s.png";
        else if(pwdStrength<1)
            imgToSwap = imgToSwap= "images/frame_67_delay-0.04s.png";
        else{
            imgToSwap = imgArray[pwdStrength];
        }

        return imgToSwap;
    };

    $scope.checkPassword = function(){

        var password = new Password($scope.name);

        if(password.entropy>$scope.maxEntropy && (password.usedWords == 0) && password.repeatedChars){
            $window.alert("Great password");
        }else{
            sessionStorage.setItem("password", password.name);
            window.location.href = "passwordHelp.html";
           /*if(confirm("Oh no, your password is not strong enough. Let's make it better!")){
              $scope.helpQuestion = "Think about a secret sentence and tell it to me.";
               //if more than 8 words continue else ask for another one
               while($scope.password.split(' ').length<8){
                   $scope.helpQuestion2= "Oh no, tell me a longer secret.";
               }

                   $scope.helpQuestion2 = "Think about a secret number.";
                   $scope.helpQuestion3 = "Remember these now! And let's create our secret code.";




               $scope.instructions = "Type in only the first letter of each word in our secret sentence and add the number.Keep the capital letter";
               $scope.instructionsConfirm = "Type it again!";
               $scope.confirm = "Perfect! We now have our secret! Don't forget your sentence and number and you'll remember the code."
               $scope.bye = "See you later! Don't tell anyone our secret!"
            }*/
        }
        //console.log(getEntropy($scope.name));
    };

    //Testing
    //http://stackoverflow.com/questions/26372729/setting-view-value-an-input-field-in-a-unit-test-of-an-angular-form-directive
    //http://stackoverflow.com/questions/25022663/how-to-unit-test-angular-form


}]);
