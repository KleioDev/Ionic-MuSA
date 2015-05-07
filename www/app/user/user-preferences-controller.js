/**
 * Created by joframart on 4/3/15.
 */

angular.module('user-preferences-controllers', ['ngCordova'])

.controller('UserPreferencesCtrl', function($scope, Notifications, Facebook, Museum, UserPreferences,$window, $ionicModal, $http, Routes)
{
    $scope.preferences = UserPreferences.get();

    $scope.user = {};
    $scope.loggedIn = false;

    $scope.points = 0;
    $scope.text = {};
    $scope.font = {size: 0};
    $scope.loadingUser = false;
    $scope.loading = {
        user : false,
        points: false
    };

    $scope.notifications  = {

        checked: UserPreferences.getNotificationStatus()
    };

    $scope.openModal = function(template) {

        $ionicModal.fromTemplateUrl(template, {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();

        });
    };


    $scope.showLanguages = function()
    {
        $scope.openModal('language-modal.html')

    };



    $scope.changeLanguage = function(language)
    {
        UserPreferences.setLanguage(language);
        //$scope.navigationTitles = AppNavigationTitles.get();
        $scope.modal.hide();

    };

    $scope.loadAboutPage = function()
    {
        Museum.getGeneralMuseumInfo()
            .then(function(response)
            {
                if(response) {
                    $scope.text.title = $scope.navigationTitles.user.aboutLabel;
                    $scope.text.content = response.about;
                    $scope.openModal('user-text-view.html');
                }

            });
    };

    $scope.$watch('font.size', function()
    {
        UserPreferences.setFontSize($scope.font.size);

    });

    $scope.toggleNotifications = function()
    {
        console.log("Toggling Notifications");
        console.log($scope.notifications.checked);

        if($scope.notifications.checked)
        {
            UserPreferences.setNotificationStatus(true);
        }
        else
        {
            UserPreferences.setNotificationStatus(false);

        }
    };

    $scope.loadTermsPage = function(){


        Museum.getGeneralMuseumInfo()
            .then(function(response)
            {
                console.log(response);
                if(response) {
                    $scope.text.title = $scope.navigationTitles.user.termsOfServiceLabel;
                    $scope.text.content = response.terms;
                    $scope.openModal('user-text-view.html');
                }

            });

    };


    $scope.loadLeaderboard = function()
    {

        FacebookUser.loadLeaderboard()
            .then(function(leaderboard)
            {
                if(leaderboard)
                {
                    /* Set leaderboard */
                    $scope.leaderboard = response.data.leaderboard;

                    /* Open the list */
                    $scope.openModal('leaderboard-view.html');
                }
                else
                {
                    //TODO: Display error
                    /* Display error message */
                }
            });
    };

    $scope.closePage = function()
    {
        $scope.modal.hide();
    };

    $scope.login = function()
    {
        FacebookUser.login()
            .then(function(user)
            {
                if(user) {
                    $scope.user = user;
                    $scope.loggedIn = true;
                }
                else
                {
                    $scope.loggedIn = false;
                }

            })

    };

    $scope.logout = function()
    {
       FacebookUser.logout()
           .then(function(loggedOut){

               if(loggedOut)
               {
                    $scope.loggedIn = false;
                    //Logged out, empty user
                   $scope.user = {};
               }

               else{

                   console.log("Could Not Logou successfull!");
               }

           });
    };



    $scope.onLoad = function()
    {
        /* Call the service */

        FacebookUser.refreshUser()
            .then(function(user)
            {
                if(user)
                {
                    $scope.user = user;
                    $scope.loggedIn = true;
                }
                else
                {
                    $scope.loggedIn = false;
                    /* User is not available */
                }

            });
    };

    $scope.onLoad();

})

    .controller('FeedbackFormCtrl', function($scope, $http, $state, AppNavigationTitles,$ionicPopup, Routes)
    {
        //console.log("Feedback");
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.feedback = {};
        $scope.feedback.title = '';
        $scope.feedback.type = 'general';
        $scope.feedback.message = '';

        $scope.sendFeedback = function()
        {
            //console.log($scope.feedback.messageTitle);


            /* Ask user to please fill out the info */
            if( $scope.feedback.messageTitle == '' || $scope.feedback.messageContent == '')
            {
                var alertPopup = $ionicPopup.alert({
                    title: $scope.navigationTitles.user.feedbackForm.popUpTitleMissingLabel
                    //template: $scope.navigationTitles.user.feedbackForm.popUpMessageSuccessLabel
                });
                alertPopup.then(function(res) {
                    console.log('Done');
                });
            }

            /* Try to send the feedback */
            else {

                //console.log("Feedback Message: " );
                //console.log($scope.feedback);
                //
                var request = {

                    url: Routes.FEEDBACK_ROUTE,
                    method: 'POST',
                    data: $scope.feedback


                };
                //
                $http(request).then(feedbackSuccess, feedbackFailure);

                function feedbackSuccess(response)
                {
                    console.log("SUCCESS");
                    /* Feedback accepted */
                    if(response.status == 201)
                    {
                        var feedbackAlert = $ionicPopup.alert({
                            title: $scope.navigationTitles.user.feedbackForm.popUpTitleSuccessLabel,
                            template: $scope.navigationTitles.user.feedbackForm.popUpMessageSuccessLabel
                        });

                        feedbackAlert.then(function(res)
                        {
                            $state.go('tab.tab-user');

                        });

                    }

                }

                function feedbackFailure(err)
                {
                    //console.log("FAILURE");

                    $ionicPopup.alert({
                        title: $scope.navigationTitles.user.feedbackForm.popUpTitleFailureLabel,
                        template: $scope.navigationTitles.user.feedbackForm.popUpMessageFailureLabel
                    });
                }



            }
        }



    })

    .factory('FacebookUser', function($cordovaFacebook,localStorageService, $window, Routes, $http)
{
    var authStorageKey = 'MUSA-AUTH-TOKEN';

    var apiUserIDKey = 'MUSA-USER-ID';

    var timeOfStorage = 'MUSA-API-TIMEOUT'; //TODO: Ask César about Token Timeout (Probably not expired)

    var generateToken = function(accessToken, facebookUserID)
    {
        /* Check if token is stored */

        if(!accessToken)
        { console.log("Access Token Is Not Defined!"); console.log(accessToken);}

        if(!facebookUserID)
        { console.log("FacebookUserID Is Not Defined!"); console.log(facebookUserID);}

        var defer = $q.defer();

        var apiAuthToken = localStorageService.get(authStorageKey);

        var apiUserID = localStorageService.get(apiUserIDKey);

        /* If Both are them are defined  then no need to retrieve from server */
        if(apiAuthToken && apiUserID)
        {
            var authPackage = {
                authToken: apiAuthToken,
                userID: apiUserID
            };
            defer.resolve(authPackage);
            //Return the promise
            return defer.promise;
        }

        //Need to retrieve the token from the server via HTTP Request
        else
        {
            //Setup request
            console.log("Declaring Token Generation Request: ");
            var request = {
                method: 'POST',
                url: Routes.USER_AUTHENTICATION,
                data: {

                    accessToken: accessToken,
                    userID: facebookUserID,
                    type: 'user'
                }
            };
            console.log(request);

            return $http(request)
                .success(function(response)
                {
                    console.log("Generation Token HTTP Success");
                    console.log(response);

                    if(!localStorageService.set(authStorageKey, response.data.token))
                        console.log("Failed to store authtoken - local Storage");

                    localStorageService.set(apiUserID, response.data.userId);

                    var authPackage = {
                        authToken: response.data.token,
                        userID: response.data.userId
                    };

                    return authPackage;

                })
                .error(function(error)
                {
                    console.log("Error generating Token");
                    console.log(error);
                    return null;

                });

        }


    };

    var login = function()
    {
        return $cordovaFacebook.login(["public_profile"])
            .then(
            function(response)
            {
                console.log("FacebookUser - Success Login");
                console.log(response);

                if(response)
                {
                    console.log("Verifying Token Authorization from MuSA API");

                    //Need to generate a token from our MuSA API
                    return generateToken(success.authResponse.accessToken, success.authResponse.userID)
                        .then(function(tokenGenerationSuccess)
                        {

                            if(tokenGenerationSuccess)
                            {
                                /* User is connected, go get the user info */
                                return retrieveInfo();
                            }
                            else
                            {
                                console.log("tokenGeneration Failure");
                                return null;
                            }
                        }

                    );
                }

            },

            function(error)
            {
                console.log("FacebookUser - Failed to Login");
                console.log(error);
                return null;
            }
        )

    };

    var logout = function()
    {

        return  $cordovaFacebook.logout()
            .then(function(success) {
                console.log("FacebookUser - Logout Successful");
                console.log(success);
                return success;
            }, function (error) {
                return null;
            });
    };

    var retrieveInfo = function()
    {
        return $cordovaFacebook.api("me", ["public_profile"])
            .then(function(success) {

                var user = {};
                user.name = success.name;
                user.email = success.email;
                user.id = success.id;
                user.verified = success.verified;

                console.log("FacebookUser :- $cordovaFacebook.api (User Generated)");
                console.log(user);


                // success

                return user;
            }, function (error) {
                // error
                return null;
            });
    };

    var refreshUser = function()
    {

        getLoginStatus()
            .then(function(success)
            {
                console.log("refresh user: - ");
                console.log(success);

                if(success)
                {
                    //Need to generate a token from our MuSA API
                    return generateToken(success.authResponse.accessToken, success.authResponse.userID)
                        .then(function(tokenGenerationSuccess)
                        {

                            if(tokenGenerationSuccess)
                            {
                                /* User is connected, go get the user info */
                                return retrieveInfo();
                            }
                            else
                            {
                                console.log("tokenGeneration Failure");
                            }
                        }

                    );
                }
                else
                {
                    return null;
                }
            });

    };

    var getLoginStatus = function()
    {
        return $cordovaFacebook.getLoginStatus()
            .then(

            function(success)
            {
                console.log("Service - FacebookUser: $cordovaFacebook.getLoginStatus");
                console.log(success);
                if(success.status == 'connected')
                {
                    return success;
                }
                else
                {
                    return null;
                }

            },
            function(err)
            {
                console.log("FAILED:- Service - FacebookUser: $cordovaFacebook.getLoginStatus");
                console.log(err);
                return null;
            }
        )

    };

    var loadLeaderboard = function()
    {

        return getLoginStatus()
            .then(function(success)
            {
                if(success)
                {
                    return generateToken(success.authResponse.authToken, success.authResponse.userID)
                        .then(function(authPackage)
                        {
                            console.log("Load Leaderboard Auth Package");
                            console.log(authPackage);

                            if(authPackage)
                            {

                                console.log("OPENING AUTH PACKAGE ~ Leaderboard");
                                var authToken = authPackage.authToken;
                                var userID = authPackage.userID;
                                var request = {
                                    url: Routes.LEADERBOARD,
                                    method: 'GET',
                                    headers:
                                    {
                                        'Authorization': 'Bearer ' + authToken
                                    },
                                    data: {
                                        userID: userID

                                    }
                                };


                                return $http(request)
                                    .success(function(response)
                                    {
                                        console.log("LEADERBOARD REQUEST DATA RESPONSE SUCCESS:");
                                        console.log(response);
                                        return response.data.leaderboard;
                                    })
                                    .error(function(err)
                                    {
                                        console.log("ERR GETTING LEADERBOARDS");
                                        console.log(err);
                                        return null;
                                    });


                            }
                            else
                                return null;
                        })
                }
                else
                {
                    return null;
                }

            });



    };




    return {

        refreshUser: refreshUser,
        login: login,
        logout: logout,
        retrieveInfo: retrieveInfo,
        loadLeaderboard: loadLeaderboard
    }


})



