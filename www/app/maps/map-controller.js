angular.module('map-controllers', [])

/* Map View Controller */
.controller('MapViewCtrl', function($scope, AppNavigationTitles, Map, SegmentedControl, iBeacons)
{

    /* Create segmented control */
    if(!SegmentedControl.exists('map'))
        SegmentedControl.create('map', ["entry", "map"], 'entry');

    /* Segmented control */
    $scope.segmentedControl = SegmentedControl.get('map');

    /* GEt application labels */
    $scope.navigationTitles = AppNavigationTitles.get();

    /* Get the current map displayed */
    $scope.map =  Map.getMap();

    /* Change the level */
    $scope.changeLevel = function(level)
    {
        SegmentedControl.set('map', level);
        Map.setViewState(level);
        $scope.map.img_href = Map.getMap().img_href;
        console.log($scope.map);
    };

    /* When page loads */
    //$scope.$on('$stateChangeSuccess', function() {
    //
    //    $scope.map = Map.getMap();
    //
    //});

    /* Listen for when the user changes room with iBeacons */
    $scope.$on('beacons:changed', function(beacons)
    {
        /* Use the beacons to change the map */

        /* Get the closest beacon */

        Map.getRoomWithBeaconId(beacons);
    });


});