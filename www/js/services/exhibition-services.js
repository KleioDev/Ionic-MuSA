angular.module('exhibition-services', [])

.factory('ExhibitionSegmentedControlState', function()

    {
        //var segmentedControlState = {
        //    "nearMeState": false,
        //    "objectsState":true,
        //    "exhibitionsState":false
        //};

        var segmentedControlState = {};
        segmentedControlState.state = 'objects';
        return {
            get :function(){

                return segmentedControlState;
            },

            set: function(state){

                /* SHOULD BE A BETTER WAY OF DOING THIS */
                segmentedControlState.state = state;


            }

        };




    })

.factory('MuseumExhibitions', function()
    {



    })


.factory('MuseumObjects', function($filter)
{



    var museumObjects =
        [

        ];

    return {
        all: function()
        {
            return museumObjects;
        },

        getPage: function(pageNumber, searchTerm)
        {
            //TODO: HTTP Requests
            if(pageNumber == 0)
            {
                museumObjects.length = 0;
            }
            var results = dummyMuseumObjects.getSearchResults(searchTerm,$filter, pageNumber);
            //console.log("Results: " );
            //console.log(results);
            for(var i = 0; i < results.objects.length; i++)
            {
                museumObjects.push(results.objects[i]);
            }

            return results.morePages;
        },

        get: function(objectId) {
            /* Http get request */
            //TODO: Object HTTP Request
            for (var i = 0; i < museumObjects.length; i++) {
                if (museumObjects[i].id === parseInt(objectId)) {
                    return museumObjects[i];
                }
            }
        },

        resetPage: function(){

        }
    }

})

.factory('MuseumExhibitionsNearMe', function(){



    })

.factory('Exhibitions', function($filter)
    {

        var exhibitions = [];


        return {

            all: function()
            {
                return exhibitions;
            },

            /* HTTP Request to get more information about a particular exhibition */
            get: function(exhibitionId)
            {
                /* Http get request */
                //TODO: Object HTTP Request
                for (var i = 0; i < exhibitions.length; i++) {
                    if (exhibitions[i].id === parseInt(exhibitionId)) {
                        return exhibitions[i];
                    }
                }
            },

            getPage: function(pageNumber, searchTerm) {
                //TODO: HTTP Requests
                if (pageNumber == 0) {
                    exhibitions.length = 0;
                }
                var results = dummyExhibitions.getSearchResults(searchTerm, $filter, pageNumber);

                for (var i = 0; i < results.objects.length; i++) {
                    exhibitions.push(results.objects[i]);
                }

                return results.morePages;
            },

            getByiBeacon: function(beacons, success, failure)
            {
                //TODO: HTTP Request for exhibitions linked with iBeacons


            }
        }
    });
