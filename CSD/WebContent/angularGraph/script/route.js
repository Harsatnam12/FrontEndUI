(function(){
angular.module('app', ['ngRoute'])

.config(function($routeProvider){
   $routeProvider.when("/",{
    templateUrl:"views/allItems.html",
    controller:"MainController",
    controllerAs:"vm"
   })
  .when("/view",{
    templateUrl:"views/itemView.html",
    controller:"ViewController",
    controllerAs:"vm"
    
   })



})

})();
