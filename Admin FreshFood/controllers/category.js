var user = JSON.parse(localStorage.getItem("user"));
var app = angular.module('AppLoaiSanPham', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);
app.controller("LoaiSanPhamCtrl", function ($scope, $http) {
    $scope.current_url = current_url; 
    $scope.list;
    $scope.pageSize = '100';
    $scope.page = '1';
    $scope.loaisp;
    $scope.submit = "Thêm mới";

    $scope.LoadData = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize, maloaisp: $scope.maloaisp, tenloai: $scope.tenloai },
            url: current_url + '/api/LoaiSanPham/search',
        }).then(function (response) {
            $scope.list = response.data.data;
        });
    };


   $scope.Save = function () {
        if ($scope.submit == "Thêm mới") {
            loaisp = {};
            loaisp.maLoaiSP = $scope.maLoaiSP;
            loaisp.tenLoai = $scope.tenLoai;
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + user.token },
                data: loaisp,
                url: current_url + '/api/LoaiSanPham/create-category',
            }).then(function (response) {
                $scope.LoadData();
                alert('Thêm loại sản phẩm thành công');
            });
        } else {
            $scope.loaisp.maLoaiSP = $scope.maLoaiSP;
            $scope.loaisp.tenLoai = $scope.tenLoai;
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + user.token },
                data: $scope.loaisp,
                url: current_url + '/api/LoaiSanPham/update-category',
            }).then(function (response) {
                $scope.LoadData();
                alert('Cập nhật loại sản phẩm thành công');
            });
        }

    };

    $scope.Sua = function (id) {
        $scope.submit = "Lưu lại";
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/LoaiSanPham/get-by-id/' + id,
        }).then(function (response) {
            debugger;
            $scope.loaisp = response.data;
            $scope.maLoaiSP = $scope.loaisp.maLoaiSP;
            $scope.tenLoai = $scope.loaisp.tenLoai;
        });
    };
    
    $scope.Xoa = function (id) {
        $http({
            method: 'DELETE',
            headers: { "Authorization": 'Bearer ' + user.token },
            url: current_url + '/api/LoaiSanPham/delete-category/' + id,
        }).then(function (response) { 
            $scope.LoadData();
            alert('Xóa thành công');
        });
    };
});