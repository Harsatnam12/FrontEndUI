
var app = angular.module('app', []);
app.controller('DealItemsController', DealItemsController);
DealItemsController.$injector = ['$http','dataService'];

function DealItemsController ($http,dataService) {
    var vm = this;
    vm.dealList = [];
    vm.maxRange = 100;
    vm.meanRange = Math.sqrt(vm.maxRange);
    vm.rangeList = [vm.maxRange];
    var mean = vm.maxRange;

    for( var i=0; i< vm.maxRange/vm.meanRange; i++){
        mean = mean-vm.meanRange;
        vm.rangeList.push(mean);
    }
//resolve the data by using promises
    dataService.getData().then(function(resp){
    	console.log(resp.data);
    	var Response=resp.data;
        var data = Response.sort(function(a,b){
            return parseInt(b.metacriticScore) - parseInt(a.metacriticScore);
        })

        vm.rangeList.forEach(function(val,i){
            var meanArr = [];
            // Categorize
            meanArr = data.filter(function(obj){
               return val > parseInt(obj.metacriticScore) && vm.rangeList[i+1] <= parseInt(obj.metacriticScore)
            });
            vm.dealList.push(meanArr);
        })
    });
}

//Service to fetch the data from Web service
//used $http and $q

 app.service("dataService",dataService);
  dataService.$injector=["$http","$q"];
   function dataService($http,$q){
	var deferred=$q.defer();
	$http.get('http://www.cheapshark.com/api/1.0/deals').then(function(resp){
		deferred.resolve(resp);
	})
	this.getData=function(){
		return deferred.promise
	}
}