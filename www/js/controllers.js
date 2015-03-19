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



        /* Change segmented control state to general */
        $scope.museumGeneralView = function()
        {
            museumTabState.set("general");
            $scope.museumTabState = museumTabState.get();
        };

        /* Change segmented control state to Events */
        $scope.museumEventsView = function()
        {
            museumTabState.set("events");
            $scope.museumTabState = museumTabState.get();
        };

        /* Change segmented control state to News */
        $scope.museumNewsView = function()
        {
            museumTabState.set("news");
            $scope.museumTabState = museumTabState.get();
        }


    })

    .controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles, MuseumGeneralAccordionState)
    {

        var accordionState = MuseumGeneralAccordionState;
        $scope.generalState = $scope.$parent.generalState;
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.accordionStateArrows = "down";

        $scope.accordionState = accordionState;
        $scope.museumAccordionState = MuseumGeneralAccordionState.get();

        $scope.toggle = function(tag)
        {

                $scope.accordionState.toggle(tag);

        }



    })

    .controller('MuseumEventsCtrl', function( $scope, $state, AppNavigationTitles, Events)
    {
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.eventsToday = Events.getEventsToday();
        $scope.upcomingEvents = Events.getUpcomingEvents();


        $scope.openEvent = function(eventId)
        {
            $state.go('tab.museum-events-single', {eventId: eventId});
        }

    })

    .controller('MuseumNewsCtrl', function($scope, AppNavigationTitles, News)
    {
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.currentNews = News.currentNews();
        $scope.pastWeekNews = News.pastWeekNews();

    })

    .controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events, $ionicPopup)
    {
        $scope.navigationTitles = AppNavigationTitles.museum.eventsSingle;
        $scope.event = Events.get($stateParams.eventId);

        /* Handle pop up */
        $scope.addToCalendar = function(event) {

            console.log(event);
            var confirmPopup = $ionicPopup.confirm({

                title: 'Add Event To Calendar?',
                template: '<strong>'+event.title+'</strong>'
                        + '<p>'+event.datetime.format('lll')+'</p>'

            });

            confirmPopup.then(function(res)
            {
                if(res)
                {   //Add event to calendar!
                    console.log('Yes');
                }
                else{

                    //NO
                    console.log('No');
                }

            });

        }

    })

    .controller('MuseumSingleNewsCtrl', function($scope, $stateParams, AppNavigationTitles,News)
    {
        $scope.navigationTitles = AppNavigationTitles.museum.newsSingle;
        $scope.news = News.get($stateParams.newsId);

    });

