/**
 * Created by joframart on 4/1/15.
 */
angular.module('map-services', [])

    .factory('Map', function(Routes, Rooms,$timeout, $http){


            var entryLevelRaphael = null;
            var basementLevelRaphael = null;


            var generateEntryLevel = function(callback) {



                var rsr = Raphael('entry-map', '1000', '750');
                entryLevelRaphael = rsr;

                var rect_d = rsr.rect(878.7, 269.7, 107.2, 188.9);
                rect_d.attr({x: '878.7',y: '269.7',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_d');
                var rect_e = rsr.rect(878.7, 470.5, 107.2, 129.2);
                rect_e.attr({x: '878.7',y: '470.5',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_e');
                var rect_f = rsr.rect(20.8, 158.2, 128.8, 223.6);
                rect_f.attr({x: '20.8',y: '158.2',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_f');
                var rect_g = rsr.rect(27.4, 396.5, 134.5, 65.2);
                rect_g.attr({x: '27.4',y: '396.5',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_g');
                var path_h = rsr.path("M28.2,414.2c9.3,1.7,18.8,3,28.2,3.8c-4.3,5.5-8.7,11-13.2,16.5c-1.3,1.7-2.8,3.5-4.8,4.3  c-2.2,1-4.7,0.7-6.8,1.7c-1.8,1-3.2,2.8-5,3.8s-4.7,1.2-5.5-0.8c3.8-8.3,6.7-16.9,8.3-25.9");
                path_h.attr({fill: 'none','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_h');
                var rect_i = rsr.rect(453, 401.8, 148, 27.9);
                rect_i.attr({x: '453',y: '401.8',fill: '#FFFFFF',stroke: '#FFFFFF',"stroke-miterlimit": '10','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_i');
                var rect_j = rsr.rect(878.7, 462.8, 107.8, 7.7);
                rect_j.attr({x: '878.7',y: '462.8',fill: '#A3A3A3','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_j');
                var rect_k = rsr.rect(14.2, 396.6, 13.3, 73.9);
                rect_k.attr({x: '14.2',y: '396.6',fill: '#A3A3A3','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_k');
                var Walls = rsr.set();
                var rect_l = rsr.rect(150.1, 239.8, 140, 29.9).attr({x: '150.1',y: '239.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_l');
                var rect_m = rsr.rect(316.7, 239.8, 561.9, 29.9).attr({x: '316.7',y: '239.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_m');
                var rect_n = rsr.rect(903.6, 239.8, 82.3, 29.9).attr({x: '903.6',y: '239.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_n');
                var rect_o = rsr.rect(316.7, 363.6, 104.8, 11.7).attr({x: '316.7',y: '363.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_o');
                var rect_p = rsr.rect(317, 482.5, 104.7, 11.7).attr({x: '317',y: '482.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_p');
                var rect_q = rsr.rect(866.2, 391, 12.5, 153.8).attr({x: '866.2',y: '391',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_q');
                var rect_r = rsr.rect(647.6, 391, 186.2, 10.8).attr({x: '647.6',y: '391',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_r');
                var rect_s = rsr.rect(273.5, 301.2, 12.5, 100.6).attr({x: '273.5',y: '301.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_s');
                var rect_t = rsr.rect(273.5, 451.9, 12.5, 100.6).attr({x: '273.5',y: '451.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_t');
                var rect_u = rsr.rect(453, 301.2, 13.7, 100.6).attr({x: '453',y: '301.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_u');
                var rect_v = rsr.rect(453, 452.1, 13.7, 100.6).attr({x: '453',y: '452.1',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_v');
                var rect_w = rsr.rect(601, 301.2, 13.5, 238.8).attr({x: '601',y: '301.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_w');
                var rect_x = rsr.rect(150.1, 269.7, 17.9, 132.2).attr({x: '150.1',y: '269.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_x');
                var rect_y = rsr.rect(155.6, 456.7, 12.5, 118).attr({x: '155.6',y: '456.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_y');
                var rect_z = rsr.rect(149.6, 147.5, 853.8, 18.2).attr({x: '149.6',y: '147.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_z');
                var rect_aa = rsr.rect(14.2, 151, 141.5, 7).attr({x: '14.2',y: '151',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aa');
                var rect_ab = rsr.rect(108.9, 381.9, 46.7, 14.7).attr({x: '108.9',y: '381.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ab');
                var rect_ac = rsr.rect(14.2, 381.9, 54, 14.7).attr({x: '14.2',y: '381.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ac');
                var rect_ad = rsr.rect(492.9, 348.7, 46.7, 14.7).attr({x: '492.9',y: '348.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ad');
                var rect_ae = rsr.rect(14.2, 157.8, 13.3, 16.3).attr({x: '14.2',y: '157.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ae');
                var rect_af = rsr.rect(14.2, 262.2, 6.7, 119.7).attr({x: '14.2',y: '262.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_af');
                var rect_ag = rsr.rect(155.6, 599.7, 835.2, 13.3).attr({x: '155.6',y: '599.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ag');
                var rect_ah = rsr.rect(986.4, 165.8, 16.9, 447.3).attr({x: '986.4',y: '165.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ah');
                var rect_ai = rsr.rect(20.8, 463, 134.8, 7.5).attr({x: '20.8',y: '463',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ai');
                var rect_aj = rsr.rect(150.1, 195.7, 6.7, 44.1).attr({x: '150.1',y: '195.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aj');
                var rect_ak = rsr.rect(155.6, 574.8, 723, 24.9).attr({x: '155.6',y: '574.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ak');
                var rect_al = rsr.rect(527.2, 330.3, 14.2, 44.7).attr({x: '527.2',y: '330.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_al');
                var rect_am = rsr.rect(527.2, 482.5, 14.8, 44.8).attr({x: '527.2',y: '482.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_am');
                var rect_an = rsr.rect(689.9, 479.7, 14.2, 47.6).attr({x: '689.9',y: '479.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_an');
                var rect_ao = rsr.rect(777.2, 479.7, 17.4, 47.6).attr({x: '777.2',y: '479.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ao');
                Walls.attr({'id': 'Walls','name': 'Walls'});
                var Rooms = rsr.set();
                var Room__14 = rsr.rect(156.7, 165.8, 829.6, 74).attr({id: 'Room_-_14',x: '156.7',y: '165.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__14');
                var Room__13 = rsr.rect(794.7, 401.8, 71.5, 172.9).attr({id: 'Room_-_13',x: '794.7',y: '401.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__13');
                var Room__12 = rsr.rect(704.1, 401.8, 73.2, 172.9).attr({id: 'Room_-_12',x: '704.1',y: '401.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__12');
                var Room__11 = rsr.rect(615.2, 401.8, 74.8, 172.9).attr({id: 'Room_-_11',x: '615.2',y: '401.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__11');
                var Room__10_1_ = rsr.rect(615.2, 269.7, 288.4, 121.3).attr({id: 'Room_-_10_1_',x: '615.2',y: '269.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__10_1_');
                var Room__9 = rsr.rect(542, 429.8, 59, 145).attr({id: 'Room_-_9',x: '542',y: '429.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__9');
                var Room__8 = rsr.rect(467.2, 429.8, 59.8, 145).attr({id: 'Room_-_8',x: '467.2',y: '429.8',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__8');
                var Room__7 = rsr.rect(542, 269.7, 59, 132.2).attr({id: 'Room_-_7',x: '542',y: '269.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__7');
                var Room__6 = rsr.rect(467.2, 269.7, 59.8, 132.2).attr({id: 'Room_-_6',x: '467.2',y: '269.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__6');
                var Room__5 = rsr.rect(285.9, 494.1, 167.1, 80.7).attr({id: 'Room_-_5',x: '285.9',y: '494.1',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__5');
                var Room__4 = rsr.rect(285.9, 375.2, 167.1, 108.9).attr({id: 'Room_-_4',x: '285.9',y: '375.2',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__4');
                var Room__3 = rsr.rect(285.9, 269.7, 167.1, 93.9).attr({id: 'Room_-_3',x: '285.9',y: '269.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__3');
                var Room__2 = rsr.rect(167.9, 430.1, 105.6, 144.7).attr({id: 'Room_-_2',x: '167.9',y: '430.1',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__2');
                var Room__1 = rsr.rect(167.9, 269.7, 105.6, 144.7).attr({id: 'Room_-_1',x: '167.9',y: '269.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__1');
                Rooms.attr({'id': 'Rooms','name': 'Rooms'});
                var RoomCircles = rsr.set();
                var B14 = rsr.ellipse(552.4, 199, 25.2, 24.9).attr({id: 'B14',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B14');
                var B13 = rsr.ellipse(833.8, 477.3, 25.3, 24.9).attr({id: 'B13',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B13');
                var B12 = rsr.ellipse(744, 479.7, 25.2, 24.9).attr({id: 'B12',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B12');
                var B11 = rsr.ellipse(647.6, 479.7, 25.2, 24.9).attr({id: 'B11',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B11');
                var B10 = rsr.ellipse(759.2, 316.8, 25.2, 24.9).attr({id: 'B10',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B10');
                var B9 = rsr.ellipse(571.4, 502.2, 25.2, 24.9).attr({id: 'B9',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B9');
                var B8 = rsr.ellipse(497.1, 502.2, 25.2, 24.9).attr({id: 'B8',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B8');
                var B7 = rsr.ellipse(571.5, 330.3, 25.2, 24.9).attr({id: 'B7',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B7');
                var B6 = rsr.ellipse(497.1, 330.3, 25.2, 24.9).attr({id: 'B6',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B6');
                var B5 = rsr.ellipse(369.1, 534.5, 25.2, 24.9).attr({id: 'B5',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B5');
                var B4 = rsr.ellipse(369.6, 429.8, 25.2, 24.9).attr({id: 'B4',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B4');
                var B3 = rsr.ellipse(369.1, 316.8, 25.2, 24.9).attr({id: 'B3',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B3');
                var B2 = rsr.ellipse(220.1, 494.1, 25.2, 24.9).attr({id: 'B2',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B2');
                var B1 = rsr.ellipse(220.1, 346.7, 25.2, 24.9).attr({id: 'B1',fill: '#E67E22',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B1');
                RoomCircles.attr({'id': 'RoomCircles','name': 'RoomCircles'});
                var Icons = rsr.set();
                Icons.attr({'id': 'Icons','name': 'Icons'});
                var Museum_Entrance = rsr.set();
                Museum_Entrance.attr({'id': 'Museum_Entrance','parent': 'Icons','name': 'Museum_Entrance'});
                var group_a = rsr.set();
                var path_ap = rsr.path("M101.9,290.2c-14.4,0-28.8,0-43.2,0c0-8,0-16,0-23.9c0.3,0,0.5,0,0.8,0c13.2,0,26.4,0,39.5,0     c0.3,0,0.5,0,0.8,0c0,0.3,0,0.6,0,0.8c0,6.6,0,13.3,0,19.9c0,0.4,0,0.7,0.1,1.1C100.2,289.2,101,289.8,101.9,290.2z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_ap');
                var path_aq = rsr.path("M58.8,261.1c0-8.9,0-17.8,0-26.7c4.6,0,9.3,0,13.9,0c-0.2,0.1-0.5,0.2-0.7,0.2c-2.2,0.8-3.5,3.2-3,5.5     c0.6,2.2,2.5,3.7,4.8,3.5c2.2-0.1,4-1.8,4.3-4c0.3-2.3-1-4.4-3.3-5.1c-0.2,0-0.3-0.1-0.4-0.2c10.3,0,20.5,0,30.8,0     c-0.2,0.1-0.4,0.1-0.6,0.2c-2,0.6-3.4,2.5-3.3,4.6c0.1,2.1,1.6,3.9,3.6,4.3c2.1,0.5,4.3-0.5,5.2-2.4c1-1.9,0.5-4.3-1.2-5.6     c-0.7-0.5-1.5-0.8-2.3-1.1c3.8,0,7.5,0,11.3,0c0,18.6,0,37.2,0,55.8c-2.8,0-5.6,0-8.4,0c2-0.8,2.3-1.3,2.3-3.6c0-6.5,0-13,0-19.5     c0-0.3,0-0.5,0-0.8c2,0,4,0,5.9,0c0-1.8,0-3.5,0-5.3c-0.9,0-1.7,0-2.6,0c0-0.3,0-0.5,0-0.7c0-4.1,0-8.2,0-12.3     c0-1.4-0.6-2.4-1.9-2.9c-0.6-0.3-1.3-0.4-2-0.4c-3.8,0-7.5,0-11.3,0c-1.4,0-2.4,0.5-3.3,1.6c-0.8,1.1-1.8,2.1-2.7,3.2     c-2,2.4-4,4.8-6,7.2c-0.9,1.1-0.8,2.3,0.1,3.1c1,0.9,2.3,0.8,3.3-0.4c2.7-3.1,5.3-6.3,8-9.4c0.1-0.2,0.3-0.3,0.5-0.6     c0,4,0,7.8,0,11.7c-0.3,0-0.6,0-0.8,0c-13.2,0-26.3,0-39.5,0C59.3,261,59,261,58.8,261.1z M61.4,260c1.2,0,2.4,0,3.5,0     c0.4,0,0.6-0.1,0.7-0.5c0.7-2.6,1.4-5.1,2.1-7.7c0.2-0.8,0.3-0.8,1.1-0.6c-0.8,2.9-1.6,5.8-2.4,8.7c4.8,0,9.6,0,14.4,0     c-0.9-2.9-1.7-5.8-2.5-8.8c0.9-0.2,1-0.2,1.2,0.6c0.2,0.6,0.4,1.2,0.6,1.8c0.3,0.8,0.5,1.7,0.9,2.5c0.6,1.2,1.9,1.4,2.9,0.4     c0.2-0.2,0.3-0.3,0.5-0.5c1.5-1.8,3-3.7,4.5-5.5c0.7-0.8,1.1-1.6,0.5-2.7c0.9,0,1.7,0,2.5,0c0-3.1,0-6.2,0-9.2     c-1.4,0-2.7,0-4.1,0c0,0.3,0,0.5,0,0.8c0,2.4,0,4.8,0,7.1c0,0.2-0.2,0.5-0.3,0.6c-0.4,0.3-0.9,0.5-1.3,0.9     c-0.8,0.8-1.5,1.8-2.3,2.6c-0.1,0.2-0.3,0.3-0.5,0.5c-0.2-0.7-0.4-1.3-0.6-1.9c-0.8-2.8-3.3-4.6-6.1-4.6c-2.2,0-4.3,0-6.5,0     c-2.5,0-5.2,2.1-5.9,4.5c-0.8,3-1.6,6-2.5,9C61.7,258.7,61.6,259.3,61.4,260z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_aq');
                var path_ar = rsr.path("M58.8,261.1c0.3,0,0.5,0,0.8,0c13.2,0,26.3,0,39.5,0c0.3,0,0.5,0,0.8,0c0-3.9,0-7.7,0-11.7c-0.2,0.2-0.4,0.4-0.5,0.6     c-2.7,3.1-5.3,6.3-8,9.4c-1,1.1-2.3,1.3-3.3,0.4c-0.9-0.8-1-2-0.1-3.1c2-2.4,4-4.8,6-7.2c0.9-1.1,1.8-2.1,2.7-3.2     c0.8-1.1,1.9-1.6,3.3-1.6c3.8,0,7.5,0,11.3,0c0.7,0,1.4,0.2,2,0.4c1.2,0.5,1.9,1.5,1.9,2.9c0,4.1,0,8.2,0,12.3c0,0.2,0,0.4,0,0.7     c0.9,0,1.7,0,2.6,0c0,1.8,0,3.5,0,5.3c-2,0-3.9,0-5.9,0c0,0.3,0,0.6,0,0.8c0,6.5,0,13,0,19.5c0,2.2-0.3,2.7-2.3,3.6     c-0.2,0-0.5,0-0.7,0c-1.9-0.8-2.3-1.3-2.3-3.5c0-6.5,0-13.1,0-19.6c0-0.3,0-0.5,0-0.8c-0.4,0-0.7,0-1,0c0,0.3,0,0.5,0,0.8     c0,6.6,0,13.3,0,19.9c0,1.5-0.5,2.6-2,3.2c-0.5,0-0.9,0-1.4,0c-0.9-0.4-1.7-1-1.9-2.1c-0.1-0.4-0.1-0.7-0.1-1.1     c0-6.6,0-13.3,0-19.9c0-0.2,0-0.5,0-0.8c-0.3,0-0.6,0-0.8,0c-13.2,0-26.4,0-39.5,0c-0.3,0-0.5,0-0.8,0     C58.8,264.5,58.8,262.8,58.8,261.1z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ar');
                var path_as = rsr.path("M74.4,234.4c0.1,0.1,0.3,0.1,0.4,0.2c2.2,0.7,3.6,2.8,3.3,5.1c-0.3,2.1-2.1,3.8-4.3,4c-2.3,0.1-4.3-1.3-4.8-3.5     c-0.6-2.3,0.7-4.7,3-5.5c0.2-0.1,0.5-0.2,0.7-0.2C73.2,234.4,73.8,234.4,74.4,234.4z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_as');
                var path_at = rsr.path("M106.5,234.4c0.8,0.4,1.6,0.6,2.3,1.1c1.7,1.3,2.1,3.7,1.2,5.6c-0.9,1.9-3.1,2.9-5.2,2.4c-2-0.4-3.5-2.2-3.6-4.3     c-0.1-2.1,1.3-4,3.3-4.6c0.2-0.1,0.4-0.1,0.6-0.2C105.6,234.4,106.1,234.4,106.5,234.4z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_at');
                var path_au = rsr.path("M103.3,290.2c1.5-0.5,2-1.6,2-3.2c0-6.6,0-13.3,0-19.9c0-0.2,0-0.5,0-0.8c0.3,0,0.6,0,1,0     c0,0.3,0,0.5,0,0.8c0,6.5,0,13.1,0,19.6c0,2.2,0.4,2.7,2.3,3.5C106.9,290.2,105.1,290.2,103.3,290.2z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_au');
                var path_av = rsr.path("M61.4,260c0.2-0.6,0.3-1.2,0.5-1.8c0.8-3,1.6-6,2.5-9c0.7-2.4,3.3-4.5,5.9-4.5c2.2,0,4.3,0,6.5,0c2.9,0,5.3,1.9,6.1,4.6     c0.2,0.6,0.3,1.2,0.6,1.9c0.2-0.2,0.3-0.3,0.5-0.5c0.8-0.9,1.5-1.8,2.3-2.6c0.4-0.4,0.9-0.6,1.3-0.9c0.2-0.1,0.3-0.4,0.3-0.6     c0-2.4,0-4.8,0-7.1c0-0.2,0-0.5,0-0.8c1.4,0,2.7,0,4.1,0c0,3.1,0,6.1,0,9.2c-0.8,0-1.6,0-2.5,0c0.6,1.1,0.2,1.9-0.5,2.7     c-1.5,1.8-3,3.6-4.5,5.5c-0.1,0.2-0.3,0.4-0.5,0.5c-1,0.9-2.3,0.8-2.9-0.4c-0.4-0.8-0.6-1.7-0.9-2.5c-0.2-0.6-0.4-1.2-0.6-1.8     c-0.2-0.8-0.3-0.8-1.2-0.6c0.8,2.9,1.7,5.8,2.5,8.8c-4.8,0-9.5,0-14.4,0c0.8-2.9,1.6-5.8,2.4-8.7c-0.9-0.2-0.9-0.2-1.1,0.6     c-0.7,2.6-1.4,5.1-2.1,7.7c-0.1,0.4-0.3,0.5-0.7,0.5C63.8,259.9,62.6,260,61.4,260z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_av');
                group_a.attr({'parent': 'Icons','name': 'group_a'});
                var Stairs_1_ = rsr.set();
                Stairs_1_.attr({'id': 'Stairs_1_','parent': 'Icons','name': 'Stairs_1_'});
                var group_b = rsr.set();
                var path_aw = rsr.path("M893.2,368.1c0-19.4,0-38.9,0-58.3c19.2,0,38.4,0,57.6,0c0,4.8,0,9.6,0,14.5c-4.9,0-9.6,0-14.4,0     c0,4.8,0,9.6,0,14.4c-4.9,0-9.6,0-14.5,0c0,4.9,0,9.8,0,14.7c-4.8,0-9.5,0-14.3,0c0,4.9,0,9.7,0,14.6c-0.5,0-0.8,0-1.2,0     c-4.1,0-8.1,0-12.2,0C893.9,368,893.5,368,893.2,368.1z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_aw');
                var path_ax = rsr.path("M972.1,309.8c0.1,0.1,0.3,0.1,0.3,0.2c0.1,0.2,0,0.4,0,0.6c0,21.7,0,43.4,0,65c-26.2,0-52.3,0-78.5,0     c-0.3,0-0.5-0.1-0.8-0.2c7.2,0,14.3,0,21.6,0c0-5,0-9.8,0-14.7c4.8,0,9.6,0,14.4,0c0-4.9,0-9.6,0-14.5c4.8,0,9.6,0,14.4,0     c0-4.9,0-9.7,0-14.6c4.8,0,9.6,0,14.4,0c0-4.8,0-9.6,0-14.4c4.8,0,9.4,0,14.2,0C972.1,314.7,972.1,312.2,972.1,309.8z      M947.4,369.7c0.4-0.4,0.6-0.6,0.8-0.9c3.7-3.7,7.4-7.4,11-11c0.3-0.3,0.7-0.7,0.9-1.1c0.7-1,0.6-2.3-0.2-3.2     c-1.2-1.4-3-1.4-4.4,0.1c-3.8,3.8-7.6,7.6-11.4,11.3c-0.2,0.2-0.4,0.4-0.8,0.7c0-2.2,0-4.2,0-6.1c0-1.7-1.1-2.9-2.7-2.9     c-1.6,0-2.7,1.1-2.7,2.8c0,4.2,0,8.3,0,12.5c0,2.1,1.2,3.2,3.2,3.2c4.2,0,8.3,0,12.5,0c1.7,0,2.8-1.1,2.8-2.8     c0-1.6-1.1-2.6-2.9-2.6C951.6,369.7,949.6,369.7,947.4,369.7z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_ax');
                var path_ay = rsr.path("M972.1,309.8c0,2.4,0,4.9,0,7.4c-4.7,0-9.4,0-14.2,0c0,4.8,0,9.6,0,14.4c-4.8,0-9.6,0-14.4,0c0,4.9,0,9.7,0,14.6     c-4.8,0-9.6,0-14.4,0c0,4.9,0,9.6,0,14.5c-4.8,0-9.6,0-14.4,0c0,4.9,0,9.7,0,14.7c-7.3,0-14.4,0-21.6,0c0-2.5,0-4.9,0-7.4     c0.4,0,0.7-0.1,1.1-0.1c4.1,0,8.1,0,12.2,0c0.4,0,0.7,0,1.2,0c0-4.9,0-9.7,0-14.6c4.8,0,9.5,0,14.3,0c0-4.9,0-9.8,0-14.7     c4.9,0,9.6,0,14.5,0c0-4.8,0-9.6,0-14.4c4.8,0,9.5,0,14.4,0c0-4.9,0-9.7,0-14.5C957.9,309.8,965,309.8,972.1,309.8z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ay');
                var path_az = rsr.path("M947.4,369.7c2.2,0,4.2,0,6.2,0c1.8,0,2.8,1,2.9,2.6c0,1.7-1.1,2.8-2.8,2.8c-4.2,0-8.3,0-12.5,0c-2.1,0-3.2-1.2-3.2-3.2     c0-4.2,0-8.3,0-12.5c0-1.7,1.1-2.8,2.7-2.8c1.7,0,2.7,1.1,2.7,2.9c0,2,0,3.9,0,6.1c0.3-0.3,0.6-0.5,0.8-0.7     c3.8-3.8,7.6-7.6,11.4-11.3c1.4-1.4,3.2-1.4,4.4-0.1c0.8,0.9,0.9,2.2,0.2,3.2c-0.3,0.4-0.6,0.7-0.9,1.1c-3.7,3.7-7.4,7.4-11,11     C948,369.1,947.8,369.3,947.4,369.7z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_az');
                group_b.attr({'parent': 'Icons','name': 'group_b'});
                var Elevator = rsr.set();
                Elevator.attr({'id': 'Elevator','parent': 'Icons','name': 'Elevator'});
                var group_c = rsr.set();
                var path_ba = rsr.path("M901.7,578.9c0-16.2,0-32.4,0-48.6c0.1-0.1,0.2-0.2,0.2-0.4c1.1-4.1,4.1-6.4,8.4-6.4c2.8,0,5.6,0,8.4,0     c12.3,0,24.6,0,36.9,0c4.5,0,8.2,3.5,8.3,7.9c0,15.4,0,30.8,0,46.2c0,4.4-3.6,7.9-8,7.9c-15.3,0-30.7,0-46,0     c-2.2,0-4.1-0.9-5.7-2.4C902.8,582,902.2,580.4,901.7,578.9z M910.3,532.2c0,14.9,0,29.8,0,44.7c15,0,30,0,45,0     c0-14.9,0-29.8,0-44.7C940.2,532.2,925.3,532.2,910.3,532.2z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ba');
                var path_bb = rsr.path("M901.7,578.9c0.6,1.6,1.2,3.1,2.4,4.3c1.6,1.5,3.5,2.4,5.7,2.4c15.3,0,30.7,0,46,0c4.4,0,8-3.5,8-7.9     c0-15.4,0-30.8,0-46.2c0-4.5-3.7-7.9-8.3-7.9c-12.3,0-24.6,0-36.9,0c-2.8,0-5.6,0-8.4,0c-4.3,0-7.3,2.3-8.4,6.4     c0,0.1-0.1,0.2-0.2,0.4c0-15.5,0-31,0-46.5c5,0,9.9,0,14.8,0c-1.4,0.4-2.4,1.4-3.3,2.5c-1.9,2.4-3.9,4.7-5.8,7     c-1.5,1.8-3.1,3.7-4.6,5.5c-1.4,1.8-1.1,4.2,0.6,5.6c1.8,1.4,3.7,1.1,5.3-0.8c1.1-1.3,2.1-2.6,3.1-3.9c0.3-0.4,0.6-0.8,0.9-1.1     c0,6,0,12,0,17.9c0,2.3,1.4,4,3.6,4.3c2.9,0.4,5-1.5,5.1-4.6c0-4.1,0-8.3-0.1-12.4c0-1.7,0-3.4,0-5.3c0.4,0.4,0.7,0.7,0.9,1     c1.2,1.5,2.3,2.9,3.6,4.4c1.2,1.5,3.1,1.7,4.7,0.7c2.2-1.4,2.5-4,0.6-6.2c-3.3-4-6.7-7.9-10-11.9c-0.9-1.1-1.9-2.1-3.4-2.6     c9.9,0,19.8,0,29.6,0c-2.6,0.9-3.5,2.8-3.4,5.5c0.1,5.1,0.1,10.3,0.1,15.4c0,0.4,0,0.8,0,1.5c-1.6-2-3-3.7-4.4-5.4     c-0.7-0.8-1.5-1.4-2.6-1.4c-1.7,0-2.9,0.8-3.6,2.2c-0.8,1.5-0.5,3,0.6,4.3c3.6,4.4,7.2,8.7,10.9,13.1c2,2.4,4.6,2.4,6.7,0     c1.1-1.3,2.1-2.6,3.2-3.8c2.5-3,5.1-6.1,7.6-9.1c1.3-1.6,1.5-3.3,0.4-4.8c-1.5-2.3-4.3-2.4-6.1-0.3c-1.4,1.7-2.8,3.3-4.1,5     c-0.2-0.4-0.2-0.8-0.2-1.2c0-5.1,0-10.3,0.2-15.4c0.1-2.7-0.7-4.7-3.4-5.6c4.9,0,9.9,0,14.8,0c0,34,0,68,0,102     c-20.8,0-41.6,0-62.4,0C901.7,583.5,901.7,581.2,901.7,578.9z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bb');
                var path_bc = rsr.path("M917.7,483.7c1.4,0.5,2.4,1.5,3.4,2.6c3.3,4,6.6,7.9,10,11.9c1.9,2.2,1.6,4.8-0.6,6.2c-1.6,1-3.5,0.8-4.7-0.7     c-1.2-1.4-2.4-2.9-3.6-4.4c-0.3-0.3-0.5-0.6-0.9-1c0,1.9,0,3.6,0,5.3c0,4.1,0.1,8.3,0.1,12.4c0,3.1-2.1,5-5.1,4.6     c-2.1-0.3-3.6-2-3.6-4.3c0-5.9,0-11.9,0-17.9c-0.3,0.4-0.6,0.7-0.9,1.1c-1,1.3-2.1,2.6-3.1,3.9c-1.6,1.9-3.5,2.2-5.3,0.8     c-1.8-1.4-2.1-3.7-0.6-5.6c1.5-1.9,3-3.7,4.6-5.5c1.9-2.3,3.9-4.6,5.8-7c0.9-1.1,1.9-2.1,3.3-2.5     C916.9,483.7,917.3,483.7,917.7,483.7z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bc');
                var path_bd = rsr.path("M949.2,483.7c2.7,0.9,3.5,2.9,3.4,5.6c-0.1,5.1-0.1,10.3-0.2,15.4c0,0.4,0,0.7,0.2,1.2c1.4-1.7,2.8-3.4,4.1-5     c1.8-2.1,4.5-2,6.1,0.3c1,1.5,0.9,3.2-0.4,4.8c-2.5,3-5.1,6.1-7.6,9.1c-1.1,1.3-2.1,2.6-3.2,3.8c-2,2.4-4.7,2.4-6.7,0     c-3.6-4.4-7.2-8.7-10.9-13.1c-1.1-1.3-1.4-2.7-0.6-4.3c0.7-1.4,1.9-2.3,3.6-2.2c1.1,0,1.9,0.6,2.6,1.4c1.4,1.7,2.8,3.4,4.4,5.4     c0-0.7,0-1.1,0-1.5c0-5.1,0-10.3-0.1-15.4c-0.1-2.7,0.8-4.6,3.4-5.5C948,483.7,948.6,483.7,949.2,483.7z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bd');
                var path_be = rsr.path("M910.3,532.2c15,0,30,0,45,0c0,14.9,0,29.8,0,44.7c-15,0-29.9,0-45,0C910.3,562,910.3,547.1,910.3,532.2z      M914.8,559.4c0,0.4,0,0.8,0,1.1c0,4.3,0,8.6,0,12.9c0,1.8,1.5,2.7,3,1.9c0.8-0.5,1-1.3,1-2.2c0-4.3,0-8.6,0-12.8     c0-0.3,0.1-0.7,0.1-1c0.1,0,0.2,0,0.3,0c0,0.4,0.1,0.8,0.1,1.1c0,4.3,0,8.6,0,12.9c0,0.8,0.2,1.5,1,1.9c1.4,0.8,2.9-0.1,2.9-1.8     c0-4.1,0-8.2,0-12.3c0-0.6,0-1.2,0-1.9c0.2,0,0.4-0.1,0.5-0.1c1.6-0.1,1.9-0.5,1.9-2.1c0-3.4,0-6.9,0-10.3c0-1.5-0.8-2.3-2.2-2.3     c-2.9,0-5.7,0-8.6,0c-1.5,0-2.3,0.8-2.3,2.2c0,3.6-0.1,7.2,0,10.7c0,0.5,0.5,1.1,1,1.5C913.7,559.4,914.3,559.4,914.8,559.4z      M928.6,559.4c0,0.4,0,0.9,0,1.3c0,4.3,0,8.6,0,12.8c0,1.7,1.5,2.7,2.9,1.9c0.9-0.4,1-1.3,1-2.1c0-4.3,0-8.6,0-12.8     c0-0.4,0.1-0.7,0.1-1.1c0.1,0,0.2,0,0.3,0c0,0.4,0.1,0.7,0.1,1.1c0,4.3,0,8.6,0,12.8c0,1.5,0.7,2.4,2,2.4c1.2,0,1.9-0.8,1.9-2.4     c0-4.3,0-8.6,0-12.8c0-0.4,0-0.7,0-1.1c2.3-0.3,2.4-0.4,2.4-2.7c0-3.1,0-6.3,0-9.4c0-2-0.7-2.7-2.6-2.7c-2.6,0-5.3,0-7.9,0     c-1.8,0-2.6,0.7-2.6,2.6c0,3.2,0,6.4,0,9.6C926.2,558.9,926.4,559.2,928.6,559.4z M950.7,559.5c2.1-0.3,2.4-0.5,2.4-1.8     c0-3.6,0-7.2,0-10.9c0-1.3-0.8-2.1-2.1-2.1c-3,0-5.9,0-8.9,0c-1.3,0-2.1,0.8-2.2,2.1c0,3.7,0,7.4,0,11.1c0,0.9,0.6,1.4,1.5,1.5     c0.3,0,0.5,0.1,0.9,0.1c0,0.5,0,0.9,0,1.4c0,4.2,0,8.5,0,12.7c0,0.8,0.2,1.6,1,1.9c0.6,0.2,1.6,0.2,2-0.1c0.5-0.4,0.8-1.3,0.8-2     c0.1-4.3,0-8.6,0-12.8c0-0.4,0.1-0.7,0.1-1.1c0.1,0,0.2,0,0.3,0c0,0.4,0.1,0.7,0.1,1.1c0,4.3,0,8.6,0,12.9c0,1.4,0.8,2.3,2,2.3     c1.2,0,1.9-0.8,1.9-2.3c0-3.1,0-6.3,0-9.4C950.7,562.6,950.7,561,950.7,559.5z M921.9,541c0-1.7-1.2-2.9-2.8-2.9     c-1.6,0-3,1.3-3,2.8c0,1.6,1.3,2.9,2.9,2.9C920.7,543.9,921.9,542.7,921.9,541z M935.7,540.9c0-1.6-1.3-2.9-2.9-2.8     c-1.6,0-2.9,1.3-2.9,2.8c0,1.6,1.3,3,3,2.9C934.5,543.8,935.7,542.6,935.7,540.9z M949.4,540.9c0-1.7-1.3-2.9-2.9-2.8     c-1.6,0-2.9,1.4-2.9,2.9c0,1.6,1.3,2.9,3,2.8C948.3,543.8,949.5,542.6,949.4,540.9z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_be');
                var path_bf = rsr.path("M914.8,559.4c-0.5-0.1-1.1,0-1.4-0.2c-0.4-0.4-0.9-1-1-1.5c-0.1-3.6-0.1-7.2,0-10.7c0-1.4,0.9-2.2,2.3-2.2     c2.9,0,5.7,0,8.6,0c1.5,0,2.2,0.8,2.2,2.3c0,3.4,0,6.9,0,10.3c0,1.6-0.3,1.9-1.9,2.1c-0.1,0-0.3,0-0.5,0.1c0,0.6,0,1.2,0,1.9     c0,4.1,0,8.2,0,12.3c0,1.7-1.6,2.6-2.9,1.8c-0.7-0.4-1-1.1-1-1.9c0-4.3,0-8.6,0-12.9c0-0.4-0.1-0.8-0.1-1.1c-0.1,0-0.2,0-0.3,0     c0,0.3-0.1,0.7-0.1,1c0,4.3,0,8.6,0,12.8c0,0.9-0.1,1.7-1,2.2c-1.4,0.8-3-0.2-3-1.9c0-4.3,0-8.6,0-12.9     C914.8,560.2,914.8,559.8,914.8,559.4z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bf');
                var path_bg = rsr.path("M928.6,559.4c-2.2-0.3-2.4-0.5-2.4-2.6c0-3.2,0-6.4,0-9.6c0-1.8,0.8-2.6,2.6-2.6c2.6,0,5.3,0,7.9,0     c1.9,0,2.6,0.7,2.6,2.7c0,3.1,0,6.3,0,9.4c0,2.3-0.1,2.4-2.4,2.7c0,0.3,0,0.7,0,1.1c0,4.3,0,8.6,0,12.8c0,1.5-0.7,2.3-1.9,2.4     c-1.2,0-2-0.9-2-2.4c0-4.3,0-8.6,0-12.8c0-0.4,0-0.7-0.1-1.1c-0.1,0-0.2,0-0.3,0c0,0.4-0.1,0.7-0.1,1.1c0,4.3,0,8.6,0,12.8     c0,0.9-0.2,1.7-1,2.1c-1.4,0.7-2.9-0.2-2.9-1.9c0-4.3,0-8.6,0-12.8C928.6,560.3,928.6,559.9,928.6,559.4z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bg');
                var path_bh = rsr.path("M950.7,559.5c0,1.6,0,3.1,0,4.6c0,3.1,0,6.3,0,9.4c0,1.4-0.7,2.2-1.9,2.3c-1.2,0-2-0.8-2-2.3c0-4.3,0-8.6,0-12.9     c0-0.4,0-0.7-0.1-1.1c-0.1,0-0.2,0-0.3,0c0,0.4-0.1,0.7-0.1,1.1c0,4.3,0,8.6,0,12.8c0,0.7-0.3,1.6-0.8,2c-0.5,0.4-1.4,0.3-2,0.1     c-0.8-0.2-1-1-1-1.9c0-4.2,0-8.5,0-12.7c0-0.4,0-0.9,0-1.4c-0.3,0-0.6-0.1-0.9-0.1c-0.9-0.1-1.5-0.6-1.5-1.5c0-3.7,0-7.4,0-11.1     c0-1.3,0.9-2,2.2-2.1c3,0,5.9,0,8.9,0c1.3,0,2.1,0.8,2.1,2.1c0,3.6,0,7.2,0,10.9C953.1,558.9,952.7,559.2,950.7,559.5z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bh');
                var path_bi = rsr.path("M921.9,541c0,1.7-1.2,2.9-2.9,2.8c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.4-2.9,3-2.8C920.7,538.1,921.9,539.3,921.9,541z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bi');
                var path_bj = rsr.path("M935.7,540.9c0,1.7-1.2,2.9-2.8,2.9c-1.7,0-3-1.3-3-2.9c0-1.5,1.3-2.8,2.9-2.8C934.4,538,935.7,539.3,935.7,540.9z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bj');
                var path_bk = rsr.path("M949.4,540.9c0,1.7-1.2,2.9-2.8,2.9c-1.6,0-2.9-1.2-3-2.8c0-1.6,1.3-2.9,2.9-2.9C948.2,538.1,949.4,539.3,949.4,540.9z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bk');
                group_c.attr({'parent': 'Icons','name': 'group_c'});


                var rsrGroups = [Walls,Rooms,RoomCircles,Icons,Museum_Entrance,group_a,Stairs_1_,group_b,Elevator,group_c];
                Walls.push(
                    rect_l ,
                    rect_m ,
                    rect_n ,
                    rect_o ,
                    rect_p ,
                    rect_q ,
                    rect_r ,
                    rect_s ,
                    rect_t ,
                    rect_u ,
                    rect_v ,
                    rect_w ,
                    rect_x ,
                    rect_y ,
                    rect_z ,
                    rect_aa ,
                    rect_ab ,
                    rect_ac ,
                    rect_ad ,
                    rect_ae ,
                    rect_af ,
                    rect_ag ,
                    rect_ah ,
                    rect_ai ,
                    rect_aj ,
                    rect_ak ,
                    rect_al ,
                    rect_am ,
                    rect_an ,
                    rect_ao
                );
                Rooms.push(
                    Room__14 ,
                    Room__13 ,
                    Room__12 ,
                    Room__11 ,
                    Room__10_1_ ,
                    Room__9 ,
                    Room__8 ,
                    Room__7 ,
                    Room__6 ,
                    Room__5 ,
                    Room__4 ,
                    Room__3 ,
                    Room__2 ,
                    Room__1
                );
                RoomCircles.push(
                    B14 ,
                    B13 ,
                    B12 ,
                    B11 ,
                    B10 ,
                    B9 ,
                    B8 ,
                    B7 ,
                    B6 ,
                    B5 ,
                    B4 ,
                    B3 ,
                    B2 ,
                    B1
                );
                Icons.push(
                );
                Museum_Entrance.push(
                );
                group_a.push(
                    path_ap ,
                    path_aq ,
                    path_ar ,
                    path_as ,
                    path_at ,
                    path_au ,
                    path_av
                );
                Stairs_1_.push(
                );
                group_b.push(
                    path_aw ,
                    path_ax ,
                    path_ay ,
                    path_az
                );
                Elevator.push(
                );
                group_c.push(
                    path_ba ,
                    path_bb ,
                    path_bc ,
                    path_bd ,
                    path_be ,
                    path_bf ,
                    path_bg ,
                    path_bh ,
                    path_bi ,
                    path_bj ,
                    path_bk
                );

                var _rooms = [];
                for(var i =0 ; i < RoomCircles.length; i++){

                    var room = {
                        tap: RoomCircles[i],
                        area: Rooms[i],
                        id: RoomCircles[i].data('id').substring(1, RoomCircles[i].data('id').length)
                };


                    _rooms.push(room);
                };

                /* Icons */
                var icons = {
                    "elevator": group_c,
                    "stairs": group_b,
                    "entrance": group_a
                };

                return {
                    icons: icons,
                    rooms: _rooms

                };







            };
        /* Highlights a room */
        var highlightArea = function(roomNumber)
        {

        };


        var clearMap = function()
        {
            console.log(basementLevelRaphael);
            console.log(entryLevelRaphael);
            if(basementLevelRaphael)
                 basementLevelRaphael.remove();

            if(entryLevelRaphael)
                entryLevelRaphael.remove();
        };


        var generateBasementLevel = function()
        {


            var rsr = Raphael('basement-map', '1000', '750');
            basementLevelRaphael = rsr;
            var Basement_Floor = rsr.rect(251.1, 191.9, 484.5, 190.7);
            Basement_Floor.attr({id: 'Basement_Floor',x: '251.1',y: '191.9',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Basement_Floor');
            var Room = rsr.ellipse(499.8, 282.6, 24.7, 24.2);
            Room.attr({id: 'Room',fill: '#E67E22','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room');
            var grZBW2tif = rsr.set();
            grZBW2tif.attr({'id': 'grZBW2.tif','name': 'grZBW2tif'});
            var Walls = rsr.set();
            var rect_f = rsr.rect(192.5, 151.2, 274.2, 22.7).attr({x: '192.5',y: '151.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_f');
            var rect_g = rsr.rect(192.5, 173.8, 45.4, 36.1).attr({x: '192.5',y: '173.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_g');
            var rect_h = rsr.rect(192.5, 247, 45.4, 79.4).attr({x: '192.5',y: '247',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_h');
            var rect_i = rsr.rect(409, 241.9, 11.3, 84.5).attr({x: '409',y: '241.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_i');
            var rect_j = rsr.rect(579.1, 241.9, 12.4, 84.5).attr({x: '579.1',y: '241.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_j');
            var rect_k = rsr.rect(663.6, 265.6, 23.7, 71.1).attr({x: '663.6',y: '265.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_k');
            var rect_l = rsr.rect(310, 265.6, 26.8, 71.1).attr({x: '310',y: '265.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_l');
            var rect_m = rsr.rect(756.4, 241.9, 52.6, 89.7).attr({x: '756.4',y: '241.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_m');
            var rect_n = rsr.rect(532.7, 151.2, 96.9, 22.7).attr({x: '532.7',y: '151.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_n');
            var rect_o = rsr.rect(669.8, 151.2, 323.9, 22.7).attr({x: '669.8',y: '151.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_o');
            var rect_p = rsr.rect(756.4, 169.7, 237.3, 40.2).attr({x: '756.4',y: '169.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_p');
            var rect_q = rsr.rect(976, 6.8, 17.7, 144.3).attr({x: '976',y: '6.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_q');
            var rect_r = rsr.rect(0, 6.8, 976, 20.6).attr({y: '6.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_r');
            var rect_s = rsr.rect(0, 27.4, 21, 387.6).attr({x: '0',y: '27.4',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_s');
            var rect_t = rsr.rect(717, 75, 76, 24).attr({x: '717',y: '75',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_t');
            var rect_u = rsr.rect(95.6, 53.2, 22.7, 71.1).attr({x: '95.6',y: '53.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_u');
            var rect_v = rsr.rect(95.6, 265.6, 22.7, 71.1).attr({x: '95.6',y: '265.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_v');
            var rect_w = rsr.rect(336.8, 398.6, 122.7, 16.5).attr({x: '336.8',y: '398.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_w');
            var rect_x = rsr.rect(524.5, 400, 303.1, 16.7).attr({x: '524.5',y: '400',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_x');
            var rect_y = rsr.rect(567, 513, 260.7, 18).attr({x: '567',y: '513',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_y');
            var rect_z = rsr.rect(1.4, 400, 293.6, 349).attr({x: '1.4',y: '400',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_z');
            var rect_aa = rsr.rect(295, 513, 188, 173).attr({x: '295',y: '513',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aa');
            var rect_ab = rsr.rect(295, 686, 189.1, 63).attr({x: '295',y: '686',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ab');
            var rect_ac = rsr.rect(475.1, 517, 15.9, 14).attr({x: '475.1',y: '517',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ac');
            var rect_ad = rsr.rect(476.3, 531, 15.5, 218).attr({x: '476.3',y: '531',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ad');
            var rect_ae = rsr.rect(491, 730.7, 182.8, 19.3).attr({x: '491',y: '730.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ae');
            var rect_af = rsr.rect(697.3, 730.7, 296.4, 18.3).attr({x: '697.3',y: '730.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_af');
            var rect_ag = rsr.rect(981.5, 501.1, 12.2, 229.6).attr({x: '981.5',y: '501.1',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ag');
            var rect_ah = rsr.rect(867, 517, 8.1, 213.7).attr({x: '867',y: '517',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ah');
            var rect_ai = rsr.rect(875.1, 658, 106.4, 72.6).attr({x: '875.1',y: '658',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ai');
            var rect_aj = rsr.rect(867, 513, 28, 14.8).attr({x: '867',y: '513',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aj');
            var rect_ak = rsr.rect(950.3, 513, 31.2, 15).attr({x: '950.3',y: '513',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ak');
            var rect_al = rsr.rect(863, 401.8, 118.5, 12.6).attr({x: '863',y: '401.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_al');
            var rect_am = rsr.rect(980.1, 209.9, 13.6, 213.2).attr({x: '980.1',y: '209.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_am');
            var rect_an = rsr.rect(650.3, 730.7, 47, 19.3).attr({x: '650.3',y: '730.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_an');
            var rect_ao = rsr.rect(475.1, 513, 45.3, 18).attr({x: '475.1',y: '513',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ao');
            var rect_ap = rsr.rect(663.6, 531, 12.5, 218).attr({x: '663.6',y: '531',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ap');
            Walls.attr({'id': 'Walls','name': 'Walls'});
            var Icons = rsr.set();
            var text_aq = rsr.text(0, 0, 'Exit').attr({"font-family": 'ArialMT',"font-size": '24',parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).transform("m1 0 0 1 928.2839 436.857").data('id', 'text_aq');
            Icons.attr({'id': 'Icons','name': 'Icons'});
            var Exit = rsr.set();
            Exit.attr({'id': 'Exit','parent': 'Icons','name': 'Exit'});
            var exit = rsr.set();
            var path_ar = rsr.path("M925.2,500.7c0-19.9,0-39.8,0-59.7c19.9,0,39.8,0,59.7,0c0,19.9,0,39.8,0,59.7     C965,500.7,945.1,500.7,925.2,500.7z M964.6,462.1c0-0.2,0-0.3,0-0.5c0-4.8,0-9.5,0-14.3c0-1.4-0.7-2.1-2.1-2.1     c-10.7,0-21.5,0-32.2,0c-1.4,0-2.1,0.7-2.1,2.1c0,12.8,0,25.6,0,38.4c0,1.3,0.3,2.2,1.6,2.7c0.2,0.1,0.4,0.2,0.6,0.3     c4.8,2.7,9.6,5.4,14.3,8.1c1.6,0.9,3,0.1,3-1.8c0-1.5,0-2.9,0-4.4c0-0.8,0-1.5,0-2.3c0.3,0,0.5,0,0.7,0c4.7,0,9.4,0,14,0     c1.5,0,2.2-0.7,2.2-2.1c0-3.7,0-7.4,0-11.1c0-0.2,0-0.4,0-0.6c-1.3,0-2.4,0-3.7,0c0,3.4,0,6.8,0,10.1c-4.4,0-8.8,0-13.2,0     c0-0.3,0-0.5,0-0.7c0-9.2,0-18.4,0-27.6c0-1-0.4-1.7-1.3-2.2c-2.8-1.6-5.7-3.2-8.5-4.8c-0.2-0.1-0.3-0.2-0.6-0.4     c7.9,0,15.7,0,23.6,0c0,4.4,0,8.7,0,13.1C962.2,462.1,963.4,462.1,964.6,462.1z M968.5,465.7c-0.3,0-0.5,0-0.7,0c-3,0-6,0-9,0     c-0.9,0-1.6,0.2-2.2,0.9c-0.7,0.8-0.8,1.7-0.4,2.7c0.5,1,1.3,1.6,2.5,1.6c3,0,6,0,9,0c0.2,0,0.5,0,0.8,0c0,1.5,0,3,0,4.5     c0,0.6,0.1,1.1,0.6,1.3c0.6,0.3,1,0.1,1.4-0.3c3.2-2.4,6.5-4.7,9.7-7.1c0.9-0.7,0.9-1.5,0-2.1c-1.8-1.3-3.6-2.6-5.4-3.9     c-1.5-1.1-2.9-2.1-4.4-3.2c-0.4-0.3-0.9-0.5-1.4-0.2c-0.5,0.3-0.6,0.7-0.6,1.3c0,0.3,0,0.6,0,0.9     C968.5,463.3,968.5,464.5,968.5,465.7z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_ar');
            var path_as = rsr.path("M964.6,462.1c-1.2,0-2.4,0-3.6,0c0-4.4,0-8.7,0-13.1c-7.9,0-15.7,0-23.6,0c0.2,0.1,0.4,0.3,0.6,0.4     c2.8,1.6,5.7,3.2,8.5,4.8c0.9,0.5,1.3,1.1,1.3,2.2c0,9.2,0,18.4,0,27.6c0,0.2,0,0.4,0,0.7c4.4,0,8.8,0,13.2,0c0-3.4,0-6.7,0-10.1     c1.3,0,2.4,0,3.7,0c0,0.2,0,0.4,0,0.6c0,3.7,0,7.4,0,11.1c0,1.4-0.7,2.1-2.2,2.1c-4.7,0-9.4,0-14,0c-0.2,0-0.5,0-0.7,0     c0,0.8,0,1.6,0,2.3c0,1.5,0,2.9,0,4.4c0,1.9-1.4,2.7-3,1.8c-4.8-2.7-9.6-5.4-14.3-8.1c-0.2-0.1-0.4-0.2-0.6-0.3     c-1.3-0.5-1.6-1.4-1.6-2.7c0-12.8,0-25.6,0-38.4c0-1.4,0.7-2.1,2.1-2.1c10.7,0,21.5,0,32.2,0c1.4,0,2.1,0.7,2.1,2.1     c0,4.8,0,9.5,0,14.3C964.6,461.8,964.6,462,964.6,462.1z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_as');
            var path_at = rsr.path("M968.5,465.7c0-1.3,0-2.5,0-3.7c0-0.3,0-0.6,0-0.9c0-0.5,0.1-1,0.6-1.3c0.5-0.2,0.9-0.1,1.4,0.2c1.5,1.1,2.9,2.1,4.4,3.2     c1.8,1.3,3.6,2.6,5.4,3.9c1,0.7,1,1.5,0,2.1c-3.2,2.4-6.5,4.7-9.7,7.1c-0.4,0.3-0.9,0.6-1.4,0.3c-0.5-0.3-0.6-0.8-0.6-1.3     c0-1.5,0-2.9,0-4.5c-0.3,0-0.5,0-0.8,0c-3,0-6,0-9,0c-1.1,0-2-0.5-2.5-1.6c-0.4-1-0.3-1.9,0.4-2.7c0.6-0.7,1.3-0.9,2.2-0.9     c3,0,6,0,9,0C968,465.7,968.2,465.7,968.5,465.7z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_at');
            exit.attr({'parent': 'Icons','name': 'exit'});
            var Stairs = rsr.set();
            Stairs.attr({'id': 'Stairs','parent': 'Icons','name': 'Stairs'});
            var stairs = rsr.set();
            var path_au = rsr.path("M875,317.5c0-23.3,0-46.6,0-69.9c23,0,46.1,0,69.1,0c0,5.8,0,11.5,0,17.4c-5.8,0-11.5,0-17.3,0     c0,5.8,0,11.5,0,17.3c-5.8,0-11.5,0-17.4,0c0,5.9,0,11.7,0,17.6c-5.7,0-11.3,0-17.1,0c0,5.9,0,11.6,0,17.5c-0.6,0-1,0-1.4,0     c-4.9,0-9.7,0-14.6,0C875.9,317.4,875.4,317.5,875,317.5z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_au');
            var path_av = rsr.path("M969.7,247.6c0.1,0.1,0.4,0.1,0.4,0.2c0.1,0.2,0,0.5,0,0.7c0,26,0,52,0,78c-31.4,0-62.8,0-94.1,0     c-0.3,0-0.6-0.1-1-0.2c8.6,0,17.2,0,25.9,0c0-6,0-11.7,0-17.6c5.8,0,11.5,0,17.3,0c0-5.8,0-11.6,0-17.4c5.8,0,11.5,0,17.3,0     c0-5.9,0-11.6,0-17.5c5.8,0,11.5,0,17.3,0c0-5.8,0-11.5,0-17.3c5.7,0,11.3,0,17,0C969.7,253.4,969.7,250.5,969.7,247.6z      M949.5,310.2c0,2.6,0,5,0,7.4c0,2.1,1.2,3.4,3.2,3.4c1.9,0.1,3.3-1.1,3.4-3.1c0.1-5.1,0.1-10.3,0-15.4c0-2.4-1.5-3.7-3.9-3.7     c-5,0-10,0-14.9,0c-2.1,0-3.4,1.4-3.4,3.4c0,2,1.3,3.1,3.4,3.2c2.1,0,4.2,0,6.2,0c0.3,0,0.6,0,1,0.1c0.1,0.1,0.1,0.2,0.2,0.3     c-0.3,0.3-0.7,0.5-1,0.8c-4.4,4.4-8.8,8.8-13.2,13.2c-0.4,0.4-0.9,0.9-1.1,1.4c-1.1,1.9,0.1,4.4,2.3,4.8c1.4,0.2,2.5-0.3,3.5-1.3     c4.5-4.5,8.9-8.9,13.4-13.4C948.7,311,949,310.7,949.5,310.2z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_av');
            var path_aw = rsr.path("M969.7,247.6c0,2.9,0,5.9,0,8.9c-5.7,0-11.3,0-17,0c0,5.8,0,11.5,0,17.3c-5.8,0-11.5,0-17.3,0c0,5.9,0,11.6,0,17.5     c-5.8,0-11.5,0-17.3,0c0,5.8,0,11.6,0,17.4c-5.8,0-11.5,0-17.3,0c0,5.9,0,11.7,0,17.6c-8.7,0-17.3,0-25.9,0c0-2.9,0-5.9,0-8.8     c0.4,0,0.9-0.1,1.3-0.1c4.9,0,9.7,0,14.6,0c0.4,0,0.8,0,1.4,0c0-5.9,0-11.7,0-17.5c5.8,0,11.4,0,17.1,0c0-5.9,0-11.7,0-17.6     c5.8,0,11.5,0,17.4,0c0-5.8,0-11.5,0-17.3c5.8,0,11.5,0,17.3,0c0-5.9,0-11.6,0-17.4C952.6,247.6,961.2,247.6,969.7,247.6z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_aw');
            var path_ax = rsr.path("M949.5,310.2c-0.5,0.5-0.8,0.7-1,1c-4.5,4.5-8.9,8.9-13.4,13.4c-1,1-2,1.6-3.5,1.3c-2.2-0.4-3.4-2.9-2.3-4.8     c0.3-0.5,0.7-1,1.1-1.4c4.4-4.4,8.8-8.8,13.2-13.2c0.3-0.3,0.7-0.5,1-0.8c-0.1-0.1-0.1-0.2-0.2-0.3c-0.3,0-0.6-0.1-1-0.1     c-2.1,0-4.2,0-6.2,0c-2.1,0-3.4-1.2-3.4-3.2c0-2,1.3-3.4,3.4-3.4c5,0,10,0,14.9,0c2.4,0,3.8,1.3,3.9,3.7c0.1,5.1,0.1,10.3,0,15.4     c0,2-1.4,3.2-3.4,3.1c-2-0.1-3.2-1.4-3.2-3.4C949.5,315.2,949.5,312.9,949.5,310.2z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ax');
            stairs.attr({'parent': 'Icons','name': 'stairs'});
            var Elevator = rsr.set();
            Elevator.attr({'id': 'Elevator','parent': 'Icons','name': 'Elevator'});
            var elevator = rsr.set();
            var path_ay = rsr.path("M966.1,585.8c0,18,0,36,0,54.1c-0.1,0.2-0.2,0.4-0.3,0.6c-0.9,3.3-3,5.5-6.4,6.5c-0.3,0.1-0.5,0.2-0.8,0.3     c-18,0-36,0-54.1,0c-1.9-0.6-3.9-1.3-5.2-3c-1-1.4-1.7-3-2.5-4.5c0-18,0-36,0-54.1c0.1-0.3,0.2-0.6,0.3-0.8     c1.1-3.9,4.5-6.7,8.6-6.7c17.1,0,34.2,0,51.3,0c3.9,0,7.3,2.6,8.5,6.4C965.8,585,966,585.4,966.1,585.8z M956.6,587.9     c-16.7,0-33.4,0-50,0c0,16.6,0,33.1,0,49.7c16.7,0,33.3,0,50,0C956.6,621,956.6,604.5,956.6,587.9z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ay');
            var path_az = rsr.path("M966.1,585.8c-0.1-0.4-0.3-0.8-0.4-1.2c-1.2-3.8-4.5-6.4-8.5-6.4c-17.1,0-34.2,0-51.3,0     c-4.1,0-7.5,2.7-8.6,6.7c-0.1,0.3-0.2,0.6-0.3,0.8c0-17.2,0-34.5,0-51.7c5.5,0,11,0,16.5,0c-1.6,0.5-2.7,1.5-3.7,2.8     c-2.1,2.6-4.3,5.2-6.4,7.8c-1.7,2-3.4,4.1-5.1,6.2c-1.6,2-1.3,4.6,0.7,6.2c2,1.6,4.1,1.2,5.9-0.9c1.2-1.4,2.3-2.9,3.5-4.3     c0.3-0.4,0.7-0.8,1-1.2c0,6.7,0,13.3,0,19.9c0,2.6,1.6,4.4,4,4.8c3.3,0.5,5.6-1.6,5.6-5.1c0-4.6,0-9.2-0.1-13.8     c0-1.9,0-3.8,0-5.8c0.4,0.5,0.7,0.8,1,1.2c1.3,1.6,2.6,3.3,4,4.8c1.4,1.6,3.4,1.9,5.2,0.7c2.5-1.6,2.7-4.4,0.7-6.9     c-3.7-4.4-7.4-8.8-11.1-13.2c-1-1.3-2.2-2.4-3.7-2.9c11,0,22,0,33,0c-2.9,1-3.9,3.1-3.8,6.1c0.2,5.7,0.1,11.4,0.1,17.2     c0,0.5,0,0.9,0,1.7c-1.8-2.2-3.3-4.1-4.9-6c-0.7-0.9-1.7-1.5-2.9-1.5c-1.9,0-3.2,0.9-4,2.5c-0.8,1.7-0.5,3.3,0.7,4.7     c4,4.8,8,9.7,12.1,14.5c2.2,2.7,5.2,2.7,7.4,0c1.2-1.4,2.4-2.8,3.6-4.3c2.8-3.4,5.7-6.7,8.5-10.1c1.5-1.8,1.6-3.7,0.5-5.3     c-1.7-2.5-4.8-2.7-6.8-0.4c-1.6,1.8-3.1,3.7-4.6,5.6c-0.3-0.5-0.3-0.9-0.3-1.3c0.1-5.7,0-11.4,0.2-17.2c0.1-3-0.8-5.2-3.8-6.2     c5.4,0,10.8,0,16.2,0C966.1,551.3,966.1,568.5,966.1,585.8z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_az');
            var path_ba = rsr.path("M914.9,534c1.6,0.5,2.7,1.7,3.7,2.9c3.7,4.4,7.4,8.8,11.1,13.2c2.1,2.5,1.8,5.3-0.7,6.9c-1.8,1.1-3.8,0.9-5.2-0.7     c-1.4-1.6-2.6-3.2-4-4.8c-0.3-0.3-0.6-0.7-1-1.2c0,2.1,0,4,0,5.8c0,4.6,0.1,9.2,0.1,13.8c0,3.5-2.4,5.6-5.6,5.1     c-2.4-0.3-4-2.2-4-4.8c0-6.6,0-13.2,0-19.9c-0.3,0.4-0.7,0.8-1,1.2c-1.2,1.4-2.3,2.9-3.5,4.3c-1.7,2.1-3.9,2.5-5.9,0.9     c-2-1.5-2.3-4.2-0.7-6.2c1.7-2.1,3.4-4.1,5.1-6.2c2.1-2.6,4.3-5.1,6.4-7.8c1-1.3,2.1-2.3,3.7-2.8C913.9,534,914.4,534,914.9,534z     ").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_ba');
            var path_bb = rsr.path("M949.9,534c3,1,3.9,3.2,3.8,6.2c-0.2,5.7-0.1,11.4-0.2,17.2c0,0.4,0,0.8,0.3,1.3c1.5-1.9,3.1-3.7,4.6-5.6     c2-2.4,5-2.2,6.8,0.4c1.1,1.7,1,3.6-0.5,5.3c-2.8,3.4-5.7,6.8-8.5,10.1c-1.2,1.4-2.4,2.9-3.6,4.3c-2.3,2.6-5.2,2.6-7.4,0     c-4-4.8-8.1-9.7-12.1-14.5c-1.2-1.4-1.5-3.1-0.7-4.7c0.8-1.6,2.1-2.5,4-2.5c1.2,0,2.1,0.6,2.9,1.5c1.6,1.9,3.1,3.8,4.9,6     c0-0.8,0-1.2,0-1.7c0-5.7,0-11.4-0.1-17.2c-0.1-3,0.9-5.1,3.8-6.1C948.5,534,949.2,534,949.9,534z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bb');
            var path_bc = rsr.path("M897,639.8c0.8,1.5,1.5,3.1,2.5,4.5c1.2,1.7,3.2,2.4,5.2,3c-2.6,0-5.1,0-7.7,0     C897,644.8,897,642.3,897,639.8z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bc');
            var path_bd = rsr.path("M958.7,647.3c0.3-0.1,0.5-0.2,0.8-0.3c3.3-1,5.4-3.2,6.4-6.5c0.1-0.2,0.2-0.4,0.3-0.6c0,2.5,0,5,0,7.4     C963.7,647.3,961.2,647.3,958.7,647.3z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bd');
            var path_be = rsr.path("M956.6,587.9c0,16.6,0,33.1,0,49.7c-16.7,0-33.3,0-50,0c0-16.5,0-33.1,0-49.7     C923.2,587.9,939.9,587.9,956.6,587.9z M911.6,618.2c0,0.5,0,0.9,0,1.3c0,4.8,0,9.6,0,14.4c0,1.9,1.7,3,3.3,2.1     c0.9-0.5,1-1.4,1-2.3c0-4.8,0-9.5,0-14.3c0-0.4,0.1-0.8,0.1-1.2c0.1,0,0.2,0,0.3,0c0,0.4,0.1,0.8,0.1,1.2c0,4.7,0,9.4,0,14.2     c0,1.8,0.8,2.8,2.2,2.8c1.4,0,2.1-0.9,2.1-2.7c0-4.7,0-9.4,0-14.2c0-0.4,0-0.8,0-1.2c2.3-0.3,2.7-0.6,2.7-2c0-4,0-8,0-12.1     c0-1.4-0.9-2.4-2.3-2.4c-3.3,0-6.7,0-10,0c-1.4,0-2.3,0.9-2.3,2.3c0,4.1,0,8.2,0,12.3c0,1,0.6,1.6,1.7,1.7     C910.9,618.2,911.2,618.2,911.6,618.2z M936.2,618.2c0.4,0,0.7-0.1,1-0.1c1.2-0.1,1.7-0.6,1.7-1.8c0-4.1,0-8.1,0-12.2     c0-1.4-0.9-2.3-2.2-2.3c-3.4,0-6.7,0-10.1,0c-1.3,0-2.2,0.9-2.3,2.2c-0.1,4.1,0,8.3,0,12.4c0,1,0.6,1.5,1.6,1.7     c0.3,0,0.7,0.1,1.1,0.1c0,0.5,0,0.9,0,1.3c0,4.8,0,9.6,0,14.4c0,1.9,1.8,3,3.4,2c0.9-0.5,1-1.4,1-2.3c0-4.8,0-9.5,0-14.3     c0-0.4,0.1-0.8,0.1-1.2c0.1,0,0.3,0,0.4,0c0,0.4,0,0.8,0,1.2c0,4.8,0,9.6,0,14.4c0,1.5,0.8,2.5,2.1,2.5c1.4,0,2.2-0.9,2.2-2.5     c0-4.6,0-9.2,0-13.8C936.2,619.4,936.2,618.9,936.2,618.2z M951.5,618.3c0.3,0,0.4-0.1,0.6-0.1c1.8-0.1,2.1-0.5,2.1-2.3     c0-3.8,0-7.7,0-11.5c0-1.6-0.9-2.5-2.5-2.5c-3.2,0-6.4,0-9.6,0c-1.5,0-2.4,0.9-2.5,2.4c0,4.1,0,8.1,0,12.2c0,1,0.6,1.6,1.6,1.8     c0.3,0,0.6,0.1,1,0.1c0,0.5,0,0.9,0,1.3c0,4.8,0,9.6,0,14.4c0,2,1.7,3,3.3,2.1c0.9-0.5,1.1-1.4,1.1-2.3c0-4.8,0-9.6,0-14.4     c0-0.4,0.1-0.8,0.1-1.1c0.1,0,0.2,0,0.3,0c0,0.4,0.1,0.9,0.1,1.3c0,4.8,0,9.6,0,14.4c0,1,0.3,1.8,1.2,2.2     c1.5,0.8,3.1-0.3,3.2-2.1c0-4.8,0-9.7,0-14.5C951.5,619.1,951.5,618.7,951.5,618.3z M919.5,597.7c0-1.8-1.4-3.2-3.2-3.2     c-1.8,0-3.3,1.4-3.3,3.2c0,1.8,1.5,3.2,3.3,3.2C918.2,600.9,919.5,599.6,919.5,597.7z M934.8,597.6c0-1.8-1.4-3.2-3.2-3.2     c-1.8,0-3.3,1.5-3.2,3.3c0.1,1.8,1.5,3.2,3.3,3.2C933.5,600.9,934.8,599.5,934.8,597.6z M950.1,597.7c0-1.9-1.3-3.2-3.2-3.2     c-1.8,0-3.3,1.4-3.3,3.2c0,1.8,1.4,3.2,3.2,3.2C948.8,600.9,950.1,599.6,950.1,597.7z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_be');
            var path_bf = rsr.path("M911.6,618.2c-0.4,0-0.7-0.1-1-0.1c-1-0.1-1.7-0.7-1.7-1.7c0-4.1,0-8.2,0-12.3c0-1.4,1-2.2,2.3-2.3c3.3,0,6.7,0,10,0     c1.4,0,2.3,0.9,2.3,2.4c0,4,0,8,0,12.1c0,1.4-0.4,1.7-2.7,2c0,0.4,0,0.8,0,1.2c0,4.7,0,9.4,0,14.2c0,1.8-0.7,2.7-2.1,2.7     c-1.4,0-2.2-1-2.2-2.8c0-4.7,0-9.4,0-14.2c0-0.4,0-0.8-0.1-1.2c-0.1,0-0.2,0-0.3,0c0,0.4-0.1,0.8-0.1,1.2c0,4.8,0,9.5,0,14.3     c0,0.9-0.2,1.8-1,2.3c-1.6,0.9-3.3-0.1-3.3-2.1c0-4.8,0-9.6,0-14.4C911.6,619.1,911.6,618.7,911.6,618.2z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bf');
            var path_bg = rsr.path("M936.2,618.2c0,0.6,0,1.2,0,1.8c0,4.6,0,9.2,0,13.8c0,1.6-0.8,2.6-2.2,2.5c-1.3,0-2.1-1-2.1-2.5c0-4.8,0-9.6,0-14.4     c0-0.4,0-0.8,0-1.2c-0.1,0-0.3,0-0.4,0c0,0.4-0.1,0.8-0.1,1.2c0,4.8,0,9.5,0,14.3c0,0.9-0.1,1.8-1,2.3c-1.6,1-3.4-0.1-3.4-2     c0-4.8,0-9.6,0-14.4c0-0.4,0-0.8,0-1.3c-0.4,0-0.7-0.1-1.1-0.1c-1-0.1-1.6-0.7-1.6-1.7c0-4.1,0-8.3,0-12.4c0-1.3,1-2.2,2.3-2.2     c3.4,0,6.7,0,10.1,0c1.3,0,2.2,1,2.2,2.3c0,4.1,0,8.1,0,12.2c0,1.1-0.5,1.7-1.7,1.8C936.9,618.2,936.6,618.2,936.2,618.2z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bg');
            var path_bh = rsr.path("M951.5,618.3c0,0.4,0,0.8,0,1.3c0,4.8,0,9.7,0,14.5c0,1.8-1.6,2.9-3.2,2.1c-0.9-0.5-1.2-1.2-1.2-2.2c0-4.8,0-9.6,0-14.4     c0-0.4-0.1-0.9-0.1-1.3c-0.1,0-0.2,0-0.3,0c0,0.4-0.1,0.8-0.1,1.1c0,4.8,0,9.6,0,14.4c0,0.9-0.2,1.8-1.1,2.3     c-1.6,0.9-3.3-0.2-3.3-2.1c0-4.8,0-9.6,0-14.4c0-0.4,0-0.8,0-1.3c-0.4,0-0.7-0.1-1-0.1c-1-0.1-1.6-0.7-1.6-1.8     c0-4.1,0-8.1,0-12.2c0-1.5,1-2.3,2.5-2.4c3.2,0,6.4,0,9.6,0c1.6,0,2.5,0.9,2.5,2.5c0,3.8,0,7.7,0,11.5c0,1.8-0.4,2.2-2.1,2.3     C951.9,618.2,951.8,618.2,951.5,618.3z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bh');
            var path_bi = rsr.path("M919.5,597.7c0,1.9-1.4,3.2-3.2,3.2c-1.8,0-3.2-1.4-3.3-3.2c0-1.8,1.5-3.2,3.3-3.2C918.2,594.5,919.5,595.8,919.5,597.7z     ").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bi');
            var path_bj = rsr.path("M934.8,597.6c0,1.9-1.3,3.2-3.1,3.3c-1.8,0-3.3-1.4-3.3-3.2c-0.1-1.7,1.4-3.2,3.2-3.3     C933.4,594.4,934.8,595.8,934.8,597.6z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bj');
            var path_bk = rsr.path("M950.1,597.7c0,1.9-1.4,3.2-3.2,3.2c-1.8,0-3.2-1.5-3.2-3.2c0-1.8,1.5-3.2,3.3-3.2C948.8,594.5,950.2,595.9,950.1,597.7z     ").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bk');
            elevator.attr({'parent': 'Icons','name': 'elevator'});
            var Man = rsr.set();
            Man.attr({'id': 'Man','parent': 'Icons','name': 'Man'});
            var man = rsr.set();
            var path_bl = rsr.path("M577.3,574c5.9,0,11.8,0,17.7,0c0,32.6,0,65.2,0,97.7c-12.4,0-24.7,0-37.1,0c0-32.6,0-65.2,0-97.7     c5.9,0,11.8,0,17.7,0c-0.1,0-0.2,0.1-0.3,0.1c-3.5,0.5-6.1,3-6.7,6.5c-1,5.8,4.4,10.6,10.2,8.9c3.3-1,5.5-4,5.6-7.4     c0.1-3.3-2-6.4-5.2-7.6C578.5,574.3,577.9,574.2,577.3,574z M577.3,630.4c0,0.2,0,0.4,0,0.5c0,11.8,0,23.7,0,35.5     c0,0.6,0.1,1.3,0.2,1.9c0.6,1.9,2.4,3.2,4.5,3.1c1.9-0.1,3.3-0.8,4.1-2.6c0.4-0.8,0.4-1.7,0.4-2.5c0-20.4,0-40.7,0-61.1     c0-0.2,0-0.4,0-0.6c0.6,0,1.1,0,1.6,0c0,0.2,0,0.4,0,0.6c0,7.1,0,14.2,0,21.4c0,0.3,0,0.6,0,0.8c0.1,1.3,0.6,2.3,1.8,2.9     c1.2,0.6,2.4,0.5,3.5-0.2c1.1-0.7,1.5-1.9,1.5-3.2c0-8,0-16.1,0-24.1c0-0.7,0-1.4-0.2-2.1c-1-4.9-5.1-8.6-10.3-8.5     c-5.3,0.1-10.7,0-16,0c-0.6,0-1.2,0-1.8,0.1c-2.3,0.3-4.2,1.4-5.8,3.1c-1.9,2.1-2.8,4.6-2.8,7.4c0,8.1,0,16.1,0,24.2     c0,0.1,0,0.3,0,0.4c0.1,1.4,0.7,2.4,2,3c1.3,0.6,2.6,0.4,3.7-0.5c0.9-0.7,1.2-1.8,1.2-2.9c0-7.2,0-14.5,0-21.7c0-0.2,0-0.3,0-0.5     c0.6,0,1.1,0,1.7,0c0,0.2,0,0.4,0,0.6c0,20.4,0,40.8,0,61.2c0,0.5,0,1.1,0.1,1.6c0.4,1.7,1.3,2.8,3,3.3c1.7,0.5,3.3,0.2,4.7-1     c1.1-1,1.4-2.3,1.4-3.7c0-11.9,0-23.8,0-35.6c0-0.2,0-0.3,0-0.5C576.2,630.4,576.7,630.4,577.3,630.4z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bl');
            var path_bm = rsr.path("M577.3,574c0.6,0.2,1.3,0.3,1.9,0.5c3.2,1.2,5.3,4.2,5.2,7.6c-0.1,3.4-2.3,6.4-5.6,7.4c-5.8,1.8-11.2-3.1-10.2-8.9     c0.6-3.5,3.2-6,6.7-6.5c0.1,0,0.2-0.1,0.3-0.1C576.1,574,576.7,574,577.3,574z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bm');
            var path_bn = rsr.path("M577.3,630.4c-0.5,0-1,0-1.6,0c0,0.2,0,0.4,0,0.5c0,11.9,0,23.8,0,35.6c0,1.4-0.3,2.7-1.4,3.7c-1.4,1.2-2.9,1.5-4.7,1     c-1.6-0.5-2.6-1.6-3-3.3c-0.1-0.5-0.1-1-0.1-1.6c0-20.4,0-40.8,0-61.2c0-0.2,0-0.4,0-0.6c-0.6,0-1.1,0-1.7,0c0,0.2,0,0.4,0,0.5     c0,7.2,0,14.5,0,21.7c0,1.1-0.3,2.2-1.2,2.9c-1.1,0.9-2.4,1.1-3.7,0.5c-1.3-0.6-1.9-1.7-2-3c0-0.1,0-0.3,0-0.4     c0-8.1,0-16.1,0-24.2c0-2.8,0.9-5.3,2.8-7.4c1.6-1.7,3.5-2.8,5.8-3.1c0.6-0.1,1.2-0.1,1.8-0.1c5.3,0,10.7,0.1,16,0     c5.2-0.1,9.3,3.6,10.3,8.5c0.1,0.7,0.2,1.4,0.2,2.1c0,8,0,16.1,0,24.1c0,1.3-0.4,2.4-1.5,3.2c-1.1,0.7-2.3,0.8-3.5,0.2     c-1.2-0.6-1.7-1.6-1.8-2.9c0-0.3,0-0.6,0-0.8c0-7.1,0-14.2,0-21.4c0-0.2,0-0.4,0-0.6c-0.5,0-1,0-1.6,0c0,0.2,0,0.4,0,0.6     c0,20.4,0,40.7,0,61.1c0,0.9,0,1.7-0.4,2.5c-0.8,1.7-2.2,2.5-4.1,2.6c-2.1,0.1-3.9-1.2-4.5-3.1c-0.2-0.6-0.2-1.2-0.2-1.9     c0-11.8,0-23.7,0-35.5C577.3,630.8,577.3,630.6,577.3,630.4z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bn');
            man.attr({'parent': 'Icons','name': 'men'});
            var Woman = rsr.set();
            Woman.attr({'id': 'Woman','parent': 'Icons','name': 'Woman'});
            var woman = rsr.set();
            var path_bo = rsr.path("M764.6,673.3c-0.3,0-0.7,0-1,0c-0.1,0-0.2-0.1-0.3-0.1c-1.5-0.3-2.6-1.3-2.9-2.9c-0.1-0.4-0.1-0.8-0.1-1.2c0-9,0-18,0-27     c0-0.2,0-0.4,0-0.6c-3.4,0-6.7,0-10,0c3.6-12.4,7.2-24.8,10.7-37.2c-0.4,0-0.8,0-1.2,0c-0.3,0-0.4,0.1-0.5,0.4     c-1.9,6.4-3.8,12.9-5.8,19.3c-0.3,0.9-0.5,1.7-0.9,2.5c-0.7,1.3-1.9,1.8-3.3,1.6c-1.4-0.2-2.3-1.1-2.7-2.4     c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.4,0-0.7,0-1.1c0.1-0.4,0.2-0.8,0.3-1.2c2.3-7.5,4.6-14.9,6.8-22.4c1.1-3.8,4.8-7.7,10.2-7.6     c3.5,0,7.1,0,10.6,0c0.7,0,1.4,0,2.1,0.2c4,0.9,6.8,3.4,8,7.2c2.4,7.6,4.7,15.2,7,22.8c0.2,0.8,0.3,1.5,0.1,2.3     c-0.3,1.3-1,2.1-2.2,2.5c-1.2,0.4-2.3,0.1-3.2-0.7c-0.6-0.5-0.9-1.2-1.2-2c-1.6-5.5-3.3-11-4.9-16.5c-0.5-1.5-0.9-3-1.4-4.5     c-0.6,0-1.2,0-1.8,0c3.6,12.4,7.2,24.8,10.9,37.2c-3.4,0-6.7,0-10.1,0c0,0.2,0,0.4,0,0.6c0,9,0,18.1,0,27.1c0,0.2,0,0.4,0,0.6     c-0.1,1.7-1.1,3-2.8,3.4c-0.1,0-0.3,0.1-0.4,0.1c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2-0.1-0.3-0.1c-1.4-0.3-2.4-1.1-2.8-2.5     c-0.1-0.5-0.1-1-0.1-1.4c0-9.1,0-18.1,0-27.2c0-0.2,0-0.4,0-0.5c-0.8,0-1.5,0-2.2,0c0,0.2,0,0.4,0,0.6c0,9,0,18,0,27     c0,0.3,0,0.6,0,0.8c-0.1,1.1-0.6,2.1-1.5,2.7C765.8,672.9,765.2,673,764.6,673.3z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_bo');
            var path_bp = rsr.path("M774.5,673.3c0.1,0,0.3-0.1,0.4-0.1c1.7-0.4,2.7-1.7,2.8-3.4c0-0.2,0-0.4,0-0.6c0-9,0-18.1,0-27.1     c0-0.2,0-0.4,0-0.6c3.4,0,6.7,0,10.1,0c-3.6-12.4-7.2-24.8-10.9-37.2c0.6,0,1.2,0,1.8,0c0.4,1.5,0.9,3,1.4,4.5     c1.6,5.5,3.3,11,4.9,16.5c0.2,0.8,0.6,1.5,1.2,2c0.9,0.8,2,1.1,3.2,0.7c1.2-0.4,2-1.3,2.2-2.5c0.2-0.8,0.1-1.6-0.1-2.3     c-2.3-7.6-4.5-15.3-7-22.8c-1.2-3.8-4-6.3-8-7.2c-0.7-0.2-1.4-0.2-2.1-0.2c-3.5,0-7.1,0-10.6,0c-5.4,0-9.1,3.8-10.2,7.6     c-2.3,7.5-4.5,14.9-6.8,22.4c-0.1,0.4-0.2,0.8-0.3,1.2c0-16.5,0-33,0-49.5c7.3,0,14.6,0,21.9,0c-0.1,0-0.2,0.1-0.2,0.1     c-0.9,0.1-1.8,0.4-2.7,0.8c-3.5,1.7-5.2,6.1-3.9,9.8c1.2,3.3,4.4,5.6,8.1,5.3c3.9-0.3,7.1-3.3,7.5-7.1c0.4-3.7-1.8-7.1-5.3-8.4     c-0.6-0.2-1.3-0.3-1.9-0.5c7.3,0,14.6,0,21.9,0c0,32.9,0,65.8,0,98.7C786,673.3,780.2,673.3,774.5,673.3z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bp');
            var path_bq = rsr.path("M746.4,625.2c0,0.2,0.1,0.3,0.1,0.5c0.4,1.3,1.3,2.2,2.7,2.4c1.5,0.2,2.6-0.3,3.3-1.6     c0.4-0.8,0.7-1.7,0.9-2.5c1.9-6.4,3.9-12.9,5.8-19.3c0.1-0.3,0.2-0.4,0.5-0.4c0.4,0,0.8,0,1.2,0c-3.6,12.4-7.2,24.8-10.7,37.2     c3.4,0,6.7,0,10,0c0,0.2,0,0.4,0,0.6c0,9,0,18,0,27c0,0.4,0,0.8,0.1,1.2c0.3,1.5,1.4,2.6,2.9,2.9c0.1,0,0.2,0.1,0.3,0.1     c-5.7,0-11.5,0-17.2,0C746.4,657.2,746.4,641.2,746.4,625.2z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bq');
            var path_br = rsr.path("M769.9,574.6c0.6,0.2,1.3,0.3,1.9,0.5c3.5,1.3,5.6,4.7,5.3,8.4c-0.4,3.8-3.6,6.9-7.5,7.1c-3.7,0.2-6.9-2.1-8.1-5.3     c-1.3-3.7,0.4-8,3.9-9.8c0.8-0.4,1.7-0.7,2.7-0.8c0.1,0,0.2,0,0.2-0.1C768.8,574.6,769.3,574.6,769.9,574.6z").attr({parent: 'Icons','stroke-width': '0','stroke-opacity': '1','fill': '#000000'}).data('id', 'path_br');
            var path_bs = rsr.path("M764.6,673.3c0.6-0.2,1.2-0.4,1.7-0.7c1-0.6,1.4-1.5,1.5-2.7c0-0.3,0-0.6,0-0.8c0-9,0-18,0-27     c0-0.2,0-0.4,0-0.6c0.7,0,1.5,0,2.2,0c0,0.2,0,0.4,0,0.5c0,9.1,0,18.1,0,27.2c0,0.5,0,1,0.1,1.4c0.4,1.4,1.4,2.2,2.8,2.5     c0.1,0,0.2,0.1,0.3,0.1C770.4,673.3,767.5,673.3,764.6,673.3z").attr({fill: '#FFFFFF',parent: 'Icons','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_bs');
            woman.attr({'parent': 'Icons','name': 'woman'});


            var rsrGroups = [grZBW2tif,Walls,Icons,Exit,exit,Stairs,stairs,Elevator,elevator,Man,man,Woman,woman];
            grZBW2tif.push(
            );
            Walls.push(
                rect_f ,
                rect_g ,
                rect_h ,
                rect_i ,
                rect_j ,
                rect_k ,
                rect_l ,
                rect_m ,
                rect_n ,
                rect_o ,
                rect_p ,
                rect_q ,
                rect_r ,
                rect_s ,
                rect_t ,
                rect_u ,
                rect_v ,
                rect_w ,
                rect_x ,
                rect_y ,
                rect_z ,
                rect_aa ,
                rect_ab ,
                rect_ac ,
                rect_ad ,
                rect_ae ,
                rect_af ,
                rect_ag ,
                rect_ah ,
                rect_ai ,
                rect_aj ,
                rect_ak ,
                rect_al ,
                rect_am ,
                rect_an ,
                rect_ao ,
                rect_ap
            );
            Icons.push(
                text_aq
            );
            Exit.push(
            );
            exit.push(
                path_ar ,
                path_as ,
                path_at
            );
            Stairs.push(
            );
            stairs.push(
                path_au ,
                path_av ,
                path_aw ,
                path_ax
            );
            Elevator.push(
            );
            elevator.push(
                path_ay ,
                path_az ,
                path_ba ,
                path_bb ,
                path_bc ,
                path_bd ,
                path_be ,
                path_bf ,
                path_bg ,
                path_bh ,
                path_bi ,
                path_bj ,
                path_bk
            );
            Man.push(
            );
            man.push(
                path_bl ,
                path_bm ,
                path_bn
            );
            Woman.push(
            );
            woman.push(
                path_bo ,
                path_bp ,
                path_bq ,
                path_br ,
                path_bs
            );
            console.log(woman);

            var roomAreas = [];


            /* Add ID to Room */

            var _roomArea = {
                tap: Room,
                area: Basement_Floor,
                id: 15,
            };





            var icons = {

                "exit": exit,
                "stairs": stairs,
                "woman": woman,
                "man": man,
                "elevator": elevator
            };

            var result = {
                "icons": icons,
                "room": _roomArea,

            }

            return result;






        };



        return {
            generateEntryLevel: generateEntryLevel,
            highlightArea : highlightArea,
            generateBasementLevel: generateBasementLevel,
            clearMap: clearMap
        }




    })

    .factory('Rooms', function(Routes, $q, $http, $rootScope)
    {


        var getRooms = function()
        {
            return $http.get(Routes.ROOMS).then(requestRoomsSuccess, requestRoomsFailure);

            function requestRoomsSuccess(response)
            {
                if(response.status == 200){

                    if(response.data)
                    {
                        var rooms = response.data.rooms;

                        return rooms;
                    }
                }
            }

            function requestRoomsFailure(response)
            {
                return $q.reject('Failed to get Rooms because of status : ' + response.status + '\nErr: ' + response.data);

            }
        };
        var getDetails = function(roomID)
        {

            return $http.get(Routes.ROOM + roomID).then(successRoom, failureRoom);

            function successRoom(response)
            {
                if(response.status == 200)
                {
                    if(response.data) {
                        var room = response.data;

                        var beacons = room.Beacons;

                        var _params = {};

                        for(var i = 0; i < beacons.length; i++)
                        {
                            _params["beacon"+(i+1)] = beacons[i].code;
                        }

                        return $http.get(Routes.COLLECTION_NEAR_ME,
                            {params: _params}).then(requestExhibitionsSuccess, requestExhibitionsFailure);


                        function requestExhibitionsSuccess(response)
                        {
                            if(response.status == 200) {
                                if (response.data) {

                                    var exhibitions = response.data.exhibitions;
                                    /* Inject exhibitions into the room */
                                    room.exhibitions = exhibitions;

                                    return room;

                                }
                            }
                        }


                        function requestExhibitionsFailure(response)
                        {
                            //console.log(response);

                            if(response.status == 404)
                            {
                                room.exhibitions = [];
                                console.log(room);
                                return room;
                            }


                        }
                    }
                    return response.data;
                }

                return $q.reject('Failed to get Room');
            }


            function failureRoom(response)
            {
                $rootScope.$broadcast('Rooms:NotFound');
                return $q.reject('Failed to get Room because of status : ' + response.status + '\nErr: ' + response.data);
            }


        };

        var lastRetrievedRoom = {};

        var getLastRetrievedRoom = function()
        {
            return lastRetrievedRoom;
        };

        var retrieveRoomByiBeacon = function(beaconID){

            var request = {

                method: 'GET',
                url: Routes.BEACON,
                params:
                {
                    beacon_code: beaconID
                }
            };

            return $http(request)
                .then(function(response)
                {
                    if(response.status == 200) {
                        if (response.data) {
                            return response.data.beacons;
                        }
                    }

                    return null;

                }, function(err)
                {
                    console.log("ROOM SERVICE - {retrieveRoomByiBeacon()} Failed!");
                    console.log("Response: " + response);
                    console.log("Status: " + response.status);

                    return null;
                })
        };


        return {
            getRooms: getRooms,
            getDetails: getDetails,
            lastRetrievedRoom : lastRetrievedRoom,
            getLastRetrievedRoom: getLastRetrievedRoom,
            retrieveRoomByiBeacon: retrieveRoomByiBeacon
        }
    });
