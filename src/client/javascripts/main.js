var app = angular.module('app', [
    'ui.router',
    'permission',
    'permission.ui',
    'highcharts-ng',
    'ngSanitize', // used for ui.select 
    'ui.select',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.selection',
    'ui.grid.exporter',
    // 'ui.grid.autoResize',
    // 'ui.grid.uiGridCustomCellSelect',
    'moment-picker'
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
            templateUrl: 'partials/bio.html',
            controller:'bioController'

          }
        }
      })

      .state('app.work', {
        url: '/work',
        views: {
          article: {
            templateUrl: 'partials/work.html',
          }
        }
      })

      // .state('app.monit', {
      //   url: '/monit',
      //   views: {
      //     article: {
      //       templateUrl: 'partials/monit.html',
      //       controller:'MonitController'
      //     }
      //   },
      //   data: {
      //     permissions: {
      //       only: ['AUTHORIZED'],
      //       redirectTo: ['$q', function ($q) {
      //         return $q.resolve({
      //           state: 'app.bio',
      //           options: {
      //             reload: true
      //           }
      //         });
      //       }]
      //     }
      //   }
      // });


      .state('app.monit', {
        url: '/monit',
        views: {
          article: {
            templateUrl: 'partials/monit.html',
            controller:'MonitController'
          }
        },
        data: {
          // permissions: {
            // only: ['AUTHORIZED'],
            // redirectTo: ['$q', function ($q) {
            //   return $q.resolve({
            //     state: 'app.bio',
            //     options: {
            //       reload: true
            //     }
            //   });
            // }]
          // }
        }
      })
      .state('app.stats', {
        url: '/stats',
        views: {
          article: {
            templateUrl: 'partials/stats.html',
            controller:'StatsController'
          }
        },
        data: {
          // permissions: {
            // only: ['AUTHORIZED'],
            // redirectTo: ['$q', function ($q) {
            //   return $q.resolve({
            //     state: 'app.bio',
            //     options: {
            //       reload: true
            //     }
            //   });
            // }]
          // }
        }
      })
      .state('app.noise', {
        url: '/noise',
        views: {
          article: {
            templateUrl: 'partials/noise.html',
            controller:'NoiseController'
          }
        },
        data: {
          // permissions: {
            // only: ['AUTHORIZED'],
            // redirectTo: ['$q', function ($q) {
            //   return $q.resolve({
            //     state: 'app.bio',
            //     options: {
            //       reload: true
            //     }
            //   });
            // }]
          // }
        }
      })


      .state('app.tracks', {
        url: '/tracks',
        views: {
          article: {
            templateUrl: 'partials/tracks.html',
            controller:'TracksController'
          }
        },
        data: {
          // permissions: {
            // only: ['AUTHORIZED'],
            // redirectTo: ['$q', function ($q) {
            //   return $q.resolve({
            //     state: 'app.bio',
            //     options: {
            //       reload: true
            //     }
            //   });
            // }]
          // }
        }
      });




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
    isAdmin: false
  })

  .run(function (PermRoleStore,$http,appConf,$state) {

      console.log('RUN')
      $http.get('/auth/status')
      // handle success
      .then(function (data) {
        console.log(data)
        if(data.data.status){
          console.log('LOOKS LIKE LOGED')
          if(data.data.admin){
            appConf.isAdmin=true;  
          } else {
            appConf.isAdmin=false;  
          }

          appConf.isAuthorized=true;
            // appConf.isAdmin=true;  
          // $state.go('app.work');
          // user = true;
        } else {
          console.log('LOOKS LIKE LOGED OUT')
          appConf.isAuthorized=false;
          appConf.isAdmin=false;  
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

