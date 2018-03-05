//var app;
//(function () {
//    'use strict'; //Defines that JavaScript code should be executed in "strict mode"

   var app = angular.module('myapp', []);
   //var validationApp = angular.module('myapp', []);
  

    // create angular controller
    app.controller('CarCtrl', function ($scope) {
        $scope.message = "speed";     
        
    });
//})();