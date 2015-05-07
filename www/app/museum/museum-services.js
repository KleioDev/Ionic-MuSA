


/* Museum Services to handle states and data */
angular.module('museum-services', [])

/**
 * @ngdoc service
 * @name Museum
 * @description Stores and retrieves information from the Museum Route in the API. Used to handle requests made to the API related to the museum, such as:
 *  + Museum Title
 *  + Museum Image
 *  + Hours of Operation
 *  + Description
 *  + Social Media Links
 *  + Location
 *  + Terms of Service
 *  + More Info About the Museum
 *  + Contact Information
 *
 * Requires Routes and {@link https://docs.angularjs.org/api/ng/service/$http | $http} services
 *  @requires Routes
 */
    .factory('Museum', function(Routes, $http, $q)
    {

        var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

        /**
         * Returns a response from the API
         * @memberof Museum
         * @returns {Promise} Promise containing the response from the server
         */
        var getGeneralMuseumInfo = function()
        {
            return $http.get(Routes.MUSEUM_GENERAL_ROUTE)
                .then(function(success)
                {
                        var response = success.data;
                        console.log("SUCCESS GOT RESPONSE :- ");
                        console.log(response);
                        var hoursOfOperation = response.hoursOfOperation;

                        for(var dayName in hoursOfOperation)
                        {
                            var day = hoursOfOperation[dayName];
                            if(!day.closed) {
                                hoursOfOperation[dayName].open = moment(day.open, 'h:mm A').format('h:mm A');
                                hoursOfOperation[dayName].close = moment(day.close, 'h:mm A').format('h:mm A');
                            }
                        }

                        response.hoursOfOperation = hoursOfOperation;
                        response.days = days;

                        response.phone = phoneFormat(response.phone);


                        function phoneFormat(phone) {
                            phone = phone.replace(/[^0-9]/g, '');
                            phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                            return phone;
                        }

                        return response;




                })
                .catch(function(response)

                {
                    /* A mistake happened */
                    console.log("Museum Info Could Not Be Retrieved: ");
                    console.log("Status: " + response.status);
                    console.log("Data: " + response.data);
                    return null;
                });

        };


        /**
         * Returns the uri for forwarding the application to the locally installed Maps/Google Maps application
         * @memberof Museum
         * @returns {String} URI containing the forward link
         */
        var getLocation = function()
        {
            return 'https://www.google.com.pr/maps/dir//18.2099661,-67.1425268/@18.2094647,-67.1421731,395m/data=!3m1!1e3?hl=en'
        };





        return {

            getGeneralMuseumInfo: getGeneralMuseumInfo,
            getLocation: getLocation
        }
    })


/**
 * @ngdoc service
 * @name Events
 * @description
 **
 * Stores and retrieves the events that are happening in the museum. An array containing JSON objects:
 * + Event Title
 * + ID
 * + Description
 * + Thumbnail Image
 * + Location
 * + Event Date & Time
 *
 * Requires Routes and {@link https://docs.angularjs.org/api/ng/service/$http | $http} services
 *
 */
    .factory('Events', function(Routes,$http, $q)
    {
        var events = {};

        /**
         * Returns an object containing the events happening on the current day as well as the events that are happening in the past weeks.
         *
         * @memberof Events
         * @example
         * //AngularJS Controller, inject the Events service
         * .controller('ExampleController', function(Events){
     *      Events.getNews().then(function(response){
     *
     *              //Get the events from the response body
     *              $scope.events = response.data.events;
     *              //$scope.events = {
     *              //  upcomingEvents = [],
     *              //  eventsToday = []
     *              //}
     *
     *      }, function(err){ console.log("ERR Happened")});
     * });
         * @returns {Promise} Events object containing the upcoming events and events today
         */
        var getEvents = function(){
            return  $http.get(Routes.MUSEUM_EVENTS_ROUTE)
                .then(handleEventsSuccess, handleEventsFailure);

            function handleEventsSuccess(response)
            {


                if(response.status == 200){

                    var data = response.data;

                    //console.log(data);




                    for(var i = 0; i < data.events.length ; i++)
                    {
                        data.events[i].datetime = moment(new Date(data.events[i].eventDate));
                    }

                    data.events.sort(compareMilli);

                    console.log(data.events);
                    function compareMilli(a,b) {
                        if(a.datetime.valueOf() < b.datetime.valueOf()) return -1;
                        if(a.datetime.valueOf() > b.datetime.valueOf()) return 1;
                        return 0;
                    }


                    /* Save today's events */
                    events.eventsToday = [];
                    var currentDate = moment(new Date());


                    for (var i = 0; i < data.events.length; i++)
                    {
                        //console.log(events[i].datetime.diff(currentDate));
                        if (data.events[i].datetime.isSame(currentDate, 'day'))
                        {
                            events.eventsToday.push(data.events[i]);
                        }
                    }



                    /* Store the upcoming events */
                    events.upcomingEvents = [];
                    for (var i = 0; i < data.events.length; i++) {
                        if (!data.events[i].datetime.isSame(currentDate, 'day') && currentDate.diff(data.events[i].datetime, 'hours') < 0){// && currentDate.diff(data.events[i].datetime, 'months') == 0){
                            events.upcomingEvents.push(data.events[i]);
                        }
                    }



                    // console.log(events);
                    return events;

                }
                else{
                    return null;
                }



            }

            function handleEventsFailure(response)
            {
                events.eventsToday = [];
                events.upcomingEvents = [];
                return null;
            }

        };

        /**
         * Returns a response containing a single event from the API
         * @memberof Events
         * @example
         * //AngularJS Controller, inject the Events service
         * .controller('ExampleController', function(Events){
     *      var id = 2;
     *      Events.getSingleEvent(id).then(function(response){
     *
     *      if(response.status == 200)
     *      {
     *          $scope.event = response.event;
     *      }
     *
     *
     *      }, function(err){ console.log("ERR Happened")});
     * });
         * @param {string} id of the event trying to request from the API
         * @returns {Promise} Promise containing the response from the server
         */
        var getSingleEvent = function(id)
        {
            return  $http.get(Routes.MUSEUM_SINGLE_EVENT_ROUTE + id)
                .then(success, failure);

            function success(response)
            {
                if(response.status == 200)
                {
                    var event = response.data;
                    event.datetime = moment(new Date(event.eventDate));

                    return event;
                }
                else
                {
                    return null;
                }
            }
            function failure(response)
            {
                console.log("EventServices - Retrieving a Single Event");
                console.log("Failed to get Event:");
                console.log("Response Status: " + response.status);
                console.log(response);
                return null;
            }

        };

        /* Event */
        var setEvent = function(event)
        {
            events.event = event;
        };


        /* Get Event */
        var getEvent = function()
        {
            return events.event;
        };

        return {

            getEvents: getEvents,
            getSingleEvent: getSingleEvent,
            setEvent: setEvent,
            eventsToday: events.eventsToday,
            upcomingEvents : events.upcomingEvents,
            getEvent: getEvent
        }

    })


