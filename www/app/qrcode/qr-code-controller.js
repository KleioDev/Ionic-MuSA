
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


                    if(user.connected)
                    {

                        console.log("Getting UserID");
                        var userID = Facebook.getUserID();
                        console.log(userID);

                        console.log("Retrieving Authorization");
                        var authToken = Facebook.getAPIToken();

                        //$window.localStorage.setItem('userID', user.userID);
                        MatchHunt.getMatchHunt(userID, authToken)
                            .then(function(matchHunt)
                            {
                                $scope.matchHunt = matchHunt;

                                $state.go('tab.tab-match-hunt');
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

            scanner.scan( function (scan) {

                console.log(scan);


                if(scan) {

                    if(!scan.cancelled) {

                        Facebook.isLoggedIn()
                            .then(function (user) {


                                if (user.connected) {

                                    console.log("Getting UserID");
                                    var userID = Facebook.getUserID();
                                    console.log(userID);

                                    console.log("Retrieving Authorization");
                                    var authToken = Facebook.getAPIToken();


                                    //TODO: IF we use some parsing or not
                                    MatchHunt.guess(userID, authToken, scan.text)
                                        .then(function (status) {
                                            if (status == 'won') {
                                                var okButton = {
                                                    text: $scope.navigationTitles.scanner.playAgainLabel,
                                                    type: 'button-positive',
                                                    onTap: $scope.loadNewMatchHuntGame

                                                };

                                                var cancelButton = {
                                                    text: $scope.navigationTitles.scanner.quitLabel,
                                                    onTap: function () {
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

                                                wonPopup.then(function (res) {
                                                    console.log("Doing something");
                                                });
                                            }

                                            else if (status == 'lost') {
                                                var okButton = {
                                                    text: $scope.navigationTitles.scanner.playAgainLabel,
                                                    type: 'button-positive',
                                                    onTap: $scope.loadNewMatchHuntGame

                                                };

                                                var cancelButton = {
                                                    text: $scope.navigationTitles.scanner.quitLabel,
                                                    onTap: function () {
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

                                                losePopup.then(function (res) {
                                                    console.log("Doing something");
                                                });
                                            }

                                            else if (status == 'incorrect') {
                                                //TODO: Show a popup dialog saying you failed
                                                var alertFail = $ionicPopup.show(
                                                    {
                                                        title: $scope.navigationTitles.scanner.failGuessLabel,
                                                        template: $scope.navigationTitles.scanner.livesLeftLabel + game.tries + "<br>" + $scope.navigationTitles.scanner.pointsLeftLabel + game.points

                                                    }
                                                );

                                                alertFail.then(function (res) {
                                                    console.log("Guess Fail Alert Acknowledged");
                                                });
                                            }


                                        }, function(err){console.log(err);});
                                }


                                else {

                                    //TODO: Show a popup asking the user to login

                                    Facebook.showLoginPopup();
                                }
                            });


                }
            }
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

                        console.log("Getting UserID");
                        var userID = Facebook.getUserID();
                        console.log(userID);

                        console.log("Retrieving Authorization");
                        var authToken = Facebook.getAccessToken();
                        MatchHunt.getMatchHunt(userID, authToken)
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


        var getMatchHunt = function(user, authToken)
        {

            console.log("Checking if there is a current match hunt id stored");
            var id = this.getId();


            var me = this;

            if(!id)
            {
                id = 0;
            }

            console.log("Current ID:");
            console.log(id);

            console.log("Defining Request:");

            var request = {

                url: Routes.MATCH_HUNT + id,
                method: 'GET',
                headers:
                {
                    'Authorization': 'Bearer ' + authToken
                }

            };

            return $http(request).then(success, failure);

            function success(response) {
                console.log("Retrieved Game");
                console.log(response);
                if (response.status == 200) {

                    var _matchHunt = response.data;

                    var matchHuntID = _matchHunt.id;

                    me.setId(matchHuntID);

                    me.setActiveGame(_matchHunt);


                    me.generateRandomDisplacement().then(function()
                    {
                        return matchHunt;
                    })
                }

            }
            function failure(response)
            {
                $q.reject('Failed to get a Match Hunt Game');
            }
        };

        var getId = function()
        {
            return $window.localStorage.getItem('activeMatchHunt');

        };

        var setId = function(id)
        {
            /* See if ID has changed */
            console.log(typeof id);
            console.log(id);
            var currentID = this.getId();

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


        var guess = function(_userID, authToken,_qrCodeData)
        {




            var matchHuntId = this.getId();

                var request = {

                    url: Routes.GUESS,
                    method: 'POST',
                    headers:
                    {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data: {
                        UserId: _userID,
                        qrcode: _qrCodeData,
                        ClueId: matchHuntId
                    }
                };

            console.log(request);
                return $http(request).then(successGuess, failureGuess);

            function successGuess(response)
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

            function failureGuess(response)
            {


                return $q.reject('Failed to get game due to status: ' + response.status + '\nError: ' + response.data);

            }

        };

        var skip = function()
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

        var generateRandomDisplacement = function()
        {

            var defer = $q.defer();


            var img = new Image();
            img.src = matchHunt.image;


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

                    matchHunt.displacements = {
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
                    matchHunt.displacements = {
                        x : _parseDisplacements.x,
                        y: _parseDisplacements.y
                    }


                }

                defer.resolve('Image Loaded');
            };


            return defer.promise;




        };
        var setActiveGame = function(_matchHunt)
        {
            this.matchHunt = _matchHunt;

            /* Save the current Id */
            this.setId(_matchHunt.id);
        };

        var getActiveGame = function()
        {
            return this.matchHunt;
        };


        var reset = function()
        {
            this.setActiveGame(null);
            this.setId(null);
        };



        return {

            getMatchHunt : getMatchHunt,
            setActiveGame : setActiveGame,
            getActiveGame: getActiveGame,
            guess: guess,
            skip: skip,
            setId: setId,
            generateRandomDisplacement: generateRandomDisplacement,
            getId: getId,
            reset: reset

        };


    });