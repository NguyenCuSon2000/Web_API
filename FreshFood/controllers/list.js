var app = angular.module('AppDemo', []);
app.controller("ListCtrl", function ($scope, $http) {
    $scope.listItem;
    $scope.pageSize = '2';
    $scope.LoadList= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: $scope.pageSize},
            url: current_url + '/api/Item/search',
        }).then(function (response) { 
            $scope.listItem = response.data.data;  
        });
    }; 
});