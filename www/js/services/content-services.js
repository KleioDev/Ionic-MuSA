/**
 * Created by joframart on 3/27/15.
 */
angular.module('content-services', [])

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

                //var dummy_media =
                //{
                //    title: "The Life of Lorem Ipsum",
                //    description: "Describes the life and death of Lorem Ipsum",
                //    link: "http://www.noiseaddicts.com/samples/2563.mp3",
                //   // link: "http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3",
                //    type: "Audio"
                //}

                var dummy_media =
                {
                    title: "The Life of Lorem Ipsum",
                    description: "Describes the life and death of Lorem Ipsum",
                    link: "https://www.youtube.com/embed/GIzDsGyxsQM",
                    // link: "http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3",
                    type: "Video"
                };

                return dummy_media;
            }


        }


    }
)
    /* Audio Service to store information about the current Audio playing */
.factory('Audio', function()
    {


        var audio = null;

        return {

            set: function(audio_data, success, error)
            {
                audio = audio_data;

                audio.audioStream = AudioStream;
                audio.audioStream.setupAudio(success, error, audio.link);

            },
            get: function()
            {
                return audio;
            },

            getDuration: function()
            {
                return AudioStream.duration;
            },

            setVolume: function()
            {

            },

            seekTo: function(seekTime)
            {

            },

            play: function()
            {

            },

            stop: function()
            {

            },

            waitTillReady: function(){

                while(!AudioStream.ready());

            }


        }
    })

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
    })