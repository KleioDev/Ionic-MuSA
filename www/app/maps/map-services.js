/**
 * Created by joframart on 4/1/15.
 */
angular.module('map-services', [])

    .factory('Map', function(Routes, Rooms,$timeout, $http){



            var generateEntryLevel = function(callback) {

                var rsr = Raphael('entry-map', '1200', '580');

                var rect_a = rsr.rect(24.9, 29.9, 154.6, 268.3);
                rect_a.attr({x: '24.9',y: '29.9',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_a');
                var rect_b = rsr.rect(32.9, 315.8, 161.4, 78.2);
                rect_b.attr({x: '32.9',y: '315.8',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_b');
                var path_c = rsr.path("M33.9,337c11.2,2,22.5,3.6,33.9,4.6c-5.2,6.6-10.4,13.2-15.8,19.8c-1.6,2-3.4,4.2-5.8,5.2  c-2.6,1.2-5.6,0.8-8.2,2c-2.2,1.2-3.8,3.4-6,4.6c-2.2,1.2-5.6,1.4-6.6-1c4.6-10,8-20.3,10-31.1");
                path_c.attr({fill: 'none','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_c');
                var rect_d = rsr.rect(543.6, 322.2, 177.6, 33.5);
                rect_d.attr({x: '543.6',y: '322.2',fill: '#FFFFFF',stroke: '#FFFFFF',"stroke-miterlimit": '10','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_d');
                var rect_e = rsr.rect(1054.4, 395.3, 129.3, 9.3);
                rect_e.attr({x: '1054.4',y: '395.3',fill: '#A3A3A3','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_e');
                var Walls = rsr.set();
                var rect_f = rsr.rect(180.1, 127.7, 168, 35.9).attr({x: '180.1',y: '127.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_f');
                var rect_g = rsr.rect(380, 127.7, 674.3, 35.9).attr({x: '380',y: '127.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_g');
                var rect_h = rsr.rect(1084.3, 127.7, 98.8, 35.9).attr({x: '1084.3',y: '127.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_h');
                var rect_i = rsr.rect(380, 276.3, 125.7, 14).attr({x: '380',y: '276.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_i');
                var rect_j = rsr.rect(380.4, 419, 125.7, 14).attr({x: '380.4',y: '419',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_j');
                var rect_k = rsr.rect(1039.4, 309.2, 15, 184.5).attr({x: '1039.4',y: '309.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_k');
                var rect_l = rsr.rect(777.1, 309.2, 223.4, 13).attr({x: '777.1',y: '309.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_l');
                var rect_m = rsr.rect(328.2, 201.5, 15, 120.7).attr({x: '328.2',y: '201.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_m');
                var rect_n = rsr.rect(328.2, 382.3, 15, 120.7).attr({x: '328.2',y: '382.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_n');
                var rect_o = rsr.rect(543.6, 201.5, 16.4, 120.7).attr({x: '543.6',y: '201.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_o');
                var rect_p = rsr.rect(543.6, 382.5, 16.4, 120.7).attr({x: '543.6',y: '382.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_p');
                var rect_q = rsr.rect(721.2, 201.5, 16.2, 286.5).attr({x: '721.2',y: '201.5',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_q');
                var rect_r = rsr.rect(180.1, 163.6, 21.5, 158.6).attr({x: '180.1',y: '163.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_r');
                var rect_s = rsr.rect(186.7, 388, 15, 141.6).attr({x: '186.7',y: '388',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_s');
                var rect_t = rsr.rect(179.5, 17, 1024.5, 21.9).attr({x: '179.5',y: '17',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_t');
                var rect_u = rsr.rect(17, 21.2, 169.8, 8.4).attr({x: '17',y: '21.2',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_u');
                var rect_v = rsr.rect(130.7, 298.3, 56.1, 17.6).attr({x: '130.7',y: '298.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_v');
                var rect_w = rsr.rect(17, 298.3, 64.8, 17.6).attr({x: '17',y: '298.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_w');
                var rect_x = rsr.rect(591.5, 258.4, 56.1, 17.6).attr({x: '591.5',y: '258.4',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_x');
                var rect_y = rsr.rect(17, 29.3, 16, 19.6).attr({x: '17',y: '29.3',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_y');
                var rect_z = rsr.rect(17, 154.6, 8, 143.6).attr({x: '17',y: '154.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_z');
                var rect_aa = rsr.rect(186.7, 559.6, 1002.3, 16).attr({x: '186.7',y: '559.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aa');
                var rect_ab = rsr.rect(1183.7, 38.9, 20.3, 536.7).attr({x: '1183.7',y: '38.9',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ab');
                var rect_ac = rsr.rect(24.9, 395.6, 161.8, 9).attr({x: '24.9',y: '395.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ac');
                var rect_ad = rsr.rect(180.1, 74.8, 8, 52.9).attr({x: '180.1',y: '74.8',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ad');
                var rect_ae = rsr.rect(186.7, 529.7, 867.6, 29.9).attr({x: '186.7',y: '529.7',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ae');
                var rect_af = rsr.rect(632.7, 236.4, 17.1, 53.6).attr({x: '632.7',y: '236.4',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_af');
                var rect_ag = rsr.rect(632.6, 419, 17.8, 53.7).attr({x: '632.6',y: '419',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ag');
                var rect_ah = rsr.rect(827.9, 415.6, 17, 57.1).attr({x: '827.9',y: '415.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ah');
                var rect_ai = rsr.rect(932.7, 415.6, 20.9, 57.1).attr({x: '932.7',y: '415.6',fill: '#A3A3A3',parent: 'Walls','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ai');
                Walls.attr({'id': 'Walls','name': 'Walls'});
                var Rooms = rsr.set();
                var Room__10_1_ = rsr.rect(738.2, 163.6, 346.1, 145.6).attr({id: 'Room_-_10_1_',x: '738.2',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__10_1_');
                var Room__11 = rsr.rect(738.2, 322.2, 89.8, 207.5).attr({id: 'Room_-_11',x: '738.2',y: '322.2',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__11');
                var Room__12 = rsr.rect(844.9, 322.2, 87.8, 207.5).attr({id: 'Room_-_12',x: '844.9',y: '322.2',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__12');
                var Room__13 = rsr.rect(953.6, 322.2, 85.8, 207.5).attr({id: 'Room_-_13',x: '953.6',y: '322.2',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__13');
                var Room__6 = rsr.rect(560.6, 163.6, 71.8, 158.6).attr({id: 'Room_-_6',x: '560.6',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__6');
                var Room__7 = rsr.rect(650.4, 163.6, 70.8, 158.6).attr({id: 'Room_-_7',x: '650.4',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__7');
                var Room__8 = rsr.rect(560.6, 355.7, 71.8, 174).attr({id: 'Room_-_8',x: '560.6',y: '355.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__8');
                var Room__9 = rsr.rect(650.4, 355.7, 70.8, 174).attr({id: 'Room_-_9',x: '650.4',y: '355.7',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__9');
                var Room__1 = rsr.rect(201.5, 163.6, 126.7, 173.6).attr({id: 'Room_-_1',x: '201.5',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__1');
                var Room__3 = rsr.rect(343.1, 163.6, 200.5, 112.7).attr({id: 'Room_-_3',x: '343.1',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__3');
                var Room__4 = rsr.rect(343.1, 290.3, 200.5, 130.7).attr({id: 'Room_-_4',x: '343.1',y: '290.3',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__4');
                var Room__5 = rsr.rect(343.1, 432.9, 200.5, 96.8).attr({id: 'Room_-_5',x: '343.1',y: '432.9',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__5');
                var Room__2 = rsr.rect(201.5, 356.1, 126.7, 173.6).attr({id: 'Room_-_2',x: '201.5',y: '356.1',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__2');
                var Room__14 = rsr.rect(188.1, 38.9, 995.5, 88.8).attr({id: 'Room_-_14',x: '188.1',y: '38.9',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'Room__14');
                var rect_aj = rsr.rect(1054.4, 163.6, 128.7, 226.7).attr({x: '1054.4',y: '163.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_aj');
                var rect_ak = rsr.rect(1054.4, 404.6, 128.7, 155).attr({x: '1054.4',y: '404.6',fill: '#FFFFFF',parent: 'Rooms','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_ak');
                Rooms.attr({'id': 'Rooms','name': 'Rooms'});
                var RoomCircles = rsr.set();
                var B1 = rsr.ellipse(264.1, 256, 30.3, 29.9).attr({id: 'B1',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B1');
                var B2 = rsr.ellipse(264.1, 432.9, 30.3, 29.9).attr({id: 'B2',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B2');
                var B4 = rsr.ellipse(443.5, 355.7, 30.3, 29.9).attr({id: 'B4',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B4');
                var B3 = rsr.ellipse(442.9, 220.1, 30.3, 29.9).attr({id: 'B3',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B3');
                var B5 = rsr.ellipse(442.9, 481.4, 30.3, 29.9).attr({id: 'B5',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B5');
                var B6 = rsr.ellipse(596.5, 236.4, 30.3, 29.9).attr({id: 'B6',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B6');
                var B7 = rsr.ellipse(685.7, 231.4, 30.3, 29.9).attr({id: 'B7',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B7');
                var B8 = rsr.ellipse(596.5, 442.7, 30.3, 29.9).attr({id: 'B8',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B8');
                var B9 = rsr.ellipse(685.7, 442.7, 30.3, 29.9).attr({id: 'B9',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B9');
                var B11 = rsr.ellipse(777.1, 415.6, 30.3, 29.9).attr({id: 'B11',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B11');
                var B12 = rsr.ellipse(892.8, 415.6, 30.3, 29.9).attr({id: 'B12',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B12');
                var B13 = rsr.ellipse(1000.5, 412.8, 30.3, 29.9).attr({id: 'B13',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B13');
                var B10 = rsr.ellipse(911.1, 220.1, 30.3, 29.9).attr({id: 'B10',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B10');
                var B14 = rsr.ellipse(662.9, 78.8, 30.3, 29.9).attr({id: 'B14',fill: '#2EF0FF',parent: 'RoomCircles','stroke-width': '0','stroke-opacity': '1'}).data('id', 'B14');
                RoomCircles.attr({'id': 'RoomCircles','name': 'RoomCircles'});
                var Text_Labels = rsr.set();
                var text_al = rsr.text(0, 0, '8').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 591.5233 448.8963").data('id', 'text_al');
                var text_am = rsr.text(0, 0, '9').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 678.8065 449.6443").data('id', 'text_am');
                var text_an = rsr.text(0, 0, '10').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 899.7567 225.4515").data('id', 'text_an');
                var text_ao = rsr.text(0, 0, '11').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 766.09 421.9646").data('id', 'text_ao');
                var text_ap = rsr.text(0, 0, '12').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 878.8085 421.9646").data('id', 'text_ap');
                var text_aq = rsr.text(0, 0, '1').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 257.3534 261.8616").data('id', 'text_aq');
                var text_ar = rsr.text(0, 0, '2').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 257.3534 442.9118").data('id', 'text_ar');
                var text_as = rsr.text(0, 0, '3').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 437.4054 226.4492").data('id', 'text_as');
                var text_at = rsr.text(0, 0, '4').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 437.4054 362.1133").data('id', 'text_at');
                var text_au = rsr.text(0, 0, '5').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 437.4054 487.917").data('id', 'text_au');
                var text_av = rsr.text(0, 0, '13').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 988.536 420.9658").data('id', 'text_av');
                var text_aw = rsr.text(0, 0, '14').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 650.3768 87.2956").data('id', 'text_aw');
                var text_ax = rsr.text(0, 0, '6').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 591.5233 242.9085").data('id', 'text_ax');
                var text_ay = rsr.text(0, 0, '7').attr({fill: 'none',"font-family": 'ArialMT',"font-size": '23.9405',parent: 'Text_Labels','stroke-width': '0','stroke-opacity': '1'}).transform("m1 0 0 1 679.3046 242.9085").data('id', 'text_ay');
                Text_Labels.attr({'id': 'Text_Labels','name': 'Text_Labels'});


                var rsrGroups = [Walls,Rooms,RoomCircles,Text_Labels];
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
                    rect_ai
                );
                Rooms.push(
                    Room__10_1_ ,
                    Room__11 ,
                    Room__12 ,
                    Room__13 ,
                    Room__6 ,
                    Room__7 ,
                    Room__8 ,
                    Room__9 ,
                    Room__1 ,
                    Room__3 ,
                    Room__4 ,
                    Room__5 ,
                    Room__2 ,
                    Room__14 ,
                    rect_aj ,
                    rect_ak
                );
                RoomCircles.push(
                    B1 ,
                    B2 ,
                    B4 ,
                    B3 ,
                    B5 ,
                    B6 ,
                    B7 ,
                    B8 ,
                    B9 ,
                    B11 ,
                    B12 ,
                    B13 ,
                    B10 ,
                    B14
                );
                Text_Labels.push(
                    text_al ,
                    text_am ,
                    text_an ,
                    text_ao ,
                    text_ap ,
                    text_aq ,
                    text_ar ,
                    text_as ,
                    text_at ,
                    text_au ,
                    text_av ,
                    text_aw ,
                    text_ax ,
                    text_ay
                );






                for (var i = 0; i < RoomCircles.length; i++) {
//
                    var _B = RoomCircles[i];

                    var roomData = {

                        'id': _B.data('id'),
                        'roomNumber': _B.data('id').substring(1, _B.data('id').length)
                    };

                    _B.data(roomData);
                    console.log("setting up!");

//                    // Change Yorkshire's fill colour to gold
//                    if (regions[i].data('id') == 'heaven-on-earth') {
//                        regions[i].node.setAttribute('fill', 'gold');
//                    }
                    RoomCircles[i].click(function (e) {

                        console.log("setting up!");
                        this.node.style.opacity = 0.7;
                        var id= this.data('roomNumber');
                        $timeout(function()
                        {
                            callback(id);
                        }, 1000);

                    })
                }


            };
        /* Highlights a room */
        var highlightArea = function(roomNumber)
        {

        };

        /* Get a room by iBeacon */
        var getRoomByiBeacon = function(beaconIDs)
        {

        };




        return {
            generateEntryLevel: generateEntryLevel,
            highlightArea : highlightArea,
            getRoomByiBeacon : getRoomByiBeacon
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


        return {
            getRooms: getRooms,
            getDetails: getDetails,
            lastRetrievedRoom : lastRetrievedRoom,
            getLastRetrievedRoom: getLastRetrievedRoom
        }
    });
