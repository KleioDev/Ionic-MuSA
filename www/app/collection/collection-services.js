angular.module('exhibition-services', [])


/**
 * @ngdoc service
 * @name Artifacts
 * @description Service for retrieving artifact information from the MuSA API. Essentially it supports pagination as well as search functionality for artifcat title and artist name. *
 *
 * Requires Routes and {@link https://docs.angularjs.org/api/ng/service/$http | $http} services
 *  @requires Routes, $q, $http
 *
 */.factory('MuseumObjects', function($q, Routes, $http)
{

    var museumObjects = {};

    var PER_PAGE = 10;


     /**
      * Returns a page from the MuSA API containing a 'limit' of artifacts per page.
      * @memberOf Artifacts
      * @param pageNumber the number of the page to be fetched
      * @param searchTerm search term that will be used to query the MusA API
      * @param limit number of artifacts per page retrieved
      * @returns {*}
     */

     var getPage = function(pageNumber,searchTerm, limit)
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
                if(response.status == 200)
                {
                    return response.data.artifacts;
                }
                return [];
            }

            function pageRetrievalFailure(response)
            {

                console.log("retrieval failure");
                console.log("FAILED TO GET ARTIFACTS");
                console.log("STATUS: " + response.status);
                console.log("DATA: " + response.data);
                if(response.status == 404)
                {
                    response.data = {
                        artifacts : []
                    }

                }
                return [];

            }

    };

    /**
     * @memberOf Artifacts
     * @param id ID of the artifact to be retrieved
     * @returns If the response is successful (200) it returns the data of the object, else it returns an empty object
     */
    var getById = function(id, _params)
    {
        var params = {};
        if(params)
        {
            params =_params;
        }
        var request = {

            url: Routes.COLLECTION_SINGLE_OBJECT + id,
            params: params,
            method: 'GET'
        };

        return $http(request)
            .then(successArtifact, failureArtifact);


        function successArtifact(response)
        {
            if(response.status == 200) //IF OK
            {
                console.log("ARTIFACT");
                console.log(response.data);
                return response.data;
            }
        }

        function failureArtifact(response)
        {
            if(response.status == 404)
            {
                return $.reject('Artifact could not be received');
            }
            return null;
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

/**
 * @ngdoc service
 * @name Exhibitions
 * @description Service for retrieving exhibition information from the MuSA API. Essentially it supports pagination as well as search functionality for exhibition title.
 *
 * Requires Routes and {@link https://docs.angularjs.org/api/ng/service/$http | $http} services
 *  @requires Routes, $q, $http
 *
 */
.factory('Exhibitions', function($q, Routes, $http)
    {

        var exhibitions = {};
        var PER_PAGE = 10;


        /**
         * Returns a page from the MuSA API containing a 'limit' of exhibitions per page.
         * @memberOf Exhibitions
         * @param pageNumber the number of the page to be fetched
         * @param searchTerm search term that will be used to query the MusA API
         * @param limit number of exhibitions per page retrieved
         *
         * @example
         * //AngularJS Controller, inject the Exhibitions service
         * .controller('ExampleController', function(Exhibitions){
     *      var id = 2;
     *      Exhibitions.getPage(1, "", 4).then(function(exhibitions){
     *
     *          $scope.exhibitions = $scope.exhibitions.concat(exhibitions);

     *
     *
     *      });
     * });
         * @returns an array containing exhibitions
         */
        var getPage = function(pageNumber, searchTerm, limit)
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

        /**
         * Returns a page from the MuSA API containing a 'limit' of exhibitions per page.
         * @memberOf Exhibitions

         * @param ID ID of the exhibition to be retrieved
         *
         * @example
         * //AngularJS Controller, inject the Exhibitions service
         * .controller('ExampleController', function(Exhibitions){
     *      var id = 2;
     *      Exhibitions.getById(1).then(function(exhibition){
     *
     *          console.log(exhibition);
     //          {
     //               "id": 2,
     //               "title": "Agustin Stahl",
     //               "description": "Green leaves",
     //               "image": null,
     //               "active": true,
     //
     //               "createdAt": "2015-04-13T17:03:25.012Z",
     //               "updatedAt": "2015-04-13T17:03:25.012Z",
     //               "deletedAt": null,
     //               "Artifacts": [],
     //               "Beacons": []
     //           }
     *          $scope.exhibitions = exhibition;

     *
     *
     *      });
     * });
         * @returns the exhibition to be found, if it is null then no exhibition was found
         */

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
                return null;
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

        /**
         *
         * @example
         * //AngularJS Controller, inject the Exhibitions service
         * .controller('ExampleController', function(Exhibitions){
     *      var id = 2;
     *      Exhibitions.getById(1).then(function(exhibition){
     *
     *          console.log(exhibition);
     //          {
     //               "id": 2,
     //               "title": "Agustin Stahl",
     //               "description": "Green leaves",
     //               "image": null,
     //               "active": true,
     //
     //               "createdAt": "2015-04-13T17:03:25.012Z",
     //               "updatedAt": "2015-04-13T17:03:25.012Z",
     //               "deletedAt": null,
     //               "Artifacts": [],
     //               "Beacons": []
     //           }

         * @memberOf Exhibitions
         * @param beacons An array of IDs from the scanned iBeacons in the area
         * @returns Array of JSON objects containing iBeacons
         */
        var findByBeacons = function(beacons)
        {

            var _params = {};
            for(var i = 0; i < beacons.length; i++)
            {
                _params["beacon"+(i+1)] = beacons[i];
            }

            return $http.get(Routes.COLLECTION_NEAR_ME,
                {params: _params}).then(beaconSuccess, beaconFailure);

            function beaconSuccess(response)
            {
                if(response.status == 200)
                {
                    if(response.data)
                    {
                        return response.data.exhibitions;
                    }
                    else
                    {
                        return [];
                    }
                }

                else
                {
                    return [];
                }
            }

            function beaconFailure(response)
            {
                console.log("BEACON FAILED BEACAUSE: " + response.status + "\n DATA : " + response.data);
                return [];
            }
        };


        return {

            getPage: getPage,
            getById: getById,
            setActiveExhibition: setActiveExhibition,
            getActiveExhibition: getActiveExhibition,
            findByBeacons: findByBeacons
        };

    });
