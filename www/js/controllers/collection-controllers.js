angular.module('collection-controllers', [])


.controller('CollectionSegmentedCtrl', function($scope, AppNavigationTitles, ExhibitionSegmentedControlState, Exhibitions, iBeacons)
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


        $scope.pageNumber = 0;
        $scope.morePages = false;
        $scope.museumObjects = MuseumObjects.all();
        $scope.searchTerm = "";

        /* When page loads */
        $scope.$on('$stateChangeSuccess', function() {
            $scope.pageNumber = 0;
            $scope.getPage();
        });

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


        $scope.getPage = function()
        {
            $scope.morePages = MuseumObjects.getPage($scope.pageNumber,$scope.searchTerm, complete);

            console.log("Page Number: " + $scope.pageNumber+ ", More Pages: " + $scope.morePages);
            if($scope.morePages)
                $scope.pageNumber++;
            $scope.$broadcast('scroll.infiniteScrollComplete');



            function complete() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        };

        $scope.$watch('searchTerm', function(newvalue,oldvalue) {
            console.log("Term changed");
            console.log($scope.searchTerm);
            $scope.pageNumber = 0;
            $scope.getPage();

        });


    })

    .controller('ObjectViewCtrl', function($scope, $state,  AppNavigationTitles, MuseumObjects, $stateParams,$ionicLoading, $ionicModal, Media, Audio, Video)
    {

        $scope.modalAvailable = false;

        var modals = new Array();
        $scope.openModal = function(template) {

            $ionicModal.fromTemplateUrl(template, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {

                modal.show();
                modals.push(modal);

            });
        };

        $scope.closeModal = function() {

            modals.pop().hide();
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


        $scope.loadDescription = function()
        {
            $scope.text = {};
            $scope.text.title = $scope.navigationTitles.collection.singleObject.descriptionLabel;
            $scope.text.content = $scope.museumObject.description;
            console.log($scope.text);
            $scope.openModal('text-view.html');
        };


        $scope.closePage = function()
        {
            $scope.closeModal();
        };
        //Load image view

        //Load audio if available

        /* If user clicks on the listen to an audio */

        $scope.playAudio = function(audio_id)
        {
            var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";




            Audio.create(src, null, null);

            $scope.audio = Audio.get();

            Audio.play();



            $scope.openModal('audio-view.html');

        };

        $scope.imageGrid = function()
        {
            function chunk(arr, size) {
                var newArr = [];
                for (var i=0; i<arr.length; i+=size) {
                    newArr.push(arr.slice(i, i+size));
                }
                return newArr;
            }

            $scope.images = chunk($scope.museumObject.images, 3);

            $scope.openModal('image-grid.html');
        };

        $scope.displayImage = function(image)
        {
            $scope.image = image;

            $scope.openModal('image-preview.html');
        }


        $scope.visible = function(length)
        {
            if(length == 0) return "N/A";

            if(length == 1) return "SINGLE";

            if(length > 1) return "MULTIPLE";
        };

        $scope.playVideo = function(videoId) {
            /* Loading */
            /* Get video link from Media service */
            var video = Media.get(videoId);

            /* Play Video */
            Video.set(video);

            if ($scope.museumObject.videos.length > 1){
                    $scope.closeModal();

            }
            $state.go('tab.video-view');


        };

        $scope.playStream = function()
        {
            console.log("Playing Stream");
            Audio.play();
        };

        $scope.pauseStream = function()
        {
            console.log("Pausing Stream");
            Audio.pause();
        }

        $scope.$watch('audio.stream.volume', function(oldvalue, newValue){
            console.log($scope.audio.stream.volume);
            Audio.setVolume($scope.audio.stream.volume);

        });

        $scope.$watch('audio.stream.seekTo', function(oldValue, newValue)
        {
            console.log("Seek: " + $scope.audio.stream.seekTo);
            Audio.seekTo($scope.audio.stream.seekTo + '');
        })

        $scope.$on('$stateChangeSuccess', function() {


        });

        $scope.displayArchive = function(archiveId)
        {
            /* Archive Text */
            console.log(archiveId);
            var archive = Media.get(archiveId);

            /* Display Archive */
            $scope.text = {};
            $scope.text.title = archive.title;
            $scope.text.content = archive.content;
            $scope.openModal('text-view.html');

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
        console.log("Video Mode");
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



        $scope.pageNumber = 0;
        $scope.morePages = false;
        $scope.exhibitions = Exhibitions.all();
        $scope.searchTerm = "";

        /* When page loads */
        $scope.$on('$stateChangeSuccess', function() {
            $scope.pageNumber = 0;

            $scope.getPage();
        });

        $scope.getPage = function()
        {
            $scope.morePages = Exhibitions.getPage($scope.pageNumber,$scope.searchTerm,  complete);
            if($scope.morePages)
                $scope.pageNumber++;
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