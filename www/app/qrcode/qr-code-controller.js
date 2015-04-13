
/* Module for QR Code Tab controllers */
angular.module('qr-code-controllers', [])

    /* QrCode View Controller */
    .controller('QRCodeViewCtrl', function($scope,$state, Facebook, MuseumObjects, MatchHunt, $location, $ionicPopup, AppNavigationTitles)
    {
        /* Match hunt isn't available for everyone */
        $scope.matchHuntAvailable = false;

        /* Get the labels */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Play match hunt button */
        $scope.playMatchHunt = function()
        {
            $scope.user = Facebook.getUser();
            /* If is logged in OPen Match Hunt */
            if($scope.user.loginStatus)
            {
                $scope.matchHuntAvailable = true;
                /* Show Loading */
                MatchHunt.getMatchHunt();
                $state.go('tab.tab-match-hunt');

            }
            /* Show a popup if the user isn't logged in to facebook */
            else
            {
            }
        };

    /* Open the scanner when the user wants to scan a qr code */
    $scope.openScanner = function()
    {

        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) {
            console.log(result);

            /* Query the server if it works */
            if(result.text.indexOf("MuSA") < 0)
            {

                        $ionicPopup.alert({
                            title: $scope.navigationTitles.scanner.invalidQRCodeLabel
                        });

            }
            else {

                //console.log(result.text.split(':')[1]);
                /* Preload the Object */
                var objectId = result.text.split(':')[1]

                /* Load Object */

                    MuseumObjects.getById(objectId)
                        .then(function(response)
                        {
                            if(response.status == 200)
                            {
                                MuseumObjects.setActiveObject(response.data);
                                //Change state
                                $state.go('tab.scanner-object');
                            }
                        });
            }

        }, function (error) {

        } );

    };

    $scope.$on('$stateChangeSuccess', function()
    {


    })
})

/* Open the math hunt game */
.controller('MatchHuntCtrl', function($scope, AppNavigationTitles, MatchHunt)
    {
        /* Get the labels */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Calls the Match Hunt service for a match hunt game */
        $scope.matchHunt = MatchHunt.get();

        $scope.$on('$stateChangeSuccess', function()
        {
            $scope.matchHunt = MatchHunt.get();

        });

        /* Preferences changed */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


        $scope.skip = function()
        {
            /* Get a new match hunt */
        };

        /* Open qr code scanner */
        $scope.takeAGuess = function()
        {
            /* Open Bar Code Scanner */
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (result) {

            }, function (error) {
                console.log("Scanning failed: ", error);
            } );
        };

        /* Dummy data */
        $scope.points = 0;

        $scope.hearts = 3;

    });