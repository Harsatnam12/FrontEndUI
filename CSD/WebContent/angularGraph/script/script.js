/**
 * Created by DAY on 23-07-2016.
 */
 (function(){
angular.module('app')

.controller('MainController', MainController);
MainController.$injector = ['$http', '$filter','$location','DataService'];

function MainController ($http,$location,$filter,DataService) {
    var vm = this;
    vm.dataList = [];
    vm.filterData = filterData;
    vm.clickRow=clickRow;
    $http.get('data.json').success(function(resp) {
        console.log('14', resp);
        vm.list = resp;
        vm.dataList = resp.data;
    });

    function filterData() {
        console.log('21', vm.filterQuery);
        vm.dataList =  $filter('filter')(vm.list.data, {LINEUP_DESCRIPTION:vm.filterQuery});
    }

    function clickRow(data){
      
      DataService.clickData=data;
      $location.path('/view');
      console.log(DataService.clickData);
    }
}
angular.module('app').controller("ViewController",ViewController);
ViewController.$injector = ['DataService'];
function ViewController(DataService){
    var vm=this;
    this.rowData=DataService.clickData;
    console.log(this.rowData);
}

angular.module('app').service("DataService",dataService)

function dataService(){
    this.clickData;
}
})();