/**
 * @ngdoc service
 * @name News
 * @description
 **
 * Stores and retrieves the news articles. Provides an interface for requests to the server
 * + News Title
 * + ID
 * + Description
 * + Thumbnail Image
 * + Location
 *
 * Requires Routes and {@link https://docs.angularjs.org/api/ng/service/$http | $http} services
 *
 */
    .factory('News', function($http, Routes)
    {
        var news = {};

        /**
         * Returns a response containing an array of JSON objects containing news articles from the API
         * @example
         * //AngularJS Controller, inject the News service
         * .controller('ExampleController', function(News){
         *      News.getNews().then(function(response){
         *          //Handle the response from the API
         *          if(response.status == 200)
         *          {
         *              //Get the news from the response body
         *              $scope.news = response.data.news;
         *          }
         *      }, function(err){ console.log("ERR Happened")});
         * });
         * @memberof News
         * @returns {Promise} Promise containing the response from the server
         */
        var getNews = function()
        {

            return  $http.get(Routes.MUSEUM_NEWS_ROUTE)
                .then(newsSuccess, newsFailure);



            function newsSuccess(response)
            {

                if(response.status == 200) {
                    var _news = response.data.news;

                    for (var j = 0; j < _news.length; j++) {
                        _news[j].datetime = moment(new Date(_news[j].createdAt));
                    }

                    /* Current Date */
                    var currentDate = moment(new Date());

                    /* This weeks current News */
                    news.currentNews = [];
                    for (var i = 0; i < _news.length; i++) {

                        //console.log(_news[i]);
                        if (currentDate.diff(_news[i].datetime, 'days') <= 7) {
                            news.currentNews.push(_news[i]);
                        }
                    }

                    /* News past week */

                    news.pastWeekNews = [];
                    for (var i = 0; i < _news.length; i++) {

                        if (currentDate.diff(_news[i].datetime, 'days') > 7 && currentDate.diff(_news[i].datetime, 'years') == 0) {
                            news.pastWeekNews.push(_news[i]);
                        }
                    }
                    //console.log(news);
                    return news;
                }
                else
                    return null;

            };

            function newsFailure()
            {
                console.log("FAILED TO GET THE NEWS");

                return null;
            };
        };

        /**
         * Returns a response containing a single news article as a JSON Object
         * @example
         * //AngularJS Controller, inject the News service
         * .controller('ExampleController', function(News){
         *
         *      var id = 2;
         *      News.getNewsById(id).then(function(response){
         *          //Handle the response from the API
         *          if(response.status == 200)
         *          {
         *              //Get the news from the response body
         *              $scope.news = response.data;
         *          }
         *      }, function(err){ console.log("ERR Happened")});
         * });
         * @memberof News
         * @returns {Promise} Promise containing the response from the server
         */
        var getNewsById = function(id)
        {
            return  $http.get(Routes.MUSEUM_SINGLE_NEWS_ROUTE + id)
                .then(success, failure);


            function success(response)
            {
                if(response.status == 200)
                {
                    return response.data;
                }
                else
                    return null;
            }

            function failure(err)
            {
                console.log('Load Single Event Failure');
                return null;

            }

        };

        /* Set a news article for the next view */
        var setNewsArticle = function(newsArticle)
        {
            news.newsArticle = newsArticle;
        };

        /* Get the news Article */
        var getNewsArticle = function()
        {
            return news.newsArticle;
        };

        return {
            getNews: getNews,
            getNewsById: getNewsById,
            setNewsArticle: setNewsArticle,
            getNewsArticle: getNewsArticle
        }

    });