/**
 * Created by joframart on 3/18/15.
 */
angular.module('starter.directives', [])

.directive('museumGeneralDir', function()
    {
        return{
            templateUrl: 'templates/tab-museum/museum-general.html'
        }
    })

.directive('museumEventsDir', function()
    {

        return{
            templateUrl: 'templates/tab-museum/museum-events.html'
        }
    })
    .directive('museumNewsDir', function()
    {

        return{
            templateUrl: 'templates/tab-museum/museum-news.html'
        }
    })


.directive('collectionNearMeDir', function()
    {

        return {
            templateUrl: 'templates/tab-collection/collection-nearme.html'
        }
    })

.directive('collectionObjectsDir', function()
    {
        return{
            templateUrl: 'templates/tab-collection/collection-objects.html'

        }
    })

.directive('collectionExhibitionsDir', function()
    {
        return{
            templateUrl: 'templates/tab-collection/collection-exhibitions.html'

        }
    })

.directive('audioViewDir', function()
    {
        return{
            templateUrl: 'templates/tab-collection/audio-view.html'
        }
    });