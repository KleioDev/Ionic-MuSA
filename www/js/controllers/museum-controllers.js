/********* Museum Tab Controllers *********/

/* Author: Jose F. Martinez Rivera */
/* Museum Controller Module */
angular.module('museum-controllers', ['ngCordova'])

    /* Controller that manages the segmented control for the museum view */
    .controller('MuseumSegmentedControl', function( $scope, AppNavigationTitles, SegmentedControl)
    {
        /* Get the navigation titles */
        $scope.navigationTitles = AppNavigationTitles.get().museum;
        $scope.museumTabState = SegmentedControl.create('museum', ['general', 'events', 'news'], 'general');

        /* Change the view state */
        $scope.changeState = function(state)
        {
            $scope.museumTabState.set(state);
        };

        /* Update the view on preferences update */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });
    })

    /* Controller that manages the Museum General View */
    .controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles, Museum)
    {
        //TODO: Links and Maps
        $scope.generalState = $scope.$parent.generalState;

        /* App labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        /* Get information from the museum */
        $scope.museum = {};
        Museum.getGeneralMuseumInfo().then(function(museumGeneralInfo)
        {
            $scope.museum = museumGeneralInfo;
        });

        /* Open the map */
        $scope.openMap = function()
        {
            console.log("Opening Map");
            var location = Museum.getLocation();
            //Open the map application
            window.open(location, '_system');
        };

        /* Update the view to the preferences */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });
    })

    /* Events list controller */
    .controller('MuseumEventsCtrl', function( $scope, $state, AppNavigationTitles, Events, Connection)
    {
        //Connection.checkConnection();
        /* Update navigation labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        Events.getEvents().then(function(events)
        {
            $scope.events = events;

        });

        /* Open the event */
        $scope.openEvent = function(eventId)
        {
            $state.go('tab.museum-events-single', {eventId: eventId});
        };

        /* Update preferences */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });

    })

    /* News list controller */
    .controller('MuseumNewsCtrl', function($scope, AppNavigationTitles, News)
    {
        /* Get the labels for the application */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        /* Get the news */
        News.getNews().then(function(news)
        {
            $scope.news = news;
        });

        /* Update happened */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });

    })

    /* Single Event View Controller */
    .controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events, $ionicPopup, $cordovaCalendar)
    {
        /* Get the labels for the view */
        $scope.navigationTitles = AppNavigationTitles.get().museum.eventsSingle;

        /* Pass the event to the view */
        Events.getSingleEvent($stateParams.eventId).then(function(event)
        {
            $scope.event = event;
        });

        /* Update the view labels */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get().museum.eventsSingle;
        });

        /* Add the calendar */
        $scope.addToCalendar = function() {
            console.log($scope.event);

            /* Show Confirm  popup to add the calendar */
            var confirmPopup = $ionicPopup.confirm({

                title: $scope.navigationTitles.dialogCalendar.addToCalendarQuestion,
                template: '<strong>'+$scope.event.title+'</strong>'
                + '<p>'+$scope.event.datetime.format('lll')+'</p>'

            });

            /* When the confirm popup occurs */
            confirmPopup.then(function(res)
            {
                if(res)
                {
                    /* Create an event to pass to the local calendar application */
                    $cordovaCalendar.createEventInteractively({
                        title: $scope.event.title,
                        location: $scope.event.location,
                        notes: $scope.event.description,
                        startDate: $scope.event.datetime.toDate(),
                        endDate: moment($scope.event.datetime).add('1', 'hour').toDate()
                    }).then(function (result) {

                    }, function (err) {
                        console.log(err);
                        var failurePopup = $ionicPopup.alert({
                            title: $scope.navigationTitles.dialogCalendar.failureDialog,
                            template: '<p>' + $scope.navigationTitles.dialogCalendar.failureBody + '</p>'
                        });

                        failurePopup.then(function(res) {

                        });
                    });

                }
                else{

                }

            });

        }

    })

    /* Single News View Controller */
    .controller('MuseumSingleNewsCtrl', function($scope, $stateParams, AppNavigationTitles,News)
    {
        /* App navigation labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum.newsSingle;

        /* News article to view */
        News.getNewsById($stateParams.newsId).
            then(function(news)
            {
               $scope.news = news;
            });

        /* Update preferences */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum.newsSingle;
        });

    });