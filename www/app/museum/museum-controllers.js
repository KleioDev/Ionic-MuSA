/**
 * @ngdoc modules
 * @name Museum Tab Controllers
 * @author Jose F. Martinez Rivera
 * @description This module contains the controllers for the Museum tab of the application
 */
angular.module('museum-controllers', ['ngCordova'])


/**
 *
 * @ngdoc controller
 * @name Museum Segment Controller
 * @memberOf Museum Tab Controllers
 * @description Handles the state for the segmented control header bar in the museum tab
 */
    .controller('MuseumSegmentController', function($scope, SegmentedControl, $ionicScrollDelegate)
    {
        $scope.museumTabState = SegmentedControl.create('museum', ['general', 'events', 'news'], 'general');

        /**
         * Handles the state of the segmented button bar
         * @memberOf Museum Segment Controller
         * @param state The state of the control bar ('general' | 'events' | 'news')
         */
        $scope.changeState = function(state)
        {
            $scope.museumTabState.set(state);
            $ionicScrollDelegate.scrollTop();
        };

    })

/**
 * @ngdoc controller
 * @name Museum General View Controller
 * @description Controls the View Interactions between the Museum General View and the Application
 */
    .controller('MuseumGeneralCtrl', function($scope,$state,  Museum, $window)
    {
        //TODO: Spanish version of hours
        //TODO: Links and Maps
        $scope.generalState = $scope.$parent.generalState;

        /* Get information from the museum */
        $scope.museum = {};

        /* Get the information from the museum view the HTTP Service */
        Museum.getGeneralMuseumInfo().then(function(museumGeneralInfo) {

            if(museumGeneralInfo) {

                console.log(museumGeneralInfo);
                $scope.museum = museumGeneralInfo;
            }
            else
            {
                $state.go($state.current, {}, {reload: true});
            }
        });

        /* Open the map */
        $scope.openMap = function()
        {
            console.log("Opening Map");
            var location = Museum.getLocation();
            //Open the map application
            window.open(location, '_system');
        };

        /* Open Social Network */
        $scope.openWindow = function(socialLink)
        {
            $window.open(socialLink, '_system');
        }

    })

    /* Events list controller */
    .controller('MuseumEventsCtrl', function( $scope, $state, Events)
    {
        /* Update navigation labels */
        Events.getEvents().then(function(events)
        {
            $scope.events = events;

        });

        /* Open the event */
        $scope.openEvent = function(eventId)
        {

            /* Load the event before opening */
            Events.getSingleEvent(eventId)
                .then(function(event){

                    if(event){
                        event.datetime = moment(new Date(event.eventDate));
                        Events.setEvent(event);
                        $state.go('tab.museum-events-single');
                    }
                    else
                    {
                        $state.go($state.current, {}, {reload: true});

                    }
                });
        };

    })

    /* News list controller */
    .controller('MuseumNewsCtrl', function($scope,$state, News)
    {


        /* Get the news */
        News.getNews().then(function(news)
        {
            $scope.news = news;
        });

        /* Open a news article */
        $scope.openNewsArticle = function(newsId)
        {

            News.getNewsById(newsId)
                .then(success, failure);

            function success(news)
            {

                News.setNewsArticle(news);
                $state.go('tab.single_news_article');


            }

            function failure(news)
            {
                //Do Nothing
            }

        };

    })

    /* Single Event View Controller */
    .controller('MuseumSingleEventCtrl', function($scope, $stateParams, Events, $ionicPopup, $cordovaCalendar)
    {

        /* Pass the event to the view */
        $scope.event = Events.getEvent();

        /* Add the calendar */
        $scope.addToCalendar = function() {
            console.log($scope.event);

            /* Show Confirm  popup to add the calendar */
            var confirmPopup = $ionicPopup.confirm({

                title: $scope.navigationTitles.museum.eventsSingle.dialogCalendar.addToCalendarQuestion,
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
    .controller('MuseumSingleNewsCtrl', function($scope ,News)
    {
        $scope.news = News.getNewsArticle();
        $scope.news.datetime = moment(new Date($scope.news.createdAt));


    });