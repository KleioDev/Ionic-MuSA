angular.module('map-controllers', [])

/* Map View Controller */
.controller('MapViewCtrl', function($scope, $rootScope,Map,$state, $ionicTabsDelegate,$ionicScrollDelegate,$ionicPopup, Rooms, $ionicModal, Exhibitions, SegmentedControl, iBeacons)
{
    $scope.modal = null;


    $scope.segcontrol = SegmentedControl.create('map', ['entry', 'basement'], 'entry');
    $scope.rooms = [];

    $scope.$on('Rooms:NotFound', function()
    {
        var roomAlert = $ionicPopup.alert({
            title: $scope.navigationTitles.map.roomNotFoundLabel
        });

        roomAlert.then(function(res) {

        });

    });

    $scope.changeState = function(state)
    {
        $scope.segcontrol.set(state);
        $ionicScrollDelegate.scrollTop();

    };


    /* Load rooms */
    $scope.loadRooms = function() {
        Rooms.getRooms().then(function (rooms) {
            $scope.rooms = rooms;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            console.log(err)
        });

    }
    /* When beacons change state load up an active room */
    $scope.$on('beacons:stateChange', function()
    {
        console.log("Gathering room information");
    });

    $scope.openModal = function(template)
    {

        $ionicModal.fromTemplateUrl(template, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {

            $scope.modal = modal;
            $scope.modal.show();

        });

    };

    $scope.closeModal = function() {

        $scope.modal.hide();
        //$scope.modal.destroy();

    };

    $scope.loadRoom = function(roomID)
    {
        /* Load a room */
        Rooms.getDetails(roomID)
            .then(successRoomRequest, failureRoomRequest);

        /* Load up room */
        function successRoomRequest(room)
        {

            if(room) {
                console.log(room);
                $scope.room = room;
                Rooms.lastRetrievedRoom = room;

                /* Load up Modal */
                /**
                 * Modal needs a title of the room, description, room number, and list of exhibitions
                 */
                $state.go('tab.maps-room-view');
                //$scope.openModal('room-details.html');
            }

        }
        function failureRoomRequest(err)
        {
            console.log(err);
        }
    };


    $scope.loadRooms();
    Map.generateEntryLevel($scope.loadRoom);


})

.controller('RoomViewCtrl', function($scope, Rooms,$state, Exhibitions){

        $scope.room = Rooms.lastRetrievedRoom;
        $scope.loadExhibition = function(id){
            Exhibitions.getById(id)
                .then(function(exhibition)
                {


                    Exhibitions.setActiveExhibition(exhibition);

                    $state.go('tab.maps-exhibition-view');


                })

        };

    });


