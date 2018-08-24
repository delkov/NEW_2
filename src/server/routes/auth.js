const express = require('express');
const router = express.Router();

var db = require('../db/queries'); // db for DATA and for USERS are not same, diffrent privilegies sure..

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.post('/register', authHelpers.loginRedirect, (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user, info) => {
      if (user) { handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { handleResponse(res, 500, 'error'); });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  console.log(req);
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        handleResponse(res, 200, 'success');
        // console.log('USER OBJEST', user);
      });
    }
  })(req, res, next);
});


//   console.log('AZAZA');
//       //   res.status(200).json({
//       //   status: 'Login successful!'
//       // });
//   // return true;

//   handleResponse(res, 200, 'succes');

// });



router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'succes');
  // res.status(200).json({
    // status: 'Bye!'
  // });
});

router.get('/status', function(req, res) {
  // console.log(req.user);
  if (!req.isAuthenticated()) {
    console.log('NOT LOGED IN')
    return res.status(200).json({
      status: false
    });
  }
  console.log('LOGED IN')
  if (req.user.admin) {
    res.status(200).json({
      status: true,
      admin: true
    });
  } else {
    res.status(200).json({
      status: true,
      admin: false

    });
  }


});



// router.get('/admin_status', function(req, res) {
//   console.log(req);
//   if (!req.isAuthenticated()) {
//     console.log('NOT LOGED IN')
//     return res.status(200).json({
//       status: false
//     });



//     knex('users').where({username: req.user.username}).first()
//     .then((user) => {
//       if (!user.admin) res.status(401).json({status: 'You are not authorized as admin'});
//         return next();
//     }).catch((err) => {
//       res.status(500).json({status: 'Something bad happened'});
//     })


//   }
//   // console.log('LOGED IN')
//   // res.status(200).json({
//     // status: true
//   // });
// });




// function adminRequired(req, res, next) {
//   if (!req.user) res.status(401).json({status: 'Please log in'});
//   return knex('users').where({username: req.user.username}).first()
//   .then((user) => {
//     if (!user.admin) res.status(401).json({status: 'You are not authorized as admin'});
//     return next();
//   })
//   .catch((err) => {
//     res.status(500).json({status: 'Something bad happened'});
//   });
// }



// router.post('/register', authHelpers.loginRedirect, (req, res, next)  => {
//   return authHelpers.createUser(req, res)
//   .then((user) => {
//     handleLogin(res, user[0]);
//   })
//   .then(() => { handleResponse(res, 200, 'success'); })
//   .catch((err) => { handleResponse(res, 500, 'error'); });
// });




// *** helpers *** //

function handleLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.logIn(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
