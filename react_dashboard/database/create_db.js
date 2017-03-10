var config = require( '../src/config_mysql' );
var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
var myCon = mysql.createConnection(config);
var rl = readline.createInterface({
  input: fs.createReadStream('./ObserveFirst.sql'),
  terminal: false
 });
rl.on('line', function(chunk){
    myCon.query(chunk.toString('ascii'), function(err, sets, fields){
     if(err) console.log(err);
    });
});
rl.on('close', function(){
  console.log("finished");
  myCon.end();
});
