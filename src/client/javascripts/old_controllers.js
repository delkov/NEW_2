app.controller('LoginController',
  function ($scope, $location, AuthService, $state, $http, appConf) {
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $scope.disabled = false;
          $scope.loginForm = {};
          appConf.isAuthorized=true;

          $http.get('/auth/status')
          // handle success
          .then(function (data) {
            console.log(data)
              if(data.data.admin){
                appConf.isAdmin=true;  
              } else {
                appConf.isAdmin=false;  
              }
          })
          // handle error
          .catch(function (data) {
            user = false;
          });

          $state.go('app.bio', {}, {reload: true});
          // $state.go('app', {}, { reload: 'main.products' })
          // console.log('CTRL SUCC')
        })
        // handle error
        .catch(function () {
      	  // console.log('CTRL ERR')
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
})

.controller('LogoutController',
  function ($scope, $location, AuthService, $state, appConf) {
    $scope.test= function () {
      console.log("LOGOUT")
    }
    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          appConf.isAuthorized=false;
          $state.go('app.login', {}, {reload: true});
        });
    };
})


.controller('bioController',
  function ($scope, $location, AuthService, $state,  $timeout, $interval) {

//     // $scope.test= function () {
//     //   console.log("LOGOUT")
//     // }

//     // $scope.logout = function () {
//     //   // call logout from service
//     //   AuthService.logout()
//     //     .then(function () {
//     //       appConf.isAuthorized=false;
//     //       // $location.path('/login');
//     //       // console.log('LOGOUT..')
//     //       // $window.location.reload();
//     //       // window.location.replace("http://stackoverflow.com");
//     //       // window.location.href = "http://localhost:3000/#!/noise";
//     //       // window.location.reload();
//     //       $state.go('app.login', {}, {reload: true});
//     //       // $state.go('app.login');

//     //     });
//     // };

//       // $scope.test=1488;
}).




