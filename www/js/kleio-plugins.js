///**
//* Created by joframart on 3/28/15.
//*/
//
//var AudioStream = {
//
//    duration : 0,
//    success : null,
//    failure : null,
//    ready: false,
//    setupAudio: function(success, failure, src){
//
//        AudioStream.success = success;
//        AudioStream.failure = failure;
//        console.log("Executing Cordova");
//        console.log("AUDIOStream duration: " + AudioStream.duration);
//
//        cordova.exec(AudioStream.successCallback, AudioStream.errorCallback, "AudioStream", "setupPlayer", [src]);
//
//        //
//        console.log("Waiting till ready");
//
//        //console.log("My DUration:"  + this.duration);
//        //
//        //
//    },
//
//    successCallback: function(message)
//    {
//        console.log("Callback Called");
//
//
//        if(AudioStream.duration <= 0)
//        {
//            AudioStream.refreshDuration();
//            //AudioStream.ready = false;
//            setTimeout(AudioStream.successCallback, 500);
//
//        }
//        else
//        {
//            console.log("Hooray!");
//            console.log(AudioStream.duration);
//            //AudioStream.ready = true;
//            AudioStream.success(message);
//        }
//
//        console.log("Ready yet?: " + AudioStream.ready);
//
//
//
//
//    },
//
//
//    errorCallback: function(message)
//    {
//        console.log(message);
//        console.log("ERROR!");
//    },
//
//
//
//    refreshDuration: function()
//    {
//
//
//        cordova.exec(AudioStream.setDuration, AudioStream.errorCallback, "AudioStream", "getDuration", []);
//
//    },
//
//    setDuration: function(duration)
//    {         console.log("Before: " + AudioStream.duration);
//
//    //this.duration = parseInt(duration);
//    console.log("RETURNS: " + duration);
//AudioStream.duration = parseInt(duration);
//    console.log("After: " + AudioStream.duration);
//    },
//
//    play: function()
//    {
//        cordova.exec(null, null, "AudioStream", "play", []);
//    },
//
//    pause: function()
//    {
//        cordova.exec(null, null, "AudioStream", "pause", []);
//    }
//
//
//}
//
////AudioStream.prototype.refreshDuration = function()
////{
////
////    console.log(this.setDuration);
////    cordova.exec(this.setDuration, this.failure, "AudioStream", "getDuration", []);
////
////};
////
////AudioStream.prototype.setDuration = function(duration)
////{
////    console.log(this);
////    console.log("Before: " + AudioStream.prototype.duration);
////
////    //this.duration = parseInt(duration);
////    console.log("RETURNS: " + duration);
////
////    AudioStream.prototype.duration = parseInt(duration);
////
////    console.log("After: " + AudioStream.prototype.duration);
////};
////
////AudioStream.prototype.setupAudio = function(success, failure, src){
////
////    this.success = success;
////    this.failure = failure;
////    console.log("Executing Cordova");
////    cordova.exec(success, failure, "AudioStream", "setupPlayer", [src]);
////
////    //
////    //console.log("Waiting till ready");
////    while( this.duration <= 0 )
////    {
////        console.log("waiting for it");
////        this.refreshDuration();
////        console.log(this.duration);
////        //console.log(this.duration);
////    }
////    //this.refreshDuration();
////
////    console.log("THIS duration: " + this.duration);
////    //console.log("My DUration:"  + this.duration);
////    //
////    //
////    console.log("Playing!");
////
////};
////
////AudioStream.prototype.duration = 0;
////AudioStream.prototype.success = null;
////AudioStream.prototype.failure = null;
////
////var audioStream = new AudioStream();


var AudioStream = {
    ready: false,
    duration: 0,
    currentTime: 0,


    setup: function(success, error, src)
    {

    },
    play: function()
    {

    },
    pause: function()
    {

    },

    seekTo: function(time)
    {

    },

    setVolume: function(volume)
    {

    },

    reset: function()
    {

    }



}