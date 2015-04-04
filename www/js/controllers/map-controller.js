angular.module('map-controllers', [])


.controller('MapViewCtrl', function($scope, AppNavigationTitles, Map, SegmentedControl, iBeacons)
{

    /* Range for iBeacons */

    console.log("Maps Enabled");
    if(!SegmentedControl.exists('map'))
        SegmentedControl.create('map', ["entry", "map"], 'entry');

    $scope.segmentedControl = SegmentedControl.get('map');

    console.log($scope.segmentedControl);

    $scope.navigationTitles = AppNavigationTitles.get();

    $scope.map =  Map.getMap();

    $scope.changeLevel = function(level)
    {
        SegmentedControl.set('map', level);


    };

    /* When page loads */
    $scope.$on('$stateChangeSuccess', function() {

        $scope.map = Map.getMap();

    });

    /* Listen for when the user changes room with iBeacons */
    $scope.$on('beacons:changed', function(beacons)
    {
        /* Use the beacons to change the map */

        /* Get the closest beacon */

        Map.getRoomWithBeaconId(beacons);
    });

    $scope.beaconCallback = function(beacons)
    {
        console.log("Beacons Received");


        var beaconId = beacons[0].proximityUUID + beacons[0].major + beacons[0].minor;
        Map.getMap(beacons[0]);
    }

})