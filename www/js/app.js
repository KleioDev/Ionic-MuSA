// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
          cache: false,
          url: '/museum-segmented-control',
          views:
          {
              'tab-museum':{

                  templateUrl: 'templates/tab-museum/segmented-control-museum.html',
                  controller: 'MuseumSegmentedControl'
              }
          }
      })
  .state('tab.museum-general', {
    url: '/museum-general',
    views: {
      'tab-museum': {
        templateUrl: 'templates/tab-museum/tab-museum-general.html',
        controller: 'MuseumGeneralCtrl'
      }
    }
  })

  .state('tab.museum-events',
  {

      url:'/museum-events',
      views:
      {
          'tab-museum':
          {
              templateUrl: 'templates/tab-museum/tab-museum-events.html',
              controller: 'MuseumEventsCtrl'
          }
      }
  })

      .state('tab.museum-events-single',
      {
            url:'/museum-events/:eventId',
          views:{

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


  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
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
