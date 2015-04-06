
/* MuSA Application File */
angular.module('starter', ['ngCordova', 'ionic', 'museum-controllers', 'museum-services', 'app-services',


    'collection-controllers', 'map-controllers', 'qr-code-controllers', 'user-preferences-controllers','museum-services', 'exhibition-services', 'content-services', 'app-services','starter.directives', 'ui.router', 'map-services','monospaced.elastic'])

.run(function($ionicPlatform, $rootScope) {


        var iosConfig = {
            "badge": true,
            "sound": true,
            "alert": true
        };


        $ionicPlatform.ready(function(iBeacon, AppNavigationTitles) {

      var deviceInformation = ionic.Platform.device();
            console.log(deviceInformation);


      $rootScope.$on('stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams){

              if(fromState.name == 'tab.collection')
              {
                  console.log(fromState.name);
                  iBeacon.stopRanging();
              }



          });


      var isIOS = ionic.Platform.isIOS();

      $rootScope.isIOS = isIOS;

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

      //openFB.init({appId: '404761379705364'});

      if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

        });
})

.config(function($stateProvider, $urlRouterProvider) {

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

});
