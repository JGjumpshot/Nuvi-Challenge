angular.module('nuviApp', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: './app/routes/home.html'
  })
  .state('username', {
    url: '/username',
    controller: 'userCtrl',
    templateUrl: './app/routes/user.html',
    resolve: {
      people: ["mainService", "$timeout", function(mainService, $timeout) {
        return mainService.getData().then(function(response) {
          return response;
        })
      }]
    }
  })
  .state('profile', {
    url: '/profile/:id',
    controller: 'profileCtrl',
    templateUrl: './app/routes/profile.html'
  })

}])

angular.module('nuviApp').controller('homeCtrl', ["$scope", function($scope) {
  
}])

angular.module('nuviApp').controller('profileCtrl', ["$scope", "mainService", "$stateParams", "localStorageService", function($scope, mainService, $stateParams, localStorageService) {
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
}])



//
// if($stateParams.id) {
//   mainService.getName($stateParams.id).then(function(response){
//     $scope.name = response.data;
//     console.log(response.data);
//   })
// }

angular.module('nuviApp').controller('userCtrl', ["$scope", "mainService", "people", function($scope, mainService, people) {
  $scope.people = people;

  $scope.getNext50 = function() {
    console.log($scope.people);
    $scope.people = $scope.people.concat(mainService.getNext50());

  }
}])

angular.module('nuviApp').directive('headerDirective', function() {
  return {
    restrict: 'AE',
    templateUrl: './app/routes/header.html'
  }
})

// INITILIZE SERVICE
// ============================================================
angular.module("nuviApp")
  .service("localStorageService", ["$http", function($http) {
    this.store = function(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
      return 'saved';
    };
    this.get = function(name) {
      var item = localStorage.getItem(name);
      return JSON.parse(item);
    };
  }]);

angular.module('nuviApp').service('mainService', ["$http", function($http) {
  var data;
  var currentIndex = 0;
  var self = this;

  this.getNext50 = function() {
    var returnData;
    if (currentIndex + 50 < data.length) {
      returnData = data.slice(currentIndex, currentIndex + 50);
      currentIndex += 50;
    } else {
      returnData = data.slice(currentIndex, data.length);
      currentIndex = data.length;
    }
    return returnData;
  }

  this.getData = function() {
    return $http({
      method: 'GET',
      url: 'https://nuvi-challenge.herokuapp.com/activities'
    }).then(function(response) {
      console.log(response);
      currentIndex = 0;
      data = response.data;

      return self.getNext50();
    })
  }

  this.getName = function(id) {
    return $http({
      method: 'GET',
      url: 'https://nuvi-challenge.herokuapp.com/activities/' + id
    }).then(function(response) {
      console.log(response);
      return response.data;
    })
  }

}])
