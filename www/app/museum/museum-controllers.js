/**
 * @ngdoc modules
 * @name Museum Tab Controllers
 * @author Jose F. Martinez Rivera
 * @description
 *
 * ## Museum Controller Module
 * This module contains the controllers for the Museum tab of the application
 */
angular.module('museum-controllers', ['ngCordova'])


/**
 *
 * @ngdoc controller
 * @name Museum Segmented Control
 * @memberOf Museum Tab Controllers
 */
    .controller('MuseumSegmentedControl', function( $scope, SegmentedControl)
    {

        $scope.museumTabState = SegmentedControl.create('museum', ['general', 'events', 'news'], 'general');


        $scope.changeState = function(state)
        {
            $scope.museumTabState.set(state);
        };

    })

/**
 * @ngdoc controller
 * @name Museum General View Controller
 * @description dd
 */
    .controller('MuseumGeneralCtrl', function($scope, Museum, $window)
    {
        //TODO: Spanish version of hours
        //TODO: Links and Maps
        $scope.generalState = $scope.$parent.generalState;

        /* Get information from the museum */
        $scope.museum = {};

        /* Get the information from the museum view the HTTP Service */
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

        /* Open Social Network */
        $scope.openWindow = function(socialLink)
        {
            $window.open(socialLink, '_system');
        }

    })

    /* Events list controller */
    .controller('MuseumEventsCtrl', function( $scope, $state, AppNavigationTitles, Events)
    {
        /* Update navigation labels */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        Events.getEvents().then(function(events)
        {
            $scope.events = events;

        });

        /* Open the event */
        $scope.openEvent = function(eventId)
        {

            /* Load the event before opening */
            Events.getSingleEvent(eventId)
                .then(function(response){

                    if(response.status == 200)
                    {
                        response.data.datetime = moment(new Date(response.data.eventDate));
                        Events.setEvent(response.data);
                        $state.go('tab.museum-events-single', {eventId: eventId});
                    }
                });
        };

        /* Update preferences */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum;
        });

    })

    /* News list controller */
    .controller('MuseumNewsCtrl', function($scope,$state, AppNavigationTitles, News)
    {
        /* Get the labels for the application */
        $scope.navigationTitles = AppNavigationTitles.get().museum;

        /* Get the news */
        News.getNews().then(function(news)
        {
            $scope.news = news;
        });

        /* Open a news article */
        $scope.openNewsArticle = function(newsId)
        {

            News.getNewsById(newsId)
                .then(function(response){

                    if(response.status == 200)
                    {
                        News.setNewsArticle(response.data);
                        $state.go('tab.single_news_article',{newsId: newsId});

                    }
                })
        };

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
        $scope.event = Events.event;


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

        $scope.news = News.getNewsArticle();
        $scope.news.datetime = moment(new Date($scope.news.createdAt));
        /* Update preferences */
        $scope.$on('preferences:updated', function(){
            $scope.navigationTitles = AppNavigationTitles.get().museum.newsSingle;
        });

    });