


describe('museum can view general information', function() {
    //
    //// critical
    //it('', function() {});
    //it('ensure valid email addresses pass validation', function() {});
    //it('ensure submitting form changes path', function() { });

    beforeEach(module('starter'));
    beforeEach(module('museum-services'));
    beforeEach(module('app-services'));
    beforeEach(module('museum-controllers'));



    var scope, controller;


    beforeEach(inject(function (
        $scope,
        $rootScope,
        AppNavigationTitles,
        MuseumSegmentedControlService) {

        scope = $rootScope.$new();

        controller = $controller('MuseumSegmentedControl', {
            $scope: scope

        });
    }));

    console.log($scope.museumTabState);

});
