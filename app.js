var imgArray = ["images/frame_67_delay-0.04s.png", "images/frame_3_delay-0.04s.png", "images/frame_5_delay-0.04s.png",
    "images/frame_6_delay-0.04s.png", "images/frame_8_delay-0.04s.png", "images/frame_10_delay-0.04s.png",
    "images/frame_11_delay-0.04s.png", "images/frame_14_delay-0.04s.png", "images/frame_16_delay-0.04s.png",
    "images/frame_19_delay-0.04s.png", "images/frame_22_delay-0.04s.png", "images/frame_24_delay-0.04s.png",
    "images/frame_27_delay-0.04s.png"];

/**Interact with the UI and retrieve data such as password entered
 *
 */
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

    /**Move the animation along in time as the password gets stronger to show progress
     *
     * @returns {string} - The image URL of the new GIF frame
     */
    $scope.getImage = function (){

        //Check how strong the password is and divide it by 12 to find which GIF frame should be shown
        var pwdStrength =Math.trunc(($scope.name.getEntropy()-$scope.minEntropy)/(($scope.maxEntropy-$scope.minEntropy)/12));
        var strengthText;

        //Display a textual indication of the password strength
        if(pwdStrength >= 12)strengthText = "strong";
        else if (pwdStrength >= 7)strengthText = "medium";
        else strengthText = "weak";

        document.getElementById("passwordStrength").innerText = "Your password is " + strengthText;
        var imgToSwap = "";

        //Display the correct GIF frame related to password strength
        if(pwdStrength>12)
            imgToSwap = imgToSwap= "images/frame_27_delay-0.04s.png";
        else if(pwdStrength<1)
            imgToSwap = imgToSwap= "images/frame_67_delay-0.04s.png";
        else{
            imgToSwap = imgArray[pwdStrength];
        }

        return imgToSwap;
    };

    /**Check the strength of the password and give user help if it is not strong enough
     *
     */
    $scope.checkPassword = function(){

        var password = new Password($scope.name);

        if(password.strong){
            $window.alert("Great password");
        }else{
            sessionStorage.setItem("password", password.name);
            window.location.href = "passwordHelp.html";
        }
    };

    //Testing
    //http://stackoverflow.com/questions/26372729/setting-view-value-an-input-field-in-a-unit-test-of-an-angular-form-directive
    //http://stackoverflow.com/questions/25022663/how-to-unit-test-angular-form


}]);
