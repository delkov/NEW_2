app.factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      // getUserStatus();
      // console.log('FUNCTION is LoggedIn')
      // if(user) {
      //   return true;
      // } else {
      //   return false;
      // }
    

      $http.get('/auth/status')
      // handle success
      .then(function (data) {
        if(data.status){
          return true;
        } else {
           return false;
        }
      })
      // handle error
      .catch(function (data) {
        return false;
      });




    }

    function getUserStatus() {
      return $http.get('/auth/status')
      // handle success
      .then(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .catch(function (data) {
        user = false;
      });
    }




    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/auth/login', {username: username, password: password})
        // handle success
        .then(function (data, status) {
          console.log(data.status)
          // console.log(status)

          // if(status === 200 && data.status=="success"){
          if (data.status===200){
            user = true;
            deferred.resolve();
            console.log('SERV SUCC')
          } else {
            user = false;
            deferred.reject();
            console.log('SERV ERR 1')
          }
        })
        // handle error
        .catch(function (data) {
          console.log('SERV ERR 2')
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/auth/logout')
        // handle success
        .then(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .catch(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/auth/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          // if(status === 200 && data.status){
          if(data.status===200){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);