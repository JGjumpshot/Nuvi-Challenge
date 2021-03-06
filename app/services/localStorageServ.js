// INITILIZE SERVICE
// ============================================================
angular.module("nuviApp")
  .service("localStorageService", function($http) {
    this.store = function(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
      return 'saved';
    };
    this.get = function(name) {
      var item = localStorage.getItem(name);
      return JSON.parse(item);
    };
  });
