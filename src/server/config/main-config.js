(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const flash = require('connect-flash');
  const morgan = require('morgan');
  // const nunjucks = require('nunjucks');
  const passport = require('passport');
  // process.env.SECRET_KEY='xfe';

  // *** view folders *** //
  // const viewFolders = [
  //   path.join(__dirname, '..', '..', 'client')
  // ];
  // view engine setup


  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile); //renders files with html extension

    // // *** view engine *** //
    // nunjucks.configure(viewFolders, {
    //   express: app,
    //   autoescape: true
    // });
    // app.set('view engine', 'html');

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // uncomment if using express-session
    app.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(flash());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));
    // app.use(express.static(path.join(__dirname, '..', '..', '..', 'bower_components')));


  };

})(module.exports);
