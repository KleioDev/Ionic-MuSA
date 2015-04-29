/**
 * Created by joframart on 4/29/15.
 */
describe('Museum Info Unit Tests', function(){
    var Museum;
    beforeEach(module('museum-services', 'app-services'));

    beforeEach(inject(function (_Museum_) {
        Museum = _Museum_;
    }));

    it('can get an instance of my factory', inject(function(Museum) {
        expect(Museum).toBeDefined();
    }));

    it('', inject(function(Museum)
    {

        Museum.getGeneralMuseumInfo()
            .then(function()
            {

            })
    }));

    //it('', inject(function(Friends) {
    //    expect(Friends.all().length).toEqual(5);
    //}));
    //
    //it('has Max as friend with id 1', inject(function(Friends) {
    //    var oneFriend = {
    //        id: 1,
    //        name: 'Max Lynx',
    //        notes: 'Odd obsession with everything',
    //        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&amp;s=460'
    //    };
    //
    //    expect(Friends.get(1).name).toEqual(oneFriend.name);
    //}));
});