
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
            /* If is logged in OPen Match Hunt */

            Facebook.isLoggedIn()
                .then(function(user)
                {
                    console.log("MATCHING");
                    console.log(user);
                    if(user.loginStatus)
                    {


                        MatchHunt.getMatchHunt(user)
                            .then(function(response)
                            {
                                console.log("MATCH HUNT");
                                console.log(response);

                                /* Now store the ID */
                                if(response.status == 200) {


                                    var matchHuntID = response.data.id;

                                    MatchHunt.saveId(matchHuntID);

                                    MatchHunt.setActiveGame(response.data);

                                    //Now Change the state
                                    $state.go('tab.tab-match-hunt');


                                }

                            },

                            function(err)
                            {
                                console.log("MATCH HUNT ERR");
                                console.log(err);
                            }
                        );
                    }
                    else{

                        //TODO: Show a popup asking the user to login

                        Facebook.showLoginPopup();
                    }
                });

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


})

/* Open the math hunt game */
.controller('MatchHuntCtrl', function($scope, AppNavigationTitles, MatchHunt)
    {
        /* Get the labels */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Calls the Match Hunt service for a match hunt game */
        $scope.matchHunt = MatchHunt.getActiveGame();


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

    })

    /* Match Hunt game */
    .factory('MatchHunt', function(Routes, $http, $window)
    {
        var matchHunt = {};

        matchHunt.getMatchHunt = function(user)
        {
            //var  = $window.localStorage.getItem('activeMatchHunt');

            ///* if it is null or undefined it means it was never set */
            //if(id == null && typeof id == 'undefined')
            //{
            //    /* Set id to 0 */
            //    id = 0;
            //}
            console.log("GETTING AUTH");

            var authToken = $window.localStorage.getItem('userAuthenticationToken');
            var id = matchHunt.getId();

            /* If it is undefined  set to 0 */
            if(id == null || typeof id == 'undefined')
            {
                id = 0;
            }

            var request = {

                url: Routes.MATCH_HUNT + id,
                method: 'GET',
                headers:
                {
                    'Authorization': 'Bearer ' + authToken
                },
                data: {
                    userID: user.userID
                }

            };



            return $http(request);

        };

        matchHunt.guess = function(user)
        {


            //var request = {
            //
            //    url : Routes.GUESS,
            //    method : 'POST',
            //    data:
            //}
            //return $http.post(Routes.GUESS,
            //    { data:{
            //
            //
            //    }}
            //)
        };

        matchHunt.setActiveGame = function(_matchHunt)
        {
            matchHunt.activeGame = _matchHunt;

            /* Save the current Id */
            matchHunt.saveId(_matchHunt.id);
        };

        matchHunt.getActiveGame = function()
        {
            return matchHunt.activeGame;
        };

        matchHunt.saveId = function(id)
        {
            $window.localStorage.setItem('activeMatchHunt', id);
        };

        matchHunt.getId = function()
        {
            return $window.localStorage.getItem('activeMatchHunt');
        };



        return matchHunt;


    });