const express = require('express');
const router = express.Router();

var db = require('../db/queries'); // db for DATA and for USERS are not same, diffrent privilegies sure..


const authHelpers = require('../auth/_helpers');

// // define the home page route
// router.get('/', function (req, res) {
//     res.render('index', { title: '' });
// })

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


// MONIT
router.get('/noise_data/:airport/:station', db.getNoise_Last_5m);
router.get('/air_data/:airport/', db.getAircrafts_RealTime);

// STATS
router.get('/flight_stats/:airport', db.getFlights_Stats);
router.get('/noise_stats/:airport/:station/:level', db.getNoise_Stats);

// TRACKS
router.get('/tracks/:airport/:from/:to', db.getTracks_Table);
router.get('/tracks/:airport/:track', db.getTracks_Table_by_Track);

// NOISE
router.get('/noise_data/:airport/:station/:level_from/:level_to/:max_distance/:from/:to', db.getNoise_Table);
router.get('/noise_data/:airport/:station/unique/:level_from/:level_to/:max_distance/:from/:to', db.getNoise_Unique_Table);
router.get('/noise_data/:airport/:station/:track', db.getNoise_Table_by_Track);
router.get('/noise_data/:airport/:station/chart/:track', db.getNoise_Chart_by_Track);



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
