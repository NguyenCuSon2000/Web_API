var user = JSON.parse(localStorage.getItem("user"));
var app = angular.module('AppCreateBill', []);
app.config(['$locationProvider', function ($locationProvider) { 
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
 }]);

app.controller("ThemHoaDonCtrl", function ($scope, $http, $location) {
    $scope.hoadon;
    $scope.submit = "Thêm mới";
    $scope.status = 1;
    $scope.LoadData = function () { 
        var user = JSON.parse(localStorage.getItem("user"));
        var ma_hoa_don = $location.search().ma_hoa_don;
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/HoaDon/get-by-id/'+ ma_hoa_don,
        }).then(function (response) { 
            $scope.hoadon = response.data;
         });
     };

     
     
    $scope.current_url = current_url; 
    $scope.listProduct;
    $scope.LoadProduct= function () {
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: $scope.current_url + '/api/SanPham/get-all',
        }).then(function (response) { 
            $scope.listProduct = response.data;  
        });
    };

    // THÊM SỬA HÓA ĐON
    $scope.Save = function () { 
        if($scope.submit == "Thêm mới"){
            hoadon = {};
            hoadon.ho_ten = $scope.ho_ten;
            hoadon.dia_chi = $scope.dia_chi;
            hoadon.listjson_chitiet = $scope.listjson_chitiet;
            listjson_chitiet.masp = $scope.masp;
            listjson_chitiet.so_luong = $scope.so_luong;
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + user.token },
                data: $scope.listjson_chitiet,
                url: current_url + '/api/HoaDon/create-hoadon',
            }).then(function (response) {
                $scope.LoadData();
                alert('Cập nhật sản phẩm thành công');
            });
        }
        else{
            $scope.hoadon.ho_ten = $scope.ho_ten;
            $scope.hoadon.dia_chi = $scope.dia_chi;
            $scope.hoadon.listjson_chitiet = $scope.listjson_chitiet;
            $scope.listjson_chitiet.masp = $scope.masp;
            $scope.listjson_chitiet.so_luong = $scope.so_luong;
            $scope.listjson_chitiet.status = $scope.status;
            if ($scope.status == 1) {
                listjson_chitiet = {};
                listjson_chitiet.masp = $scope.masp;
                listjson_chitiet.so_luong = $scope.so_luong;
            } else if ($scope.status == 2) {
                  $scope.listjson_chitiet.masp = $scope.masp;
                  $scope.listjson_chitiet.so_luong = $scope.so_luong;
            }
            else {
                alert("Xóa sản phẩm thành công");
            }
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + user.token },
                data: $scope.listjson_chitiet,
                url: current_url + '/api/HoaDon/update-hoadon',
            }).then(function (response) {
                $scope.LoadData();
                alert('Cập nhật sản phẩm thành công');
            });
        }
     };


    $scope.Sua = function (id) {
        $scope.submit = "Lưu lại";
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
});


