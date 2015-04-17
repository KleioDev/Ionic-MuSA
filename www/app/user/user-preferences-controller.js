/**
 * Created by joframart on 4/3/15.
 */

angular.module('user-preferences-controllers', ['ngCordova'])

.controller('UserPreferencesCtrl', function($scope, AppNavigationTitles, Facebook, UserPreferences, $ionicModal)
{
    $scope.navigationTitles = AppNavigationTitles.get();
    $scope.preferences = UserPreferences.get();


    //$scope.user = Facebook.isLoggedIn();
    console.log("OPENING");
    $scope.user = {};
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
        $scope.text = UserPreferences.getAbout();
        //console.log($scope.text);
        $scope.openModal('text-view.html');
    };

    $scope.loadTermsPage = function(){

        $scope.text = UserPreferences.getTerms();
        $scope.openModal('text-view.html');
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
        //console.log(toState);
        Facebook.isLoggedIn()
            .then(function(response)
            {
                console.log("LOGGED IN?");
                console.log(response);
                $scope.user = response;



            }, function(err){ console.log(err);});



    })

})

    .controller('FeedbackFormCtrl', function($scope, AppNavigationTitles,$ionicPopup, $ionicLoading)
    {
        console.log("Feedback");
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.feedback = {};
        $scope.feedback.messageTitle = '';
        $scope.feedback.problem = 'general';
        $scope.feedback.messageContent = '';

        $scope.sendFeedback = function()
        {
            console.log($scope.feedback.messageTitle);

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

            else {

                var alertPopup = $ionicPopup.alert({
                    title: $scope.navigationTitles.user.feedbackForm.popUpTitleSuccessLabel,
                    template: $scope.navigationTitles.user.feedbackForm.popUpMessageSuccessLabel
                });
                alertPopup.then(function (res) {
                    console.log('Done');
                });
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
                /* If token is not defined */
                if(serverToken == null)
                {
                    console.log("SERVER TOKEN NOT DEFINED");
                    return user.getToken(response);
                }

                /* Token probably defined so: */
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
