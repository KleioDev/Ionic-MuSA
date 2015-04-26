/**
 * Created by joframart on 4/3/15.
 */

angular.module('user-preferences-controllers', ['ngCordova'])

.controller('UserPreferencesCtrl', function($scope, AppNavigationTitles, Facebook, Museum, UserPreferences,$window, $ionicModal, $http, Routes)
{
    $scope.navigationTitles = AppNavigationTitles.get();
    $scope.preferences = UserPreferences.get();


    //$scope.user = Facebook.isLoggedIn();
    $scope.user = {};
    $scope.text = {};
    $scope.font = {size: 0};
    $scope.loadingUser = false;
    $scope.loading = {
        user : false,
        points: false
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
                $scope.text.title = $scope.navigationTitles.user.aboutLabel;
                $scope.text.content = response.about;
                $scope.openModal('text-view.html');

            });
        //$scope.text = UserPreferences.getAbout();
        //console.log($scope.text);
        //$scope.openModal('text-view.html');
    };

    $scope.$watch('font.size', function()
    {
        UserPreferences.setFontSize($scope.font.size);

    });


    $scope.loadTermsPage = function(){


        Museum.getGeneralMuseumInfo()
            .then(function(response)
            {

                $scope.text.title = $scope.navigationTitles.user.termsOfServiceLabel;
                $scope.text.content = response.terms;
                $scope.openModal('text-view.html');

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
                if(user.loginStatus)
                {

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
                            userID: user.userID
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
            .then(function(user)
            {

                $scope.user = user;
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
                .then(function (response) {
                    //console.log("LOGGED IN?");
                    //console.log(response);
                    $scope.user = response;

                    /* Show loading for Points */

                    Facebook.getPoints()
                        .then(function (response) {
                            //console.log(response);
                            if (response.status == 200) {
                                $scope.user.points = response.data.points;
                            }
                            else {
                                $scope.user.points = "N/A";
                            }

                            $scope.loading.points = true;

                        }, function (err) {
                        })


                }, function (err) {
                    console.log(err);
                });



    };

    $scope.onLoad();

})

    .controller('FeedbackFormCtrl', function($scope, $http, AppNavigationTitles,$ionicPopup, $ionicLoading)
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
                    if(response.status == 200)
                    {
                        $ionicPopup.alert({
                            title: $scope.navigationTitles.user.feedbackForm.popUpTitleSuccessLabel,
                            template: $scope.navigationTitles.user.feedbackForm.popUpMessageSuccessLabel
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


/* Service handles Facebook calls */
.factory('Facebook', function($cordovaFacebook, $timeout, $q, AppNavigationTitles, $window, Routes, $http, $ionicPopup, $rootScope, $ionicLoading)
{

    /* User info */
    var user = {


    };

    var loading = $ionicLoading.show({
        template: '<ion-spinner icon="ios"></ion-spinner>                '
    });
    loading.hide();

    user.loginStatus = false;
    user.userInfo = {};

    user.getToken = function(response)
    {

        $window.localStorage.setItem('userID', response.authResponse.userID);

        var postData =
        {
            accessToken: response.authResponse.accessToken,
            userID: response.authResponse.userID
        };

        var userRequest = {

            url: Routes.USER_AUTHENTICATION,
            method: 'POST',
            data: postData
        };

        //console.log("post");
        //console.log(postData);
        return $http(userRequest).then(storeToken, failureAccess);

        /* Fails to Login */
        function failureAccess(error) {
            console.log("FAILED TO GET DA TOKEN FROM MUSA SERVER");
            /* Don't proceed with the login, show an error message */
            loading.hide();
            $rootScope.$broadcast('http:error', {});
        };

        /* Store the server token */
        function storeToken(response) {
            /* Server responded successfully */
            /* now we get the user info */
            if (response.status == 200) {
                console.log("Storing Token=");
                //console.log(response);
                $window.localStorage.setItem('userAuthenticationToken', response.data.token);

                $window.localStorage.setItem('userIDAPI', response.data.userId);

                console.log(response);

                /* Make an API Call to Facebook */
                return user.getUserInfo();

            }

            loading.hide();


        }

    };


    user.login = function() {

        loading.show();

        var me = this;

        /* If login was successful get the token from our server */
        return $cordovaFacebook.login(["public_profile", "email"]).then(user.getToken, failureLogin);


        /* Fails to Login */
        function failureLogin(error) {
            loading.hide();
           // console.log("FACEBOOK ERR:");
            //console.log(error);
            /* DOn't proceed with the login, show an error message */
            $rootScope.$broadcast('http:error', {});
        };



    };

    user.logout = function()
    {

            $cordovaFacebook.logout()
                .then(function(success) {
                    loading.hide();

                    var user = {loginStatus: false};
                    return user;
                }, function (error) {
                    // error
                });


    };

    user.isLoggedInOnly = function()
    {
            return $cordovaFacebook.getLoginStatus()
                .then(successResponse, failureResponse);


        function successResponse(response)
        {
            console.log("SUCCESS GOT LOGIN STATUS");
            console.log(response);
            var _user = {};
            if(response.status == 'connected')
            {
                _user.loggedIn = true;
                _user.userID  = response.authResponse.userID;

            }

            else
            {
                _user.loggedIn = false;
                _user.userID = null;
            }

            return _user;

        }
        function failureResponse(err)
        {
            console.log("FAILED TO GET LOGIN STATUS");
            var _user = {
                loggedIn : false
            }

            return _user;
        }
    };


    user.isLoggedIn = function()
    {
        var loading = $ionicLoading.show(  {content: 'Showing Loading Indicator!',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 500});


       return  $cordovaFacebook.getLoginStatus().then(successLoginStatus, failureLoginStatus);


        function successLoginStatus(response)
        {
            //console.log("LOGIN STATUS: ");
            //console.log(response);
            /* If he is logged in, get the user's info from Facebook's API */
            if(response.status == 'connected')
            {
                console.log(response);
                /* Before getting the info from FB we need to check if the user has a token from our server */
                var serverToken = $window.localStorage.getItem('userAuthenticationToken');

                /* Store userID */
                $window.localStorage.setItem('userID', response.authResponse.userID);
                //console.log("TOKEN");
                //console.log(serverToken);
                /* If token is not defined */
                if(serverToken == null)
                {
                    console.log("SERVER TOKEN NOT DEFINED");
                    return user.getToken(response);
                }

                /* Token probably defined so just get the user info*/
                else
                {
                    return user.getUserInfo().then(user.getUserInfo, getUserInfoFailure);
                }
            }

            /* Let them know he's not logged in */
            else{
                $window.localStorage.setItem('userID', null);

                console.log("NOT LOGGED IN");
                loading.hide();

                var _user = {};
                _user.loginStatus = false;
                return _user;

            }
        }

        function failureLoginStatus(error)
        {
            console.log("FAILED TO GET LOGIN STATUS");
            //console.log(error);
            loading.hide();
            return error;

        }


        function getUserInfoFailure(response)
        {
            console.log("FAILED TO GET USER INFO");

            /* Log out to avoid inconsistencies*/
            $window.localStorage.setItem('userID', null);

            user.logout();

            //TODO: SEND OUT ERROR
        }

    };


    user.getUserInfo = function()
    {

        return $cordovaFacebook.api("me", ["public_profile", "email"])
            .then(function(success) {

                var user = {};
                console.log("GOT INFO");
                //console.log(success);

                /* Parse out the correct Info */
                user.name = success.name;
                user.email = success.email;
                user.userID = success.id;
                user.loginStatus = success.verified;

                user.points  = 20;
                //user.loginStatus = true; /* Prove that he is connected */
                loading.hide();

                return user;


            }, function (error) {
                loading.hide();

                console.log("GETTING USER INFO FAILED");

                // error
            });

    };


    user.showLoginPopup = function()
    {
        loading.hide();

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
        //console.log("SENDING REQ");
        //console.log(userID);
        //console.log(authToken);

        var request = {
            url: Routes.USER + _userID,
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer ' + authToken
            }
        };

        console.log(request);

        return $http(request);
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


    return user;


});
