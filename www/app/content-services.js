/**
 * Created by joframart on 3/27/15.
 */
angular.module('content-services', [])

    /* Service for getting Media objects */
    /* Audio Service to store information about the current Audio playing */
.factory('Audio', function(Routes, $http, $q)
    {

        var audible = null;

        var description = "";
        var title = "";

        var requestAudible = function(id)
        {
            var request = {

                method: 'GET',
                url: Routes.AUDIO_ROUTE + id
            };
            return $http(request)
                .then(function(response)
                {

                    if(response.status == 200)
                    {

                        //TODO: CHECK IF URL IS VALID

                        console.log(response.data);
                        var _audioData =  response.data;

                        description = _audioData.description;
                        title = _audioData.title;

                        /* Create an Audio*/
                        return create('http://www.noiseaddicts.com/samples/2539.mp3')
                            .then(function(data) {
                                console.log(audible.duration);
                                audible.play();
                                return true;
                            });
                        //create(_audioData.link);
                        //play();
                        //return true;

                    }
                    else
                    {
                        console.log("AUDIO COULD NOT BE LOADED - 404");

                        return false;
                    }
                })
        };

        var create = function(src)
        {
            var defer = $q.defer();
            if(available()) {
                audible.pause();
                audible = null;
            }

            console.log(src);
            audible = new Audio(src);

            console.log("Loading stuff");
            audible.addEventListener('loadedmetadata', function()
            {
                console.log("Loaded Data");
                console.log(audible.duration);
                defer.resolve('passed');
            });


            return defer.promise;

        };


        var play = function()
        {
            /* Check if it available */
            console.log("Playing");
            if(available()) {
                console.log("Playing");

                audible.play();
            }

        };

        var pause = function()
        {
            if(available())
                audible.pause();
        };

        var duration = function()
        {
            if(available())
                return audible.duration;
            else
            {
                return 0;
            }

        };

        var durationStr = function()
        {
            if(available())
                return formatTime(duration());
            else
                return "00:00";
        };

        var currentTimeStr = function()
        {
            if(available())
                return formatTime(currentTime());
            else
                return "00:00";
        };

        var seekTo = function(_seekTime)
        {
            if(available())
                return audible.currentTime = _seekTime;
        };

        var currentTime = function()
        {
            if(available())
            {
                return audible.currentTime;
            }
            else
            {
                return 0;
            }
        };

        var available = function()
        {
            return !(audible == null || typeof audible == 'undefined')
        };

        var isPlaying = function()
        {
            if(available())
                return !audible.paused;
            else
                return false;
        };

        var formatTime = function (seconds) {

            var minutes = Math.floor(seconds / 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;


            var seconds = Math.floor(seconds % 60);
            seconds = (seconds >= 10) ? seconds : "0" + seconds;

            return minutes + ":" + seconds;
        };


        var destroy = function()
        {
            if(available())
            {
                audible.pause();
            }

            audible = null;
        };


        return {
            requestAudible: requestAudible,
            audible: audible,
            description: description,
            title: title,
            create: create,
            play: play,
            pause: pause,
            available: available,
            duration: duration,
            seekTo: seekTo,
            currentTime: currentTime,
            isPlaying: isPlaying,
            durationStr: durationStr,
            currentTimeStr: currentTimeStr,
            destroy: destroy

        };

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

        gallery.getImages = function(id)
        {
            return $http.get(Routes.IMAGE_ROUTE + id);
        };

        gallery.setImage = function(_image)
        {

        };

        gallery.getActiveImage = function()
        {

        };
        return gallery;
    })

.factory('Archive', function($http, Routes)
{

    var archives = {};

    archives.getArchive = function(id)
    {
        return $http.get(Routes.ARCHIVE_ROUTE + id);
    };
    archives.setActiveArchive = function(_archive)
    {
      archives.activeArchive = _archive;
    };

    archives.getActiveArchive = function()
    {
        return archives.activeArchive;
    };

    return archives;
});