// TRACKS TAB
controller('TracksController',function($scope,$state,$stateParams,$interval,$http,$filter,uiGridConstants){
    $scope.gridOptions = {
         data: {}, 
         // enableVerticalScrollbar: 1,
         // enableFiltering: true,
         columnDefs: [
         { field: 'first_time', displayName: 'Обнаружен',type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%', enableFiltering: true, 
          // sort: {
          // direction: uiGridConstants.DESC,
          // priority: 1
        // }
         },
         { field: 'track', displayName: 'Трек', width: '4%'},
         { field: 'icao', displayName: 'ICAO', width: '4%'},
         { field: 'callsign', displayName: 'Позывной', width: '5%'},
         { field: 'fromairport', displayName: 'Откуда', width: '6%'},
         { field: 'toairport', displayName: 'Куда', width: '6%'},
         { field: 'type', displayName: 'Самолет', width: '8%'},
         { field: 'operator', displayName: 'Авиакомпания', width: '8%'},
         { field: 'last_time', displayName: 'Последний сигнал', cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'',  width: '10%'},
         { field: 'callsign_last_time', displayName: 'Последний позывной',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
         { field: 'altitude_last_time', displayName: 'Последняя высота',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
         { field: 'speed_last_time', displayName: 'Последняя скорость',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
         { field: 'coordinate_last_time', displayName: 'Последние GPS',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
         { field: 'vert_speed_last_time', displayName: 'Последняя верт. скорость',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
         ],

        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        showGridFooter: true,
        gridFooterTemplate: "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>Total {{grid.rows.length}}</span></div>"
    }

    $scope.datepicker_from=moment().subtract(1, "hours");//.format("DD-MM-YYYY");
    $scope.datepicker_to=moment();

    $scope.fill_tracks_table = function() {
          $scope.gridOptions = {
               data: {}, 
               // enableVerticalScrollbar: 1,
               enableFiltering: true,
               columnDefs: [
               { field: 'first_time', displayName: 'Обнаружен',type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%', enableFiltering: true, 
                // sort: {
                // direction: uiGridConstants.DESC,
                // priority: 1
              // }
               },
               { field: 'track', displayName: 'Трек', width: '4%'},
               { field: 'icao', displayName: 'ICAO', width: '4%'},
               { field: 'callsign', displayName: 'Позывной', width: '5%'},
               { field: 'fromairport', displayName: 'Откуда', width: '6%'},
               { field: 'toairport', displayName: 'Куда', width: '6%'},
               { field: 'type', displayName: 'Самолет', width: '8%'},
               { field: 'operator', displayName: 'Авиакомпания', width: '8%'},
               { field: 'last_time', displayName: 'Последний сигнал', cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'',  width: '10%'},
               { field: 'callsign_last_time', displayName: 'Последний позывной',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
               { field: 'altitude_last_time', displayName: 'Последняя высота',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
               { field: 'speed_last_time', displayName: 'Последняя скорость',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
               { field: 'coordinate_last_time', displayName: 'Последние GPS',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
               { field: 'vert_speed_last_time', displayName: 'Последняя верт. скорость',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '10%'},
               ],

              enableGridMenu: true,
              enableSelectAll: true,
              exporterCsvFilename: 'myFile.csv',
              showGridFooter: true,
              gridFooterTemplate: "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>Total {{grid.rows.length}}</span></div>"
          }

        $scope.datepicker_to_timestamp=moment($scope.datepicker_to).format("X");
        $scope.datepicker_from_timestamp=moment($scope.datepicker_from).format("X");
        console.log('FILL TRACK TABLE')
        $http.get('http://localhost:3000/tracks/'+$scope.datepicker_from_timestamp+'/'+$scope.datepicker_to_timestamp).then(function (data) {
          $scope.gridOptions=data.data;
        });
    }
    
    $scope.track=1488; // default value
    $scope.fill_tracks_table_by_track_number = function() {
        // console.log('FILL TRACK TABLE')
        $scope.gridOptions = { data: {}, 
           enableVerticalScrollbar: 1,
           columnDefs: [
           { field: 'time_track', displayName: 'Время ',type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: 160},
           { field: 'track', displayName: 'Трек', width: '4%'},
           { field: 'icao', displayName: 'ICAO', width: 80},
           { field: 'type', displayName: 'Самолет', width: 170},
           { field: 'operator', displayName: 'Авиакомпания', width: 170},
           { field: 'callsign', displayName: 'Позывной', width: 100},
           { field: 'fromairport', displayName: 'Откуда', width: 100},
           { field: 'toairport', displayName: 'Куда', width: 100},
           { field: 'altitude', displayName: 'Высота', width: 80 },
           { field: 'speed', displayName: 'Скорость', width: 80 },
           { field: 'angle', displayName: 'Курс', width: 80 },
           { field: 'latitude', displayName: 'Широта', width: 110 },
           { field: 'longitude', displayName: 'Долгота', width: 110 },
           { field: 'vertical_speed', displayName: 'Верт. скорость', width: 120 },
           { field: 'distance_1', displayName: 'Расстояние', width: 100,       sort: {
             direction: uiGridConstants.ASC,
             priority: 1
           }}
           ],
           showGridFooter: true,
           gridFooterTemplate: "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>Total {{grid.rows.length}}</span></div>"
        }

        $http.get('http://localhost:3000/tracks/'+$scope.track).then(function (data) {
          $scope.gridOptions=data.data;
        });
    }
})


// REAL-TIME TAB. WE SHOUD CONTROL ONLY AIRPORT by user group..
.controller('MonitController', 
  function($rootScope, $interval, $scope, $state, $http, appConf, uiGridConstants){
    // console.log('MONIT module')
    // BEGIN GRID
    $scope.gridOptions = { data: {}, 
           enableVerticalScrollbar: 1,
           columnDefs: [
           { field: 'time_track', displayName: 'Время ',type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: 160},
           { field: 'icao', displayName: 'ICAO', width: 80},
           { field: 'type', displayName: 'Самолет', width: 170},
           { field: 'operator', displayName: 'Авиакомпания', width: 170},
           { field: 'callsign', displayName: 'Позывной', width: 100},
           { field: 'fromairport', displayName: 'Откуда', width: 100},
           { field: 'toairport', displayName: 'Куда', width: 100},
           { field: 'altitude', displayName: 'Высота', width: 80 },
           { field: 'speed', displayName: 'Скорость', width: 80 },
           { field: 'angle', displayName: 'Курс', width: 80 },
           { field: 'latitude', displayName: 'Широта', width: 110 },
           { field: 'longitude', displayName: 'Долгота', width: 110 },
           { field: 'vertical_speed', displayName: 'Верт. скорость', width: 120 },
           { field: 'distance_1', displayName: 'Расстояние', width: 100,       sort: {
             direction: uiGridConstants.ASC,
             priority: 1
           }}
           ],
           showGridFooter: true,
           gridFooterTemplate: "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>Total {{grid.rows.length}}</span></div>"
        }


        $http.get('http://localhost:3000/air_data').then(function (result) {
          $scope.realtime_air=result; // no idea why buffer var is needed..
          $scope.gridOptions.data = $scope.realtime_air.data;
        });

        // var entry = Movie.query(function() {
        // $scope.gridOptions.data=entry;
      // }); // get() returns a single entry

    // $interval(
    //     function() {
    //       var entry = Movie.query(function() {
    //       $scope.gridOptions.data=entry;
    //     }); // get() returns a single entry
    // },1000);  

  // END GRID
    $scope.onSelectAirportCallback = function onSelectAirportCallback() {
      console.log('SELECT CALLBACK', $scope.selected_airport.selected)
      $scope.selected_station=[]

      switch($scope.selected_airport.selected) {
        case 'VNK':
          console.log('prepare stations for VNK')
          $scope.stations = [
            { name: 'VNK001',   station_query: 'noise_data_last_5m', address: 'г. Омск, улица Ленина, д.23' },
            { name: 'VNK002',   station_query: 'noise_data_last_10m', address: 'г. Омск, улица Ленина, д.18' },
          ];
          break;
        case 'OMSK':
          console.log('prepare stations for OMSK')
          $scope.stations = [
            { name: 'OMSK001',   station_query: 'noise_data_last_5m', address: 'address is' },
            { name: 'OMSK002',   station_query: 'noise_data_last_10m', address: 'address is' },
          ];
          break;
      }
    }

    $scope.onSelectStationCallback = function onSelectStationCallback() {
      $scope.station_name=$scope.selected_station.selected;
    }

    // here shuld be case by text field instead of admin ..
    if (appConf.isAdmin) {
      // console.log('APPCONF admin', appConf)
      $scope.airports = [
        { name: 'OMSK'},//      station_query: 'noise_data_last_5m' },
        { name: 'VNK'}//   station_query: 'noise_data_last_10m' },
      ];
    } else {
      // console.log('APPCONF admin', appConf)
      $scope.airports = [
        { name: 'OMSK'}//      station_query: 'noise_data_last_5m' },
      ];
    }

    // default value -- should be control by group..
    $scope.stations = [
      { name: 'OMSK001',      station_query: 'noise_data_last_5m', address: 'address is' },
      { name: 'OMSK002',   station_query: 'noise_data_last_10m', address: 'address is' }
    ];

    $scope.selected_airport = {selected : $scope.airports[0]};
    $scope.selected_station = {selected : $scope.stations[0]};


  // $interval(
      // function() {
        // console.log($scope.personAsync.selected)
      // } // get() returns a single entry
  // ,1000);  

    $scope.station_name='noise_data_last_5m'
    console.log('appConf', appConf)

    // CHARTS
    // localization
    Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'qПятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график'
            }
    });

    // CHARTS
    $scope.chartConfig = {
        chartType: 'stock',
        chart: {
            type: 'areaspline',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            },
          events: {
            load: function () {
            // set up the updating of the chart each second
              var series = this.series[0];
            
              // static update each 10s
              setInterval(function () {
                $http.get('http://localhost:3000/' + $scope.station_name).then(function (result) {
                  $scope.Noise_Last_5m = result;
                  $scope.chartConfig.series=[{
                  data: $scope.Noise_Last_5m.data,
                  id: 'Level'
                }]
                });
              }, 1000);
            }
          }
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
          buttons: [{
            count: 1,
            type: 'minute',
            text: '1Мин'
        }, {
            count: 3,
            type: 'minute',
            text: '3Мин'
        },
        {
          type: 'all',
          text: 'ALL'
        }
        ],
          inputEnabled: false
          // selected: 0
        },
        title: {
            text: 'Станция шума (обн.каждые 10с)'
        },
        credits:{"enabled":false},
        legend: {
          enabled: true,
          align: 'right',
          // backgroundColor: '#FCFFC5',
          borderColor: 'white',
          borderWidth: 0,
          layout: 'vertical',
          verticalAlign: 'top',
          y: 2000,
          // shadow: true
        },
        series: [{
          fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: [[]],
          name: 'Уровень шума',
          id: 'Level',
        }]
    }

// load once at the beginning
// $http.get('http://localhost:3000/noise_data_last_5m').then(function (result) {
//       $scope.Noise_Last_5m = result;
//       $scope.chartConfig.series=[{
//       data: $scope.Noise_Last_5m.data,
//       id: 'Level'
//       }]
// });
}).

controller('NoiseController',function($scope,$state,$stateParams,$interval,$http,$filter,uiGridConstants){
    $scope.gridOptions = {
         data: {}, 
         enableFiltering: true,
         columnDefs: [
         { field: 'time_noise', displayName: 'Время',type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '12%', enableFiltering: true},
         { field: 'base_name', displayName: 'Станция', width: '4%'},
         { field: 'slow', displayName: 'Уровень', width: '4%'},
         { field: 'track', displayName: 'Трек', width: '4%'},
         { field: 'aircraft_time', displayName: 'Время самолета', type: 'date',cellFilter: 'date:\'yyyy-MM-dd H:mm:ss\'', width: '9%'},
         { field: 'icao', displayName: 'ICAO', width: '4%'},
         { field: 'type', displayName: 'Самолет', width: '9%'},
         { field: 'operator', displayName: 'Авиакомпания', width: '10%'},
         { field: 'callsign', displayName: 'Позывной', width: '4%'},
         { field: 'fromairport', displayName: 'Откуда', width: '4%'},
         { field: 'toairport', displayName: 'Куда', width: '4%'},
         { field: 'altitude', displayName: 'Высота', width: '4%', enableFiltering: false},
         { field: 'speed', displayName: 'Скорость', width: '4%', enableFiltering: false},
         { field: 'angle', displayName: 'Курс', width: '3%', enableFiltering: false},
         { field: 'longitude', displayName: 'Долгота', width: '5%', enableFiltering: false},
         { field: 'latitude', displayName: 'Широта', width: '5%', enableFiltering: false},
         { field: 'vertical_speed', displayName: 'Верт. скорость', width: '6%', enableFiltering: false},
         { field: 'distance_1', displayName: 'Расстояние', width: '4%', enableFiltering: false},

         { field: 'temperature', displayName: 'Температура', width: '4%', enableFiltering: false},
         { field: 'humadity', displayName: 'Влажнось', width: '4%', enableFiltering: false},
         { field: 'presure', displayName: 'Давление', width: '4%', enableFiltering: false},
         { field: 'wind', displayName: 'Ветер', width: '4%', enableFiltering: false},

         ],
        enableGridMenu: true,
        enableSelectAll: true,
        // exporterMenuPdf: false,
        exporterCsvFilename: 'myFile.csv',

        // exporterPdfDefaultStyle: {fontSize: 9},
        // exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        // exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        // exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
        // exporterPdfFooter: function ( currentPage, pageCount ) {
        //   return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        // },
        // exporterPdfCustomFormatter: function ( docDefinition ) {
        //   docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        //   docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        //   return docDefinition;
        // },
        // exporterPdfOrientation: 'portrait',
        // exporterPdfPageSize: 'LETTER',
        // exporterPdfMaxGridWidth: 500,
        // exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        showGridFooter: true,
        gridFooterTemplate: "<div class=\"ui-grid-footer-info ui-grid-grid-footer\"><span>Total {{grid.rows.length}}</span></div>"
    }


    // Default values
    $scope.level_from=75;
    $scope.level_to=100;
    $scope.max_distance=10000;
    $scope.datepicker_from=moment().subtract(3, "hours");//.format("DD-MM-YYYY");
    $scope.datepicker_to=moment();
    $scope.track_number=22472;

    $scope.fill_table = function() {
      $scope.datepicker_to_timestamp=moment($scope.datepicker_to).format("X");
      $scope.datepicker_from_timestamp=moment($scope.datepicker_from).format("X");
      // console.log('FROM', $scope.datepicker_from)
      // console.log('FROM TIMESTAMP', $scope.datepicker_from_timestamp)
      // console.log('LEVEL FROM', $scope.level_from)
      // console.log('LEVEL TO', $scope.level_to)
      // console.log('MAX DIST', $scope.max_distance)

        if ($scope.unique_noise) {
          $http.get('http://localhost:3000/noise_data/unique/'+$scope.level_from+'/'+$scope.level_to+'/'+$scope.max_distance+'/'+$scope.datepicker_from_timestamp+'/'+$scope.datepicker_to_timestamp).then(function (data) {   
            $scope.gridOptions=data.data;
          });
        } else {
          $http.get('http://localhost:3000/noise_data/'+$scope.level_from+'/'+$scope.level_to+'/'+$scope.max_distance+'/'+$scope.datepicker_from_timestamp+'/'+$scope.datepicker_to_timestamp).then(function (data) {   
            $scope.gridOptions=data.data;
        });
        }
    }


    $scope.fill_noise_table_by_track = function() {
        $http.get('http://localhost:3000/noise_data/'+$scope.track_number).then(function (data) {   
          $scope.gridOptions=data.data;
        });
        $http.get('http://localhost:3000/noise_data/chart/'+$scope.track_number).then(function (result) {
            $scope.Noise_Chart = result;
            $scope.chartConfig.series=[{
            data: $scope.Noise_Chart.data,
            id: 'Level'
          }]
        });
    }




    // CHARTS
    Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график'
            }
    });

    $scope.chartConfig = {
        chartType: 'stock',
        chart: {
            type: 'areaspline',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            }
          // events: {
          //   // load: function () {
          //   // // set up the updating of the chart each second
          //   //   // var series = this.series[0]; // 
          //   //   // static update each 10s


          //   // }
          // }
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
          buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 3,
            type: 'minute',
            text: '3M'
        }, {
          count:5,
            type: 'minute',
            text: '5M'
        }],
          inputEnabled: false
          // selected: 0
        },
        title: {
            text: 'Станция шума'
        },
        credits:{"enabled":false},
        legend: {
          enabled: true,
          align: 'right',
          // backgroundColor: '#FCFFC5',
          borderColor: 'white',
          borderWidth: 0,
          layout: 'vertical',
          verticalAlign: 'top',
          y: 100,
          // shadow: true
        },
        series: [{
          fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: [[]],
          name: 'Уровень шума',
          id: 'Level',
        }]
    }
}).



