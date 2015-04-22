
/* Module for QR Code Tab controllers */
angular.module('qr-code-controllers', [])

    /* QrCode View Controller */
    .controller('QRCodeViewCtrl', function($scope,$state,$window, Facebook, MuseumObjects, MatchHunt, $location, $ionicPopup, AppNavigationTitles)
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
                    console.log("MATCH HUNT");
                    console.log(user);
                    if(user.loginStatus)
                    {

                        $window.localStorage.setItem('userID', user.userID);
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
.controller('MatchHuntCtrl', function($scope,$state, Facebook, AppNavigationTitles, MatchHunt)
    {

        /* Always check for Facebook Login */
        Facebook.isLoggedInOnly()
            .then(function(_user)
            {
                /* If the user is logged in */
                if(_user.loggedIn)
                {
                    $scope.user = _user;
                }
                else
                {
                    /* Go back */
                    $state.go('tab.tab-qrcode-scanner');
                }
            });
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

            $scope.loadNewMatchHuntGame();

        };

        /* Open qr code scanner */
        $scope.takeAGuess = function()
        {
            /* Open Bar Code Scanner */
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (_qrcodeData) {


                //TODO: IF we use some parsing or not
                MatchHunt.guess($scope.user, _qrcodeData)
                    .then(function(response)
                    {
                        //TODO: Here I handle the game response

                        var game = response.data;

                        if(game.status == 'won')
                        {
                            //TODO: Show popup dialog ask to play again

                            var okButton = {
                                text: $scope.navigationTitles.scanner.playAgainLabel,
                                type: 'button-positive',
                                onTap: $scope.loadNewMatchHuntGame

                            };

                            var cancelButton = {
                                text: $scope.navigationTitles.scanner.quitLabel,
                                onTap: function()
                                {
                                    $state.go('tab.tab-qrcode-scanner');
                                }
                            };

                            var wonPopup = $ionicPopup.show(
                                {
                                    title: $scope.navigationTitles.scanner.youWonLabel,
                                    subTitle: $scope.navigationTitles.scanner.pointsReceivedLabel + game.points,
                                    buttons: [
                                        cancelButton, okButton
                                    ]
                                }
                            );

                            wonPopup.then(function(res)
                            {
                                console.log("Doing something");
                            });

                        }
                        else if(game.status == 'lose')
                        {
                            var okButton = {
                                text: $scope.navigationTitles.scanner.playAgainLabel,
                                type: 'button-positive',
                                onTap: $scope.loadNewMatchHuntGame

                            };

                            var cancelButton = {
                                text: $scope.navigationTitles.scanner.quitLabel,
                                onTap: function()
                                {
                                    $state.go('tab.tab-qrcode-scanner');
                                }
                            };

                            var losePopup = $ionicPopup.show(
                                {
                                    title: $scope.navigationTitles.scanner.youLoseLabel,
                                    subTitle: $scope.navigationTitles.scanner.youLoseBodyLabel,
                                    buttons: [
                                        cancelButton, okButton
                                    ]
                                }
                            );

                            losePopup.then(function(res)
                            {
                                console.log("Doing something");
                            });

                        }

                        else
                        {
                            //TODO: Show a popup dialog saying you failed
                            var alertFail = $ionicPopup.show(
                                {
                                    title: $scope.navigationTitles.scanner.failGuessLabel,
                                    template: $scope.navigationTitles.scanner.livesLeftLabel + game.tries + "<br>" + $scope.navigationTitles.scanner.pointsLeftLabel + game.points

                                }
                            );

                            alertFail.then(function(res)
                            {
                                console.log("Guess Fail Alert Acknowledged");
                            });
                        }

                        $scope.matcHunt = MatchHunt.setActiveGame(response);
                    });

            }, function (error) {
                console.log("Scanning failed: ", error);
            } );
        };


        $scope.loadNewMatchHuntGame = function()
        {

            Facebook.isLoggedIn()
                .then(function(user)
                {
                    console.log("MATCH HUNT");
                    console.log(user);
                    if(user.loginStatus)
                    {

                        $window.localStorage.setItem('userID', user.userID);
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

                                    $scope.matchHunt = MatchHunt.getActiveGame();

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
        }

    })

    /* Match Hunt game */
    .factory('MatchHunt', function(Routes, $http, $window)
    {
        var matchHunt = {};

        matchHunt.getMatchHunt = function(user)
        {
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

        matchHunt.guess = function(_user, _qrCodeData)
        {

            /* Should I check if the user is logged in ? */
            var authToken = $window.localStorage.getItem('userAuthenticationToken');

            var matchHuntId = matchHunt.getId();

                var request = {

                    url: Routes.GUESS,
                    method: 'POST',
                    headers:
                    {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data: {
                        userID: _user.userID,
                        qrcode: _qrCodeData,
                        clueId: matchHuntId
                    }
                };
                return $http(request);
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