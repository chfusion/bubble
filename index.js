//This example shows cursor using callback.
var {Client} = require('pg'),
    event = require("./PrintData"),
    fs = require("fs"),
    path = require("path"),
    client,
    queryString = "select * from test;",
    CursorClass = require('pg-cursor'),
    cursor,
    cursorLimit,
    successCount = 0,
    //Use to close the connection.
    closeConnection = function(){
        client.end((err) => {
            console.log('client has disconnected')
            if (err) {
              console.log('error during disconnection', err.stack)
            }
          });
    },
    //Use to start the connection
    startConnection = function(connecionConfig){
       client = new Client(connecionConfig);
        client.connect()
        .then(()=>{ 
        console.log('connected');
        }).
        catch((e)=>{
        console.log(e);
        });
    },
    //Use to start the cursor
    cursorInit = function(limit,queryString){
        cursorLimit = limit;
        cursor = client.query(new CursorClass(queryString));
        cursor.read(cursorLimit, processData);
    },
    //process data on each cursor
    processData = function(err, rows) {
        if (err) {
          throw err;
          cursor.close(closeConnection);
        }
        if (rows.length === cursorLimit) {
            successCount = successCount+cursorLimit;        
            event.emit("data",rows,successCount);
            cursor.read(cursorLimit, processData);
        }
        if(rows.length < cursorLimit && rows.length !== 0){
            successCount = successCount+rows.length;        
            event.emit("data",rows,successCount);
            cursor.read(rows.length, processData);
        }
        if(!rows.length){
            cursor.close(closeConnection);
        }
      };         
startConnection({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Globalids@2001',
});
//Init a new cursor with query string. 
cursorInit(100,queryString);
// client.query("select * from test",function(err,rows){
// console.log(rows);
// closeConnection();
// })


          