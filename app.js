angular.module("app",[]);
angular.module("app").controller('MainCtrl', function($scope){
    $scope.message = 'Hello';
    $scope.name = "";

    $scope.updateMessage = function(message){
        $scope.message = message;
    };

    $scope.getEntropy = function(text){
        return text.length;
    };

    $scope.getImage = function (pwd){

        var imgToSwap = "";
        if(pwd.length>12)
            imgToSwap = imgToSwap= "images/frame_27_delay-0.04s.png";
        if(pwd.length<1)
            imgToSwap = imgToSwap= "images/frame_67_delay-0.04s.png";

        switch (pwd.length) {
            case (1):
                imgToSwap = "images/frame_3_delay-0.04s.png";
                break;
            case (2):
                imgToSwap = "images/frame_5_delay-0.04s.png";
                break;
            case (3):
                imgToSwap =  "images/frame_6_delay-0.04s.png";
                break;
            case (4):
                imgToSwap =  "images/frame_8_delay-0.04s.png";
                break;
            case (5):
                imgToSwap =  "images/frame_10_delay-0.04s.png";
                break;
            case (6):
                imgToSwap="images/frame_11_delay-0.04s.png";
                break;
            case (7):
                imgToSwap= "images/frame_14_delay-0.04s.png";
                break;
            case (8):
                imgToSwap= "images/frame_16_delay-0.04s.png";
                break;
            case (9):
                imgToSwap= "images/frame_19_delay-0.04s.png";
                break;
            case (10):
                imgToSwap= "images/frame_22_delay-0.04s.png";
                break;
            case (11):
                imgToSwap= "images/frame_24_delay-0.04s.png";
                break;
            case (12):
                imgToSwap= "images/frame_27_delay-0.04s.png";
                break;
        }
        return imgToSwap;
    };


});
