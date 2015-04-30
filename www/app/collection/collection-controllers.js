
/* Museum Collection View Controllers */
angular.module('collection-controllers', [])

/* Segmented Control for the Collection Tab */
.controller('CollectionSegmentedCtrl', function($scope, SegmentedControl, Exhibitions, iBeacons,$ionicScrollDelegate)
{

    /* Segmented Control State */
    $scope.segmentedControl = SegmentedControl.create('collection', ['nearMe', 'objects', 'exhibitions'], 'objects');

    /* Change the view state */
    $scope.changeSegmentedControlState = function(state)
    {
        $scope.segmentedControl.set(state);
        $ionicScrollDelegate.scrollTop();

    };

    /* Watch for the state changes to iBeacon Ranging */
    $scope.$watch('segmentedControl.state', function(oldValue, newValue)
    {
        if(oldValue == 'nearMe' || newValue == 'nearMe')
        {
            iBeacons.toggleRanging();
        }

    });


})

    /* Collection Object List Controller */
    .controller('CollectionObjectListCtrl', function($scope, $state, MuseumObjects){

        /* Set page number to 0 */
        $scope.pageNumber = 0;

        /* No more pages */
        $scope.morePages = false;

        /* Copy museum objects for changes */
        $scope.museumObjects = [];

        /* Set search term to empty */
        $scope.searchTerm = "";

        /* Indicator for loading */
        $scope.loading = false;

        /* When page loads, load the first page*/
        $scope.onLoad = function() {

                $scope.museumObjects = [];
                $scope.pageNumber = 0;
                $scope.getPage();

        };


        /* Get a page when scrolling down */
        $scope.getPage = function()
        {

            //console.log("GEtting da page");
            MuseumObjects.getPage($scope.pageNumber, $scope.searchTerm)
                .then(function(response)
                {
                        var page = response.data.artifacts;
                        console.log(typeof page);
                        if (typeof page == 'object') {

                            if (page.length > 0) {
                                $scope.museumObjects = $scope.museumObjects.concat(page);
                                $scope.morePages = true;
                                $scope.pageNumber++;
                                $scope.$broadcast('scroll.infiniteScrollComplete');

                            }
                            else {
                                $scope.morePages = false;
                            }

                        }

                        else if ($scope.pageNumber == 0 && $scope.museumObjects.length == 0) {
                            //console.log("No Objects Found");
                        }

                        else {
                            //console.log("Mistake Happened");
                        }

                        $scope.loading = false;


                });

        };

        /* Load Object */
        $scope.loadObject = function(id)
        {
            MuseumObjects.getById(id)
                .then(function(_artifact)
                {

                        MuseumObjects.setActiveObject(_artifact);
                        //Change state
                        $state.go('tab.collection-single-object');


                },
                function(err)
                {
                    console.log(err);
                }
            );

        };

        /* When search term changes, do a query */
        $scope.$watch('searchTerm', function(newvalue,oldvalue) {

            var flag = (newvalue == '') && (oldvalue == '');
            if(!flag) {
                $scope.loading = true;
                $scope.museumObjects = [];
                $scope.pageNumber = 0;
                $scope.getPage();
            }

        });
        $scope.onLoad();


    })

    /* Single Object View Controller */
    .controller('ObjectViewCtrl', function($scope, $state, MuseumObjects, $ionicBackdrop, $stateParams, $interval, $ionicLoading, $ionicModal,Exhibitions, Audio, Video, Archive, Gallery, Facebook)
    {
        /* Maintains the stack of modals */
        var modals = [];

        /* Get the active object */
        $scope.museumObject = MuseumObjects.getActiveObject();

        $scope.stream = {
            watchPlaybackTime : 0
            };

        /* Opens a modal with a specific template, whether its to view images, videos or text */
        $scope.openModal = function(template) {

            $ionicModal.fromTemplateUrl(template, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {

                modal.show();
                modals.push(modal);

            });
        };

        /* Close the modal */
        $scope.closeModal = function() {
           var modal =  modals.pop();
            modal.hide();
            modal.remove();


        };

        /* Load the description of the element */
        $scope.loadDescription = function()
        {
            $scope.text = {};
            $scope.text.title = $scope.navigationTitles.collection.singleObject.descriptionLabel;
            $scope.text.description = $scope.museumObject.description;
            //console.log($scope.text);
            $scope.openModal('text-view.html');

        };

        /* If user clicks on the listen to an audio */
        $scope.playAudio = function(audio_id)
        {

            Audio.requestAudible(audio_id)
                .then(function(available)
                {
                    console.log("Requesting ID");
                    if(available)
                    {
                        $scope.audible = Audio;

                        //console.log($scope.audible);
                        //console.log($scope.audible.duration);

                        $scope.playbackInterval =  $interval(function()
                        {
                            $scope.stream.watchPlaybackTime = Audio.currentTime();

                        },1000);
                        //console.log("Opening Audio modal");
                        $scope.openModal('audio-player.html');

                    }
                    else
                    {
                        console.log("No Audio Found");
                    }

                });

        };




        /* Displays the image grid */
        $scope.imageGrid = function()
        {
            /* Slice the images to a grid */
            function chunk(arr, size) {
                var row = [];
                for (var i=0; i<arr.length; i+=size) {
                    row.push(arr.slice(i, i+size));
                }
                return row;
            }

            $scope.images = chunk($scope.museumObject.Images,3);
            $scope.openModal('image-grid.html');

        };

        //TODO: If there's time left we should add a loading spinner for images while they are loading!
        /* Displays an image preview */
        $scope.displayImage = function(image)
        {
            /* Should get the list of images */

            $scope.image = image;

            $scope.openModal('image-preview.html');
        };

        /* Returns if a section of the tepmlate is visible depending on the amount of elements */
        $scope.visible = function(length)
        {
            if(length == 0) return "N/A";

            if(length == 1) return "SINGLE";

            if(length > 1) return "MULTIPLE";
        };


        /* Shows the list of videos */
        $scope.showVideos = function()
        {
            /* Open up modal */
            $scope.openModal('video-list-modal.html');

        };

        /* Play a video */
        $scope.playVideo = function(videoId) {

            /* Need to get the video from http request*/
            Video.getVideo(videoId)
                .then(function(response)
                {
                    /* If acceptable */
                    if(response.status == 200)
                    {

                        Video.setVideo(response.data);
                        if ($scope.museumObject.Videos.length > 1){
                            $scope.closeModal();
                        }
                        $state.go('tab.video-view');
                    }
                });
        };


        $scope.imageOverlayActive = false;

        $scope.toggleOverlay = function(){


            $scope.imageOverlayActive = !($scope.imageOverlayActive);

        };

        $scope.showImageInfo = function()
        {
            $scope.openModal('image-overlay-info.html');
        };
        /* Display the object image */
        $scope.showImage = function()
        {
            $scope.openModal('image-modal.html');
        };

        //TODO: Need to fix AUDIO ASAP
        /* Play the audio stream */
        $scope.playStream = function()
        {
            //console.log("Playing Stream");

            Audio.play();
        };

        /* Pause the audio stream */
        $scope.pauseStream = function()
        {
            //console.log("Pausing Stream");
            Audio.pause();
        };

        $scope.seekToTime = function()
        {
            Audio.seekTo($scope.stream.watchPlaybackTime);
        };

        $scope.forward = function()
        {
            var _currentTime = Audio.currentTime() + 15;

            //console.log(_currentTime);
            Audio.seekTo(_currentTime);
        };

        $scope.reverse = function()
        {

            var _currentTime = Audio.currentTime();

            if(_currentTime > 15)
            {
                _currentTime -= 15;
            }

            else if(_currentTime < 15)
            {
                _currentTime = 0;
            }

            //console.log(_currentTime);
            Audio.seekTo(_currentTime);
        };
        /* Check if the volume changes */
        //$scope.$watch('stream.watchPlaybackTime', function(oldValue, newValue){
        //
        //
        //    console.log($scope.stream.watchPlaybackTime);
        //    Audio.seekTo($scope.stream.watchPlaybackTime);
        //});

        $scope.isPlaying = function()
        {
            return Audio.available();
        };

        $scope.showPlaying = function()
        {
            $scope.openModal('audio-player.html');

        };


        /* List of archives */
        $scope.showArchives = function()
        {
            /* Show Archives */
            $scope.openModal('archives-list-modal.html');

        };


        /* Displays a text archives */
        $scope.displayArchive = function(archiveId)
        {
            /* Archive Text */
            Archive.getArchive(archiveId)
                .then(function(response)
                {
                    //console.log(response);
                    if(response.status == 200)
                    {
                        Archive.setActiveArchive(response.data);
                        $scope.text = Archive.getActiveArchive();
                        $scope.openModal('text-view.html');
                    }
                });
        };

        /* List of audio files */
        $scope.showAudio = function()
        {
            /* Open up modal */
            $scope.openModal('audio-list-modal.html');

        };

        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){


                if(fromState.name ==  "tab.collection-single-object")
                {
                    Audio.destroy();
                }
            });

        $scope.shareOnFacebook = function()
        {
            var img_source = $scope.museumObject.image;
            var desc = $scope.museumObject.description;
            var title = $scope.museumObject.title;

            Facebook.postToFacebook(title, img_source, desc);
        };

        /* Preload exhibition */
        $scope.loadExhibition = function(exhibitionID)
        {

            Exhibitions.getById(exhibitionID)
                .then(function(exhibition)
            {
                Exhibitions.setActiveExhibition(exhibition);
                $state.go('tab.collection-exhibition-view');
            });
        }

    })

    /* Video view controller */
    .controller('VideoViewCtrl', function($scope,$sce,Video)
    {
        /* Get active video */
        $scope.video = Video.getActiveVideo();


        /* Parse out video ID */
        $scope.parseVideo = function() {
            var link = $scope.video.link;
            var youtubeRegex = /(?:(?:https|http):\/\/|)(?:www\.|)(?:youtube\.com|youtu\.be)\/(?:(?:watch\?v=|embed\/)| )/; //Youtube /watch? regex
            var _videoId = link.replace(youtubeRegex, "").replace(/&.*/, '');

            $scope.video.src = "https://www.youtube.com/embed/" + _videoId;

        };

        $scope.trustSrc = function(src)
        {

            return $sce.trustAsResourceUrl(src);
        };

        $scope.parseVideo();

    })

    /* Near me controller */
    .controller('NearMeCtrl', function($scope, $state, iBeacons, Exhibitions){

        /* Display that it is loading */
        $scope.loading = {status: true};

        /* Exhibitions stored */
        $scope.exhibitions = [];

        /* Find exhibitions using the beacons */
        $scope.loadExhibitions = function()
        {

            var beacons = iBeacons.getBeaconIds();
            /* Start loading view */
            $scope.loading.status = true;

            if(beacons.length == 0)
            {
                $scope.loading.status = true;
                if(!$scope.$$phase) {
                    //$digest or $apply
                    $scope.$apply();

                }

            }
            /* More beacons Found */
            else {

                /* Find the exhibitions related to iBeacons */
                Exhibitions.findByBeacons(beacons)
                    .then(function (response) {

                        //console.log(response);
                        if (response.status == 200) {

                            if (response.data.length == 0) {
                                /* Maybe ask user if he wants to retry */
                            }

                            else {
                                $scope.exhibitions = response.data.exhibitions;
                                $scope.loading.status = false;
                            }
                            /* Apply changes to UI */
                            if(!$scope.$$phase) {
                                //$digest or $apply
                                $scope.$apply();

                            }

                        }
                    }, function(err){
                        console.log(err);
                    });
            }

        };

        /* Load an exhibition */
        $scope.preLoadExhibition = function(id)
        {
            Exhibitions.getById(id)
                .then(function(exhibition)
                {


                        Exhibitions.setActiveExhibition(exhibition);
                        $state.go('tab.collection-exhibition-view');

                })
        };

        /* When beacons change state load up the exhibitions */
        $scope.$on('beacons:stateChange', function()
        {
            //console.log("State change - $scope");
            $scope.loadExhibitions();

        });

        /* Preferences updated */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        /* try and load exhibitions on the first try */
        $scope.loadExhibitions();

    })

    .controller('ExhibitionsListCtrl', function($scope, $state, Exhibitions, AppNavigationTitles)
    {
        /* Navigation Labels */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Page Number to 0 */
        $scope.pageNumber = 0;

        /* No more pages */
        $scope.morePages = false;

        /* Exhibition holds the objects for the list */
        $scope.exhibitions = [];

        /* Empty out the term */
        $scope.searchTerm = "";

        /* When page loads */
        $scope.onLoad= function() {
            $scope.pageNumber = 0;
            $scope.exhibitions = [];
            $scope.getPage();
        };


        /* Get an exhibition page */
        $scope.getPage = function()
        {

            Exhibitions.getPage($scope.pageNumber, $scope.searchTerm)
                .then(function(page)
                {
                    /* if it is actually an object */
                    if(typeof page == 'object') {
                        if (page.length > 0) {

                            $scope.exhibitions = $scope.exhibitions.concat(page);
                            $scope.morePages = true;
                            $scope.pageNumber++;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }

                        else
                        {
                            $scope.morePages = false;
                        }

                    }

                    else if($scope.pageNumber == 0 && $scope.museumObjects.length == 0)
                    {
                        //console.log("No Objects Found");
                    }

                    else
                    {
                        //console.log("Mistake Happened");
                    }

                    $scope.loading = false;
                });


        };

        $scope.loadExhibition = function(id)
        {
            Exhibitions.getById(id)
                .then(function(exhibition)
                {
                        Exhibitions.setActiveExhibition(exhibition);
                        $state.go('tab.collection-exhibition-view');

                })
        };


        $scope.$watch('searchTerm', function(newvalue,oldvalue) {

            var flag = (newvalue == '') && (oldvalue == '');
            if(!flag) {
                $scope.loading = true;
                $scope.exhibitions = [];
                $scope.pageNumber = 0;
                $scope.getPage();
            }


        });

        $scope.onLoad();

    })

    .controller('ExhibitionViewCtrl', function($scope, $state, AppNavigationTitles, Exhibitions, MuseumObjects)
    {

        /* Get exhibition stuff */

        $scope.exhibition = Exhibitions.getActiveExhibition();

        /* Set titles */
        $scope.navigationTitles = AppNavigationTitles.get();

        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        /* Load Object */
        $scope.loadObject = function(id)
        {
            MuseumObjects.getById(id)
                .then(function(response)
                {
                    if(response.status == 200)
                    {
                        MuseumObjects.setActiveObject(response.data);
                        //Change state
                        $state.go('tab.collection-single-object');
                    }

                });

        };

    });