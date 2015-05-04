
angular.module('tutorial', [])


.controller('TutorialCtrl', function($scope,$ionicModal, $timeout,Notifications, $state,$window, UserPreferences) {

        var flag = $window.localStorage.getItem('MuSAFirstTimeOpen');

        console.log("Tutorial has not been opened");

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


        $scope.languagePreference = $scope.preferences.language;

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
            UserPreferences.setLanguage(language);
            //$scope.navigationTitles = AppNavigationTitles.get();

            $window.localStorage.setItem('MuSAFirstTimeOpen', true);



        };



        $scope.continue = function()
        {
            $scope.modal.hide();
            console.log("Notifications Option:");
            console.log($scope.notifications);

            if($scope.notifications.radio)
            {
                Notifications.subscribe()
                    .then(function(response)
                    {

                        if(response)
                        {
                            console.log("Subscribed successfully");
                            $state.go('tab.museum-segmented-control');

                        }
                    })
            }
            else
            {
                $state.go('tab.museum-segmented-control');

            }



        };



        $scope.checkTutorial();


    });

