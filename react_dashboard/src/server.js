import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
// import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
// import models from './data/models';
// import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth } from './config';
import passport from './core/passport_mysql';


const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login/auth', function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(info)
    if (err) { return next(err); }
    console.log('No errors...')
    if (!user) { return res.redirect('/login'); }
    console.log('Found user')
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// app.use(function(req,res,next){
//
//   var authenticated = req.isAuthenticated();
//   console.log('Request AUthenticated',authenticated);
//   if(!req.isAuthenticated()){
//     req.url = '/login';
//   }
//   next();
// })
//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use('/graphql', expressGraphQL(req => ({
//   schema,
//   graphiql: true,
//   rootValue: { request: req },
//   pretty: process.env.NODE_ENV !== 'production',
// })));
// req.isAuthenticated() ?
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*' , async (req, res, next) => {
  try {
      let css = new Set();
      let statusCode = 200;
      const data = { title: '', description: '', style: '', script: assets.main.js, children: '' };
      console.log('THIS SHOULD BE CORRECT...',req.isAuthenticated());
      await UniversalRouter.resolve(routes, {
        path:   req.path, // Check if authenticated, otherwise go to login
        query: req.query,
        isAuthenticated: req.isAuthenticated(),
        context: {
          insertCss: (...styles) => {
            styles.forEach(style => css.add(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
          },
          setTitle: value => (data.title = value),
          setMeta: (key, value) => (data[key] = value),
        },
        render(component, status = 200) {
          // console.log('inside render of UniversalRouter', component);
          css = new Set();
          statusCode = status;
          data.children = ReactDOM.renderToString(component);
          data.style = [...css].join('');
          return true;
        },
      });

      // console.log('outside render func of UniversalRouter with statusCode', statusCode);
      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

      res.status(statusCode);
      res.send(`<!doctype html>${html}`);

  } catch (err) {
    // console.log('some error occured', err);
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(statusCode);
  res.send(`<!doctype html>${html}`);
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
// models.sync().catch(err => console.error(err.stack)).then(() => {
//   app.listen(port, () => {
//     console.log(`The server is running at http://localhost:${port}/`);
//   });
// });
/* eslint-enable no-console */
