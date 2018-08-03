const express = require('express');
const router = express.Router();

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
      });
    }
  })(req, res, next);
});


// router.post('/login', function(req, res, next) {
//   // passport.authenticate('local', function(err, user, info) {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   if (!user) {
//   //     return res.status(401).json({
//   //       err: info
//   //     });
//   //   }
//   //   req.logIn(user, function(err) {
//   //     if (err) {
//   //       return res.status(500).json({
//   //         err: 'Could not log in user'
//   //       });
//   //     }
//   //     res.status(200).json({
//   //       status: 'Login successful!'
//   //     });
//   //   });
//   // })(req, res, next);


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
  console.log(req);
  if (!req.isAuthenticated()) {
    console.log('NOT LOGED IN')
    return res.status(200).json({
      status: false
    });
  }
  console.log('LOGED IN')
  res.status(200).json({
    status: true
  });
});


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
