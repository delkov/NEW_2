var app = angular.module('app', [
    'ui.router',
    'permission',
    'permission.ui'
    ]);

app
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          nav: {
            templateUrl: 'partials/nav.html'
          },
          main: {
            templateUrl: 'partials/main.html'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          article: {
            templateUrl: 'partials/login.html',
            controller:'LoginController'
          }
        }
      })

      .state('app.bio', {
        url: '/bio',
        views: {
          article: {
            templateUrl: 'partials/bio.html'
          }
        }
      })

      .state('app.map', {
        url: '/map',
        views: {
          article: {
            templateUrl: 'partials/map.html'
            // controller:'LoginController'
          }
        }
      })

      .state('app.work', {
        url: '/work',
        views: {
          article: {
            templateUrl: 'partials/work.html'
          }
        },
        data: {
          permissions: {
            only: ['AUTHORIZED'],
            redirectTo: ['$q', function ($q) {
              return $q.resolve({
                state: 'app.login',
                options: {
                  reload: true
                }
              });
            }]
          }
        }
      })

      // .state('app.location', {
      //   url: '/location',
      //   abstract: true,
      //   data: {
      //     permissions: {
      //       only: ['AUTHORIZED'],
      //       redirectTo: function () {
      //         return {
      //           state: 'app.map',
      //           options: {
      //             reload: true
      //           }
      //         };
      //       }
      //     }
      //   }
      // })

      // .state('app.location.pin', {
      //   url: '/pin',
      //   views: {
      //     'article@app': {
      //       templateUrl: 'pin.html'
      //     }
      //   }
      // })

      // .state('app.location.memory', {
      //   url: '/memory',
      //   views: {
      //     'article@app': {
      //       templateUrl: 'memory.html'
      //     }
      //   }
      // });


    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');
      $state.go('app.bio');
    });
  })

  .value('appConf', {
    isAuthorized: false,
    isCollapsed: false
  })

  .run(function (PermRoleStore,$http,appConf,$state) {

      console.log('RUN')
      $http.get('/auth/status')
      // handle success
      .then(function (data) {
        console.log(data)
        if(data.data.status){
          console.log('LOOKS LIKE LOGED')
          appConf.isAuthorized=true;
          // $state.go('app.work');
          // user = true;
        } else {
          console.log('LOOKS LIKE LOGED OUT')
          appConf.isAuthorized=false;
          // user = false;
        }
      })
      // handle error
      .catch(function (data) {
        user = false;
      });


    PermRoleStore.defineRole('AUTHORIZED', ['appConf', function (appConf) {
      return appConf.isAuthorized;
    }]);

  });

