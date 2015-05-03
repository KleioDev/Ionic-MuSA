/**
 * Created by joframart on 4/29/15.
 */
describe('Museum Tab Segmented Control Test', function(){
    var scope;
    var SegmentedControl;

    beforeEach(module('museum-services', 'museum-controllers', 'ngCordova', 'app-services'));

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        $controller('MuseumSegmentController', {$scope: scope});
    }));

    beforeEach(inject(function(_SegmentedControl_)
    {
        SegmentedControl = _SegmentedControl_;
    }));


    it('should change state to events', inject(function(SegmentedControl) {

        scope.changeState('events');
        expect( SegmentedControl.get('museum').state).toBe('events');
    }));

    it('should change state to news', inject(function(SegmentedControl) {

        scope.changeState('news');
        expect( SegmentedControl.get('museum').state).toBe('news');
    }));

    it('should change state to general', inject(function(SegmentedControl) {

        scope.changeState('general');
        expect( SegmentedControl.get('museum').state).toBe('general');
    }));

});

describe('Museum General Info', function()
    {
        var scope;
        var Museum;
        var $http;

        beforeEach(module('museum-services', 'museum-controllers', 'ngCordova', 'app-services'));

        beforeEach(inject(function ($rootScope, $controller) {

            scope = $rootScope.$new();
            $controller('MuseumGeneralCtrl', {$scope: scope});
        }));

        beforeEach(inject(function(_Museum_,  $httpBackend)
        {
            Museum = _Museum_;
            $http = $httpBackend
        }));


        it('phone number is a string it should be parsed out', inject(function(Museum)
        {
            console.log("Hello!");

            Museum.getGeneralMuseumInfo().then(function(museumInfo){

                //jasmine.log(museumInfo.phone);
                /* Should be in the form of a regex */
                if(museumInfo.phone)
                {

                    expect("l").toContain(/\((\d{3})\)\s(\d{3})-(\d{4})/);

                }
            });

            $http.flush();


        }));


    });