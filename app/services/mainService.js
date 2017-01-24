angular.module('nuviApp').service('mainService', function($http) {
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

})
