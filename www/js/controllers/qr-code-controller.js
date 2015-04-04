angular.module('qr-code-controllers', [])

    .controller('QRCodeViewCtrl', function($scope,$state, Facebook, MatchHunt, $ionicPopup, AppNavigationTitles)

    {
        $scope.matchHuntAvailable = false;

        $scope.navigationTitles = AppNavigationTitles.get();

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

            else
            {


            }


        }


    $scope.openScanner = function()
    {

        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) {

        }, function (error) {
            console.log("Scanning failed: ", error);
        } );
    }

    $scope.$on('$stateChangeSuccess', function()
    {


    })
})


.controller('MatchHuntCtrl', function($scope, AppNavigationTitles, MatchHunt)
    {
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.matchHunt = MatchHunt.get();

        $scope.$on('$stateChangeSuccess', function()
        {
            $scope.matchHunt = MatchHunt.get();

        });


        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        $scope.skip = function()
        {
            /* Get a new match hunt */
        };

        $scope.takeAGuess = function()
        {
            /* Open Bar Code Scanner */
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (result) {

            }, function (error) {
                console.log("Scanning failed: ", error);
            } );
        };

        $scope.points = 0;

        $scope.hearts = 3;

    })