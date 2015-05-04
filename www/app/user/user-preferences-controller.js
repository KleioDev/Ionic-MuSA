/**
 * Created by joframart on 4/3/15.
 */

angular.module('user-preferences-controllers', ['ngCordova'])

.controller('UserPreferencesCtrl', function($scope, AppNavigationTitles, Notifications, Facebook, Museum, UserPreferences,$window, $ionicModal, $http, Routes)
{
    $scope.navigationTitles = AppNavigationTitles.get();
    $scope.preferences = UserPreferences.get();


    //$scope.user = Facebook.isLoggedIn();
    $scope.user = {};

    $scope.points = 0;
    $scope.text = {};
    $scope.font = {size: 0};
    $scope.loadingUser = false;
    $scope.loading = {
        user : false,
        points: false
    };

    $scope.notifications =
    {
        checked: true
    };


    //$scope.user.loginStatus = false;


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


    $scope.$on('preferences:updated', function(event, data){
        $scope.navigationTitles = AppNavigationTitles.get();
    });

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
        //$scope.text = UserPreferences.getAbout();
        //console.log($scope.text);
        //$scope.openModal('text-view.html');
    };

    $scope.$watch('font.size', function()
    {
        UserPreferences.setFontSize($scope.font.size);

    });

    $scope.toggleNotifications = function()
    {
        var checked = $scope.notifications.checked;

        if(checked)
        {

        }
        else
        {

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
        //$scope.text = UserPreferences.getTerms();
        //$scope.openModal('text-view.html');
    };


    $scope.loadLeaderboard = function()
    {
        //console.log("GETTING LEADERBOARD");
        Facebook.isLoggedIn()
            .then(function(user)
            {
                //console.log(user);
                if(user.connected)
                {
                    $scope.user.loginStatus = user.connected;


                    var authToken = $window.localStorage.getItem('userAuthenticationToken');

                    //console.log("SENDING REQ");

                    var request = {
                        url: Routes.LEADERBOARD,
                        method: 'GET',
                        headers:
                        {
                            'Authorization': 'Bearer ' + authToken
                        },
                        data: {
                            userID:  $window.localStorage.getItem('userIDAPI')

                }
                    };


                    return $http(request).then(function(response)
                    {
                        if(response.status == 200)
                        {
                            /* Set leaderboard */
                            $scope.leaderboard = response.data.leaderboard;

                            /* Open the list */
                            $scope.openModal('leaderboard-view.html');


                        }
                    })
                }

            });
        //$http.then('')
    };

    $scope.closePage = function()
    {
        $scope.modal.hide();
    };

    $scope.login = function()
    {
        //console.log("LOGIN");
        Facebook.login()
            .then(function(response)
            {
                console.log(response);
                if(response)
                {
                    console.log(response);
                    /* Now we should generate the token Info */
                    Facebook.generateToken(response)
                        .then(function(valid)
                        {

                            if(valid)
                            {
                                console.log(valid);
                                Facebook.getUserInfo()
                                    .then(function(user)
                                    {
                                        console.log(user);
                                        $scope.user = user;
                                    });

                                Facebook.getPoints()
                                    .then(function (points) {
                                        console.log(points);

                                        $scope.points = points;


                                        $scope.loading.points = true;

                                    }, function (err) {
                                    })
                            }
                            else
                            {
                                $scope.user.loginStatus = false;
                                Facebook.logout();
                            }


                        });

                }
            });

        //$scope.user = Facebook.getUser();
    };

    $scope.logout = function()
    {
        //console.log('log out');
       $scope.user =  Facebook.logout();
    };



    $scope.onLoad = function()
    {
        /* Check if Logged in */


            //TODO: Check if the state is changed to User */

            Facebook.isLoggedIn()
                .then(function(user)
                {
                    //User is logged in
                    if(user.connected)
                    {
                        $scope.user.loginStatus = user.connected;

                        /* Now we should generate the token Info */
                        Facebook.generateToken(user)
                            .then(function(valid)
                            {

                                if(valid)
                                {
                                    Facebook.getUserInfo()
                                        .then(function(user)
                                        {
                                            $scope.user = user;


                                            Facebook.getPoints()
                                                .then(function (points) {
                                                    console.log(points);

                                                    $scope.user.points = points;


                                                    $scope.loading.points = true;

                                                }, function (err) {
                                                })
                                        });
                                }
                                else
                                {
                                    $scope.user.loginStatus = false;
                                    Facebook.logout();
                                }


                            });
                    }
                    //User is not connected
                    else
                    {

                        $scope.user.loginStatus = user.connected;

                    }
                }, console.log)



    };

    $scope.onLoad();

})

    .controller('FeedbackFormCtrl', function($scope, $http, AppNavigationTitles,$ionicPopup, Routes, $ionicLoading)
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

                        })

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
                response.connected = true;
            }

            /* Let them know he's not logged in */
            else{
                response.connected = false;
            }

            return response;

        };

        function failureLoginStatus(error)
        {
            $q.reject('Facebook/Login Status Could not Be Reached');
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
                user.login();
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

            //console.log(res);
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
    }

    return user;


});
