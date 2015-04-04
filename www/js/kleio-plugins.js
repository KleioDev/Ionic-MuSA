var AudioStream = function(src, successCallback, errorCallback, statusCallback) {
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this._duration = -1;
    this._position = -1;
    var me = this;
    cordova.exec(function(duration){console.log(duration); me._duration = parseInt(duration); console.log("DUration"); console.log(me._duration);}, this.errorCallback, "AudioStream", "create", [this.src]);

    AudioStream.prototype.setDuration();
};

AudioStream.prototype.play = function()
{

    cordova.exec(null, null, "AudioStream", "play");

};

AudioStream.prototype.pause = function()
{
    cordova.exec(null, null, "AudioStream", "pause");

};

AudioStream.prototype.setVolume = function(volume)
{
    console.log("PLUGIN VOLUME:" + volume);
    cordova.exec(function(data){console.log("OK");}, function(data){console.log("NO");}, "AudioStream", "setVolume", [volume]);
};
AudioStream.prototype.seekTo = function(time)
{
    cordova.exec(function(data){console.log("OK");}, function(data){console.log("NO");}, "AudioStream", "seekTo", [time])
};
AudioStream.prototype.setDuration = function()
{
    var me = this;
    cordova.exec(function(duration){me._duration = parseInt(duration); console.log("DUration"); console.log(me._duration);}, function(data){console.log("NO");}, "AudioStream", "getDuration");

};
AudioStream.prototype.isPlaying = function() {
    var me = this;
    cordova.exec(function(isPlaying){
        me.playing = (isPlaying === 'true');

    }, null, "AudioStream", "isPlaying");
};

