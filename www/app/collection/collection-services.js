angular.module('exhibition-services', [])


/* Manages Museum objects related features */
.factory('MuseumObjects', function($filter, Routes, $http)
{

    var museumObjects = {};


    museumObjects.getPage = function(pageNumber,searchTerm)
    {
        var queryString = "?page="+pageNumber+"&search="+searchTerm.replace(" ", "%20");
        return $http.get(Routes.COLLECTION_OBJECTS+queryString)
            .then(function(response)
            {
                return response.data;
            });
    };

    museumObjects.getById = function(id)
    {
        return $http.get(Routes.COLLECTION_SINGLE_OBJECT + id)
            .then(function(response)
            {
               return response.data;
            });
    };



    return museumObjects;

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

            findByBeacons: function(beacons)
            {
                //TODO: HTTP Request for exhibitions linked with iBeacons

                var beaconIdArray = [];

                for(var i = 0; i < beacons.length ;i++)
                {
                    var beaconID = beacons[i].proximityUUID + beacons[i].major + beacons[i].minor;

                    beaconIdArray.push(beaconID);

                }

                var exhibitions = dummyExhibitions.getByBeaconId(beaconIdArray);
                return exhibitions;
            }
        }
    });
