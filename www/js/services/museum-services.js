


/* Museum Services to handle states and data */
angular.module('museum-services', [])

//=================== Museum Services ====================//

    //TODO: Museum- Setup ajax HTTP Request functionality




    .factory('Museum', function(Routes, $http)
    {
        //TODO: SET Generic Information
        var general = {};
        general.info =
        {

            "description": "",
            "hoursOfOperation": '',
            "museumTitle": "",
            "directions":"",
            "socialMediaLinks":[]

        };

        return {

            getInfo: function()
            {
                return general;
            },

            get: function()
            {


                $http.get(Routes.MUSEUM_GENERAL_ROUTE).
                    success(function(data, status, headers, config) {

                        //console.log(data);
                        general.info = data;
                        console.log("general");

                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

                return general;


            },
            getLocation: function()
            {
                return 'http://maps.apple.com/?daddr=18.210970,-67.143084'
            }




        }

    })
    //TODO: Events- Setup ajax HTTP Request functionality

    /* Event service for getting the events from the server */
.factory('Events', function(Routes,$http)
{
    var events = {};
    events.allEvents = [];
    events.eventsToday = [];
    events.upcomingEvents = [];


    return {

        all: function() {
            return events;
        },

        getSingleEvent : function(id)
        {
            $http.get(Routes.MUSEUM_EVENTS_ROUTE + id).
                success(function(data, status, headers, config) {

                    //console.log(data);
                    events = data;


                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        },
        get: function()
        {
            var eventService = this;
            $http.get(Routes.MUSEUM_EVENTS_ROUTE).
                success(function(data, status, headers, config) {

                    console.log(data);
                    events.allEvents = data.events;
                    eventService.getEventsToday();
                    eventService.getUpcomingEvents();

                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },

        getEventsToday: function()
        {
            events.eventsToday = [];
            var currentDate = moment(new Date("2015", "05", "2"));

            for (var i = 0; i < events.allEvents.length; i++)
            {
                //console.log(events[i].datetime.diff(currentDate));
                if (events.allEvents[i].datetime.diff(currentDate,'days') == 0)
                {
                    events.eventsToday.push(events[i]);
                }
            }
        },



        getUpcomingEvents: function()
        {
            events.upcomingEvents = [];
            var currentDate = moment(new Date("2015", "05", "2"));
            for (var i = 0; i < events.allEvents.length; i++) {
                if (events.allEvents[i].datetime.diff(currentDate, 'days') != 0 ){
                    events.upcomingEvents.push(events[i]);
                }
            }
        }


    }
})


    //TODO: News - Setup ajax HTTP Request functionality
/* News service for getting news articles fromt he server */
.factory('News', function()
    {
        var news = [
            {
                id: 310,
                title: "MuSA Opens its Doors",
                content: "Lorem Ipsum",
                author: "Zorali de Feria",
                content:'<h1>Heading 1</h1>   <h2>Heading 2</h2> <h3>Heading 3</h3>  <h4>Heading 4</h4>  <h5>Heading 5</h5>  <h6>Heading 6</h6>  <div  class="more-info">More info: <a href="/html/tags/html_h1_tag.cfm"><code>&lt;h1&gt;</code></a>, <a href="/html/tags/html_h2_tag.cfm"><code>&lt;h2&gt;</code></a>, <a href="/html/tags/html_h3_tag.cfm"><code>&lt;h4&gt;</code></a>, <a href="/html/tags/html_h4_tag.cfm"><code>&lt;h4&gt;</code></a>, <a href="/html/tags/html_h5_tag.cfm"><code>&lt;h5&gt;</code></a>, and <a href="/html/tags/html_h6_tag.cfm"><code>&lt;h6&gt;</code></a>.</div>',
                datetime:  moment(new Date("2015", "05", "23", "10", "3"))

            },
            {
                id: 311,
                title: "Café is Open!",
                content: "Lorem Ipsum",
                author: "MuSA",
                datetime:  moment(new Date("2015", "05", "21", "7", "30"))


            },

            {
                id: 321,
                title: "Gift Shop has new Merchandise",
                content: "Lorem Ipsum",
                author: "Nilda",
                datetime:  moment(new Date("2015", "05", "20", "8", "10"))

            },

            {
                id: 331,
                title: "Finally reached 100 visitors",
                content: "Lorem Ipsum",
                author: "MuSA",
                datetime:  moment(new Date("2015", "05", "12", "8", "10"))
            }
        ];

        return {

            all: function() {
                return news;
            },

            get: function(id)
            {
                for (var i = 0; i < news.length; i++) {
                    if (news[i].id === parseInt(id)) {
                        return news[i];
                    }
                }
            },


            currentNews:function()
            {


                var currentDate = moment(new Date("2015", "05", "23", "10", "3"));

                /* Get today's date */
                var currentNews = [];
                for (var i = 0; i < news.length; i++) {

                    if (currentDate.diff(news[i].datetime, 'days') <= 7)
                    {
                        currentNews.push(news[i]);
                    }


                }

                return currentNews;

            },

            pastWeekNews: function()
            {
                var numDaysBetween = function(d1, d2) {
                    var diff = Math.abs(d1.getTime() - d2.getTime());
                    return diff / (1000 * 60 * 60 * 24);
                };

                var currentDate = moment(new Date("2015", "05", "23", "10", "3"));

                /* Get today's date */
                var pastWeekNews = [];
                for (var i = 0; i < news.length; i++) {

                    if (currentDate.diff(news[i].datetime, 'days') > 7)
                    {
                        pastWeekNews.push(news[i]);
                    }


                }

                return pastWeekNews;

            }
        }

    });