
angular.module('tutorial', [])


.controller('TutorialCtrl', function($scope,$ionicModal, $timeout,Notifications, AppNavigationTitles,$state,$window, UserPreferences) {

        var flag = $window.localStorage.getItem('MuSAFirstTimeOpen');

        console.log("Tutorial has not been opened");

        UserPreferences.setup();

        $scope.preferences = UserPreferences.get();

        $scope.checkTutorial = function()
        {

            if(!flag)
            {
                console.log("Tutorial has not been opened");
                $scope.openModal('language-modal.html');

            }
            else
            {

                console.log("Changing State");
                $state.go('tab.museum-segmented-control');
            }
        };


        $scope.closePage = function()
        {
            $scope.modal.hide();
        };

        $scope.modal = {};

        $scope.notifications = {
            radio: true
        };


        $scope.languagePreference = UserPreferences.get().language.lang;
        console.log($scope.navigationTitles.user.languagesAvailable);

        $scope.openModal = function(template) {

            $ionicModal.fromTemplateUrl(template, {
                scope: $scope,
                animation: 'slide-in-right'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();

            });
        };

        $scope.changeLanguage = function (language) {

            console.log($scope.navigationTitles.user.languagesAvailable);
            UserPreferences.setLanguage(language);
            //$scope.navigationTitles = AppNavigationTitles.get();

        };



        $scope.continue = function()
        {
            $scope.modal.hide();
            console.log("Notifications Option:");
            console.log($scope.notifications);

            $window.localStorage.setItem('MuSAFirstTimeOpen', true);

            if($scope.notifications.radio)
            {
               UserPreferences.setNotificationStatus(true);
                $state.go('tab.museum-segmented-control');

            }

            else
            {
                $state.go('tab.museum-segmented-control');

            }



        };



        $scope.checkTutorial();


    });

