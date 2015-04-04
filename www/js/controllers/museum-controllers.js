/********* Museum Tab Controllers *********/

/* Author: Jose F. Martinez Rivera */
/* Museum Controller Module */
angular.module('museum-controllers', ['ngCordova'])

    /* Controller that manages the segmented control for the museum view */
    .controller('MuseumSegmentedControl', function( $scope, $rootScope, AppNavigationTitles, MuseumSegmentedControlService)
    {
        /* Get the navigation titles */
        $scope.navigationTitles = AppNavigationTitles.get().museum;
        $scope.museumTabState = MuseumSegmentedControlService.get();

        /* Change the view state */
        $scope.changeState = function(state)
        {
            MuseumSegmentedControlService.set(state);
        };

        /* Update the view on preferences update */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });
    })

    /* Controller that manages the Museum General View */
    .controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles, MuseumGeneralAccordionState, Museum)
    {
        //TODO: Links and Maps
        $scope.generalState = $scope.$parent.generalState;

        /* App labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum;


        /* Accordion State of buttons */
        $scope.museumAccordionState = MuseumGeneralAccordionState.get();

        /* Toggle the accordion state */
        $scope.toggle = function(tag)
        {
            MuseumGeneralAccordionState.toggle(tag);
        };

        /* Open the map */
        $scope.openMap = function()
        {
            console.log("Opening Map");
            var location = Museum.getLocation();
            //Open the map application
            window.open(location, '_system');
        };

        /* Update the view to the preferences */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });
    })

    /* Events list controller */
    .controller('MuseumEventsCtrl', function( $scope, $state, AppNavigationTitles, Events)
    {
        /* Update navigation labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        /* Get the events that are happening today */
        $scope.eventsToday = Events.getEventsToday();

        /* Get the upcoming events */
        $scope.upcomingEvents = Events.getUpcomingEvents();

        /* Open the event */
        $scope.openEvent = function(eventId)
        {
            $state.go('tab.museum-events-single', {eventId: eventId});
        };

        /* Update preferences */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });

    })

    /* News list controller */
    .controller('MuseumNewsCtrl', function($scope, AppNavigationTitles, News)
    {
        /* Get the labels for the application */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        /* Get the current news */
        $scope.currentNews = News.currentNews();

        /* Get the past week news */
        $scope.pastWeekNews = News.pastWeekNews();

    })

    /* Single Event View Controller */
    .controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events, $ionicPopup, $cordovaCalendar)
    {
        /* Get the labels for the view */
        $scope.navigationTitles = AppNavigationTitles.get().museum.eventsSingle;

        /* Pass the event to the view */
        $scope.event = Events.get($stateParams.eventId);

        /* Update the view labels */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum.eventsSingle;
        });

        /* Pop up to add the calendar */
        $scope.addToCalendar = function() {

            /* Show Confirm  popup */
            var confirmPopup = $ionicPopup.confirm({

                title: $scope.navigationTitles.dialogCalendar.addToCalendarQuestion,
                template: '<strong>'+$scope.event.title+'</strong>'
                + '<p>'+$scope.event.datetime.format('lll')+'</p>'

            });

            /* When the confirm popup occurs */
            confirmPopup.then(function(res)
            {
                if(res)
                {   //Add event to calendar!


                    /* Create an event to pass to the local calendar application */
                    $cordovaCalendar.createEventInteractively({
                        title: $scope.event.title,
                        location: $scope.event.location,
                        notes: $scope.event.description,
                        startDate: $scope.event.datetime.toDate(),
                        endDate: moment($scope.event.datetime).add('1', 'hour').toDate()
                    }).then(function (result) {



                    }, function (err) {
                        console.log("ERROR");
                        var failurePopup = $ionicPopup.alert({
                            title: $scope.navigationTitles.dialogCalendar.failureDialog,
                            template: '<p>' + $scope.navigationTitles.dialogCalendar.failureBody + '</p>'
                        });

                        failurePopup.then(function(res) {
                            console.log('Thank you for not eating my delicious ice cream cone');
                        });
                        // error
                    });

                }
                else{

                    //NO
                    console.log('No');
                }

            });

        }

    })

    /* Single News View Controller */
    .controller('MuseumSingleNewsCtrl', function($scope, $stateParams, $cordovaCalendar, AppNavigationTitles,News)
    {
        /* App navigation labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum.newsSingle;

        /* News article to view */
        $scope.news = News.get($stateParams.newsId);

        /* Update preferences */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum.newsSingle;
        });

    });