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


    .controller('MuseumSegmentedControl', function($ionicViewService, $scope, $state, AppNavigationTitles, MuseumSegmentedControlService)
    {
        var museumTabState = MuseumSegmentedControlService;
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.museumTabState = museumTabState.get();


        $scope.museumGeneralView = function()
        {
            museumTabState.set("general");
            $scope.museumTabState = museumTabState.get();

        };

        $scope.museumEventsView = function()
        {
            museumTabState.set("events");
            $scope.museumTabState = museumTabState.get();

        };

        $scope.museumNewsView = function()
        {
            museumTabState.set("news");
            $scope.museumTabState = museumTabState.get();
        }



    })
.controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles)
{
    console.log("Activated");
    //Get the new data, HTTP Request
    //$scope.$parent.museumCtrlDelegate = function()
    //{
    //
    //    $scope.apply();
    //};
    $scope.generalState = $scope.$parent.generalState;
    $scope.navigationTitles = AppNavigationTitles.museum;






})

.controller('MuseumEventsCtrl', function( $scope,  AppNavigationTitles, Events)
    {




        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.eventsToday = Events.getEventsToday();
        $scope.upcomingEvents = Events.getUpcomingEvents();

    })

.controller('MuseumNewsCtrl', function($scope, AppNavigationTitles, News)
    {
        $scope.navigationTitles = AppNavigationTitles.museum;

        $scope.currentNews = News.currentNews();
        $scope.pastWeekNews = News.pastWeekNews();

    })

.controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events)
    {
        $scope.event = Events.get($stateParams.eventId);



    })

.controller('MuseumSingleNewsCtrl', function($scope, $stateParams, AppNavigationTitles,News)
    {
        $scope.news = News.get($stateParams.newsId);

    });

