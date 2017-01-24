angular.module('nuviApp').controller('profileCtrl', function($scope, mainService, $stateParams, localStorageService) {
  // $scope.test = 'working!';
  $scope.idArray = localStorageService.get('idArray') || [];


  mainService.getName($stateParams.id).then(function(response) {
    $scope.test2 = response;
    if($scope.test2.activity_attachment) {
      $scope.hider = true;
    }
    else {
      $scope.hider = false;
    }
    console.log($scope.test2);
    if ($scope.idArray.indexOf($scope.test2.id) === -1) {
      $scope.liked = 0;

    }
    else {
      $scope.liked = 1;
    }


  })



  $scope.grabId = function(id) {
    if ($scope.idArray.indexOf(id) === -1) {
      $scope.liked = 1;
      $scope.idArray.push(id);
    }

    else {
      $scope.liked = 0;
      $scope.idArray.splice($scope.idArray.indexOf(id), 1)
    }
    localStorageService.store('idArray', $scope.idArray);
  }
})



//
// if($stateParams.id) {
//   mainService.getName($stateParams.id).then(function(response){
//     $scope.name = response.data;
//     console.log(response.data);
//   })
// }
