
/* Module for QR Code Tab controllers */
angular.module('qr-code-controllers', [])

    /* QrCode View Controller */
    .controller('QRCodeViewCtrl', function($scope,$state, FacebookUser, $cordovaDevice, MuseumObjects, MatchHunt, $location, $ionicPopup)
    {
        /* Match hunt isn't available for everyone */
        $scope.matchHuntAvailable = false;

        FacebookUser.logout();

        /* Get the labels */
        $scope.dialog = {
            navigationTitles  : $scope.navigationTitles
        };


        $scope.setShowPopup = function(popupOpen)
        {
            $scope.showPopup = popupOpen;
        };

        /* Play match hunt button */
        $scope.playMatchHunt = function()
        {

            FacebookUser.getAPIStatus()
                .then(function(authPackage)
                {
                    console.log("Auth Package - Match Hunt");
                    console.log(authPackage);
                    if(authPackage) {
                        MatchHunt.generateGame(authPackage.authToken)
                            .then(function (game) {
                                //console.log("Generated the Game");
                                //if(response)
                                console.log("Generated Game: ");
                                console.log(game);
                                if (game)
                                    $state.go('tab.tab-match-hunt');
                                else {
                                    $ionicPopup.alert({
                                        title: $scope.navigationTitles.app.matchHuntNoMoreCluesLabel
                                    });
                                }
                            },

                            function (err) {
                                console.log("MATCH HUNT ERR");
                                console.log(err);
                            }
                        );
                    }
                    else
                    {
                        console.log("Showing Popup");
                        $scope.showPopup();
                    }
                });


        };

        /* Open the scanner when the user wants to scan a qr code */
        $scope.openScanner = function()
        {
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            console.log("Scanner");
            console.log(scanner);
            scanner.scan( function (scan) {
                console.log(scan);

                var qrCodeText = scan.text;

                if(!isNaN(qrCodeText) && !(scan.cancelled))
                {

                    /* Load Object */

                    var deviceUUID = $cordovaDevice.getUUID();
                    console.log(deviceUUID);

                    var params = {
                        scan: true,
                        phone: deviceUUID

                    };

                    //TODO: Remove once Analytics is Done
                    //var params = {};

                    MuseumObjects.getById(qrCodeText, params)
                        .then(function(object)
                        {
                            console.log(object);
                            if(object) {
                                MuseumObjects.setActiveObject(object);
                                //Change state

                                $state.go('tab.scanner-object');
                            }
                            else
                            {
                                $ionicPopup.alert({
                                    title: $scope.navigationTitles.scanner.objectNotAvailableLabel
                                })

                            }

                        },
                        function(response)
                        {
                            console.log(response);
                        }
                    );
                }

                else if(!(scan.cancelled)) {

                    $ionicPopup.alert({
                        title: $scope.navigationTitles.scanner.invalidQRCodeLabel
                    });

                }

            }, function (error) {

                $ionicPopup.alert({
                    title: $scope.navigationTitles.scanner.cameraFailureLabel
                });

                console.log(error);

            } );

        };


    })

    /* Open the math hunt game */
    .controller('MatchHuntCtrl', function($scope,$state, FacebookUser,$ionicPopup, MatchHunt)
    {


        /* Calls the Match Hunt service for a match hunt game */
        $scope.matchHunt = MatchHunt.activeGame;

        console.log($scope.matchHunt);

        $scope.skip = function()
        {
            /* Get a new match hunt */
            MatchHunt.skip().then(function(res){

                if(res)
                    $scope.loadNewMatchHuntGame();

            }, function(err){console.log(err)})

        };

        $scope.setShowPopup = function(popupOpen)
        {
            $scope.showPopup = popupOpen;
        };

        /* Open qr code scanner */
        $scope.takeAGuess = function()
        {
            /* Open Bar Code Scanner */
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");

            scanner.scan( function (scan) {

                console.log(scan);

                if(!isNaN(scan.text) && !(scan.cancelled)) {

                    if(!scan.cancelled) {

                        FacebookUser.getAPIStatus()
                            .then(function(authPackage){

                                if(authPackage)
                                {
                                    var userID = authPackage.userID;
                                    var authToken = authPackage.authToken;

                                    MatchHunt.guess(authToken, userID, scan.text)
                                        .then(function(game){

                                            if(game)
                                            {
                                                var status = game.status;
                                                console.log("PARSING GAME");
                                                console.log(game);

                                                var popUpTitle = "";
                                                var popUpsubTitle = "";

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

                                                if(status == 'won')
                                                {
                                                    popUpTitle = $scope.navigationTitles.scanner.youWonLabel,
                                                    popUpsubTitle = $scope.navigationTitles.scanner.pointsReceivedLabel + $scope.matchHunt.pointsValue

                                                }
                                                else if(status == 'lost')
                                                {
                                                    popUpTitle = $scope.navigationTitles.scanner.youLoseLabel;
                                                    popUpsubTitle =  $scope.navigationTitles.scanner.youLoseBodyLabel;
                                                }
                                                else if(status == 'incorrect')
                                                {
                                                    var alertFail = $ionicPopup.alert(
                                                        {
                                                            title: $scope.navigationTitles.scanner.failGuessLabel,
                                                            template: $scope.navigationTitles.scanner.livesLeftLabel + (3 - game.attempts) + "<br>"

                                                        }
                                                    );

                                                    alertFail.then(function (res) {
                                                        console.log("Guess Fail Alert Acknowledged");
                                                    });

                                                }

                                                if(status == 'lost' || status == 'won')
                                                {
                                                    var updatePopup = $ionicPopup.show(
                                                        {
                                                            title: popUpTitle,
                                                            subTitle: popUpsubTitle,
                                                            buttons: [
                                                                cancelButton, okButton
                                                            ]
                                                        }
                                                    );

                                                    updatePopup.then(function (res) {
                                                        console.log("Doing something");
                                                    });
                                                }


                                            }
                                            else
                                            {

                                            }

                                        });

                                }
                                else
                                {
                                    console.log("Showing Popup");
                                    $scope.showPopup();
                                }
                            });
                    }
                else if(!(scan.cancelled)) {

                    $ionicPopup.alert({
                        title: $scope.navigationTitles.scanner.invalidQRCodeLabel
                    });

                }}

            }, function (error) {
                console.log("Scanning failed: ", error);
                $ionicPopup.alert({
                    title: $scope.navigationTitles.scanner.cameraFailureLabel
                })});


        };


        $scope.loadNewMatchHuntGame = function()
        {

            FacebookUser.getAPIStatus()
                .then(function(authPackage)
                {
                    if(authPackage) {
                        MatchHunt.generateGame(authPackage.authToken)
                            .then(function (game) {
                                //console.log("Generated the Game");
                                //if(response)
                                console.log("Generated Game: ");
                                console.log(game);
                                if (game) {
                                    $scope.matchHunt = game;

                                    //$state.go('tab.tab-match-hunt');
                                }
                                else {
                                    $ionicPopup.alert({
                                        title: $scope.navigationTitles.app.matchHuntNoMoreCluesLabel
                                    });
                                    $state.go('tab.tab-qrcode-scanner');

                                }
                            },

                            function (err) {
                                console.log("MATCH HUNT ERR");
                                console.log(err);
                            }
                        );
                    }
                    else
                    {
                        /* Show a login popup */
                        console.log("Showing Popup");
                        $scope.showPopup();

                    }
                });

        }

    })

    ///* Match Hunt game */
    .factory('MatchHunt',function(Routes, $http, $q, localStorageService){


        var matchHuntIdKey = 'MUSA-MATCH-HUNT';
        var matchHuntDisplacementsKey = 'MATCH-HUNT-DISPLACEMENTS';

        var MatchHunt = {};

        MatchHunt.activeGame = {};

        MatchHunt.getId = function(){
            return localStorageService.get(matchHuntIdKey);
        };

        MatchHunt.setId = function(id){
            localStorageService.set(matchHuntIdKey, id);
        };

        MatchHunt.reset = function(){
            MatchHunt.activeGame = {};
           localStorageService.remove(matchHuntIdKey);
            localStorageService.remove(matchHuntDisplacementsKey);
        };


        MatchHunt.generateGame = function(authToken)
        {

            console.log("Checking if there is a current match hunt id stored");
            var id = this.getId();

            console.log("Current MatchHunt Id: ");
            console.log(id);

            if(!id)
            {
                console.log("No ID Found, Resetting to 0");
                id = 0;
            }

            var request = {

                url: Routes.MATCH_HUNT + id,
                method: 'GET',
                headers:  {

                    'Authorization': 'Bearer ' + authToken
                }
            };

            console.log("Retrieve Match Hunt Request");
            console.log(request);

            return $http(request).then(
                /* 200 Response */
                function(response)
                {
                    var defer = $q.defer();
                    console.log(response);
                    if(response.status == 200)
                    {
                        /* Store the game */
                        var _matchHunt = response.data;

                        if(_matchHunt.Matches.length > 0)
                        {
                            _matchHunt.attempts = _matchHunt.Matches[0].attempts;

                        }
                        else{
                            _matchHunt.attempts = 0;

                        }

                        /* Generate the random displacements */

                        console.log("Printout the retrieved game");
                        console.log(_matchHunt);
                        MatchHunt.setId(_matchHunt.id);
                        MatchHunt.activeGame = _matchHunt;
                        MatchHunt.activeGame.pointsValue -= _matchHunt.attempts * 5;

                        return MatchHunt.generateRandomDisplacements(_matchHunt)
                            .then(
                            function(displacements)
                            {
                                console.log("GENERATED DISPLACEMENTS: " );
                                console.log(displacements);
                                if(displacements)
                                {
                                    console.log("Valid game");
                                    MatchHunt.activeGame.displacements = displacements;
                                    console.log(MatchHunt);
                                }

                                return displacements;

                            },
                            function(err)
                            {
                                console.log("Couldn't calculate the displacements");
                            }
                        )
                    }

                },
                function(response)
                {

                    console.log("Failed to get Match Hunt Game");
                    console.log("Response Status: " + response.status);
                    console.log("Data: " + response.data);
                    return null;
                }


            );
        };

        MatchHunt.generateRandomDisplacements = function(matchHunt)
        {


            var defer = $q.defer();

            var img = new Image();
            img.src = matchHunt.image;
            img.onload = function()
            {
                var _displacements = localStorageService.get(matchHuntDisplacementsKey);

                console.log(_displacements);
                var displacements = null;
                if(_displacements == null) {

                    console.log("Creating new displacements");

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
                        X = -1 * Math.floor((Math.random() * (imgWidth - windowWidth )));

                        /* Y has to be a number such that Y + windowHeight < imgHeight */
                        Y = -1 * Math.floor((Math.random() * (imgHeight - windowHeight)));

                    }

                    console.log(X);
                    console.log(Y);

                    displacements = {
                        x: X,
                        y: Y
                    };
                    console.log(displacements);
                    /* Store displacements */
                    localStorageService.set(matchHuntDisplacementsKey, JSON.stringify(displacements));


                }

                else {

                    console.log("using previous displacements");

                    var _parseDisplacements = JSON.parse(_displacements);

                    console.log(_parseDisplacements);

                    displacements = _parseDisplacements;


                }


                console.log(displacements);
                defer.resolve(displacements);
            };


            return defer.promise;

        };

        MatchHunt.guess = function(authToken, userID, qrcodeData)
        {


            //var clueID = MatchHunt.getId();

            var matchHuntId = MatchHunt.getId();

                        var request = {

                            url: Routes.GUESS,
                            method: 'POST',
                            headers:
                            {
                                'Authorization': 'Bearer ' + authToken
                            },
                            data: {
                                UserId: userID,
                                qrcode: qrcodeData,
                                ClueId: matchHuntId
                            }
                        };

                    console.log(request);
            return $http(request)
                .then(
                function(response)
                {
                    console.log("Receiving success from Guess");

                    console.log(response);

                        var gameStatus = response.data;

                        console.log("Game Status");
                        console.log(response.data);

                        MatchHunt.activeGame.attempts = gameStatus.attempts;

                        /* User has won */
                        if(gameStatus.correct)
                        {
                            console.log("Game Won");
                            MatchHunt.reset();
                            gameStatus.status = "won";
                        }

                        else if(!gameStatus.correct && gameStatus.attempts == 3)
                        {
                            MatchHunt.activeGame.pointsValue = 15 - (gameStatus.attempts * 5);

                            console.log("Game Lost");
                            MatchHunt.reset();
                            gameStatus.status = "lost";
                        }

                        else{
                            MatchHunt.activeGame.pointsValue = 15 - (gameStatus.attempts * 5);

                            console.log("Incorrect Guess!");
                            gameStatus.status = "incorrect";
                        }

                        return gameStatus;





                },
                function(response)
                {
                    console.log("FAILED TO PUT IN A GUESS REQUEST");
                    console.log("Stat: " + response.status);
                    console.log("Data: " + response.data);
                }
            )


        };


        MatchHunt.skip = function(authToken)
        {
            var id = MatchHunt.getId();

            var request = {

                url: Routes.MATCH_HUNT + id,
                method: 'PUT',
                headers:  {

                    'Authorization': 'Bearer ' + authToken
                }
            };

            return $http(request)
                .then(
                        function(response)
                        {

                            if(response.status)
                            {
                                if(response.data)
                                {
                                    MatchHunt.reset();
                                    return response;
                                }
                            }
                        },

                        function(response)
                        {
                            return $q.reject('Failed to SKIP game due to status: ' + response.status + '\nError: ' + response.data);
                        }
                    )


        }

        return MatchHunt;


    });