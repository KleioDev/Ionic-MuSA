angular.module('starter.services', [])

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
                    "directions": "Directions",
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
                    "descriptionLabel": "Description"
                },

                "news":
                {
                    "recentNewsLabel": "Recent News",
                    "lastNewsLabel": "Last Week"

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

//.factory('GeneralInfo', function($http){
//        {
//            var GeneralInfo = {};
//
//            GeneralInfo.get = function (applicationId, callback) {
//
//                //$http.get(/* Museum Route goes Here */).success(function(data)
//                //{
//                //
//                //    callback(data);
//                //})
//
//            };
//
//            return GeneralInfo;
//        }
//});
    .factory('MuseumSegmentedControlService', function()
    {

        var segmentedControlState = {
            "generalState": true,
            "eventsState":false,
            "newsState":false
        };

        return {
            get :function(){ return segmentedControlState;},

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

.factory('Events', function()
{


    var events = [

        {
            id: 273,
            title: "Museum Inauguration",
            date: "June 2, 2015",
            description: "Museum will finally open after 13 years!",
            time: "10:30 AM"
        },
        {
            id: 300,
            title: "Speech - Zorali de Feria",
            date: "June 2, 2015",
            time: "1:00 PM"
        },

        {

            id: 301,
            title: "Social Activity",
            date: "June 9, 2015",
            time: "11:00 AM"
        },
        {
            id: 303,
            title: "Short Movie",
            date: "June 9, 2015",
            time: "3:00PM"
        },
        {
            id: 305,
            title:"Cafe Opening",
            date: "June 11, 2015",
            time: "8:3AM"
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
            var today = "June 2, 2015";
            var eventsToday = [];
            for (var i = 0; i < events.length; i++) {
                if (events[i].date == today) {
                   eventsToday.push(events[i]);
                }


            }
            return eventsToday;
        },

        getUpcomingEvents: function()
        {
            /* Get upcoming events */
            var today = "June 2, 2015";
            var upcomingEvents = [];
            for (var i = 0; i < events.length; i++) {
                if (events[i].date != today) {
                    upcomingEvents.push(events[i]);
                }
            }
            return upcomingEvents;
        }


    }
})

.factory('News', function()
    {
        var news = [
            {



            }




        ]

    })