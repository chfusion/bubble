var {EventEmitter} = require("events"),
    localEvent;
localEvent = new EventEmitter();
module.exports = localEvent;

localEvent.on("data",function(Data,successCount){
    console.log(Data,successCount);
})
