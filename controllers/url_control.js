/**
 * Created by duhyeong1.kim on 2014-08-20.
 */
'use strict';
var gk = require('../common');
var mq_pubhandler = require('../handler/mq_pubhandler');
var queueName = gk.config.mqQueueName;
var sprintf = require("sprintf").sprintf;

var get_cur_time = function() {
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    //# step 1 : make data
    //# step 1 - 0 : make elementary data
    var curtime = sprintf('%04d-%02d-%02d %02d:%02d:%02d', year, month, day, hours, min, sec);
    return curtime;
};
//there is possibility if i delete method, this application would not operate properly
exports.post_test = function(req, res) {
   res.send(req.body);

}

exports.get_test = function(req,res) {
   res.send("hello");
}

exports.register = function(req, res) {
    var data = { 'tag':'register','data': req.body};
    console.log(data);    
    gk.async.sequence([  //async.waterfall
        function (cb) {
            var ret = mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success' };
        res.send(result);
    });
}


exports.register_book = function(req, res) {
    console.log("register book");
    var data = {'tag':'register_book','data':req.body};
    console.log(data);
    console.log(queueName);
    gk.async.sequence([
        function (cb) {
            mq_pubhandler.publish(queueName, data);
            cb();
        }
    ], function (err) {
        var result = { 'state': 'success'};
        res.send(result);
    });
}
