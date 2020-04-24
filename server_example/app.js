var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

var httpApp = express();

var webServer = http.createServer(httpApp).listen(3000);

var socketServer = io.listen(webServer);

easyrtc.events.on("disconnect", function (a) {
    require('request').patch('http://192.168.70.5/api/es/doctor/' + a.getUsername(), {
        json: true,
        headers: {'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json'},
        body: {data: {type: 'doctor', id: a.getUsername(), attributes: {status: 'NOT_CONNECTED'}}}
    });
});

easyrtc.on("getIceConfig", function(connectionObj, callback){
    var myIceServers=[{"url":"stun:192.168.70.6:3478"}, {"url":"turn:192.168.70.6:3478"}];
    callback(null, myIceServers);
});

var easyrtcServer = easyrtc.listen(httpApp, socketServer);
