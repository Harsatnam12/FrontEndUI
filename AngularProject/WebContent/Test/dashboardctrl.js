var app = angular.module('myApp', []);
app.controller('dashBoardCtrl', function($scope, $http, $timeout) {
    $http.get("data.json")
          .then(function(response) {
          $scope.sideMenu=response.data.sideMenu;
          $scope.columnTileData=response.data.columnTileData;
          $scope.rowTileData=response.data.rowTileData;
          console.log(response,$scope.rowTileData);
          });

    $scope.Sidebar=function(){
    	$scope.isSidebarOpen =!$scope.isSidebarOpen;
    };

    //onClick to Render the Chart
    $scope.tileRender = function(ind){
        $timeout(function(){
            angular.element('iframe').contents().find('body').css({'overflow':'hidden','margin':'0px'});
            $scope.RenderCharts(ind);
        },300);
    };

    $scope.tileRender(0); //Render the Chart on page load

    /* Chart Rendering*/
    $scope.RenderCharts = function(ind){
        $http.get("brands.json")
            .then(function(response) {
                angular.element('#barframeId').contents().find('#container').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Browser market shares. January, 2015 to May, 2015'
                    },

                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: 'Total percent market share'
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y:.1f}%'
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                    },
                    series: [{
                        name: 'Sales',
                        colorByPoint: true,
                        data: response.data.graph[ind].columndata
                    }]

                });


             /* pie chart*/
                Morris.Donut({
                    element: 'pieChart1',
                    data: response.data.graph[ind].piedata1,
                    colors: ['#54b5e0 ', '#90c657 ','#f9a94a'],
                    formatter: function (y) { return y + "%" }
                });
                Morris.Donut({
                    element: 'pieChart2',
                    data: response.data.graph[ind].piedata2,
                    colors: ['#54b5e0 ', '#90c657 ','#f9a94a'],
                    formatter: function (y) { return y + "%" }
                });


                /* line Series*/
                angular.element('#lineframeId').contents().find('#linechart').highcharts({
                    chart: {
                        type: 'spline'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°';
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: response.data.graph[ind].lineseries
                });
            });
    };
});