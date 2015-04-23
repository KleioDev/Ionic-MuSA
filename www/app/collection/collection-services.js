angular.module('exhibition-services', [])


/* Manages Museum objects related features */
.factory('MuseumObjects', function($filter, Routes, $http)
{

    var museumObjects = {};

    var PER_PAGE = 10;

    museumObjects.getPage = function(pageNumber,searchTerm)
    {
        return $http.get(Routes.COLLECTION_OBJECTS, {
            params: {
                page: pageNumber,
                title: searchTerm,
                per_page: PER_PAGE,
                artist: searchTerm

            }});
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
        var PER_PAGE = 4;

        exhibitions.getPage = function(pageNumber, searchTerm)
        {
            return $http.get(Routes.COLLECTION_MUSEUM_EXHIBITIONS,{
                params: {
                    page: pageNumber,
                    title: searchTerm,
                    per_page: PER_PAGE
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

            var _params = {};
            for(var i = 0; i < beacons.length; i++)
            {
                _params["beacon"+(i+1)] = beacons[i];
            }

            return $http.get(Routes.COLLECTION_NEAR_ME,
                {params: _params});
        };


        return exhibitions;

    });
