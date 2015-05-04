/**
 * Created by joframart on 3/18/15.
 */
angular.module('starter.directives', [])

.directive('museumGeneralDir', function()
    {
        return{
            templateUrl: 'app/museum/tab-museum/museum-general.html'
        }
    })

.directive('museumEventsDir', function()
    {

        return{
            templateUrl: 'app/museum/tab-museum/museum-events.html'
        }
    })
    .directive('museumNewsDir', function()
    {

        return{
            templateUrl: 'app/museum/tab-museum/museum-news.html'
        }
    })


.directive('collectionNearMeDir', function()
    {

        return {
            templateUrl: 'app/collection/tab-collection/collection-nearme.html'
        }
    })

.directive('collectionObjectsDir', function()
    {
        return{
            templateUrl: 'app/collection/tab-collection/collection-objects.html'

        }
    })

.directive('collectionExhibitionsDir', function()
    {
        return{
            templateUrl: 'app/collection/tab-collection/collection-exhibitions.html'

        }
    })
.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }});