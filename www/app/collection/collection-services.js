angular.module('exhibition-services', [])


/* Manages Museum objects related features */
.factory('MuseumObjects', function($q, Routes, $http)
{

    var museumObjects = {};

    var PER_PAGE = 10;

    var getPage = function(pageNumber,searchTerm)
    {
        return $http.get(Routes.COLLECTION_OBJECTS, {
            params: {
                page: pageNumber,
                title: searchTerm,
                per_page: PER_PAGE

            }})
            .then(pageRetrievalSuccess, pageRetrievalFailure);


            function pageRetrievalSuccess(response)
            {
                return response;
            }
            function pageRetrievalFailure(response)
            {

                console.log("retrieval failure");
                if(response.status == 404)
                {
                    response.data = {
                        artifacts : []
                    }

                }
                return response;

            }

    };

    var getById = function(id)
    {
        return $http.get(Routes.COLLECTION_SINGLE_OBJECT + id)
            .then(successArtifact, failureArtifact);


        function successArtifact(response)
        {
            if(response.status == 200) //IF OK
            {
                return response.data;
            }
        }

        function failureArtifact(response)
        {
            if(response.status == 404)
            {
                return $.reject('Artifact could not be received');
            }
        }
    };


    var setActiveObject = function(object)
    {
        museumObjects.activeObject = object;
    };

    var getActiveObject = function()
    {
        return museumObjects.activeObject;
    };


    return {

        getPage: getPage,
        getById: getById,
        setActiveObject: setActiveObject,
        getActiveObject: getActiveObject
    };

})

.factory('Exhibitions', function($q, Routes, $http)
    {

        var exhibitions = {};
        var PER_PAGE = 10;

        var getPage = function(pageNumber, searchTerm)
        {
            return $http.get(Routes.COLLECTION_MUSEUM_EXHIBITIONS,{
                params: {
                    page: pageNumber,
                    title: searchTerm,
                    per_page: PER_PAGE
                }})
                .then(


                function(response)
                {
                    return response.data.exhibitions;
                },
                function(err)
                {
                    return [];
                }

            );
        };

        var getById = function(id)
        {
            return $http.get(Routes.COLLECTION_SINGLE_EXHIBITION + id)
                .then(success, failure);

            function success(response)
            {
                console.log("Exhibition");


                    return response.data;


            }
            function failure(err)
            {
                return $q.reject('Exhibition not Found');
            }
        };


        var setActiveExhibition = function(object)
        {
            exhibitions.activeObject = object;
        };

        var getActiveExhibition = function()
        {
            return exhibitions.activeObject;
        };

        var findByBeacons = function(beacons)
        {

            var _params = {};
            for(var i = 0; i < beacons.length; i++)
            {
                _params["beacon"+(i+1)] = beacons[i];
            }

            return $http.get(Routes.COLLECTION_NEAR_ME,
                {params: _params});
        };


        return {

            getPage: getPage,
            getById: getById,
            setActiveExhibition: setActiveExhibition,
            getActiveExhibition: getActiveExhibition,
            findByBeacons: findByBeacons
        };

    });
