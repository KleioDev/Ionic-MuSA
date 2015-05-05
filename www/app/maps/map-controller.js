angular.module('map-controllers', [])

/* Map View Controller */
.controller('MapViewCtrl', function($scope, $timeout,$rootScope,Map,$state, $ionicPopover, $ionicTabsDelegate,$ionicScrollDelegate,$ionicPopup, Rooms, $ionicModal, Exhibitions, SegmentedControl, iBeacons)
{
    $scope.modal = null;

    $scope.$on('ibeacon:nearestBeaconChanged', function()
    {
        console.log("Retriving Room By iBeacon");
        $scope.retrieveRoomByiBeacon();
    });




    $scope.retrieveRoomByiBeacon = function()
    {
        var beaconID = iBeacons.getNearestBeaconID();

        var rooms = $scope.mapRooms;
        console.log(rooms);

            for (var i = 0; i < rooms.length; i++) {
                    rooms[i].area.attr({'fill': '#FFFFFF'});
            }


        console.log("Retrieving Room By iBeacon");

        if(beaconID) {
            var highlightColor = "#2ecc71";
            Rooms.retrieveRoomByiBeacon(beaconID)
                .then(function (ids) {
                    console.log("IDS");
                    console.log(ids);
                    if (ids) {


                            var rooms = $scope.mapRooms;
                            console.log(rooms);

                            for (var j = 0; j < ids.length; j++) {

                                for (var i = 0; i < rooms.length; i++) {
                                    if (rooms[i].id == parseInt(ids[j]))
                                        rooms[i].area.attr({'fill': highlightColor});
                                }
                            }



                    }
                });
        }

    };


    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        if(toState.name == 'tab.tab-maps')
        {
            iBeacons.scanForNearestBeacon();
            $scope.retrieveRoomByiBeacon();
        }

        if(fromState.name == 'tab.tab-maps')
        {
            iBeacons.stopRanging();

        }

    });

    $scope.segcontrol = SegmentedControl.create('map', ['entry', 'basement'], 'entry');
    $scope.mapRooms = [];

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

        Map.clearMap();
        $scope.generateMap();
        $ionicScrollDelegate.scrollTop();

    };

    $scope.rooms = [];

    $scope.generateMap = function()
    {

        /* Generate Entry Level */
        if($scope.segcontrol.state == 'entry'){
            var components =  Map.generateEntryLevel();

            var icons = components.icons;


            var roomTaps = components.rooms;
            //$scope.rooms.concat
            console.log(roomTaps);

            for(var i =0 ; i < roomTaps.length; i++)
            {
                roomTaps[i].tap.id = roomTaps[i].id;

                roomTaps[i].tap.click(function(e){

                    this.node.style.opacity = 0.5;
                    var tap = this;

                    $timeout(function(){

                        console.log(tap.id);
                        $scope.loadRoom(tap.id);
                        tap.node.style.opacity = 1.0;

                    },1000)

                });
            }

            $scope.mapRooms = components.rooms;

            /* Tap Stairs */
            var stairsIcon = icons.stairs;
            stairsIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.stairsLabel;
                $scope.openPopover(e);
            });

            /* Tap Entrance */
            var entranceIcon = icons.entrance;
            entranceIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.entranceLabel;
                $scope.openPopover(e);
            });

            /* Tap Entrance */
            var elevatorIcon = icons.elevator;
            elevatorIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.elevatorLabel;
                $scope.openPopover(e);
            })




        }
        else if($scope.segcontrol.state == 'basement')
        {
            var components = Map.generateBasementLevel();

            /* Room Tap */

            var room = components.room;
            $scope.mapRooms = components.rooms;


            var tap = room.tap;
            tap.click(function (e) {

                var tap = this;
                this.node.style.opacity = 0.5;
                //var id= this.data('roomNumber');
                $timeout(function()
                {
                    tap.node.style.opacity = 1.0;

                    $scope.loadRoom(15);
                }, 1000);

            });




            var icons = components.icons;

            var womanIcon = icons.woman;
            womanIcon.click(function (e) {
                $scope.popoverMessage = $scope.navigationTitles.map.icons.womansBathroomLabel;
                $scope.openPopover(e);

            });


            var manIcon = icons.man;
            manIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.mensBathroomLabel;
                $scope.openPopover(e);

            });

            var elevatorIcon = icons.elevator;
            elevatorIcon.click(function(e){

                $scope.popoverMessage = $scope.navigationTitles.map.icons.elevatorLabel;
                $scope.openPopover(e);


            });

            var exitIcon = icons.exit;
            exitIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.exitLabel;
                $scope.openPopover(e);
            });

            var stairsIcon = icons.stairs;
            stairsIcon.click(function(e){
                $scope.popoverMessage = $scope.navigationTitles.map.icons.stairsLabel;
                $scope.openPopover(e);
            })

        }
    };

    $ionicPopover.fromTemplateUrl('popover.html',{
        scope: $scope
    }).then(function(popover)
    {
        $scope.popover = popover;
    });



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

    };
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
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popoverMessage = "";
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });


    $scope.loadRooms();
    $scope.generateMap();
    $scope.retrieveRoomByiBeacon();
    //Map.generateEntryLevel($scope.loadRoom);


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


