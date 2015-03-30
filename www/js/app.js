// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in museum-services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'museum-services', 'exhibition-services', 'content-services', 'app-services','starter.directives', 'ui.router'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //cordova.exec(success, fail, "AudioStream", "echo", ["YOYOYO"]);
    //
    //function success(data)
    //                   {
    //                  console.log(data);
    //                   }
    //
    //                   function fail()
    //                   {
    //                   console.log("Whattap");
    //                   }
      //$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
      //      if(toState.name == "tab.museum-segmented-control") {
      //
      //      }
      //    console.log("To State: ");
      //   console.log(toState);
      //    console.log("From State: ");
      //    console.log(fromState);
      //});
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

  // Each tab has its own nav history stack:
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


  .state('tab.collection', {
          cache: true,
      url: '/tab-collection/collection',
      views: {

        'tab-collection': {
          templateUrl: 'templates/tab-collection/collection.html',
          controller: 'ExhibitionSegmentedCtrl'
        }
      }
    })

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

      .state('tab.audio-view',
        {
            url: '/audio_view/:audioId',
            views:
            {
                'tab-collection':{
                    templateUrl: 'templates/tab-collection/audio-view.html',
                    controller: 'AudioViewCtrl'
                }
            }

        })

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
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/museum-segmented-control');

});
