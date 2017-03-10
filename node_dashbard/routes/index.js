var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/management', function(req, res, next) {
  res.render('management.html', { title: 'Express' });
});
// GET camera dashboard
router.get('/camera_dashboard', function(req, res, next) {
  res.render('dashboard.html', { title: 'Express' });
});
// GET singleCamera
router.get('/live', function(req, res, next) {
  res.render('live_tab', { title: 'Express' });
});
router.get('/livebad', function(req, res, next) {
  res.render('live_tab_bad.html', { title: 'Express' });
});
// GET finance
router.get('/finance', function(req, res, next) {
  res.render('finance', { title: 'Express' });
});
// GET logs
router.get('/logs', function(req, res, next) {
  res.render('logs', { title: 'Express' });
});


module.exports = router;
