var app = angular.module('AppBill', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);
// app.config(['$locationProvider', function ($locationProvider) { 
//     $locationProvider.html5Mode(true);
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
//  }]);

app.controller("BillCtrl", function ($scope, $http, $location) {
    $scope.current_url = current_url; 
    $scope.list;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.bill;
    $scope.submit = "Thêm mới";
    $scope.LoadBill = function () {
        var user = JSON.parse(localStorage.getItem("user"));
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + user.token },
            data: { page: $scope.page, pageSize: $scope.pageSize, hoten: $scope.hoten, diachi: $scope.diachi },
            url: current_url + '/api/HoaDon/search',
        }).then(function (response) {
            $scope.list = response.data.data;
        });
    };

    $scope.Xem = function (id) {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/HoaDon/get-by-id/' + id,
        }).then(function (response) {
            $scope.bill = response.data;
            $scope.ho_ten = $scope.bill.ho_ten;
            $scope.dia_chi = $scope.bill.dia_chi;
            $scope.listjson_chitiet = $scope.bill.listjson_chitiet;
            $scope.ma_chi_tiet = $scope.bill.ma_chi_tiet;
            $scope.masp = $scope.bill.masp;
            $scope.so_luong = $scope.bill.so_luong;
        });
    };
 
    //         hoadon = {};
    //         listjson_chitiet = {};
    //         hoadon.ho_ten = $scope.ho_ten;
    //         hoadon.dia_chi = $scope.dia_chi;
    //         hoadon.status = $scope.status;
    //         hoadon.listjson_chitiet = $scope.listjson_chitiet;
    //         listjson_chitiet.masp = $scope.masp;
    //         listjson_chitiet.so_luong = $scope.so_luong;
    //         $http({
    //             method: 'POST',
    //             headers: { "Authorization": 'Bearer ' + user.token },
    //             data: hoadon,
    //             url: current_url + '/api/HoaDon/create-hoa-don',
    //         }).then(function (response) {
    //             $scope.LoadData();
    //             alert('Thêm hóa đơn thành công');
    //         });
    //    
    // $scope.Save = function () {
    //     if ($scope.submit == "Thêm mới") {
    //         bill = {};
    //         bill.listjson_chitiet = $scope.listjson_chitiet;
    //         bill.masp = $scope.masp;
    //         bill.so_luong = $scope.so_luong;
    //         $http({
    //             method: 'POST',
    //             data: bill,
    //             url: current_url + '/api/HoaDon/create-hoa-don',
    //         }).then(function (response) {
    //             $scope.LoadBill();
    //             alert('Thêm hóa đơn thành công');
    //         });
    //     } else {
    //         $scope.bill.ho_ten = $scope.ho_ten;
    //         $scope.bill.dia_chi= $scope.dia_chi;
    //         $scope.bill.listjson_chitiet = $scope.listjson_chitiet;
    //         $scope.bill.ma_chi_tiet = $scope.ma_chi_tiet;
    //         $scope.bill.masp = $scope.masp;
    //         $scope.bill.so_luong = $scope.so_luong;
    //         $http({
    //             method: 'POST',
    //             data: $scope.bill,
    //             url: current_url + '/api/HoaDon/update-hoa-don',
    //         }).then(function (response) {
    //             $scope.LoadBill();
    //             alert('Cập nhật hóa đơn thành công');
    //         });
    //     }

    // };

   
    
   $scope.Xoa = function (id) {
        $http({
            method: 'DELETE',
             headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/HoaDon/delete-hoadon/' + id,
        }).then(function (response) { 
            $scope.LoadBill();
            alert('Xóa thành công');
        });
    };
});

