
/* MuSA Application File */
angular.module('starter', ['ngCordova', 'ionic', 'museum-controllers', 'museum-services', 'app-services',


    'collection-controllers', 'map-controllers', 'qr-code-controllers', 'user-preferences-controllers','museum-services', 'exhibition-services', 'content-services', 'app-services','starter.directives', 'ui.router', 'map-services','monospaced.elastic','ngMockE2E'])

    .run(function($ionicPlatform, AppNavigationTitles,  $rootScope, $ionicPopup, $ionicLoading, $timeout, $httpBackend,Routes, Connection) {
        document.addEventListener("offline", function(){ console.log("NO INTERNET STUFF");}, false);


        $rootScope.$on('loading:show', function() {
            $ionicLoading.show();
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });
       $httpBackend.whenGET(Routes.MUSEUM_GENERAL_ROUTE).respond(
       {
                "description": "",
                "hoursOfOperation": '<p> The museum is usually open on weekdays. </p> <table cellpadding="1" cellspacing="1" style="width:100%"> <tbody> <tr> <td><strong>Monday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Tuesday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Wednesday</strong></td> <td>8:30 AM - 7:30 PM</td> </tr> <tr> <td><strong>Thursday</strong></td> <td>8:30 AM - 5:30 PM</td> </tr> <tr> <td><strong>Friday</strong></td> <td>8:30 AM - 6:30 PM</td> </tr> </tbody> </table> <p>&nbsp;</p>',
                "museumTitle": "",
                "directions": "",
                "socialMediaLinks": []

       }
       );


        $httpBackend.whenGET(Routes.MUSEUM_EVENTS_ROUTE).respond({

                "events":[

                    {
                        id: 273,
                        title: "Museum Inauguration",
                        description: "Museum will finally open after 13 years!",
                        location: "Museum",

                        datetime:  moment(new Date("2015", "05", "2", "10", "30"))

                    },
                    {
                        id: 300,
                        title: "Speech - Zorali de Feria",
                        description: "Museum will finally open after 13 years!",
                        location: "Museum",

                        datetime:  moment(new Date("2015", "05", "2", "13", "00"))

                    },

                    {

                        id: 301,
                        title: "Social Activity",
                        description: "Museum will finally open after 13 years!",
                        location: "Museum",

                        datetime:  moment(new Date("2015", "05", "9", "11", "00"))

                    },
                    {
                        id: 303,
                        title: "Short Movie",
                        description: "Museum will finally open after 13 years!",
                        location: "Museum",
                        datetime:  moment(new Date("2015", "05", "9", "15", "00"))

                    },
                    {
                        id: 305,
                        title:"Cafe Opening",
                        location: "Museum",

                        description: "Museum will finally open after 13 years!",

                        datetime:  moment(new Date("2015", "05", "11", "8", "30"))

                    }

                ]}

            );

        $httpBackend.whenGET('templates/tab-museum/museum-single-event.html').passThrough();
        $httpBackend.whenGET('templates/tab-museum/museum-events.html').passThrough();
        $httpBackend.whenGET('templates/tab-museum/segmented-control-museum.html').passThrough();
        $httpBackend.whenGET('templates/tab-museum/museum-news.html').passThrough();
        $httpBackend.whenGET('templates/tab-museum/museum-single-news-article.html').passThrough();
        $httpBackend.whenGET('templates/tab-museum/museum-general.html').passThrough();

        $httpBackend.whenGET('templates/tab-collection/collection.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/collection-nearme.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/collection-objects.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/collection-exhibitions.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/collection-exhibition-view.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/collection-single-object.html').passThrough();
        $httpBackend.whenGET('templates/tab-collection/video-view.html').passThrough();


        $httpBackend.whenGET('templates/tab-map/maps.html').passThrough();
        $httpBackend.whenGET('templates/tab-qrcode/match-hunt.html').passThrough();
        $httpBackend.whenGET('templates/tab-qrcode/qrcode-scanner.html').passThrough();
        $httpBackend.whenGET('templates/tab-user/preferences.html').passThrough();
        $httpBackend.whenGET('templates/tab-user/send-feedback.html').passThrough();
        $httpBackend.whenGET('templates/tab-user/text-view.html').passThrough();
        $httpBackend.whenGET('templates/tabs.html').passThrough();












        $httpBackend.whenGET('templates/tab-museum/museum-single-event.html').passThrough();






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

        $rootScope.$on('http:error', function()
        {
            var alertPopup = $ionicPopup.alert({
                title: $rootScope.navigationTitles.app.httpErrorLabel});
            alertPopup.then(function(res) {

            });

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
                templateUrl: "templates/tabs.html"
            })

            /* Museum Tab States */

            /* Segmented Control State */
            .state('tab.museum-segmented-control',{
                cache: true,
                url: '/museum-segmented-control',
                views:
                {
                    'tab-museum':{

                        templateUrl: 'templates/tab-museum/segmented-control-museum.html',
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
                        templateUrl: 'templates/tab-museum/museum-single-event.html',
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
                        templateUrl: 'templates/tab-museum/museum-single-news-article.html',
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
                        templateUrl: 'templates/tab-collection/collection.html',
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
                        templateUrl: 'templates/tab-collection/collection-single-object.html',
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
                        templateUrl: 'templates/tab-collection/video-view.html',
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
                        templateUrl: 'templates/tab-collection/collection-exhibition-view.html',
                        controller: 'ExhibitionViewCtrl'
                    }
                }
            })

            /* QR Code Scanner View */
            .state('tab.tab-qrcode-scanner', {

                url: '/tab-qrcode/qr-code-scanner',
                views: {
                    'tab-qrcode': {
                        templateUrl: 'templates/tab-qrcode/qrcode-scanner.html',
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
                        templateUrl: 'templates/tab-map/maps.html',
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
                        templateUrl: 'templates/tab-user/preferences.html',
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
                        templateUrl: 'templates/tab-user/send-feedback.html',
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
                        templateUrl: 'templates/tab-qrcode/match-hunt.html',
                        controller: 'MatchHuntCtrl'
                    }
                }
            });



        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/museum-segmented-control');


            $httpProvider.interceptors.push(function($rootScope) {
                return {
                    request: function(config) {
                        $rootScope.$broadcast('loading:show');
                        return config
                    },
                    response: function(response) {
                        var status = response.status;
                        $rootScope.$broadcast('loading:hide');

                        if(status >= 400)
                        {
                            $rootScope.$broadcast('http:error');
                        }

                        return response
                    }
                }
            });



    });