// STAT TAB
controller('StatsController',function($scope,$http,$timeout){
$http.get('http://localhost:3000/Flight_stats').then(function (result) {
      $scope.exportData = result;
});

  // LANG OPTIONS
  Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график'
            }
    });

    $scope.chartConfig = {
    chartType: 'stock',
        chart: {
            type: 'column',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
          },
    navigator: {
        enabled: true
    },
    credits:{"enabled":false},
    rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
                type: 'month',
                count: 3,
                text: 'День',
                dataGrouping: {
                    forced: true,
                    units: [['day', [1]]]
                }
            }, {
                type: 'year',
                count: 1,
                text: 'Неделя',
                dataGrouping: {
                    forced: true,
                    units: [['week', [1]]]
                }
            }, {
                type: 'all',
                text: 'Месяц',
                dataGrouping: {
                    forced: true,
                    units: [['month', [1]]]
                }
            }, {
                type: 'all',
                text: 'Год',
                dataGrouping: {
                    forced: true,
                    units: [['year', [1]]]
                }
            }],
            buttonTheme: {
                width: 60
            },
            selected: 2
        },
        title: {
            text: 'Колличество зарегистрированных ВС'
        },
      series: [{
                fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
        data: [[]],
        id: 'Flights',
        name: 'ВС',
      }]
      };


    $scope.chartConfig2 = {
        chartType: 'stock',
        chart: {
          type: 'column',
          threshold: null,
          tooltip: {
              valueDecimals: 2
          }
        },
        navigator: {
            enabled: true
        },
        credits:{"enabled":false},
        rangeSelector: {
                allButtonsEnabled: true,
                buttons: [{
                    type: 'month',
                    count: 3,
                    text: 'День',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]]
                    }
                }, {
                    type: 'year',
                    count: 1,
                    text: 'Неделя',
                    dataGrouping: {
                        forced: true,
                        units: [['week', [1]]]
                    }
                }, {
                    type: 'all',
                    text: 'Месяц',
                    dataGrouping: {
                        forced: true,
                        units: [['month', [1]]]
                    }
                }, {
                    type: 'all',
                    text: 'Год',
                    dataGrouping: {
                        forced: true,
                        units: [['year', [1]]]
                    }
                }],
                buttonTheme: {
                    width: 60
                },
                selected: 2
            },
            title: {
                text: 'Колличество нарушений'
            },
        series: [{
                    fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
            data: [[]],
            id: 'Flights',
            name: 'Самолеты',
        }]
      };



// default Value
$scope.restrict_noise_level=69;
$http.get('http://localhost:3000/flight_stats').then(function (result) {
      $scope.chartConfig.series=[{
        data: result.data,
        id: 'Flights',
        name: 'Flights'
      }]
});

$http.get('http://localhost:3000/noise_stats/'+$scope.restrict_noise_level).then(function (result) {
        $scope.chartConfig2.series=[{
        data: result.data,
        id: 'Flights',
        name: 'Flights'
      }];
      $scope.chartConfig.rangeSelector.selected=0;
      $scope.chartConfig2.rangeSelector.selected=0;
});


$scope.$watch('restrict_noise_level', function() {
  $http.get('http://localhost:3000/noise_stats/'+$scope.restrict_noise_level).then(function (result) {
          $scope.chartConfig2.series=[{
          data: result.data,
          id: 'Flights',
          name: 'Flights'
        }]
  });
});



});
