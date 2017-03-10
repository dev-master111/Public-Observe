module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================

    /* GET home page. */
    app.get('/', function(req, res, next) {
      console.log(req.session.messages);
      res.render("index", { login_errors: req.session.messages || [] });
      req.session.messages = [];
    });
    app.post('/login',
      passport.authenticate('local', { successRedirect: '/management',
                                       failureRedirect: '/'})
    );
    app.get('/management', function(req, res, next) {
      res.render('management.html', { title: 'Express' });
    });
    // GET camera dashboard
    app.get('/camera_dashboard', function(req, res, next) {
      res.render('dashboard.html', { title: 'Express' });
    });
    // GET singleCamera
    app.get('/live', function(req, res, next) {
      res.render('live_tab', { title: 'Express' });
    });
    app.get('/livebad', function(req, res, next) {
      res.render('live_tab_bad.html', { title: 'Express' });
    });
    // GET finance
    app.get('/finance', function(req, res, next) {
      res.render('finance', { title: 'Express' });
    });
    // GET logs
    app.get('/logs', function(req, res, next) {
      res.render('logs', { title: 'Express' });
    });

    app.get('/test', function(req, res, next) {
      res.render('react_dashboard.html', { title: 'Express' });
    });

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
};
