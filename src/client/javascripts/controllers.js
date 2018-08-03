// app
// .controller("appController", Ctrl1)
// .controller("appController_2", Ctrl2)

// Ctrl1.$inject=['$scope', '$http', 'appConf', '$state'];
    
// function Ctrl1($scope, $http, appConf, $state) {
// 	this.conf = appConf;

//     // methods
//     this.authorize = authorize;
//     this.toggleMenu = toggleMenu;

//     function authorize() {
//       appConf.isAuthorized = !appConf.isAuthorized;
//       $state.reload();
//     }

//     function toggleMenu() {
//       appConf.isCollapsed = !appConf.isCollapsed;
//     }
// };


// function Ctrl2($scope, $http, appConf, $state) {
// 	this.test_ctrl2 = test_ctrl2;

// 	function test_ctrl2() {
// 		console.log('azaza')
// 	}
// };

app.controller('LoginController',
  ['$scope', '$location', 'AuthService', '$state', '$window', 'appConf',
  function ($scope, $location, AuthService, $state, $window, appConf) {

  	$scope.errorMessage="nothing";

    $scope.test= function () {
      console.log("azaza")
    }

    $scope.login = function () {
    	console.log('LOGIN', appConf.isAuthorized)

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)

        // handle success
        .then(function () {
          // $location.path('/work');
          // $scope.disabled = false;
          // $scope.loginForm = {};

          appConf.isAuthorized=true;
          // window.location.reload();
          // window.location.href = "http://localhost:3000/#!/work";
          // $state.reload();
          // $state.go('app.map', {}, {reload: true});
          $state.go('app.bio', {}, {reload: true});

          // $state.go('app', {}, { reload: 'main.products' })

          // $state.go('map');

          console.log('CTRL SUCC')
        })
        // handle error
        .catch(function () {
      	  console.log('CTRL ERR')
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };
}])


.controller('LogoutController',
  ['$scope', '$location', 'AuthService','$state','$window', 'appConf',
  function ($scope, $location, AuthService, $state, $window, appConf) {


    $scope.test= function () {
      console.log("LOGOUT")
    }


    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          appConf.isAuthorized=false;
          // $location.path('/login');
          // console.log('LOGOUT..')
          // $window.location.reload();
          // window.location.replace("http://stackoverflow.com");
          // window.location.href = "http://localhost:3000/#!/noise";
          // window.location.reload();
          $state.go('app.login', {}, {reload: true});
          // $state.go('app.login');

        });
    };
}]);
