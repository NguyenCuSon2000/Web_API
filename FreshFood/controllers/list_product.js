var app = angular.module('AppProduct', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);


app.controller("ProductCtrl", function ($scope, $http) {
    $scope.current_url = current_url;
    $scope.listProduct;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.LoadData = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {
            $scope.listProduct = response.data.data;
        });
    };
    // $scope.LoadProductByCate = function (maloai) {
    //     $http({
    //         method: 'GET',
    //         url: $scope.current_url + '/api/SanPham/get-by-maloai' + maloai,
    //     }).then(function (response) { 
    //         $scope.listProduct = response.data;  
    //     });
    // };

    // $scope.listProduct;
    // $scope.LoadData = function () { 
    //     var maLoaiSP = $location.search().maLoaiSP;
    //     $http({
    //         method: 'GET',
    //         url: current_url + '/api/SanPham/get-by-maloai' + maLoaiSP,
    //     }).then(function (response) { 
    //         $scope.listProduct = response.data;
    //      });
    //  };

    // $scope.LoadData= function () {
    //         $http({
    //             method: 'GET',
    //             url: $scope.current_url + '/api/SanPham/get-all',
    //         }).then(function (response) { 
    //             $scope.listProduct = response.data;  
    //         });
    //     };
  
});