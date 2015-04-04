angular.module('collection-controllers', [])

.controller('ExhibitionSegmentedCtrl', function($scope, AppNavigationTitles, ExhibitionSegmentedControlState, Exhibitions, iBeacons)
{
    var segmentedControlState = ExhibitionSegmentedControlState;

    $scope.navigationTitles = AppNavigationTitles.get().collection;

    $scope.segmentedControl = segmentedControlState.get();

    $scope.changeSegmentedControlState = function(state)
    {
        segmentedControlState.set(state);
    };


    $scope.$on('preferences:updated', function(event, data){
        $scope.navigationTitles = AppNavigationTitles.get().collection;
    });

    $scope.$watch('segmentedControl.state', function(oldValue, newValue)
    {
        if(oldValue == 'nearMe' || newValue == 'nearMe')
        {
            console.log("Toggling Ranging");
            iBeacons.toggleRanging();
        }

    });


})


    .controller('CollectionObjectListCtrl', function($scope, AppNavigationTitles, MuseumObjects){


        var pageNumber = 0;
        $scope.morePages = false;
        $scope.museumObjects = MuseumObjects.all();
        $scope.searchTerm = "";

        /* When page loads */
        $scope.$on('$stateChangeSuccess', function() {
            $scope.getPage();
        });

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


        $scope.getPage = function()
        {
            $scope.morePages = MuseumObjects.getPage(pageNumber,$scope.searchTerm, complete);

            console.log("Page Number: " + pageNumber+ ", More Pages: " + $scope.morePages);
            if($scope.morePages)
                pageNumber++;
            $scope.$broadcast('scroll.infiniteScrollComplete');



            function complete() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        };

        $scope.$watch('searchTerm', function(newvalue,oldvalue) {
            console.log("Term changed");
            console.log($scope.searchTerm);
            pageNumber = 0;
            $scope.getPage();

        });


    })

    .controller('ObjectViewCtrl', function($scope, $state,  AppNavigationTitles, MuseumObjects, $stateParams,$ionicLoading, $ionicModal, Media, Audio, Video)
    {


        $scope.openModal = function(template) {

            $ionicModal.fromTemplateUrl(template, {
                scope: $scope,
                animation: 'slide-in-right'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();

            });
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });
        /* Set up app navigation titles */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Get the object */
        $scope.museumObject = MuseumObjects.get($stateParams.objectId);

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        //Load image view

        //Load audio if available

        /* If user clicks on the listen to an audio */

        $scope.playAudio = function(audio_id)
        {
            /* Get audio link from Media Service */

            var audio_object = Media.get(audio_id);

            /* Setup the Audio Stream */

            //var audio = Audio.setup(src, readyPlay, notFound)

            //function readyPlay()
            //{
            //    //$scope.change state
            //}

            //function notFound()
            //{
            //  Show audio can't be played at this moment
            //}
        };

        $scope.visible = function(length)
        {
            if(length == 0) return "N/A";

            if(length == 1) return "SINGLE";

            if(length > 1) return "MULTIPLE";
        };

        $scope.playVideo = function(videoId)
        {
            /* Loading */
            /* Get video link from Media service */
            var video = Media.get(videoId);

            /* Play Video */

            Video.set(video);

            $state.go('tab.video-view');
        };

        $scope.displayArchive = function(archiveId)
        {
            /* Archive Text */
            var archive = Media.get(archiveId);

            /* Display Archive */

        };


        $scope.showVideos = function()
        {
            /* Open up modal */
            $scope.openModal('video-list-modal.html');


        };


        $scope.showArchives = function()
        {
            /* Show Archives */
            $scope.openModal('archives-list-modal.html');

        };
        $scope.showAudio = function()
        {
            /* Open up modal */
            $scope.openModal('audio-list-modal.html');

        };

        $scope.doSomething = function() {
            console.log("Playing");
        };
        $scope.showImages = function()
        {

        };
        $scope.showImage = function(index) {
            $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
            $scope.openModal('image-modal.html')


        }

    })

    .controller('AudioViewCtrl', function($scope, Audio)
    {

    })

    .controller('VideoViewCtrl', function($scope,$sce,Video)
    {
        $scope.video = Video.get();

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        }


    })

    .controller('NearMeCtrl', function($rootScope, $scope, iBeacons, Exhibitions, $ionicLoading, AppNavigationTitles){



        $scope.navigationTitles = AppNavigationTitles.get();
        $scope.loading = true;

        $scope.range = function()
        {
            console.log("RANGING");
            //if($rootScope.isIOS)
            //    iBeacons.startRanging($scope.findExhibitions);

        };

        /* Find exhibitions using the beacons */
        $scope.findExhibitions = function()
        {
        }

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


    })

    .controller('ExhibitionsListCtrl', function($scope, Exhibitions)
    {



        var pageNumber = 0;
        $scope.morePages = false;
        $scope.exhibitions = Exhibitions.all();
        $scope.searchTerm = "";

        /* When page loads */
        $scope.$on('$stateChangeSuccess', function() {
            $scope.getPage();
        });

        $scope.getPage = function()
        {
            $scope.morePages = Exhibitions.getPage(pageNumber,$scope.searchTerm,  complete);
            if($scope.morePages)
                pageNumber++;
            $scope.$broadcast('scroll.infiniteScrollComplete');

            function complete() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        };


        $scope.$watch('searchTerm', function(newvalue,oldvalue) {
            console.log("Term changed");
            console.log($scope.searchTerm);
            pageNumber = 0;
            $scope.getPage();

        });


    })

    .controller('ExhibitionViewCtrl', function($scope, AppNavigationTitles, Exhibitions, $stateParams)
    {

        /* Get exhibition stuff */

        $scope.exhibition = Exhibitions.get($stateParams.exhibitionId);

        /* Set titles */
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


    })