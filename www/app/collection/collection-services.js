angular.module('exhibition-services', [])


/* Manages Museum objects related features */
.factory('MuseumObjects', function($filter, Routes, $http)
{

    var museumObjects = {};

    museumObjects.getPage = function(pageNumber,searchTerm)
    {
        return $http.get(Routes.COLLECTION_OBJECTS, {
            params: {
                pageNumber: pageNumber,
                searchTerm: searchTerm
            }})
            .then(function(response)
            {
                return response.data.artifacts;
            });
    };

    museumObjects.getById = function(id)
    {
        return $http.get(Routes.COLLECTION_SINGLE_OBJECT + id);
    };


    museumObjects.setActiveObject = function(object)
    {
        museumObjects.activeObject = object;
    };

    museumObjects.getActiveObject = function()
    {
        return museumObjects.activeObject;
    };


    return museumObjects;

})

.factory('Exhibitions', function($filter, Routes, $http)
    {

        var exhibitions = {};

        exhibitions.getPage = function(pageNumber, searchTerm)
        {
            return $http.get(Routes.COLLECTION_MUSEUM_EXHIBITIONS,{
                params: {
                    pageNumber: pageNumber,
                    searchTerm: searchTerm
                }})
                .then(function(response)
                {
                    return response.data.exhibitions;
                });
        };

        exhibitions.getById = function(id)
        {
            return $http.get(Routes.COLLECTION_SINGLE_EXHIBITION + id);
        };


        exhibitions.setActiveExhibition = function(object)
        {
            exhibitions.activeObject = object;
        };

        exhibitions.getActiveExhibition = function()
        {
            return exhibitions.activeObject;
        };

        exhibitions.findByBeacons = function(beacons)
        {
            return $http.get(Routes.COLLECTION_NEAR_ME,
                {params: {
                    beacons: beacons
                }});
        };


        return exhibitions;

    });
