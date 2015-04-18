/**
 * Created by joframart on 4/3/15.
 */

angular.module('user-preferences-controllers', ['ngCordova'])

.controller('UserPreferencesCtrl', function($scope, AppNavigationTitles, Facebook, Museum, UserPreferences,$window, $ionicModal, $http, Routes)
{
    $scope.navigationTitles = AppNavigationTitles.get();
    $scope.preferences = UserPreferences.get();


    //$scope.user = Facebook.isLoggedIn();
    console.log("OPENING");
    $scope.user = {};
    $scope.text = {};
    $scope.font = {size: 0};
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
                console.log("MUSEUM INFO");
                console.log(response);
                $scope.text.title = $scope.navigationTitles.user.aboutLabel;
                $scope.text.content = response.about;
                console.log($scope.text);
                $scope.openModal('text-view.html');

            });
        //$scope.text = UserPreferences.getAbout();
        //console.log($scope.text);
        //$scope.openModal('text-view.html');
    };

    $scope.$watch('font.size', function()
    {
        console.log("FONT SIZE: " + $scope.font.size);
        UserPreferences.setFontSize($scope.font.size);

    });


    $scope.loadTermsPage = function(){


        Museum.getGeneralMuseumInfo()
            .then(function(response)
            {
                console.log("MUSEUM INFO");
                console.log(response);
                $scope.text.title = $scope.navigationTitles.user.termsOfServiceLabel;
                $scope.text.content = response.terms;
                $scope.openModal('text-view.html');

            });
        //$scope.text = UserPreferences.getTerms();
        //$scope.openModal('text-view.html');
    };


    $scope.loadLeaderboard = function()
    {
        console.log("GETTING LEADERBOARD");
        Facebook.isLoggedIn()
            .then(function(user)
            {
                console.log(user);
                if(user.loginStatus)
                {

                    var authToken = $window.localStorage.getItem('userAuthenticationToken');

                    console.log("SENDING REQ");

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
        console.log("LOGIN");
        Facebook.login()
            .then(function(user)
            {

                $scope.user = user;
            });

        //$scope.user = Facebook.getUser();
    };

    $scope.logout = function()
    {
        console.log('log out');
       $scope.user =  Facebook.logout();
    };



    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams)
    {
        /* Check if Logged in */

        console.log("CHECKING");
        console.log(toState);

        //TODO: Check if the state is changed to User */

        Facebook.isLoggedIn()
            .then(function(response)
            {
                console.log("LOGGED IN?");
                console.log(response);
                $scope.user = response;


            }, function(err){ console.log(err);});



    })

})

    .controller('FeedbackFormCtrl', function($scope, $http, AppNavigationTitles,$ionicPopup, $ionicLoading)
    {
        console.log("Feedback");
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.feedback = {};
        $scope.feedback.title = '';
        $scope.feedback.type = 'general';
        $scope.feedback.message = '';

        $scope.sendFeedback = function()
        {
            console.log($scope.feedback.messageTitle);


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

                console.log("Feedback Message: " );
                console.log($scope.feedback);
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
                    console.log("FAILURE");

                    $ionicPopup.alert({
                        title: $scope.navigationTitles.user.feedbackForm.popUpTitleFailureLabel,
                        template: $scope.navigationTitles.user.feedbackForm.popUpMessageFailureLabel
                    });
                }



            }
        }



    })


/* Service handles Facebook calls */
.factory('Facebook', function($cordovaFacebook, $q, $window, Routes, $http, $rootScope, $ionicLoading)
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
            $rootScope.$broadcast('http:error', {});
        };

        /* Store the server token */
        function storeToken(response) {
            /* Server responded successfully */
            /* now we get the user info */
            if (response.status == 200) {
                $window.localStorage.setItem('userAuthenticationToken', response.data);

                console.log(response);
                /* Make an API Call to Facebook */


                return user.getUserInfo();

            }


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
            console.log("FACEBOOK ERR:");
            console.log(error);
            /* DOn't proceed with the login, show an error message */
            $rootScope.$broadcast('http:error', {});
        };



    };

    user.logout = function()
    {

            $cordovaFacebook.logout()
                .then(function(success) {
                    var user = {loginStatus: false};
                    return user;
                }, function (error) {
                    // error
                });


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
            console.log("LOGIN STATUS: ");
            console.log(response);
            /* If he is logged in, get the user's info from Facebook's API */
            if(response.status == 'connected')
            {
                /* Before getting the info from FB we need to check if the user has a token from our server */
                var serverToken = $window.localStorage.getItem('userAuthenticationToken');

                console.log("TOKEN");
                console.log(serverToken);
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
                console.log("NOT LOGGED IN");
                var _user = {};
                _user.loginStatus = false;
                return _user;

            }
        }

        function failureLoginStatus(error)
        {
            console.log("FAILED TO GET LOGIN STATUS");
            console.log(error);
            loading.hide();
            return error;

        }


        function getUserInfoFailure(response)
        {
            console.log("FAILED TO GET USER INFO");

            /* Log out to avoid inconsistencies*/
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
                console.log(success);

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




    return user;


});
