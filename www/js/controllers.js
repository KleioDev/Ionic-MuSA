angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


//=================== Museum Tab Controllers ====================//
    .controller('MuseumSegmentedControl', function($scope)
    {
        this.museumState = [];


    })
.controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles)
{
    //Get the new data, HTTP Request

    $scope.navigationTitles = AppNavigationTitles.museum;



})

.controller('MuseumEventsCtrl', function($scope,  AppNavigationTitles, Events)
    {




        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.eventsToday = Events.getEventsToday();
        $scope.upcomingEvents = Events.getUpcomingEvents();

        $scope.go = function ( path ) {
            $location.path( path );
        };
    })

.controller('MuseumNewsCtrl', function($scope,News)
    {

    })

.controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events)
    {
        $scope.event = Events.get($stateParams.eventId);



    })

.controller('MuseumSingleNewsCtrl', function($scope, $stateParams, News)
    {


    });
