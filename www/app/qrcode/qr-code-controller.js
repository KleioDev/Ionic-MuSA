
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
                            .then(function(matchHunt)
                            {
                                $scope.matchHunt = matchHunt;
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

        scanner.scan( function (scan) {
            console.log(scan);

            var qrCodeText = scan.text;

            if(!isNaN(qrCodeText))
            {

                /* Load Object */

                    MuseumObjects.getById(qrCodeText)
                        .then(function(object)
                        {
                           MuseumObjects.setActiveObject(object);
                                //Change state
                                $state.go('tab.scanner-object');

                        },
                        function(response)
                        {
                            console.log(response);
                        }
                    );
            }

            else {

                $ionicPopup.alert({
                    title: $scope.navigationTitles.scanner.invalidQRCodeLabel
                });

            }

        }, function (error) {

        } );

    };


})

/* Open the math hunt game */
.controller('MatchHuntCtrl', function($scope,$state, Facebook, MatchHunt)
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




        /* Calls the Match Hunt service for a match hunt game */
        $scope.matchHunt = MatchHunt.getActiveGame();

        $scope.displacements =
        console.log($scope.matchHunt);

        $scope.skip = function()
        {
            /* Get a new match hunt */
            MatchHunt.skip().then(function(res){

                    if(res)
                        $scope.loadNewMatchHuntGame();

            }, function(err){console.log(err)})

        };

        /* Open qr code scanner */
        $scope.takeAGuess = function()
        {
            /* Open Bar Code Scanner */
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (_qrcodeData) {

                console.log(_qrcodeData);

                //TODO: IF we use some parsing or not
                MatchHunt.guess($scope.user, _qrcodeData)
                    .then(function(status)
                    {
                        if(status == 'won')
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

                        else if(status == 'lost')
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

                        else if(status == 'incorrect')
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
                            .then(function(matchHunt)
                            {
                                $scope.matchHunt = matchHunt;
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
    .factory('MatchHunt', function(Routes, $http, $q, $window)
    {
        var matchHunt = {};

        matchHunt.getMatchHunt = function(user)
        {
            console.log("GETTING AUTH");

            var authToken = $window.localStorage.getItem('userAuthenticationToken');
            var id = matchHunt.getId(); //Get ID from localstorage

            /* If it is undefined  set to 0, get a random Match Hunt Game */
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

            /* Should handle the http response here */
            return $http(request).then(success, failure);

            function success(response) {
                if (response.status == 200) {

                    var _matchHunt = response.data;

                    var matchHuntID = _matchHunt.id;

                    this.saveId(matchHuntID);

                    this.setActiveGame(_matchHunt);


                    this.generateRandomDisplacement().then(function()
                    {

                        return matchHunt.activeGame;
                    })
                }

            }
            function failure(response)
            {
                $q.reject('Failed to get a Match Hunt Game');
            }



        };

        matchHunt.guess = function(_user, _qrCodeData)
        {

            /* Should I check if the user is logged in ? */
            var authToken = $window.localStorage.getItem('userAuthenticationToken');
            var _userID = $window.localStorage.getItem('userIDAPI');



            var matchHuntId = matchHunt.getId();

                var request = {

                    url: Routes.GUESS,
                    method: 'POST',
                    headers:
                    {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data: {
                        UserId: _userID,
                        qrcode: _qrCodeData.text,
                        ClueId: matchHuntId
                    }
                };

            console.log(request);
                return $http(request).then(successGuess, failureGuess);

            function successGuess(response)
            {

                if(response.status == 200)
                {
                    if(response.data)
                    {
                        var game = response.data;

                        console.log("Guess Response");
                        console.log(game);


                        if(game.correct == 'true') //User Won
                        {
                            console.log('won match hunt');
                            this.reset();
                            return 'won';

                        }
                        /* user lost */
                        else if(game.correct == 'false' && game.attempts == 3)
                        {
                            this.reset();

                                return 'lost';
                        }

                        /* You lost update */
                        else
                        {
                           return 'incorrect';
                        }


                    }
                }
            }

            function failureGuess(response)
            {

                return $q.reject('Failed to get game due to status: ' + response.status + '\nError: ' + response.data);

            }

        };

        matchHunt.skip = function()
        {
            return $http.put(Routes.MATCH_HUNT + this.getId()).then(
                function(response)
                {

                    if(response.status == 200)
                    {
                        if(response.data)
                        {
                            this.reset();
                            return response;
                        }
                    }
                },

                function(response)
                {
                    return $q.reject('Failed to SKIP game due to status: ' + response.status + '\nError: ' + response.data);
                }
            )
        };

        matchHunt.generateRandomDisplacement = function()
        {

            var defer = $q.defer();


            var img = new Image();
            img.src = matchHunt.activeGame.image;


            img.onload = function()
            {

                var _displacements = $window.localStorage.getItem('matchHuntDisplacements');

                if(_displacements == null) {

                    var imgWidth = img.width;
                    var imgHeight = img.height;

                    var windowWidth = 250;
                    var windowHeight = 250;

                    console.log(imgWidth);
                    console.log(imgHeight);
                    var X = 0;
                    var Y = 0;
                    if (imgWidth > windowWidth && imgHeight > windowHeight) {
                        /* Generate random displacement */

                        /* X has to be a number such that X + windowWidth < imgWidth */
                        X = -1 * Math.floor((Math.random() * (imgWidth - windowWidth )) + 0);

                        /* Y has to be a number such that Y + windowHeight < imgHeight */
                        Y = -1 * Math.floor((Math.random() * (imgHeight - windowHeight)) + 0);


                    }


                    console.log(X);
                    console.log(Y);


                    /* Store displacements */

                    var displacements = {
                        x: X,
                        y: Y
                    };

                    matchHunt.activeGame.displacements = {
                        x: X,
                        y: Y
                    };
                    if (matchHunt.getId() != null) {
                        var displacementsStr = JSON.stringify(displacements);

                        $window.localStorage.setItem('matchHuntDisplacements', displacementsStr);
                    }
                }

                else {

                    console.log("using previous displacements");

                    var _parseDisplacements = JSON.parse(_displacements);

                    console.log(_parseDisplacements);
                    matchHunt.activeGame.dispplacements = {
                        x : _parseDisplacements.x,
                        y: _parseDisplacements.y
                    }


                }

                defer.resolve('Image Loaded');
            };


            return defer.promise;




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
            /* See if ID has changed */
            console.log(typeof id);
            var currentID = matchHunt.getId();

            /* No ID has been made */
            if(currentID == null)
            {
                console.log("new game");
                $window.localStorage.setItem('activeMatchHunt', id);

            }
            /* Same game */
            else if(parseInt(currentID) == id)
            {
                console.log("same game");
            }

            /* New Game */
            else if(parseInt(currentID) != id)
            {

                console.log("new game");
                /* Clear Displacements */
                $window.localStorage.setItem('matchHuntDisplacements', null);
                $window.localStorage.setItem('activeMatchHunt', id);

            }
        };

        matchHunt.getId = function()
        {
            return $window.localStorage.getItem('activeMatchHunt');
        };


        matchHunt.reset = function()
        {
            matchHunt.setActiveGame(null);
            matchHunt.saveId(null);
        };



        return matchHunt;


    });