/* Service handles Facebook calls */
.factory('Facebook', function($cordovaFacebook, $timeout, $q, AppNavigationTitles, $window, Routes, $http, $ionicPopup, $rootScope)
{

    /* User info */
    var user = {};

    user.loginStatus = false;
    user.userInfo = {};


    user.login = function() {

        /* If login was successful get the token from our server */
        return $cordovaFacebook.login(["public_profile", "email"]).then(successLogin, failureLogin);

        function successLogin(response)
        {
            console.log(response);
            return response;
        };

        /* Fails to Login */
        function failureLogin(error) {
           // console.log("FACEBOOK ERR:");
            //console.log(error);
            /* DOn't proceed with the login, show an error message */
            $rootScope.$broadcast('http:error', {});
            $q.reject('Failed to get login');
        };
    };

    user.generateToken = function(response)
    {
        /* User Response */

        console.log("Generating Token");
        console.log(response);

        var defer = $q.defer();

        if(user.isAuthAvailable())
        {

            defer.resolve(user.getUserAuth());
            return defer.promise;
        }
        else {


            console.log("Token Post Data: ");
            var postData =
            {
                accessToken: response.authResponse.accessToken,
                userID: response.authResponse.userID,
                type: 'user'
            };
            console.log(postData);


            console.log("Token Post Request: ");
            var userRequest = {

                url: Routes.USER_AUTHENTICATION,
                method: 'POST',
                data: postData
            };

            console.log(userRequest);

            return $http(userRequest).then(storeToken, failureAccess);
        }



        function storeToken(response)
        {
            if (response.status == 200)
            {
                console.log("Storing Token=");
                console.log(response);

                $window.localStorage.setItem('userAuthenticationToken', response.data.token);

                $window.localStorage.setItem('userIDAPI', response.data.userId);

                /* Make an API Call to Facebook */
                return response.data;

            }
            return null;
        }

        function failureAccess(response)
        {
            $q.reject('Failed to Get/Store Token');
        }



    };

    user.logout = function()
    {

            $cordovaFacebook.logout()
                .then(function(response) {

                    user.clearUser();
                    var _user = {loginStatus: false};

                    return _user;
                }, function (error) {
                    // error
                });
    };

    user.isLoggedIn = function()
    {
       return $cordovaFacebook.getLoginStatus().then(successLoginStatus, failureLoginStatus);


        function successLoginStatus(response)
        {

            if(response.status == 'connected')
            {
                return true;
            }

            /* Let them know he's not logged in */
            else{
                return false;;
            }

        };

        function failureLoginStatus(error)
        {
            console.log("FAILED TO GET LOGIN STATUS - $cordovaFacebook (Facebook Service)");
            console.log(error);
            return false;
        };


    };

    user.getUserInfo = function()
    {

        return $cordovaFacebook.api("me", ["public_profile", "email"])
            .then(function(success) {

                var user = {};


                /* Parse out the correct Info */
                user.name = success.name;
                user.email = success.email;
                user.userID = success.id;
                user.loginStatus = success.verified;


                return user;


            }, function (error) {


            });

    };




    user.showLoginPopup = function()
    {

        var labels = AppNavigationTitles.get();
        var loginButton = {
            text: labels.app.facebookLoginLabel,
            type: 'button-royal',
            onTap: function()
            {
                user.login()
                    .then(function(response)
                    {
                        console.log(response);
                        if(response)
                        {
                            console.log(response);
                            /* Now we should generate the token Info */
                            user.generateToken(response)
                                .then(function(valid) {

                                    if (valid) {
                                    }
                                })}});
            }

        };

        var cancelButton = {
            text: labels.app.cancelFacebookLoginPopup,
            type: 'button-light'
        };

        var loginPopup = $ionicPopup.show(
        {
            title: labels.app.facebookRequiredLabel,
            subTitle: labels.app.playMatchHuntFacebookAccountRequiredLabel,
            buttons:[

                cancelButton,
                loginButton
            ]
        });

        loginPopup.then(function(res){

            console.log(res);
        });

        $timeout(function()
        {
            loginPopup.close();
        }, 10000)

    };


    user.getPoints = function()
    {


        var authToken = $window.localStorage.getItem('userAuthenticationToken');
        var _userID = $window.localStorage.getItem('userIDAPI');

        var request = {
            url: Routes.USER + _userID,
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + authToken
            }
        };

        //console.log(request);

        return $http(request)
            .then(function(response)
            {
                if(response.status == 200)
                {
                    console.log("Got the points");
                    console.log(response.data.points);
                    return response.data.points;
                }
            }, function(err){

                $q.reject('failed to get the points');
            })
    };


    user.postToFacebook = function(title, img,  description)
    {

        var options = {
            method: "feed",
            picture: img,
            link: 'https://www.facebook.com/pages/Museo-de-Arte-RUM-MUSA/385132481629639?fref=ts',
            place: 'https://www.facebook.com/pages/Museo-de-Arte-RUM-MUSA/385132481629639?fref=ts',
            caption: title,
            description: description
        };

        $cordovaFacebook.showDialog(options)
            .then(function(success) {
                // success
            }, function (error) {
                // error
            });

    };

    user.clearUser = function()
    {
        $window.localStorage.removeItem('userAuthenticationToken');
        $window.localStorage.removeItem('userIDAPI');

    };



    user.isTokenAvailable = function()
    {
        var authToken = $window.localStorage.getItem('userAuthenticationToken');

        if(authToken)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    user.isAuthAvailable = function()
    {

        return user.isTokenAvailable() && user.userIDAvailable();

    };


    user.userIDAvailable = function()
    {
        var userID = user.getUserID();


        if(userID)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    user.getAPIToken = function()
    {
        var APIToken = $window.localStorage.getItem('userAuthenticationToken');
        return APIToken;
    };

    user.getUserID = function()
    {

        return $window.localStorage.getItem('userIDAPI');
    };


    user.getUserAuth = function()
    {
        var userAuth = {

            token : user.getAPIToken(),
            userId: user.getUserID()
        };

        return userAuth;
    };

    return user;


});
