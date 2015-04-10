angular.module('app-services', ['ngCordova'])

    /* Service for managing the AppNavigation Labels */
    .factory('AppNavigationTitles', function($rootScope)
    {

        /* Default language */
        var lang = "ENGLISH";

        /* Multiple Language Support */
        var languages = [

            {
                "lang": "English",
                "english": "English",
                "spanish" : "Inglés"
            },
            {
                "lang": "Español",
                "english": "Spanish",
                "spanish": "Español"
            }
        ];


        /* Labels for each language */
        var languageLabels = {

            "english": {
                "title": "MuSA",
                "app":
                {
                    "noConnectionLabel": "No Internet Connection Found!",
                    "noConnectionContent": "Internet access is required to use this app",
                    "httpErrorLabel": "The server can't be reached at this time."
                },
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
                        "directionsButtonLabel": "Directions",
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
                        "addToCalendarLabel": "Add To Calendar",

                        "dialogCalendar": {

                            addToCalendarQuestion: "Add to Calendar?",
                            successDialog: "Success!",
                            successBody: "Event was successfully added to your calendar!",
                            failureBody: "Could not add event to your calendar at this time.",
                            failureDialog: "Failure!"
                        }
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
                        "imagesLabel":  "Images",

                        "descriptionLabel": "Description"
                    },

                    "exhibitionView":
                    {
                        "title": "Exhibitions",
                        "objectsLabel": "Works of Art",
                        "description": "Description"
                    },

                    "nearMeView": {
                        "searchingForBeaconsLabel": "Searching for Exhibitions Near You..."
                    }


                },

                "scanner":
                {
                    "scanObjectsLabel": "Scan Object QR Code",
                    "matchHuntLabel": "Match Hunt",
                    "takeAGuessLabel": "Take A Guess"


                },
                "map":
                {
                    "entryLevelButtonLabel": "Entry",
                    "basementLevelButtonLabel": "Basement"

                },
                "user": {
                    "linkFacebookAccountLabel": "Link Facebook Account",
                    "unlinkFacebookAccountLabel": "Unlink Facebook Account",
                    "notificationsLabel": "Notifications",
                    preferencesLabel: "Preferences",
                    "fontSizeLabel": "Font Size",
                    "languageLabel": "Language",
                    "sendFeedbackLabel": "Send Feedback",

                    "aboutLabel": "About",
                    "termsOfServiceLabel": "Terms of Service",
                    "emailLabel": "Email",
                    "pointsLabel": "Points",
                    "leaderboardLabel": "Leaderboards",
                    "languagesAvailable": languages,
                    feedbackForm: {
                        title: "Send Feedback",
                        titleLabel: "Title",
                        titlePlaceholder: "Message Title",
                        categoryLabel: "Category",
                        generalFeedbackLabel: "General Feedback",
                        applicationBugLabel: "Report an Application Bug",
                        exhibitionContentLabel: "Problem with Exhibition Content",

                        messageLabel: "Message",
                        popUpTitleSuccessLabel: "Success!",
                        popUpMessageSuccessLabel: "Your feedback has been received!",

                        popUpTitleMissingLabel: "Missing Fields!"


                    }



                }
            },

            spanish:
            {
                "title": "MuSA",
                /* Museum Tab navigation Lang */
                "museum":
                {

                    /* Museum page Segmented Control */
                    "buttonBar":
                    {
                        "generalButton":"General",
                        "eventsButton": "Eventos",
                        "newsButton": "Noticias"
                    },
                    /* General nav buttons */
                    "general": {

                        "hoursOfOperation": "Horarios",
                        "directions": "Location",
                        "directionsButtonLabel": "Direcciones",
                        "links": "Links"

                    },


                    "events": {

                        "navHappeningToday": "Eventos Hoy",
                        "navUpcomingToday": "Proximos Eventos"
                    },

                    "eventsSingle": {
                        "titleLabel": "Evento",
                        "eventDateLabel": "Fecha",
                        "eventTimeLabel": "Hora",
                        "eventLocationLabel": "Lugar",
                        "descriptionLabel": "Descripción",
                        "addToCalendarLabel": "Añadir al Calendario",

                        "dialogCalendar": {

                            addToCalendarQuestion: "Añadir al Calendario?",
                            successDialog: "Success!",
                            successBody: "Event was successfully added to your calendar!",
                            failureBody: "Could not add event to your calendar at this time.",
                            failureDialog: "Failure!"
                        }
                    },

                    "news":
                    {
                        "recentNewsLabel": "Esta Semana",
                        "lastNewsLabel": "Pasados"

                    },

                    "newsSingle": {

                        "titleLabel": "Noticias"
                    }
                },
                "collection":
                {
                    "buttonBar":{
                        "nearMeButton": "Cerca",
                        "objectsButton": "Articulos",
                        "exhibitionsButton": "Exhibiciones"
                    },

                    "singleObject":
                    {
                        "readMoreLabel": "Read More",
                        "listenLabel": "Listen!",
                        "videosLabel": "Videos",
                        "archivesLabel": "Archives",
                        "audioLabel": "Recordings",
                        "imagesLabel":  "Images"
                    },

                    "exhibitionView":
                    {
                        "title": "Exhibitions",
                        "objectsLabel": "Works of Art",
                        "description": "Description"
                    },

                    "nearMeView": {
                        "searchingForBeaconsLabel": "Searching for Exhibitions Near You..."
                    }


                },

                "scanner":
                {
                    "takeAGuessLabel": "Take A Guess"

                },
                "map":
                {
                    "entryLevelButtonLabel": "Entry",
                    "basementLevelButtonLabel": "Basement"

                },
                "user": {
                    "linkFacebookAccountLabel": "Link Facebook Account",

                    "notificationsLabel": "Notificaciones",
                    preferencesLabel: "Preferencias",
                    "fontSizeLabel": "Font Size",
                    "languageLabel": "Idioma",
                    "sendFeedbackLabel": "Enviar Comentarios",

                    "aboutLabel": "Información",
                    "termsOfServiceLabel": "Terminos de Uso",

                    "languagesAvailable": languages,

                    feedbackForm: {
                        title: "Send Feedback"
                    }


                }
            }
        };
        var navigation = {};

        navigation.labels = languageLabels.english;

        return {

            /* Return the labels */
            get: function()
            {
                return navigation.labels;
            },

            /* Apply a change to the language*/
            apply: function(language)
            {
                navigation.labels = languageLabels[language.english.toLowerCase()];
            }
        };
    })

    /* ibeacon Serice */
    .factory('iBeacons', function($rootScope)
    {
        var beacons = [];

        var beaconsNear = [];

        var ranging = false;

        /* Variable to check if states have changed */
        var pastState = false;

        /* iBeacon proximity */
        var proximity  = {
            "unknown": 0,
            "immediate": 1,
            "near": 2,
            "far": 3

        };
        return        {


            get: function()
            {
                return beacons;
            },
            startRanging :  function() {


                console.log("Start Ranging");
                ranging = true;
                /* Request Authorization */
                estimote.beacons.requestAlwaysAuthorization();

                /* Start ranging for iBeacons */
                estimote.beacons.startRangingBeaconsInRegion({}, processBeacon, onFailure);

                //TODO: Finish iBeacon Search

                /* Handles the ibeacons found */
                function processBeacon(rangedBeacons)
                {
                    var beaconsChanged = pastState;

                    var foundBeacons = rangedBeacons.beacons;
                    var nearFoundBeacons = [];

                    /* Only store the ones that are near */
                    for(var i = 0; i < foundBeacons.length; i++)
                    {

                        if(foundBeacons[i].proximity == proximity.near || foundBeacons[i].proximity == proximity.immediate)
                        {
                            nearFoundBeacons.push(foundBeacons[i]);
                        }
                    }

                    /* If lengths are different a state has changed */
                    if(beacons.length == 0 && nearFoundBeacons.length != 0)
                    {
                        beacons = nearFoundBeacons;
                        beaconsChanged = !pastState;
                    }

                    /* If lengths are different a state has changed */
                    else if(nearFoundBeacons.length == 0 && beacons.length != 0)
                    {
                        beacons = nearFoundBeacons;
                        beaconsChanged = !pastState;
                    }

                    /* Check if the stored beacons and the newly found beacons are the same */
                    else {

                        /* Iterate through all the found beacons */
                        for (var i = 0; i < nearFoundBeacons.length; i++) {
                            var foundBeaconId = nearFoundBeacons[i].proximityUUID + nearFoundBeacons[i].major + nearFoundBeacons[i].minor;

                            /* Go through all the stored beacons */
                            var found = false;
                            for (var k = 0; k < beacons.length; k++) {
                                var beaconID = beacons[k].proximityUUID + beacons[k].major + beacons[k].minor;

                                if (foundBeaconId == beaconID) {
                                    found = true;
                                }

                            }
                            /* if an iBeacon doesn't match, a state change has happened */
                            if (!found) {
                                beacons = nearFoundBeacons;
                                beaconsChanged = !pastState;
                            }


                        }
                    }

                    /* No State Change */
                    if(pastState == beaconsChanged)
                    {
                        //console.log("STATE CHANGED: " + false)
                    }
                    /* State Change */

                    else
                    {
                        pastState = !pastState;
                        console.log("State changed true");
                        console.log(beacons);
                        /* Broadcast change */
                        var message = {};
                        message.beacons = beacons;

                        $rootScope.$broadcast('beacons:stateChange',{});

                    }
                }

                function onFailure(){

                    console.log("iBeacon FAILURE");
                }


            },
            stopRanging: function()
            {
                console.log("Stopping Range");
                ranging = false;
                estimote.beacons.stopRangingBeaconsInRegion({});

            },

            /* Toggles the ranging of iBeacons */
            toggleRanging: function()
            {
                if(!ranging) {
                    this.startRanging();
                }

                else {
                    this.stopRanging();
                }
            }

        };

    })


    /* Service handles Facebook calls */
    .factory('Facebook', function($cordovaFacebook, $ionicLoading)
    {
        /* User info */
        var user = {


        };

        user.loginStatus = false;
        user.userInfo = {};


        return {

            getUser: function()
            {
                return user;
            },

            /* Logins the user */
            login: function()
            {
                var loading = $ionicLoading.show({
                    template: '<ion-spinner icon="ios"></ion-spinner>                '
                });
                var me = this;
                $cordovaFacebook.login([ "public_profile","email"])
                    .then(function(data) {


                        if(data.status == 'connected') {
                            user.loginStatus = true;

                            me.getUserInfo();
                        }
                        else{
                            loading.hide();

                            user.loginStatus= false;
                        }
                        /* Get user info */
                        loading.hide();

                    }, function (error) {
                        loading.hide();
                        // error
                    });


            },

            logout: function()
            {
                $cordovaFacebook.logout()
                    .then(function(success) {

                        user.loginStatus = false;
                    }, function (error) {
                        // error
                    });

            },

            isLoggedIn: function()
            {

                //var loading = $ionicLoading.show({
                //    template: '<ion-spinner icon="spinner"></ion-spinner>                '
                //});
                var loading = $ionicLoading.show(  {content: 'Showing Loading Indicator!',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 500});

                var me = this;
                $cordovaFacebook.getLoginStatus()
                    .then(function(success) {

                        console.log("GETTING LOGIN STATUS");
                        if(success.status == 'connected') {
                            user.loginStatus = true;
                            loading.hide();

                            me.getUserInfo();
                        }
                        else{
                            loading.hide();

                            user.loginStatus= false;
                        }
                        console.log(success);

                    }, function (error) {

                        // error
                    });
            },

            getUserInfo: function()
            {
                var loading = $ionicLoading.show(  {content: 'Showing Loading Indicator!',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200,
                    showDelay: 500});

                $cordovaFacebook.api("me", ["public_profile", "email"])
                    .then(function(success) {
                        console.log("GOT INFO");
                        console.log(success);
                        user.userInfo = success;
                        user.userInfo.points  = 20;
                        loading.hide();


                    }, function (error) {
                        loading.hide();

                        // error
                    });

            }


        }
    })


    /* Service handles user preferences */
    .factory('UserPreferences', function(AppNavigationTitles, $rootScope, $ionicLoading)
    {

        var preferences = {

            "notifications": true,
            "fontSize": "14px",
            "language":  {
                "lang": "English",
                "english": "English",
                "spanish" : "Inglés"
            }


        };

        return {

            get: function()
            {
                return preferences;
            },

            /* Set the language */
            setLanguage: function(language)
            {
                preferences.language = language;

                AppNavigationTitles.apply(language);

                /* Broadcast Message to Every Controller */

                $rootScope.$broadcast('preferences:updated',{});

            },

            getLanguage: function()
            {
                return preferences.language;
            },

            getAbout: function()
            {
                /* Dummy data for the About Page */
                return { "title" : "About",

                    "content":   "<h1>Lorem ipsum dolor sit amet consectetuer adipiscing"
                    + " elit</h1>"


                    + "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing"
                    + 'elit. Aenean commodo ligula eget dolor. Aenean massa.Cum sociis natoque penatibus et magnis dis parturient             montes, nascetur ridiculus mus. Donec quam felis,ultricies nec, pellentesque eu, pretium quis, sem.</p> <blockquote>Lorem ipsum dolor sit amet, consectetueradipiscing elit. Aenean commodo ligula eget dolor.Aenean massa <strong>strong</strong>. Cum sociisnatoque penatibus et magnis dis parturient montes,nascetur ridiculus mus. Donec quam felis, ultriciesnec, pellentesque eu, pretium quis, sem. Nulla consequatmassa quis enim. Donec pede justo, fringilla vel,aliquet nec, vulputate eget, arcu. In <em>em</em>enim justo, rhoncus ut, imperdiet a, venenatis vitae,justo. Nullam <a class="external ext" href="#">link</a>dictum felis eu pede mollis pretium. </blockquote>'
                }



            },

            getTerms: function()
            {
                /* Dummy data for terms of service */
                return { "title" : "Terms of Service",

                    "content":   "<h1>Lorem ipsum dolor sit amet consectetuer adipiscing"
                    + " elit</h1>"


                    + "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing"
                    + 'elit. Aenean commodo ligula eget dolor. Aenean massa.Cum sociis natoque penatibus et magnis dis parturient             montes, nascetur ridiculus mus. Donec quam felis,ultricies nec, pellentesque eu, pretium quis, sem.</p> <blockquote>Lorem ipsum dolor sit amet, consectetueradipiscing elit. Aenean commodo ligula eget dolor.Aenean massa <strong>strong</strong>. Cum sociisnatoque penatibus et magnis dis parturient montes,nascetur ridiculus mus. Donec quam felis, ultriciesnec, pellentesque eu, pretium quis, sem. Nulla consequatmassa quis enim. Donec pede justo, fringilla vel,aliquet nec, vulputate eget, arcu. In <em>em</em>enim justo, rhoncus ut, imperdiet a, venenatis vitae,justo. Nullam <a class="external ext" href="#">link</a>dictum felis eu pede mollis pretium. </blockquote>'
                }
            }
        }


    })

    /* Match Hunt game */
    .factory('MatchHunt', function($ionicLoading)
    {
        var currentId = 0;


        var currentMatchHunt = {};

        return {

            getMatchHunt: function (){

                //TODO: HTTP Request for ID
                //Send Random ID
                /* Loading */
                /* Get a match hunt object */

                currentId = 1;

                currentMatchHunt = {
                    match_hunt_id: 1,
                    hearts: 2,
                    points: 30,
                    img_href : 'img/placeholder2.png'
                }

                return currentMatchHunt;

            },
            get: function()
            {
                return currentMatchHunt;
            }
        }


    })

    .factory('SegmentedControl', function()
    {

        var segmentedControls = [];


        function SegmentedControl(name,states,  initialState)
        {
            this.name = name;
            this.state = initialState;
            this.states = states;

            this.set = function(state)
            {
                this.state = state;
            }
        }

        return {

            create: function(name, states, initialState)
            {
                if(this.exists(name))
                {
                    return this.get(name);
                }
                else {
                    var segControl = new SegmentedControl(name, states, initialState);
                    segmentedControls.push(segControl);
                    return segControl;
                }

            },

            get: function(name)
            {

                for(var i = 0; i < segmentedControls.length; i++)
                {
                    if(segmentedControls[i].name == name)
                    {
                        return segmentedControls[i];
                    }

                }

                return null;
            },

            set: function(name, state)
            {
                for(var i = 0; i < segmentedControls.length; i++)
                {
                    if(segmentedControls[i].name == name)
                    {
                        console.log(state);
                        segmentedControls[i].set(state);
                    }

                }
            },

            exists: function(name)
            {
                for(var i = 0; i < segmentedControls.length; i++)
                {
                    if(segmentedControls[i].name == name)
                    {
                        return true;
                    }

                }

                return false;

            }


        }


    })

    /* Service for figuring out if there is a connection available for the app */
    .factory('Connection', function($ionicPopup)
    {

        return {

            /* Checks if connection is available */
            checkConnection: function()
            {


                //var networkState = navigator.connection.type;
                //
                //var states = {};
                //states[Connection.UNKNOWN]  = 'Unknown connection';
                //states[Connection.ETHERNET] = 'Ethernet connection';
                //states[Connection.WIFI]     = 'WiFi connection';
                //states[Connection.CELL_2G]  = 'Cell 2G connection';
                //states[Connection.CELL_3G]  = 'Cell 3G connection';
                //states[Connection.CELL_4G]  = 'Cell 4G connection';
                //states[Connection.CELL]     = 'Cell generic connection';
                //states[Connection.NONE]     = 'No network connection';
                //
                //
                //if(states[Connection.NONE] == states[networkState])
                //{
                //    return false;
                //}
                //else
                //{
                //    return true;
                //}

                return true;



            }
        }
    })

    .factory('Routes', function()
    {
        var VERSION = "/v1";

        var routes = {

            /* API Version */
            //======== Museum Routes ========//

            /* Museum */
            MUSEUM_GENERAL_ROUTE : VERSION + "/museum/general",

            /* Events */
            MUSEUM_EVENTS_ROUTE :  VERSION + "/museum/events",
            MUSEUM_SINGLE_EVENT_ROUTE : VERSION+ "/museum/events/",

            /* News */
            MUSEUM_NEWS_ROUTE : VERSION + "/museum/news",
            MUSEUM_CURRENT_NEWS_ROUTE : VERSION + "/museum/news",
            MUSEUM_SINGLE_NEWS_ROUTE : VERSION + "/museum/news/",

            /* Collection */
            COLLECTION_OBJECTS: VERSION + "/objects",
            COLLECTION_SINGLE_OBJECT: VERSION + "/objects/",
            COLLECTION_MUSEUM_EXHIBITIONS: VERSION + "/exhibitions"
        };

        return routes;

    })

// register the interceptor as a service
.factory('HTTPInterceptor', function($q, $rootScope) {

        return {
        // optional method
        'request': function(config) {
            // do something on success
            $rootScope.$broadcast('loading:show');
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            console.log("MY MISTAKE");
            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            $rootScope.$broadcast('loading:hide');
            return response;
        },

        // optional method
        'responseError': function(rejection) {
            $rootScope.$broadcast('loading:hide');
            $rootScope.$broadcast('http:error');
            return $q.reject(rejection);
        }
    };
});

