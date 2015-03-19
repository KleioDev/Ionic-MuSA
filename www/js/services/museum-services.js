angular.module('museum-services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('AppNavigationTitles', function()
    {

        var lang = "ENGLISH";
        var navigationTitles =
        {
            /* Museum Tab navigation Lang */
            "museum":
            {
                /* Museum page Segmented Control */
                "buttonBar":
                {
                    "generalButton":"General",
                    "eventsButton": "Events",
                    "newsButton": "News"
                },
                /* General nav buttons */
                "general": {

                    "hoursOfOperation": (lang == "ENGLISH") ? "Hours of Operation" : "Horario",
                    "directions": "Location",
                    "links": "Links"

                },


                "events": {

                    "navHappeningToday": "Happening Today",
                    "navUpcomingToday": "Upcoming Events"
                },

                "eventsSingle": {
                    "titleLabel": "Event",
                    "eventDateLabel": "Date",
                    "eventTimeLabel": "Time",
                    "eventLocationLabel": "Location",
                    "descriptionLabel": "Description",
                    "addToCalendarLabel": "Add To Calendar"
                },

                "news":
                {
                    "recentNewsLabel": "This Week",
                    "lastNewsLabel": "Past Weeks"

                },

                "newsSingle": {

                    "titleLabel": "News"
                }
            },
            "exhibitions":
            {


            },

            "scanner":
            {

            },
            "map":
            {

            },
            "user":
            {

            }
        };

        return navigationTitles;
    })

//=================== Museum Services ====================//

    .factory('MuseumSegmentedControlService', function()
    {
        var segmentedControlState = {
            "generalState": true,
            "eventsState":false,
            "newsState":false
        };

        return {
            get :function(){

                return segmentedControlState;
            },

            set: function(state){

                /* SHOULD BE A BETTER WAY OF DOING THIS */
                if(state == "general")
                {
                    segmentedControlState.generalState = true;
                    segmentedControlState.eventsState = false;
                    segmentedControlState.newsState = false;

                }
                if(state == "events")
                {
                    segmentedControlState.generalState = false;
                    segmentedControlState.eventsState = true;
                    segmentedControlState.newsState = false;

                }
                if(state == "news")
                {
                    segmentedControlState.generalState = false;
                    segmentedControlState.eventsState = false;
                    segmentedControlState.newsState = true;

                }

            }

        };

    })

    //TODO: Museum- Setup ajax HTTP Request functionality

    .factory('MuseumGeneralAccordionState', function()
    {

        var museumAccordionState = {

            "hoursOfOperation": {
                "show": false,
                "arrow": "down"
            },
            "location":{
                "show": false,
                "arrow": "down"
            },
            "links":{
                "show": false,
                "arrow": "down"
            }
        };

        var arrowDirection = function(bool)
        {
            if(bool)
                return "up";
            else
                return "down";

        };

        return {

            get: function()
            {
                return museumAccordionState;
            },
            toggle: function(state)
            {
                if(state == "hoursOfOperation")
                {
                    museumAccordionState.hoursOfOperation.show = !museumAccordionState.hoursOfOperation.show;
                    museumAccordionState.hoursOfOperation.arrow =  arrowDirection(museumAccordionState.hoursOfOperation.show);


                }
                if(state == "location")
                {
                    museumAccordionState.location.show = !museumAccordionState.location.show;
                    museumAccordionState.location.arrow = arrowDirection(museumAccordionState.location.show);
                }
                if(state == "links")
                {
                    museumAccordionState.links.show = !museumAccordionState.links.show ;
                    museumAccordionState.links.arrow =  arrowDirection(museumAccordionState.links.show);

                }

            }

        }
    })
    //TODO: Events- Setup ajax HTTP Request functionality
.factory('Events', function()
{


    var events = [

        {
            id: 273,
            title: "Museum Inauguration",
            description: "Museum will finally open after 13 years!",
            datetime:  moment(new Date("2015", "05", "2", "10", "30"))

        },
        {
            id: 300,
            title: "Speech - Zorali de Feria",
            datetime:  moment(new Date("2015", "05", "2", "13", "00"))

        },

        {

            id: 301,
            title: "Social Activity",
            datetime:  moment(new Date("2015", "05", "9", "11", "00"))

        },
        {
            id: 303,
            title: "Short Movie",
            datetime:  moment(new Date("2015", "05", "9", "15", "00"))

        },
        {
            id: 305,
            title:"Cafe Opening",
            datetime:  moment(new Date("2015", "05", "11", "8", "30"))

        }

    ];

    return {

        all: function() {
            return events;
        },
        get: function(id)
        {
            for (var i = 0; i < events.length; i++) {
                if (events[i].id === parseInt(id)) {
                    return events[i];
                }
            }
        },

        getEventsToday: function()
        {
            /* Get today's date */
            var currentDate = moment(new Date("2015", "05", "2"));

            var eventsToday = [];
            for (var i = 0; i < events.length; i++)
            {
                //console.log(events[i].datetime.diff(currentDate));
                if (events[i].datetime.diff(currentDate,'days') == 0)
                {
                   eventsToday.push(events[i]);
                }
            }
            return eventsToday;
        },

        getUpcomingEvents: function()
        {
            /* Get upcoming events */
            var currentDate = moment(new Date("2015", "05", "2"));
            var upcomingEvents = [];
            for (var i = 0; i < events.length; i++) {
                if (events[i].datetime.diff(currentDate, 'days') != 0 ){
                    upcomingEvents.push(events[i]);
                }
            }
            return upcomingEvents;
        }


    }
})


    //TODO: News - Setup ajax HTTP Request functionality

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