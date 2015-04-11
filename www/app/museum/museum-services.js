


/* Museum Services to handle states and data */
angular.module('museum-services', [])

//=================== Museum Services ====================//
    //TODO: Might need some initial data
    .factory('Museum', function(Routes, $http)
    {
        var general = {};

        /* Get general museum info */
        general.getGeneralMuseumInfo = function()
        {
            return $http.get(Routes.MUSEUM_GENERAL_ROUTE).then(function(response)
            {
                return response.data;
            })
        };

        /* Get the location */
        general.getLocation = function()
        {
            return 'http://maps.apple.com/?daddr=18.210970,-67.143084'
        };

        return general;
    })

    //TODO: Events- Setup ajax HTTP Request functionality

    /* Event service for getting the events from the server */
.factory('Events', function(Routes,$http)
{
    var events = {};

    /* Get the events with a promise  */
    events.getEvents = function(){
        return  $http.get(Routes.MUSEUM_EVENTS_ROUTE)
            .then(function(response)
            {
                var data = response.data;
                console.log(data);

                /* Save today's events */
                events.eventsToday = [];
                var currentDate = moment(new Date("2015", "05", "2"));

                for (var i = 0; i < data.events.length; i++)
                {
                    //console.log(events[i].datetime.diff(currentDate));
                    if (data.events[i].datetime.diff(currentDate,'days') == 0)
                    {
                        events.eventsToday.push(data.events[i]);
                    }
                }

                /* Store the upcoming events */
                events.upcomingEvents = [];
                for (var i = 0; i < data.events.length; i++) {
                    if (data.events[i].datetime.diff(currentDate, 'days') != 0 ){
                        events.upcomingEvents.push(data.events[i]);
                    }
                }

                console.log(events);
                return events;

            });


    };

    /* Get a single event */
    events.getSingleEvent = function(id)
    {
       return  $http.get(Routes.MUSEUM_SINGLE_EVENT_ROUTE + id);
    };

    /* Event */
    events.setEvent = function(event)
    {
        events.event = event;
    };

    return events;

})


/* News service for getting news articles fromt he server */
.factory('News', function($http, Routes)
    {
        var news = {};

        /* Get the news */
        news.getNews = function()
        {

            return  $http.get(Routes.MUSEUM_NEWS_ROUTE)
                .then(function(response)
                {
                    console.log("RES:");
                    console.log(response);

                    var _news = response.data;
                    console.log(_news);

                    /* Current Date */
                    var currentDate = moment(new Date("2015", "05", "23", "10", "3"));

                    /* This weeks current News */
                    news.currentNews = [];
                    for (var i = 0; i < _news.length; i++) {

                        console.log(_news[i]);
                        if (currentDate.diff(_news[i].datetime, 'days') <= 7)
                        {
                            news.currentNews.push(_news[i]);
                        }
                    }

                    /* News past week */

                    news.pastWeekNews = [];
                    for (var i = 0; i < _news.length; i++) {

                        if (currentDate.diff(_news[i].datetime, 'days') > 7)
                        {
                            news.pastWeekNews.push(_news[i]);
                        }
                    }
                    console.log(news);
                    return news;

                });
        };

        /* Get a news article by id */
        news.getNewsById = function(id)
        {
            return  $http.get(Routes.MUSEUM_SINGLE_NEWS_ROUTE + id)

        };

        /* Set a news article for the next view */
        news.setNewsArticle = function(newsArticle)
        {
            news.newsArticle = newsArticle;
        };

        /* Get the news Article */
        news.getNewsArticle = function()
        {
            return news.newsArticle;
        }

        return news;

    });