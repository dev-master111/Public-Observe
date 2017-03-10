// config/passport.js
var db_config = require("../config/db_config.js");
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('promise-mysql');
var connection;

mysql.createConnection(db_config)
.then(function( conn ){
  console.log("Connected to DB");
  connection = conn;
});

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		  done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		    connection.query("SELECT * FROM `Users` WHERE `id` = '" + id + "'")
        .then(function(rows){
			      done(null, rows[0]);
		    }).catch(function( err ){
            done(err);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(new LocalStrategy(
      function(username, password, done) { // callback with email and password from our form
        connection.query("SELECT * FROM `Users` WHERE `UserName` = '" + username + "'")
        .then(function( rows ){
          if (rows.length !== 1){
            return done(null, false, { message: 'Incorrect username.' });
          }
          if ( rows[0].Password !== password ){
            return done(null, false, {message:'Oops! Wrong password.'});
          }
          // all is well, return successful user
          console.log('Here');
          return done(null, rows[0] );
        }).catch(function( err ){
          return done(err);
        });
      }
    ));


};
