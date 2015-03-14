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
.controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles)
{
    //Get the new data, HTTP Request

    $scope.navigationTitles = AppNavigationTitles;



})

.controller('MuseumEventsCtrl', function($scope, Events)
    {

    })

.controller('MuseumNewsCtrl', function($scope,News)
    {

    })

.controller('MuseumSingleEventsCtrl', function($scope, $stateParams, Events)
    {

    })

.controller('MuseumSingleNewsCtrl', function($scope, $stateParams, News)
    {


    });
