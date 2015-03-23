
//=================== Museum Tab Controllers ====================//

/* Describe the use case for museum segmented control */
describe('MuseumSegmentedControl', function()
{

    beforeEach(angular.module('starter'));

    var scope, ctrl;

    beforeEach(inject(function(_$rootScope_, _$controller)
    {

        scope = $rootScope.$new();
        ctrl = $controller('MuseumSegmentedControl', {$scope: scope, 'AppNavigationTitles': {}, 'MuseumSegmentedControlService' : {}});
    }));


    describe('- provides museum general information on state', function()
    {

        it('only the general template should be displayed', function()
        {



            //
            ///* Toggle museum general view */
            //scope.museumGeneralView();

            /* Should expect museum general view to show and other views disabled */
            expect(document.getElementById('museumGeneralTemplate').className === "").toBe(true);
            expect(document.getElementById('museumEventsTemplate').className === "ng-hide").toBe(true);
            expect(document.getElementById('museumNewsTemplate').className === "ng-hide").toBe(true);

        });
    });

    var onlyViewAvailable = function(state)
    {
        if(state == 'general')
        {
            document.getElementById('gen')

        }
    }






});


