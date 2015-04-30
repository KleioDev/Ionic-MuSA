angular.module('map-controllers', [])

/* Map View Controller */
.controller('MapViewCtrl', function($scope, AppNavigationTitles, Map,$state, Rooms, $ionicModal, Exhibitions, SegmentedControl, iBeacons)
{
    $scope.modal = null;

    $scope.rooms = [];

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

                /* Load up Modal */
                /**
                 * Modal needs a title of the room, description, room number, and list of exhibitions
                 */
                $scope.openModal('room-details.html');
            }

        }
        function failureRoomRequest(err)
        {
            console.log(err);
        }
    };

    $scope.loadExhibition = function(id){
        Exhibitions.getById(id)
            .then(function(exhibition)
            {


                Exhibitions.setActiveExhibition(exhibition);
                $scope.closeModal();

                $state.go('tab.maps-exhibition-view');


            })

    };

    $scope.loadRooms();


});


