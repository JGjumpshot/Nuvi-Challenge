angular.module('nuviApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
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
      people: function(mainService, $timeout) {
        return mainService.getData().then(function(response) {
          return response;
        })
      }
    }
  })
  .state('profile', {
    url: '/profile/:id',
    controller: 'profileCtrl',
    templateUrl: './app/routes/profile.html'
  })

})
