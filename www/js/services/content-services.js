/**
 * Created by joframart on 3/27/15.
 */
angular.module('content-services', [])

    /* Service for getting Media objects */
.factory('Media', function() {
         
         

        return {

            //Get Audio link from ID

            get: function(id)
            {
                //$http.get('').success(function(data, status, headers,config)
                //{
                //    /* Get the info related to the audio */
                //
                //
                //
                //}).error(function(data, status, headers, config)
                //{
                //    //Error
                //})
                console.log(id);

                var media = mediaServer.getMediaById(id);
                return media;
            }


        }


    }
)
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
.factory('Video', function()
    {
        var video = null;
        return {


            set: function(newVideo)
            {
                video = newVideo;
            },

            get: function()
            {
                return video;
            }
        }
    });


