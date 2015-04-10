
/* MuSA Application File */
angular.module('starter', ['ngCordova', 'ionic', 'museum-controllers', 'museum-services', 'app-services',


    'collection-controllers', 'map-controllers', 'qr-code-controllers', 'user-preferences-controllers','museum-services', 'exhibition-services', 'content-services', 'app-services','starter.directives', 'ui.router', 'map-services','monospaced.elastic','ngMockE2E'])

    .run(function($ionicPlatform, AppNavigationTitles,  $rootScope, $ionicPopup, $ionicLoading, $timeout, $httpBackend,Routes, Connection) {


        $rootScope.$on('loading:show', function() {
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
       $httpBackend.whenGET(Routes.MUSEUM_GENERAL_ROUTE).respond(200,

       {
                "description": "",
                "hoursOfOperation": '<p> The museum is usually open on weekdays. </p> <table cellpadding="1" cellspacing="1" style="width:100%"> <tbody> <tr> <td><strong>Monday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Tuesday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Wednesday</strong></td> <td>8:30 AM - 7:30 PM</td> </tr> <tr> <td><strong>Thursday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Friday</strong></td> <td>8:30 AM - 6:30 PM</td> </tr> </tbody> </table> <p>&nbsp;</p>',
                "museumTitle": "",
                "directions": "",
                "socialMediaLinks": []

       }
       );

        $httpBackend.whenGET(Routes.MUSEUM_EVENTS_ROUTE).respond({

                "events": museumServer.events}

            );

        $httpBackend.whenGET(new RegExp(Routes.MUSEUM_SINGLE_EVENT_ROUTE+'[0-9]*')).respond(function(method,url,params)
        {

            var re = /.*\/museum\/events\/(\w+)/;
            var eventId = parseInt(url.replace(re, '$1'), 10);

            var event = museumServer.getEventById(eventId);
            console.log("SERVER: ");
            console.log(event);
            if(typeof event != 'undefined')
            {
                return [200, event];
            }
            else{
                return [400, ''];
            }

        });

        $httpBackend.whenGET(Routes.MUSEUM_NEWS_ROUTE).respond(200,museumServer.news);
        $httpBackend.whenGET(new RegExp(Routes.MUSEUM_SINGLE_NEWS_ROUTE+'[0-9]*')).respond(function(method,url,params)
        {

            var re = /.*\/museum\/news\/(\w+)/;
            var newsId = parseInt(url.replace(re, '$1'), 10);

            var news = museumServer.getNewsById(newsId);

            if(typeof news != 'undefined')
            {
                return [200, news];
            }
            else{
                return [400, ''];
            }

        });

        $httpBackend.whenGET('app/museum/tab-museum/museum-single-event.html').passThrough();
        $httpBackend.whenGET('app/museum/tab-museum/museum-events.html').passThrough();
        $httpBackend.whenGET('app/museum/tab-museum/segmented-control-museum.html').passThrough();
        $httpBackend.whenGET('app/museum/tab-museum/museum-news.html').passThrough();
        $httpBackend.whenGET('app/museum/tab-museum/museum-single-news-article.html').passThrough();
        $httpBackend.whenGET('app/museum/tab-museum/museum-general.html').passThrough();

        $httpBackend.whenGET('app/collection/tab-collection/collection.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/collection-nearme.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/collection-objects.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/collection-exhibitions.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/collection-exhibition-view.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/collection-single-object.html').passThrough();
        $httpBackend.whenGET('app/collection/tab-collection/video-view.html').passThrough();


        $httpBackend.whenGET('app/maps/tab-map/maps.html').passThrough();
        $httpBackend.whenGET('app/qrcode/tab-qrcode/match-hunt.html').passThrough();
        $httpBackend.whenGET('app/qrcode/tab-qrcode/qrcode-scanner.html').passThrough();
        $httpBackend.whenGET('app/user/tab-user/preferences.html').passThrough();
        $httpBackend.whenGET('app/user/tab-user/send-feedback.html').passThrough();
        $httpBackend.whenGET('app/user/tab-user/text-view.html').passThrough();
        $httpBackend.whenGET('app/tabs.html').passThrough();












        $httpBackend.whenGET('app/museum/tab-museum/museum-single-event.html').passThrough();





        var iosConfig = {
            "badge": true,
            "sound": true,
            "alert": true
        };
        $rootScope.navigationTitles = AppNavigationTitles.get();

        /* Update preferences */
        $rootScope.$on('preferences:updated', function(){
            $rootScope.navigationTitles = AppNavigationTitles.get();
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





        $ionicPlatform.ready(function() {

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
                        controller: 'MuseumSegmentedControl'
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
                cache: true,
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
            }

        )
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
