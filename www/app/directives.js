/**
 * Created by joframart on 3/18/15.
 */
angular.module('starter.directives', [])

.directive('museumGeneralDir', function()
    {
        return{
            templateUrl: 'app/museum/tab-museum/museum-general.html'
        }
    })

.directive('museumEventsDir', function()
    {

        return{
            templateUrl: 'app/museum/tab-museum/museum-events.html'
        }
    })
    .directive('museumNewsDir', function()
    {

        return{
            templateUrl: 'app/museum/tab-museum/museum-news.html'
        }
    })


.directive('collectionNearMeDir', function()
    {

        return {
            templateUrl: 'app/collection/tab-collection/collection-nearme.html'
        }
    })

.directive('collectionObjectsDir', function()
    {
        return{
            templateUrl: 'app/collection/tab-collection/collection-objects.html'

        }
    })

.directive('collectionExhibitionsDir', function()
    {
        return{
            templateUrl: 'app/collection/tab-collection/collection-exhibitions.html'

        }
    })
.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }})
    .directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.directive('facebookPopup', function(FacebookUser, $ionicPopup)
    {
        return {
            restrict: 'EA',


            replace: true,
            template: '<div></div>',
            //templateUrl: '',
            link: function($scope)
            {
                console.log("SCOPE");
                console.log($scope);
                var loginButton = {
                    text: $scope.navigationTitles.app.facebookLoginLabel,
                    type: 'button-royal',
                    onTap: function()
                    {
                        FacebookUser.login()
                            .then(function(user)
                            {
                                if(user)
                                {
                                    $scope.load();
                                }
                                else
                                {
                                    console.log("Directive Facebook Popup FAield to Login");
                                    console.log(user);
                                }
                            });

                    }

                };

                var cancelButton = {
                    text: $scope.navigationTitles.app.cancelFacebookLoginPopup,
                    type: 'button-light'
                };



                var showPopup = function() {
                    console.log("Showing Popup");
                    var loginPopup = $ionicPopup.show(
                        {
                            title: $scope.navigationTitles.app.facebookRequiredLabel,
                            subTitle: $scope.navigationTitles.app.playMatchHuntFacebookAccountRequiredLabel,
                            buttons:[
                                cancelButton,
                                loginButton
                            ]
                        });

                    loginPopup.then(function(res){

                        console.log(res);
                    });
                };

                $scope.setShowPopup(showPopup);





            }
        }

    });