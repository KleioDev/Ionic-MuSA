/**
 * Created by joframart on 3/27/15.
 */
angular.module('content-services', [])

    /* Service for getting Media objects */
    /* Audio Service to store information about the current Audio playing */
.factory('Audio', function()
    {

    var audio = {};

        return {

            create: function(src, success, error)
            {
                audio.stream = new AudioStream(src, null, null);

                audio.stream.seekTo = 0;
            },
            get: function()
            {
                return audio;
            },

            getDuration: function()
            {
                return audio.stream._duration;
            },

            setVolume: function(volume)
            {
                var vol = volume/10.0
                console.log(vol);
                audio.stream.setVolume(vol+"")
            },

            seekTo: function(seekTime)
            {
                audio.stream.seekTo(seekTime)
            },

            play: function()
            {
                audio.stream.play();
                audio.stream.playing = true;

            },

            pause: function()
            {
                audio.stream.pause();
                audio.stream.playing = false;

            },

            waitTillReady: function(){

                while(!AudioStream.ready());

            }


        }
    })

    /* Video service for handling videos and getting videos  */
.factory('Video', function($http, Routes)
    {

        var video = {};

        video.getVideo = function(id)
        {
            return $http.get(Routes.VIDEO_ROUTE + id);
        };

        video.setVideo = function(_video)
        {
            video.activeVideo =_video;
        };

        video.getActiveVideo = function()
        {
            return video.activeVideo;
        };


        return video;

    })

.factory('Gallery',function($http, Routes)
    {

        var gallery = {};

        gallery.getImage = function(id)
        {
            return $http.get(Routes.IMAGE_ROUTE + id);
        };

        gallery.setImage = function(_image)
        {

        }
    })

.factory('Archive', function($http, Routes)
{

});


