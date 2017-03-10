// config/passport.js
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import mysql from 'promise-mysql'
import { auth as db_config } from '../config_mysql';

var connection;

mysql.createConnection(db_config)
.then(function( conn ){
  console.log("Connected to DB");
  connection = conn;
}).catch(function(){
  console.error("MySQL failed");
});

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  console.log("serialized");
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  console.log("deserialize");
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
passport.use( new LocalStrategy(
  function(username, password, done) { // callback with email and password from our form
    console.log("POOPS!");
    connection.query("SELECT * FROM `Users` WHERE `UserName` = '" + username + "'")
    .then(function( rows ){
      console.log(rows);
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



export default passport;
