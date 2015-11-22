'use strict';

angular.module('toDoListApp')
  .controller('MainCtrl', function ($scope, $http) {
    /*$scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;*/
    $scope.awesomeThings = [];

    $scope.check = function(thing){
      if(thing.completed){
        thing.completed =  false;
      }
      thing.completed= true;
    }

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      var newT = {
      name:$scope.newThing
    };
    $scope.awesomeThings.push(newT);
    $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
      /*var i = 0;
      while(i != thing.indexOf(thing._id)){
        i++;
      }*/
      $scope.awesomeThings.splice(1,1);

    };
  });
