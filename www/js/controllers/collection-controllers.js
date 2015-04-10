
/* Museum Collection View Controllers */
angular.module('collection-controllers', [])

/* Segmented Control for the Collection Tab */
.controller('CollectionSegmentedCtrl', function($scope, AppNavigationTitles, SegmentedControl, Exhibitions, iBeacons)
{
    $scope.navigationTitles = AppNavigationTitles.get().collection;

    /* Segmented Control State */
    $scope.segmentedControl = SegmentedControl.create('collection', ['nearMe', 'objects', 'exhibitions'], 'objects');

    /* Change the view state */
    $scope.changeSegmentedControlState = function(state)
    {
        $scope.segmentedControl.set(state);
    };

    /* Navigation Titles */
    $scope.navigationTitles = AppNavigationTitles.get().collection;

    /* When preferences are updated */
    $scope.$on('preferences:updated', function(event, data){
        $scope.navigationTitles = AppNavigationTitles.get().collection;
    });

    /* Watch for the state changes to iBeacon Ranging */
    $scope.$watch('segmentedControl.state', function(oldValue, newValue)
    {
        if(oldValue == 'nearMe' || newValue == 'nearMe')
        {
            console.log("Toggling iBeacon Ranging");
            iBeacons.toggleRanging();
        }

    });


})

    /* Collection Object List Controller */
    .controller('CollectionObjectListCtrl', function($scope, AppNavigationTitles, MuseumObjects){

        /* Set page number to 0 */
        $scope.pageNumber = 0;

        /* No more pages */
        $scope.morePages = false;

        /* Copy museum objects for changes */
        $scope.museumObjects = MuseumObjects.all();

        /* Set search term to empty */
        $scope.searchTerm = "";

        /* When page loads, load the first page*/
        $scope.$on('$stateChangeSuccess', function() {
            $scope.pageNumber = 0;
            $scope.getPage();
        });

        /* When preferences are updated */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        /* Get a page when scrolling down */
        $scope.getPage = function()
        {
            $scope.morePages = MuseumObjects.getPage($scope.pageNumber,$scope.searchTerm, complete);

            if($scope.morePages)
                $scope.pageNumber++;
            $scope.$broadcast('scroll.infiniteScrollComplete');

            /* Callback func */
            function complete() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        };

        /* When search term changes, do a query */
        $scope.$watch('searchTerm', function(newvalue,oldvalue) {
            $scope.pageNumber = 0;
            $scope.getPage();

        });


    })

    /* Single Object View Controller */
    .controller('ObjectViewCtrl', function($scope, $state,  AppNavigationTitles, MuseumObjects, $stateParams,$ionicLoading, $ionicModal, Media, Audio, Video)
    {
        /* Maintains the stack of modals */
        var modals = new Array();

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

            modals.pop().hide();
        };


        /* Set up app navigation titles */
        $scope.navigationTitles = AppNavigationTitles.get();

        /* Get the object */
        $scope.museumObject = MuseumObjects.get($stateParams.objectId);
        console.log("Museums!");

        /* When prefrences are updated, update to the settings */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });

        /* Load the description of the element */
        $scope.loadDescription = function()
        {
            $scope.text = {};
            $scope.text.title = $scope.navigationTitles.collection.singleObject.descriptionLabel;
            $scope.text.content = $scope.museumObject.description;
            console.log($scope.text);
            $scope.openModal('text-view.html');

        };

        /* Close the modal */
        $scope.closePage = function()
        {
            $scope.closeModal();
        };


        /* If user clicks on the listen to an audio */
        $scope.playAudio = function(audio_id)
        {

            /* Dummy Data */
            var src = "http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3";
            Audio.create(src, null, null);
            $scope.audio = Audio.get();
            Audio.play();
            $scope.openModal('audio-view.html');

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

            $scope.images = chunk($scope.museumObject.images, 3);

            $scope.openModal('image-grid.html');
        };

        /* Displays an image preview */
        $scope.displayImage = function(image)
        {
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

        /* Play a video */
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

        /* Play the audio stream */
        $scope.playStream = function()
        {
            console.log("Playing Stream");
            Audio.play();
        };

        /* Pause the audio stream */
        $scope.pauseStream = function()
        {
            console.log("Pausing Stream");
            Audio.pause();
        };

        /* Check if the volume changes */
        $scope.$watch('audio.stream.volume', function(oldvalue, newValue){
            Audio.setVolume($scope.audio.stream.volume);

        });

        /* Seek to */
        $scope.$watch('audio.stream.seekTo', function(oldValue, newValue)
        {
            console.log("Seek: " + $scope.audio.stream.seekTo);
            Audio.seekTo($scope.audio.stream.seekTo + '');
        });

        /* Displays a text archives */
        $scope.displayArchive = function(archiveId)
        {
            /* Archive Text */
            var archive = Media.get(archiveId);

            /* Display Archive */
            $scope.text = {};
            $scope.text.title = archive.title;
            $scope.text.content = archive.content;
            $scope.openModal('text-view.html');

        };

        /* Shows the list of videos */
        $scope.showVideos = function()
        {
            /* Open up modal */
            $scope.openModal('video-list-modal.html');


        };

        /* List of archives */
        $scope.showArchives = function()
        {
            /* Show Archives */
            $scope.openModal('archives-list-modal.html');

        };

        /* List of audio files */
        $scope.showAudio = function()
        {
            /* Open up modal */
            $scope.openModal('audio-list-modal.html');

        };

    })

    /* Video view controller */
    .controller('VideoViewCtrl', function($scope,$sce,Video)
    {
        $scope.video = Video.get();

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        }


    })

    /* Near me controller */
    .controller('NearMeCtrl', function($scope, iBeacons, Exhibitions, AppNavigationTitles){


        /* Get the application titles */
        $scope.navigationTitles = AppNavigationTitles.get();
        /* Display that it is loading */
        $scope.loading = {status: true};

        /* Exhibitions stored */
        $scope.exhibitions = [];


        /* Find exhibitions using the beacons */
        $scope.loadExhibitions = function()
        {
            console.log("Loading Exhibitions");

            var beacons = iBeacons.get();
            console.log(beacons);
            /* Start loading view */
            $scope.loading.status = true;

            /* Find the exhibitions related to iBeacons */
            var exhibitions = Exhibitions.findByBeacons(beacons);

            /* NO exhibitions near */
            if(exhibitions.length == 0)
            {
                console.log("No Exhibitions Near You");
                /* No Exhibitions Near you */
            }
            else{
                console.log("Exhibitions Near You!");

                $scope.exhibitions = exhibitions;
                $scope.loading.status = false;


            }

            /* Apply changes to UI */
            $scope.$apply();



        };

        /* When beacons change state load up the exhibitions */
        $scope.$on('beacons:stateChange', function()
        {

            $scope.loadExhibitions();

        });

        /* Preferences updated */
        $scope.$on('preferences:updated', function(event, data){
            $scope.navigationTitles = AppNavigationTitles.get();
        });


        /* try and load exhibitions on the first try */
        $scope.loadExhibitions();

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
            $scope.pageNumber = 0;
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


    });