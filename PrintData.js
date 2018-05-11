var {EventEmitter} = require("events"),
    localEvent;
localEvent = new EventEmitter();
module.exports = localEvent;

localEvent.on("data",function(data,successCount){
    console.log(data,successCount);
})