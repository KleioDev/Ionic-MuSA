angular.module('app-services', [])

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
        "collection":
        {
            "buttonBar":{
                "nearMeButton": "Near Me",
                "objectsButton": "Objects",
                "exhibitionsButton": "Exhibitions"
            },

            "singleObject":
            {
                "readMoreLabel": "Read More",
                "listenLabel": "Listen!",
                "videosLabel": "Videos",
                "archivesLabel": "Archives",
                "audioLabel": "Recordings",
                "imagesLabel":  "Images"
            }



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