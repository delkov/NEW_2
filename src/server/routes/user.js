const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');

// // define the home page route
// router.get('/', function (req, res) {
//     res.render('index', { title: '' });
// })

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

router.get('/user', authHelpers.loginRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

router.get('/admin', authHelpers.adminRequired, (req, res, next)  => {
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
