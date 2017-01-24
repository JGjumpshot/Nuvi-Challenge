angular.module('nuviApp').controller('userCtrl', function($scope, mainService, people) {
  $scope.people = people;

  $scope.getNext50 = function() {
    console.log($scope.people);
    $scope.people = $scope.people.concat(mainService.getNext50());

  }
})
