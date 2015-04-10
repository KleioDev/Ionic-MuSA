/**
 * Created by joframart on 4/1/15.
 */
angular.module('map-services', [])

.factory('Map', function($ionicLoading)
    {

        var rooms = [

            {
                id: 1,
                map_img: 'img/map/entry_room_number-1.png',
                beacons: [{beaconId: "2"},{ beaconId: "2"}]
            },

            {
                id: 2,
                map_img: 'img/map/entry_room_number-2.png',

                beacons: [{beaconId: "B9407F30-F5F8-466E-AFF9-25556B57FE6D5526161535"},{ beaconId: "2"}]
            },


            {
                id: 3,
                map_img: 'img/map/entry_room_number-3.png',

                beacons: [{beaconId: "1"},{ beaconId: "2"}]
            },


            {
                id: 4,
                map_img: 'img/map/entry_room_number-4.png',

                beacons: [{beaconId: "1"},{ beaconId: "2"}]
            }

        ];

        var map = {};

        map.img_href = 'img/map/entry_level.png';


        var mapViewState = 'entry';

        return {

            getRoomWithBeaconId : function(beaconId)
            {
                $ionicLoading.show({
                    template: '<ion-spinner icon="ios"></ion-spinner>                '
                });



                var roomFound = false;
                for(var i = 0; i < rooms.length; i++)
                {
                    for(var j = 0; j < rooms[i].beacons.length; j++)
                    {
                        if(rooms[i].beacons[j].beaconId == beaconId)
                        {
                            console.log("Beacon found");
                            map.img_href =  rooms[i].map_img;
                            roomFound = true;
                        }
                    }
                }


                if(!roomFound) {
                    if (mapViewState == 'entry') {

                        map.img_href = 'img/map/entry_level.png';

                    }
                    else if (mapViewState == 'basement') {

                    }
                }

            },

            setViewState : function(state)
            {
                mapViewState = state;


                if(mapViewState == 'entry')
                {
                    map.img_href = 'img/map/entry_level.png';

                }
                else if(mapViewState == 'basement')
                {
                    map.img_href = 'img/map/basement_level.png';

                }
            },

            getMap: function()
            {
                return map;
            }
        }
    });
