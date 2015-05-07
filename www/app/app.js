
/**
 * @namespace MuSA
 */

angular.module('musa-app', ['ngCordova', 'ionic','ionic.contrib.frost', 'museum-controllers', 'museum-services', 'app-services',


    'collection-controllers', 'map-controllers', 'qr-code-controllers','user-preferences-controllers','museum-services', 'exhibition-services', 'content-services','starter.directives',
    'ui.router', 'map-services','monospaced.elastic', 'notification-services', 'tutorial', 'LocalStorageModule'])//,'ngMockE2E'])

    .run(function(ionPlatform, AppNavigationTitles,$state,$http,FacebookUser,  $window,Notifications,$ionicHistory, $cordovaDevice, $ionicPopup, $state, $cordovaPush, $rootScope, UserPreferences, $ionicPopup, $ionicLoading, $timeout, $httpBackend,Routes, Connection) {

        var DEBUG = 1;


        /* Set the user global variables */
        if(!DEBUG) {
            console.log = function () {
            };
        }

        //$window.localStorage.clear();
        $rootScope.app = {};
        $rootScope.app.fontSize = UserPreferences.getFontSize();
        $rootScope.navigationTitles = AppNavigationTitles.get();



        $rootScope.goBack = function()
        {
            $ionicHistory.goBack();
        };

        /* HTTP Defined Routes */

        $rootScope.$on('http:notFound', function(event, type)
        {

            var text = 'Not Found';

            if(type == 'MATCH-HUNT')
            {
                text = $rootScope.navigationTitles.app.matchHuntNoMoreCluesLabel;

            }
            var alertPopup = $ionicPopup.alert({
                title: text});
            alertPopup.then(function(res) {
                $ionicHistory.goBack();


            });

        });

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show();
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });

        $rootScope.$on('http:error', function(event, type)
        {

            var text = $rootScope.navigationTitles.app.httpErrorLabel;

                var alertPopup = $ionicPopup.alert({
                    title: text
                });
                alertPopup.then(function (res) {

                });


        });

        $rootScope.$on('http:serverUnavailable', function(){

            $ionicPopup.alert({
                title: $rootScope.navigationTitles.app.serverDownMaintenanceLabel
            });
        });

        $rootScope.$on('http:timeout', function()
        {
            var alertPopup = $ionicPopup.alert({
                title: $rootScope.navigationTitles.app.httpTimeoutLabel});
            alertPopup.then(function(res) {

            });
        });


        /* Update preferences */
        $rootScope.$on('preferences:updated', function(){
            $rootScope.navigationTitles = AppNavigationTitles.get();
            $rootScope.app.fontSize = UserPreferences.getFontSize();
        });

        $rootScope.$on('$stateChangeSuccess' , function(event, toState, toParams, fromState, fromParams){

            var userID = FacebookUser.getUserID();
            if(userID) {


                var request = {

                    'method': 'POST',
                    'url': Routes.MONTHLY_ACTIVE_USER + userID

                };

                $http(request);
            }

        });


        $rootScope.$on('$stateChangeStart',   function(event, toState, toParams, fromState, fromParams){

            /* Check if connection is available between states */
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

        ionPlatform.ready.then(function(device) {

            var deviceInformation = ionic.Platform.device();

            console.log(deviceInformation);
            var isIOS = ionic.Platform.isIOS();
            var android = ionic.Platform.isAndroid();

            $rootScope.platform = {};
            $rootScope.platform.isIOS = isIOS;
            $rootScope.platform.isAndroid = android;





            //console.log(isIOS);
            //console.log(android);

            //Get the first time opening the app flag
            var flag = $window.localStorage.getItem('MuSAFirstTimeOpen');






            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }







            if(ionic.Platform.isAndroid() || ionic.Platform.isIOS())
            {
                console.log("Setting up Notifications");
                var uuid = $cordovaDevice.getUUID();
                Notifications.setup();

                console.log(uuid);

            }

            /* Ask user for the language */

        });
    })

    .config(function($stateProvider, $urlRouterProvider,$logProvider,localStorageServiceProvider,$httpProvider) {


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
                cache: false,

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
            })

        /* Map view exhibition in room */

        /* Exhibition View State */
        .state('tab.maps-exhibition-view', {
            url: '/map/room/exhibitions/:exhibitionId',
            views:
            {
                'tab-maps':{
                    templateUrl: 'app/collection/tab-collection/collection-exhibition-view.html',
                    controller: 'ExhibitionViewCtrl'
                }
            }
        })

        /* Single Object View */
        .state('tab.maps-single-object',{
            url: '/map/room/exhibitions/object/:objectId',
            views:
            {
                'tab-maps':{
                    templateUrl: 'app/collection/tab-collection/collection-single-object.html',
                    controller: 'ObjectViewCtrl'
                }
            }
        })

        .state('tab.maps-room-view',{
                url: '/map/room',
                views:
                {
                    'tab-maps':{
                        templateUrl: 'app/maps/tab-map/room-view.html',
                        controller: 'RoomViewCtrl'
                    }
                }

        })

        /* View View State */
        .state('tab.qrcode-video-view',
            {
                url:'/videoView/:videoId',
                views:
                {
                    'tab-qrcode':
                    {
                        templateUrl: 'app/collection/tab-collection/video-view.html',
                        controller: 'VideoViewCtrl'
                    }
                }
            })

            /* View View State */
            .state('tab.maps-video-view',
            {
                url:'/videoView/:videoId',
                views:
                {
                    'tab-maps':
                    {
                        templateUrl: 'app/collection/tab-collection/video-view.html',
                        controller: 'VideoViewCtrl'
                    }
                }
            })

        .state('tab.tutorial',{

            url:'/tutorial',
            views: {

                'tab-tutorial':
                {
                    templateUrl: 'app/tutorial/tutorial.html',
                    controller: 'TutorialCtrl'
                }
            }
        });

        /* Fallback State */
        $urlRouterProvider.otherwise('/tab/tutorial');

        $httpProvider.defaults.useXDomain = true;

        $httpProvider.interceptors.push('HTTPInterceptor');

        $logProvider.debugEnabled(false);

        localStorageServiceProvider.setPrefix('MuSA-Storage');


    });
