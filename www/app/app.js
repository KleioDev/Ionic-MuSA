
/**
 * @namespace MuSA
 */

angular.module('musa-app', ['ngCordova', 'ionic', 'museum-controllers', 'museum-services', 'app-services',


    'collection-controllers', 'map-controllers', 'qr-code-controllers', 'user-preferences-controllers','museum-services', 'exhibition-services', 'content-services', 'app-services','starter.directives', 'ui.router', 'map-services','monospaced.elastic'])//,'ngMockE2E'])

    .run(function($ionicPlatform, AppNavigationTitles,$filter,  $rootScope, $cordovaPush, UserPreferences, $ionicPopup, $ionicLoading, $timeout, $httpBackend,Routes, Connection) {



        $rootScope.app = {};

        $rootScope.app.fontSize = UserPreferences.getFontSize();
        $rootScope.$on('' +
        'loading:show', function() {
            $ionicLoading.show();
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });

        $rootScope.$on('http:error', function()
        {
            var alertPopup = $ionicPopup.alert({
                title: $rootScope.navigationTitles.app.httpErrorLabel});
            alertPopup.then(function(res) {

            });

        });


        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            if (notification.alert) {
                navigator.notification.alert(notification.alert);
            }

            if (notification.sound) {
                var snd = new Media(event.sound);
                snd.play();
            }

            if (notification.badge) {
                $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occurred. Show a message to the user
                });
            }
        });




        var iosConfig = {
            "badge": true,
            "sound": true,
            "alert": true
        };
        $rootScope.navigationTitles = AppNavigationTitles.get();


        /* Update preferences */
        $rootScope.$on('preferences:updated', function(){
            $rootScope.navigationTitles = AppNavigationTitles.get();
            $rootScope.app.fontSize = UserPreferences.getFontSize();
        });
        $rootScope.$on('$stateChangeStart',   function(event, toState, toParams, fromState, fromParams){

            var connection = Connection.checkConnection();
            if(!connection)
            {

                        var alertPopup = $ionicPopup.alert({
                            title: $rootScope.navigationTitles.app.noConnectionLabel,
                                template: $rootScope.navigationTitles.app.noConnectionContent
                        });
                        alertPopup.then(function(res) {

                        });


            }

            });

        /* Check for internet connection on all changes */
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        });



        //if (ionicPlatform.cordova.platform == "browser") {
        //    facebookConnectPlugin.browserInit(appID, version);
        //    // version is optional. It refers to the version of API you may want to use.
        //}
        //


        $ionicPlatform.ready(function() {

            //var volumeSlider = window.plugins.volumeSlider;
            //volumeSlider.createVolumeSlider(10,350,300,30); // origin x, origin y, width, height
            //volumeSlider.showVolumeSlider();

            $cordovaPush.register(iosConfig).then(function(result) {

                // Success -- send deviceToken to server, and store for future use
                console.log("result: " + result);
                //$http.post("http://server.co/", {user: "Bob", tokenID: result.deviceToken})
            }, function(err) {
                console.log(err);
                //alert("Registration error: " + err)
            });



            var deviceInformation = ionic.Platform.device();

            console.log(deviceInformation);
            var isIOS = ionic.Platform.isIOS();

            $rootScope.isIOS = isIOS;


            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

        });
    })

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {


       // or leave blank and default is v2.0
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "app/tabs.html"
            })

            /* Museum Tab States */

            /* Segmented Control State */
            .state('tab.museum-segmented-control',{
                cache: true,
                url: '/museum-segmented-control',
                views:
                {
                    'tab-museum':{

                        templateUrl: 'app/museum/tab-museum/segmented-control-museum.html',
                        controller: 'MuseumSegmentController'
                    }
                }
            })

            /* Single Event Page */
            .state('tab.museum-events-single',
            {
                url:'/museum-events/:eventId',
                views:
                {
                    'tab-museum':
                    {
                        templateUrl: 'app/museum/tab-museum/museum-single-event.html',
                        controller: 'MuseumSingleEventCtrl'
                    }
                }

            })
            /* Single News Page */
            .state('tab.single_news_article',
            {
                url: '/museum-news/:newsId',

                views: {
                    'tab-museum':
                    {
                        templateUrl: 'app/museum/tab-museum/museum-single-news-article.html',
                        controller: 'MuseumSingleNewsCtrl'
                    }
                }
            })

            /* Collection segmented control */
            .state('tab.collection', {
                url: '/tab-collection/collection',
                views: {

                    'tab-collection': {
                        templateUrl: 'app/collection/tab-collection/collection.html',
                        controller: 'CollectionSegmentedCtrl'
                    }
                }
            })

            /* Single Object View */
            .state('tab.collection-single-object',{
                url: '/collection/objects/:objectId',
                views:
                {
                    'tab-collection':{
                        templateUrl: 'app/collection/tab-collection/collection-single-object.html',
                        controller: 'ObjectViewCtrl'
                    }
                }
            })

            /* View View State */
            .state('tab.video-view',
            {
                url:'/videoView/:videoId',
                views:
                {
                    'tab-collection':
                    {
                        templateUrl: 'app/collection/tab-collection/video-view.html',
                        controller: 'VideoViewCtrl'
                    }
                }
            })

            /* Exhibition View State */
            .state('tab.collection-exhibition-view', {
                url: '/collection/exhibitions/:exhibitionId',
                views:
                {
                    'tab-collection':{
                        templateUrl: 'app/collection/tab-collection/collection-exhibition-view.html',
                        controller: 'ExhibitionViewCtrl'
                    }
                }
            })

            /* QR Code Scanner View */
            .state('tab.tab-qrcode-scanner', {

                url: '/tab-qrcode/qr-code-scanner',
                views: {
                    'tab-qrcode': {
                        templateUrl: 'app/qrcode/tab-qrcode/qrcode-scanner.html',
                        controller: 'QRCodeViewCtrl'
                    }

                }
            })

            /* Single Object View from Match Hunt*/
            .state('tab.scanner-object',{
                url: '/scanner/:objectId',
                views:
                {
                    'tab-qrcode':{
                        templateUrl: 'app/collection/tab-collection/collection-single-object.html',
                        controller: 'ObjectViewCtrl'
                    }
                }
            })
            /* Map View State */
            .state('tab.tab-maps',{

                url: '/tab-map/maps',
                views:
                {
                    'tab-maps':
                    {
                        templateUrl: 'app/maps/tab-map/maps.html',
                        controller: 'MapViewCtrl'
                    }
                }
            })

            /* User Tab State */
            .state('tab.tab-user',{

                url: '/tab-user/preferences',
                views:
                {
                    'tab-user':
                    {
                        templateUrl: 'app/user/tab-user/preferences.html',
                        controller: 'UserPreferencesCtrl'
                    }
                }
            })

            /* User feedback form state */
            .state('tab.tab-feedback-form',{

                url: '/tab-user/feedback_form',
                views:
                {
                    'tab-user':
                    {
                        templateUrl: 'app/user/tab-user/send-feedback.html',
                        controller: 'FeedbackFormCtrl'
                    }
                }
            })

            /* Match Hunt state */
            .state('tab.tab-match-hunt',{

                url: '/tab-qrcode/matchhunt',
                views: {

                    'tab-qrcode':
                    {
                        templateUrl: 'app/qrcode/tab-qrcode/match-hunt.html',
                        controller: 'MatchHuntCtrl'
                    }
                }
            });



        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/museum-segmented-control');

        $httpProvider.defaults.useXDomain = true;

        var interceptor = ['$rootScope', '$q', function (scope, $q) {

            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;


                console.log("ERROR@");
                //if (status == 401) {
                //    window.location = "./index.html";
                //    return;
                //}
                // otherwise
                return $q.reject(response);

            }

            return function (promise) {
                return promise.then(success, error);
            }

        }];
        $httpProvider.interceptors.push('HTTPInterceptor');

            //$httpProvider.interceptors.push(function($rootScope) {
            //    return {
            //        request: function(config) {
            //            $rootScope.$broadcast('loading:show');
            //            return config
            //        },
            //        response: function(response) {
            //            $rootScope.$broadcast('loading:hide');
            //            console.log(response.status);
            //
            //            return response
            //        }
            //    }
            //});



    });
